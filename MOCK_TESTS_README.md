# Mock API Tests for Ustaz AI

This directory contains mock versions of API tests designed for fast, reliable testing during development and CI/CD pipelines.

## 🚀 Quick Start

### Run All Mock Tests

```bash
npm run test:mock
# or
yarn test:mock
```

### Run Individual Mock Tests

```bash
# DALL-E Image Generation
npm run test:mock:dalle

# Tavily Search API
npm run test:mock:tavily

# Wolfram Alpha API
npm run test:mock:wolfram
```

### Run Real API Tests (for validation)

```bash
npm run test:real
```

## 📊 Test Results

The mock tests provide:

- **⚡ Fast Execution**: ~200-300ms per test (vs 1-10s for real APIs)
- **🔒 Reliable**: No external dependencies or network issues
- **🎯 Consistent**: Same results every time
- **🧪 Isolated**: Test logic without API rate limits or costs

## 🧪 Available Mock Tests

### 1. Supabase Database (`test-supabase.js`)

- **Purpose**: Test database connectivity
- **Mock**: No (uses real connection for reliability)
- **Duration**: ~200ms

### 2. DALL-E Image Generation (`test-dalle-mock.js`)

- **Purpose**: Test image generation API
- **Mock**: Yes, returns mock image URL
- **Duration**: ~100ms

### 3. Tavily Search API (`test-tavily-mock.js`)

- **Purpose**: Test web search functionality
- **Mock**: Yes, returns mock search results
- **Duration**: ~150ms

### 4. Wolfram Alpha API (`test-wolfram-mock.js`)

- **Purpose**: Test computational capabilities
- **Mock**: Yes, returns mock calculation results
- **Duration**: ~200ms

## 📋 Test Output Example

```
🚀 Running All Mock API Tests for Ustaz AI
============================================================

🔬 Running Supabase Database Test...
✅ Supabase Database: PASSED (236ms)

🔬 Running DALL-E Image Generation Test...
✅ DALL-E API mock test successful!
⚡ Mock test completed in ~100ms (vs ~5-10s for real API)
✅ DALL-E Image Generation: PASSED (197ms)

🔬 Running Tavily Search API Test...
✅ Tavily API mock test successful!
⚡ Mock test completed in ~150ms (vs ~2-5s for real API)
✅ Tavily Search API: PASSED (238ms)

🔬 Running Wolfram Alpha API Test...
✅ Wolfram Alpha API mock test successful!
⚡ Mock test completed in ~200ms (vs ~1-3s for real API)
✅ Wolfram Alpha API: PASSED (295ms)

============================================================
📊 TEST SUMMARY
============================================================
Total: 4/4 tests passed
Total time: 966ms
Average time: 242ms per test

🎉 All mock tests passed! Your Ustaz AI is ready for development.
```

## 🛠️ Development Workflow

### For Development
1. Run mock tests frequently: `npm run test:mock`
2. Run real tests occasionally: `npm run test:real`
3. Use mock tests in CI/CD for speed

### For CI/CD
```yaml
# GitHub Actions example
- name: Run Mock Tests
  run: npm run test:mock

- name: Run Real API Tests
  run: npm run test:real
  env:
    OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
    TAVILY_API_KEY: ${{ secrets.TAVILY_API_KEY }}
    WOLFRAM_ALPHA_APPID: ${{ secrets.WOLFRAM_ALPHA_APPID }}
```

## 🔧 Configuration

### Environment Variables Required
```bash
# OpenAI (for DALL-E)
OPENAI_API_KEY=sk-proj-...

# Tavily Search
TAVILY_API_KEY=tvly-dev-...

# Wolfram Alpha
WOLFRAM_ALPHA_APPID=27YGU6...

# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

## 🎯 Benefits

### Speed Comparison
| Test Type | Real API | Mock API | Speed Improvement |
|-----------|----------|----------|-------------------|
| DALL-E | 5-10s | ~100ms | **50-100x faster** |
| Tavily | 2-5s | ~150ms | **15-30x faster** |
| Wolfram | 1-3s | ~200ms | **5-15x faster** |
| **Total** | **8-18s** | **~650ms** | **15-30x faster** |

### Reliability
- ✅ No network failures
- ✅ No API rate limits
- ✅ No external service downtime
- ✅ Consistent test results
- ✅ Cost-free testing

## 📝 Mock Data Structure

### DALL-E Mock Response
```json
{
  "created": 1234567890,
  "data": [{
    "url": "https://mock-image-url.jpg",
    "revised_prompt": "Islamic geometric art..."
  }]
}
```

### Tavily Mock Response
```json
{
  "query": "Islamic education",
  "answer": "Islamic education encompasses...",
  "results": [
    {
      "title": "Islamic Education - Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Islamic_education",
      "content": "Islamic education is the teaching...",
      "score": 0.95
    }
  ]
}
```

### Wolfram Mock Response
```json
{
  "queryresult": {
    "success": true,
    "pods": [{
      "subpods": [{
        "plaintext": "4"
      }]
    }]
  }
}
```

## 🚨 Important Notes

1. **Mock tests don't validate real API functionality** - use real tests for integration validation
2. **Environment variables are still required** - mocks validate configuration
3. **Mock responses simulate success cases** - add error case mocks as needed
4. **Real tests should be run periodically** to ensure API compatibility

## 🔄 Next Steps

1. **Add more mock tests** for additional APIs
2. **Implement error case mocks** for better coverage
3. **Create performance benchmarks** comparing mock vs real
4. **Integrate with CI/CD pipelines** for automated testing

---

**Happy Testing! 🎉**

*Mock tests: Fast, reliable, and developer-friendly* 🚀
