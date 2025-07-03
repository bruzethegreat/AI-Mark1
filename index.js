require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { OpenRouterClient } = require('../src/openrouter');
const { WebSearchClient } = require('../src/websearch');

const app = express();

const openRouterClient = new OpenRouterClient();
const webSearchClient = new WebSearchClient();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"]
    }
  }
}));
app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.post('/api/search', async (req, res) => {
  try {
    const { query, model } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const startTime = Date.now();
    
    // Perform web search first
    const webSearchResult = await webSearchClient.search(query, 5);
    let searchContext = '';
    
    if (webSearchResult.success && webSearchResult.results.length > 0) {
      searchContext = '\n\nWeb Search Results:\n';
      webSearchResult.results.forEach((result, index) => {
        searchContext += `${index + 1}. ${result.title}\n   ${result.url}\n   ${result.snippet}\n\n`;
      });
    }
    
    const messages = [
      {
        role: 'system',
        content: `You are AI Mark1, a helpful AI search assistant. You have access to current web search results. 
        Provide a comprehensive answer based on the web search results and your knowledge. 
        Be concise but informative. Always cite sources when using information from web results.`
      },
      {
        role: 'user',
        content: `Question: ${query}${searchContext}\n\nPlease provide a comprehensive answer based on the search results and your knowledge.`
      }
    ];

    // Pass the original query for routing analysis, not the modified one with web context
    const llmResponse = await openRouterClient.chat(messages, model, { originalQuery: query });
    const endTime = Date.now();

    res.json({
      success: llmResponse.success,
      query,
      response: llmResponse.response,
      webResults: webSearchResult.success ? webSearchResult.results : [],
      searchSource: webSearchResult.source,
      model: llmResponse.model,
      usage: llmResponse.usage,
      fallback: llmResponse.fallback || false,
      responseTime: endTime - startTime,
      timestamp: new Date().toISOString(),
      routing: llmResponse.routing,
      error: llmResponse.error
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Search failed', 
      details: error.message 
    });
  }
});

app.get('/api/models', (req, res) => {
  res.json(openRouterClient.getAvailableModels());
});

// Export as serverless function
module.exports = (req, res) => {
  return app(req, res);
};