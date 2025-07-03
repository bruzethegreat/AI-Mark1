# AI Mark1 - AI-Powered Search Engine

AI Mark1 is an intelligent search engine that combines web search with AI-powered responses using multiple language models with intelligent routing and parallel execution.

## Features

- 🤖 **Intelligent LLM Routing** - Automatically selects the best AI model based on query type
- ⚡ **Parallel Model Execution** - Runs expert model + Mistral backup simultaneously for reduced latency
- 🔍 **Web Search Integration** - Enhanced responses with real-time web data
- 🔒 **Security First** - CSP headers, rate limiting, and secure headers
- 🎯 **Query Analysis** - Detects coding, math, reasoning, and multilingual queries
- 🚀 **Vercel Ready** - Optimized for serverless deployment

## AI Models Supported

- **Coding:** Mistral Small 3.1 24B
- **Math:** DeepSeek R1 Distill Llama 70B  
- **Reasoning:** Llama 4 Maverick, Gemini 2.5 Pro Exp
- **Multilingual:** Kimi VL A3B Thinking
- **General:** Llama 4 Scout, Qwen 2.5 VL 3B

## Deployment

### 🚀 Vercel Deployment (Recommended)

1. **Get OpenRouter API Key:**
   - Sign up at [OpenRouter.ai](https://openrouter.ai/)
   - Get your free API key from the dashboard

2. **Deploy to Vercel:**
   - Fork this repository to your GitHub
   - Connect your GitHub repo to [Vercel](https://vercel.com/)
   - Add environment variables in Vercel dashboard:
     - `OPENROUTER_API_KEY`: Your OpenRouter API key
     - `NODE_ENV`: production

3. **Deploy:**
   - Vercel will automatically deploy from your GitHub repo
   - Your app will be live at `https://your-app.vercel.app`

### 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BruzeTheGreat/AI-Mark1.git
   cd AI-Mark1
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your OpenRouter API key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   ```
   http://localhost:3000
   ```

## How It Works

### LLM Routing Algorithm

The system analyzes incoming queries using:
- **Complexity Analysis**: Determines if query is simple, medium, or complex
- **Category Classification**: Identifies if query is about code, math, creative writing, reasoning, etc.
- **Model Selection**: Routes to the most appropriate free model based on analysis

### Query Processing Flow

1. **Query Analysis**: Parse and categorize the search query
2. **Model Routing**: Select optimal LLM based on RouterLLM-inspired algorithm
3. **Web Search**: Perform parallel web searches using multiple engines
4. **Context Building**: Combine web results with query for enhanced context
5. **LLM Response**: Generate AI response using selected model and context
6. **Results Display**: Show AI response, web results, and model information

### Web Search Integration

- **DuckDuckGo API**: Primary search engine for privacy-focused results
- **Google Scraping**: Fallback search method for additional results
- **Result Aggregation**: Combines and deduplicates results from multiple sources

## API Endpoints

- `GET /` - Main search interface
- `POST /api/search` - Search endpoint (requires JSON body with 'query' field)
- `GET /api/models` - List available models and their capabilities

## Model Selection Logic

The routing algorithm considers:
- **Query complexity** (word count, technical terms, question type)
- **Content category** (code, math, creative, reasoning, general)
- **Model strengths** (each model optimized for specific tasks)
- **Performance requirements** (response time vs. accuracy trade-offs)

## Usage Examples

### Simple Query
```
Query: "What is the capital of France?"
→ Routes to: Llama 3.1 8B (general knowledge)
```

### Code Query
```
Query: "How to implement a binary search in Python?"
→ Routes to: Mixtral 8x7B (code generation)
```

### Math Query
```
Query: "Solve the equation 2x + 5 = 15"
→ Routes to: Mixtral 8x7B (mathematical reasoning)
```

### Creative Query
```
Query: "Write a short story about a robot"
→ Routes to: Llama 3.1 8B (creative writing)
```

## Technical Architecture

```
Frontend (HTML/CSS/JS)
    ↓
Express.js Server
    ↓
┌─────────────────┬─────────────────┐
│  LLM Router     │  Web Search     │
│  - Query Analysis│  - DuckDuckGo  │
│  - Model Selection│  - Google      │
│  - OpenRouter API│  - Aggregation │
└─────────────────┴─────────────────┘
    ↓
Response with AI Answer + Web Results + Model Info
```

## Free Tier Limitations

- **OpenRouter Free Models**: Limited to 20 requests per minute
- **Daily Limits**: 50 requests per day (or 1000 if you've purchased credits)
- **Model Availability**: Subject to OpenRouter's free tier availability
- **Search Results**: Limited to 5 web results per query

## Development Notes

- Built with Node.js and Express.js
- Uses RouterLLM-inspired routing algorithms
- Designed for educational and prototype purposes
- Easily extensible for additional models and search engines

## Future Enhancements

- [ ] Add more sophisticated routing algorithms
- [ ] Implement caching for better performance
- [ ] Add support for image and video search
- [ ] Integrate more search engines
- [ ] Add user authentication and query history
- [ ] Implement A/B testing for routing decisions

## License

ISC License - Feel free to use and modify for your projects!