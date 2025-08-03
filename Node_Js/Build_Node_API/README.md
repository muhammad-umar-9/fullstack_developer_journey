# 🌍 Build a Node.js API 

---

## 🚀 Wild Horizons Project Introduction

### What We're Building
A comprehensive travel destinations API that serves data about the world's most interesting places. This project demonstrates real-world API development patterns used in production applications.

**API Features:**
- ✅ Get all destinations
- ✅ Filter by continent or country
- ✅ Advanced query parameter filtering
- ✅ Proper error handling
- ✅ CORS support for frontend integration

**Real-world Applications:**
- Travel booking websites
- Tourism platforms  
- Geographic data services
- Location-based mobile apps

---

## 📦 Understanding package.json

### The Project Blueprint
Think of `package.json` as your project's **DNA** - it contains everything needed to recreate your project environment.

```bash
npm init
```

**Generated package.json:**
```json
{
  "name": "wild-horizons",
  "version": "1.0.0", 
  "description": "a dataset of the planet's most interesting places",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "author": "Your Name",
  "license": "ISC",
  "type": "module"
}
```

### Key Benefits:
1. **Collaboration** - Other developers can run `npm install` and get identical setup
2. **Script Management** - `npm start` runs your server
3. **Dependency Tracking** - Manages external libraries
4. **Project Metadata** - Version control and documentation

**Pro Tip:** Always add `"type": "module"` to enable modern ES6 import syntax!

---

## 🌐 HTTP Module Deep Dive

### Core Concepts

The HTTP module is Node.js's **built-in web server engine**. Unlike frontend JavaScript, Node.js can create servers that listen for incoming requests.

### Two Import Methods:

```javascript
// ✅ Recommended: ES6 Modules  
import http from 'node:http'

// ❌ Old Way: CommonJS
const http = require('http')
```

**Why `node:http`?** 
- Explicitly indicates core Node.js module
- Prevents conflicts with npm packages named 'http'
- Better for IDE autocomplete and error detection

### HTTP Module Capabilities:
- 🚀 Create HTTP/HTTPS servers
- 📨 Handle incoming requests  
- 📤 Send responses with proper headers
- 🔄 Support all HTTP methods (GET, POST, PUT, DELETE)

---

## 🏗️ Building Your First Server

### Step-by-Step Server Creation

```javascript
import http from 'node:http'

const PORT = 8000

// Step 1: Create server instance
const server = http.createServer((req, res) => {
  // Step 2: Handle each request
  res.end('Hello from the Wild Horizons API!')
})

// Step 3: Start listening for connections
server.listen(PORT, () => {
  console.log(`🌍 Wild Horizons API running on http://localhost:${PORT}`)
})
```

### How It Works:

1. **Server Creation:** `createServer()` creates a new HTTP server instance
2. **Request Handler:** Callback function executes for every incoming request
3. **Response:** `res.end()` sends data back to the client
4. **Port Binding:** `listen()` makes server accessible on specified port

**Testing Your Server:**
```bash
# Terminal 1: Start server
node server.js

# Terminal 2: Test with curl
curl http://localhost:8000
```

**Browser Test:** Navigate to `http://localhost:8000`

---

## 🔄 Server Fundamentals Recap

### The Request-Response Cycle

Think of your server as a **restaurant**:

1. **Customer enters** (Request arrives)
2. **Waiter takes order** (Server receives request)  
3. **Kitchen prepares food** (Server processes request)
4. **Food is served** (Response sent back)

```javascript
const server = http.createServer((req, res) => {
  // 🎯 This function runs for EVERY request
  console.log(`📨 Request received: ${req.method} ${req.url}`)
  
  // 📤 Always send a response!
  res.end('Order processed!')
})
```

**Key Principle:** Every request MUST receive a response, or the client will hang waiting.

---

## 📨 Request/Response Cycle

### Understanding the Request Object

The `req` object contains everything about the incoming request:

```javascript
const server = http.createServer((req, res) => {
  console.log({
    method: req.method,        // GET, POST, PUT, DELETE
    url: req.url,             // /api, /api/destinations  
    headers: req.headers,     // Client information
    httpVersion: req.httpVersion
  })
})
```

### Understanding the Response Object

The `res` object lets you control what goes back to the client:

```javascript
const server = http.createServer((req, res) => {
  // Set status code
  res.statusCode = 200  // Success!
  
  // Set headers (metadata about response)
  res.setHeader('Content-Type', 'application/json')
  
  // Send data and close connection
  res.end('{"message": "Success"}')
})
```

**Response Status Codes:**
- `200` - OK (Success)
- `404` - Not Found
- `400` - Bad Request
- `500` - Internal Server Error

---

## 🛤️ Routing Implementation

### Basic Routing Logic

Routing is like a **traffic director** - it decides which code runs based on the requested URL.

```javascript
const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB()
  
  // Route 1: Get all destinations
  if (req.url === '/api' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(destinations))
  }
  
  // Route 2: Handle unknown routes  
  else {
    res.statusCode = 404
    res.end('Route not found')
  }
})
```

### Advanced Routing Patterns

```javascript
// ✅ Exact match
if (req.url === '/api') { /* ... */ }

// ✅ Starts with pattern  
if (req.url.startsWith('/api/continent')) { /* ... */ }

// ✅ Method checking
if (req.method === 'GET') { /* ... */ }

// ✅ Combined conditions
if (req.url === '/api' && req.method === 'GET') { /* ... */ }
```

---

## 📊 JSON and APIs

### Why JSON?

**JSON (JavaScript Object Notation)** is the **universal language of APIs**. It's:
- ✅ Lightweight and readable
- ✅ Supported by every programming language
- ✅ Easy to parse and generate
- ✅ Industry standard for REST APIs

### Critical HTTP Principle:
> **"HTTP is text-based. All data must be sent as strings."**

```javascript
// ❌ This won't work - objects can't be sent directly
const destination = { name: 'Paris', country: 'France' }
res.end(destination) // TypeError!

// ✅ Convert to JSON string first
res.end(JSON.stringify(destination))
```

### JSON Conversion Examples:

```javascript
// Object to JSON string
const place = { name: 'Tokyo', visitors: 15000000 }
const jsonString = JSON.stringify(place)
console.log(jsonString) // '{"name":"Tokyo","visitors":15000000}'

// JSON string to Object  
const parsed = JSON.parse(jsonString)
console.log(parsed.name) // 'Tokyo'
```

---

## 📤 Serving JSON Data

### Complete JSON Response Implementation

```javascript
import { getDataFromDB } from './database/db.js'

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB()
  
  if (req.url === '/api' && req.method === 'GET') {
    // Step 1: Set proper headers
    res.setHeader('Content-Type', 'application/json')
    
    // Step 2: Set success status  
    res.statusCode = 200
    
    // Step 3: Convert data to JSON and send
    res.end(JSON.stringify(destinations))
  }
})
```

### Sample API Response:

```json
[
  {
    "id": 1,
    "name": "Santorini",
    "country": "Greece", 
    "continent": "Europe",
    "isOpenToPublic": true,
    "description": "Beautiful Greek island destination"
  },
  {
    "id": 2,
    "name": "Machu Picchu",
    "country": "Peru",
    "continent": "South America", 
    "isOpenToPublic": true,
    "description": "Ancient Incan citadel"
  }
]
```

---

## 📋 Setting Content-Type Headers

### Why Headers Matter

HTTP headers are like **postage stamps and envelope labels** - they tell the recipient how to handle the contents.

### Essential Headers for APIs:

```javascript
// Tell client this is JSON data
res.setHeader('Content-Type', 'application/json')

// Enable cross-origin requests (for frontend apps)
res.setHeader('Access-Control-Allow-Origin', '*')

// Cache control
res.setHeader('Cache-Control', 'no-cache')
```

### Content-Type Examples:
- `application/json` - JSON data
- `text/html` - HTML pages
- `text/plain` - Plain text
- `image/jpeg` - JPEG images
- `application/xml` - XML data

### Before/After Comparison:

```javascript
// ❌ Without proper headers - browser might not parse JSON
res.end(JSON.stringify(data))

// ✅ With proper headers - browser knows it's JSON
res.setHeader('Content-Type', 'application/json') 
res.end(JSON.stringify(data))
```

---

## ❌ Error Handling

### Route Not Found Implementation

Every API needs graceful error handling for unknown routes:

```javascript
const server = http.createServer((req, res) => {
  if (req.url === '/api' && req.method === 'GET') {
    // Valid route handling...
  } 
  else {
    // 🚨 Handle unknown routes
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 404
    res.end(JSON.stringify({
      error: "Route not found",
      message: "The requested endpoint does not exist",
      availableRoutes: [
        "GET /api",
        "GET /api/continent/{continent}",
        "GET /api/country/{country}"
      ]
    }))
  }
})
```

### Error Response Structure:

```json
{
  "error": "Route not found",
  "message": "The requested endpoint does not exist", 
  "statusCode": 404,
  "timestamp": "2024-01-15T10:30:00Z",
  "availableRoutes": [
    "GET /api",
    "GET /api/continent/{continent}"
  ]
}
```

### HTTP Status Codes Guide:
- **2xx Success:** 200 (OK), 201 (Created)
- **4xx Client Error:** 400 (Bad Request), 404 (Not Found), 401 (Unauthorized)
- **5xx Server Error:** 500 (Internal Server Error), 503 (Service Unavailable)

---

## 🖇️ Path Parameters

### Understanding Path Parameters

Path parameters let users request **specific resources**. Think of them as **room numbers in a hotel**:

- `/api` = "Show me all rooms" 
- `/api/continent/europe` = "Show me rooms in the Europe wing"
- `/api/country/france` = "Show me rooms for France guests"

### URL Structure Breakdown:
```
/api/continent/europe
│   │         │
│   │         └── Parameter value  
│   └── Parameter name
└── Base endpoint
```

### Implementation:

```javascript
else if (req.url.startsWith('/api/continent') && req.method === 'GET') {
  // Extract continent from URL
  const continent = req.url.split('/').pop()
  
  // Filter destinations by continent
  const filteredData = destinations.filter(destination => 
    destination.continent.toLowerCase() === continent.toLowerCase()
  )
  
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify(filteredData))
}
```

### How URL Parsing Works:

```javascript
// URL: "/api/continent/africa"
const parts = req.url.split('/')
// Result: ["", "api", "continent", "africa"]

const continent = parts.pop()  
// Result: "africa"

// Alternative one-liner:
const continent = req.url.split('/').pop()
```

### Example Requests:
- `GET /api/continent/asia` → All Asian destinations
- `GET /api/country/japan` → All destinations in Japan
- `GET /api/continent/europe` → All European destinations

---

## 🧩 Code Modularization Part 1

### Why Modularize?

Imagine your code as a **toolbox**. Without organization:
- 🔧 All tools thrown in one drawer (messy)
- 😵 Hard to find what you need
- 🐛 Bugs hide in the chaos

With modularization:
- 📦 Each tool has its place
- 🎯 Easy to locate and use
- 🧪 Easy to test individual parts

### Creating Utility Modules

**utils/sendJSONResponse.js:**
```javascript
export const sendJSONResponse = (res, statusCode, data) => {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = statusCode
  res.end(JSON.stringify(data))
}
```

**Before modularization:**
```javascript
// Repeated 5+ times in server.js 😱
res.setHeader('Content-Type', 'application/json')
res.statusCode = 200
res.end(JSON.stringify(data))
```

**After modularization:**
```javascript
// One clean line! 🎉
import { sendJSONResponse } from './utils/sendJSONResponse.js'
sendJSONResponse(res, 200, data)
```

---

## 🔧 Code Modularization Part 2

### Advanced Modularization

**utils/getDataByPathParams.js:**
```javascript
export const getDataByPathParams = (data, locationType, locationName) => {
  return data.filter((destination) => {
    return destination[locationType].toLowerCase() === locationName.toLowerCase()
  })
}
```

### Usage in Server:

```javascript
import { getDataByPathParams } from './utils/getDataByPathParams.js'

// Continent filtering
else if (req.url.startsWith('/api/continent') && req.method === 'GET') {
  const continent = req.url.split('/').pop()
  const filteredData = getDataByPathParams(destinations, 'continent', continent)
  sendJSONResponse(res, 200, filteredData)
}

// Country filtering  
else if (req.url.startsWith('/api/country') && req.method === 'GET') {
  const country = req.url.split('/').pop()
  const filteredData = getDataByPathParams(destinations, 'country', country)
  sendJSONResponse(res, 200, filteredData)
}
```

### Project Structure:
```
wild-horizons/
├── server.js              # Main server file
├── package.json           # Project configuration
├── database/
│   └── db.js             # Data access layer
└── utils/
    ├── sendJSONResponse.js      # Response utilities
    ├── getDataByPathParams.js   # Path parameter filtering
    └── getDataByQueryParams.js  # Query parameter filtering
```

---

## ❓ Query Parameters Theory

### What Are Query Parameters?

Query parameters are like **advanced search filters** on e-commerce websites. They let you refine results based on multiple criteria.

### Real-World Examples:

**Amazon Product Search:**
```
/products?category=electronics&price_min=100&price_max=500&brand=Apple&sort=rating
```

**Our Travel API:**
```
/api?continent=Europe&isOpenToPublic=true&country=France
```

### Query String Structure:
```
/api?country=Turkey&isOpenToPublic=true&minRating=4
│   │ │              │                   │
│   │ │              │                   └── Parameter 3
│   │ │              └── Parameter 2  
│   │ └── Parameter 1
│   └── Query string starts with '?'
```

### Benefits:
- ✅ **Flexible filtering** - Combine multiple criteria
- ✅ **Optional parameters** - Use any combination
- ✅ **URL-friendly** - Easy to bookmark and share
- ✅ **Standard practice** - Used by all major APIs

---

## 🔍 Query Parameter Parsing

### The URL API Method

Node.js provides the `URL` class for easy query parameter parsing:

```javascript
const urlObj = new URL(req.url, `http://${req.headers.host}`)
console.log(urlObj.searchParams) // URLSearchParams object

// Convert to regular JavaScript object
const queryObj = Object.fromEntries(urlObj.searchParams)
console.log(queryObj) // { country: 'Turkey', isOpenToPublic: 'true' }
```

### Step-by-Step Breakdown:

```javascript
// URL: /api?continent=Europe&isOpenToPublic=true

// Step 1: Create URL object
const urlObj = new URL(req.url, `http://${req.headers.host}`)

// Step 2: Access search parameters  
console.log(urlObj.searchParams)
// URLSearchParams { 'continent' => 'Europe', 'isOpenToPublic' => 'true' }

// Step 3: Convert to object
const queryObj = Object.fromEntries(urlObj.searchParams)
console.log(queryObj)
// { continent: 'Europe', isOpenToPublic: 'true' }
```

### Alternative Parsing Methods:

```javascript
// Manual parsing (not recommended)
const queryString = req.url.split('?')[1] // 'continent=Europe&isOpenToPublic=true'
const pairs = queryString.split('&')      // ['continent=Europe', 'isOpenToPublic=true']

// Using built-in URLSearchParams (recommended)
const params = new URLSearchParams(req.url.split('?')[1])
params.get('continent') // 'Europe'
```

---

## 🎯 Query Parameter Filtering

### Advanced Filtering Implementation

**utils/getDataByQueryParams.js:**
```javascript
export const getDataByQueryParams = (data, queryObj) => {
  // If no query parameters, return all data
  if (Object.keys(queryObj).length === 0) {
    return data
  }
  
  return data.filter(destination => {
    // Check each query parameter
    for (const [key, value] of Object.entries(queryObj)) {
      const destinationValue = destination[key]
      
      // Handle different data types
      if (typeof destinationValue === 'string') {
        if (destinationValue.toLowerCase() !== value.toLowerCase()) {
          return false
        }
      } else if (typeof destinationValue === 'boolean') {
        if (destinationValue.toString() !== value) {
          return false
        }
      } else if (destinationValue != value) {
        return false
      }
    }
    return true
  })
}
```

### Server Integration:

```javascript
const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB()
  
  // Parse query parameters
  const urlObj = new URL(req.url, `http://${req.headers.host}`)
  const queryObj = Object.fromEntries(urlObj.searchParams)
  
  if (req.url === '/api' && req.method === 'GET') {
    // Apply query filtering if parameters exist
    let filteredData = getDataByQueryParams(destinations, queryObj)
    sendJSONResponse(res, 200, filteredData)
  }
})
```

### Example Filtering Scenarios:

```javascript
// URL: /api?continent=Europe
// Returns: All European destinations

// URL: /api?continent=Europe&isOpenToPublic=true  
// Returns: European destinations open to public

// URL: /api?country=France&minRating=4
// Returns: French destinations with rating >= 4
```

---

## 🌐 CORS Implementation

### What is CORS?

**CORS (Cross-Origin Resource Sharing)** solves the problem of **web browsers blocking API requests** from different domains.

### The Problem:
- Your API runs on `http://localhost:8000`
- Your frontend runs on `http://localhost:3000`  
- Browser blocks requests between different origins (security feature)

### The Solution - CORS Headers:

```javascript
const server = http.createServer((req, res) => {
  // Enable CORS for all routes
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.statusCode = 200
    res.end()
    return
  }
  
  // Your regular route handling...
})
```

### Production CORS Setup:

```javascript
// ❌ Development - Allow all origins  
res.setHeader('Access-Control-Allow-Origin', '*')

// ✅ Production - Specific origins only
const allowedOrigins = [
  'https://your-frontend.com',
  'https://admin.your-site.com'
]

const origin = req.headers.origin
if (allowedOrigins.includes(origin)) {
  res.setHeader('Access-Control-Allow-Origin', origin)
}
```

### Why CORS Matters:
- 🌐 **Frontend Integration** - React/Vue/Angular apps can call your API
- 🔒 **Security** - Controlled access to your API
- 📱 **Mobile Apps** - Web-based mobile apps need CORS
- 🧪 **Testing** - API testing tools require CORS headers

---

## 🎁 Final Project Wrap-up

### Complete Server Implementation

Here's your final, production-ready API server:

```javascript
import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js'
import { getDataByPathParams } from './utils/getDataByPathParams.js'
import { getDataByQueryParams } from './utils/getDataByQueryParams.js'

const PORT = process.env.PORT || 8000

const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.statusCode = 200
    res.end()
    return
  }
  
  try {
    const destinations = await getDataFromDB()
    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    const queryObj = Object.fromEntries(urlObj.searchParams)
    
    // Route 1: Get all destinations (with optional query filtering)
    if (req.url === '/api' && req.method === 'GET') {
      const filteredData = getDataByQueryParams(destinations, queryObj)
      sendJSONResponse(res, 200, filteredData)
    }
    
    // Route 2: Filter by continent
    else if (req.url.startsWith('/api/continent') && req.method === 'GET') {
      const continent = req.url.split('/').pop()
      const filteredData = getDataByPathParams(destinations, 'continent', continent)
      sendJSONResponse(res, 200, filteredData)
    }
    
    // Route 3: Filter by country  
    else if (req.url.startsWith('/api/country') && req.method === 'GET') {
      const country = req.url.split('/').pop()
      const filteredData = getDataByPathParams(destinations, 'country', country)
      sendJSONResponse(res, 200, filteredData)
    }
    
    // Route 4: Handle unknown routes
    else {
      sendJSONResponse(res, 404, {
        error: "Route not found",
        message: "The requested endpoint does not exist",
        availableRoutes: [
          "GET /api",
          "GET /api/continent/{continent}",
          "GET /api/country/{country}",
          "GET /api?parameter=value"
        ]
      })
    }
    
  } catch (error) {
    console.error('Server Error:', error)
    sendJSONResponse(res, 500, {
      error: "Internal Server Error",
      message: "Something went wrong on our end"
    })
  }
})

server.listen(PORT, () => {
  console.log(`🌍 Wild Horizons API running on port ${PORT}`)
  console.log(`📖 API Documentation: http://localhost:${PORT}/api`)
})
```

---

## 🧪 Testing Your API

### Manual Testing with cURL:

```bash
# Get all destinations
curl http://localhost:8000/api

# Get European destinations  
curl http://localhost:8000/api/continent/europe

# Get destinations in France
curl http://localhost:8000/api/country/france

# Query parameter filtering
curl "http://localhost:8000/api?continent=Asia&isOpenToPublic=true"

# Test error handling
curl http://localhost:8000/invalid-route
```

### Testing with Postman:
1. Create new request
2. Set method to GET
3. Enter URL: `http://localhost:8000/api`
4. Send request and verify JSON response

### Frontend Integration Example:

```javascript
// React/Vanilla JS example
async function getDestinations() {
  try {
    const response = await fetch('http://localhost:8000/api')
    const destinations = await response.json()
    console.log(destinations)
  } catch (error) {
    console.error('API Error:', error)
  }
}
```

---

## 🚀 What You've Accomplished

### ✅ Skills Mastered:
1. **HTTP Server Creation** - Built from scratch using Node.js core modules
2. **Routing System** - Implemented multiple endpoint patterns  
3. **Data Filtering** - Path parameters and query parameters
4. **JSON APIs** - Proper content-type headers and response formatting
5. **Error Handling** - Graceful 404 and 500 error responses
6. **Code Organization** - Modular, maintainable code structure
7. **CORS Support** - Frontend integration ready
8. **Production Concepts** - Environment variables, error catching

---

## 🎯 Apply These Concepts

### Project Ideas:

**1. E-commerce API:**
```javascript
GET /api/products
GET /api/products/category/electronics  
GET /api/products?price_min=100&brand=Apple
```

**2. Social Media API:**
```javascript
GET /api/posts
GET /api/posts/user/john_doe
GET /api/posts?date_from=2024-01-01&status=published
```

**3. Weather API:**
```javascript
GET /api/weather
GET /api/weather/city/london
GET /api/weather?country=UK&forecast_days=7
```
---

## 📚 Additional Resources

### Official Documentation:
- [Node.js HTTP Module](https://nodejs.org/api/http.html)
- [MDN HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [JSON API Specification](https://jsonapi.org/)

