#  GoldDigger - Full Stack Gold Investment App

A complete Node.js full-stack application for real-time gold investment calculations with live price data.

##  Table of Contents
- [Project Overview](#project-overview)
- [Architecture & Design](#architecture--design)
- [File Structure](#file-structure)
- [Complete Application Flow](#complete-application-flow)
- [Backend Deep Dive](#backend-deep-dive)
- [Frontend Deep Dive](#frontend-deep-dive)
- [API Documentation](#api-documentation)
- [Setup & Installation](#setup--installation)
- [Learning Concepts](#learning-concepts)
- [Troubleshooting](#troubleshooting)

---

##  Project Overview

**What it does:**
- Displays live gold prices in GBP per troy ounce
- Calculates investment amounts (how much gold you can buy)
- Interactive frontend with real-time backend communication
- Professional dialog-based user interface

**Technologies Used:**
- **Backend:** Node.js (ES6 modules), HTTP server
- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **External API:** MetalPriceAPI for live gold prices
- **Architecture:** Modular MVC-style structure

---

## 🏗️ Architecture & Design

### High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │────│   Your Backend  │────│  External API   │
│   (Browser)     │    │   (Node.js)     │    │ (MetalPriceAPI) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Request Flow Pattern
```
User Action → Frontend JS → Your Backend → External API → Backend Processing → Frontend Display
```

### Modular Design Principles
- **Separation of Concerns**: Static files, API logic, and routing are separate
- **Single Responsibility**: Each handler has one job
- **Error Handling**: Graceful fallbacks at every level
- **Security**: API keys stay on server, never exposed to browser

---

##  File Structure

```
gold_digger_solo_project/
├── server.js                 # Main entry point & router
├── package.json              # Dependencies & scripts
├── handlers/
│   ├── staticHandler.js      # Static file serving logic
│   └── apiHandler.js         # API endpoints & gold price logic
└── public/                   # Frontend files
    ├── index.html            # Main webpage
    ├── index.css             # Styling
    ├── index.js              # Frontend JavaScript
    ├── gold.png              # Images
    └── 404.html              # Error page
```

### File Responsibilities

| File | Purpose | Key Functions |
|------|---------|---------------|
| `server.js` | Main router | Route requests, start server |
| `staticHandler.js` | File serving | Map URLs to files, handle MIME types |
| `apiHandler.js` | Business logic | Gold price fetching, investment calculations |
| `index.js` | Frontend logic | API calls, DOM manipulation, user interaction |

---

##  Complete Application Flow

### 1. Application Startup Flow
```
1. User runs: node server.js
2. server.js imports handlers
3. HTTP server starts on port 3000
4. Server listens for requests
5. Console shows: "Server running on http://localhost:3000"
```

### 2. Page Load Flow
```
1. User visits: http://localhost:3000
2. Browser requests: GET /
3. server.js routes to staticHandler.handleStaticFiles()
4. staticHandler returns index.html
5. Browser loads HTML, CSS, and index.js
6. index.js automatically calls loadGoldPrice()
7. loadGoldPrice() fetches from /api/gold-price
8. Real gold price displays on page
```

### 3. Gold Price Display Flow (Detailed)
```
Frontend Request:
┌─────────────────┐
│ loadGoldPrice() │
│ fetch('/api/    │
│ gold-price')    │
└─────────┬───────┘
          │
          ▼
Backend Processing:
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ server.js       │    │ apiHandler.js   │    │ External API    │
│ routes request  │───▶│ handleGoldPrice │───▶│ metalpriceapi   │
│ to handler      │    │ API()           │    │ .com            │
└─────────────────┘    └─────────┬───────┘    └─────────┬───────┘
                                 │                      │
                                 ▼                      │
┌─────────────────┐    ┌─────────────────┐              │
│ fetchRealGold   │◀───│ calls internal  │              │
│ Price()         │    │ function        │              │
└─────────┬───────┘    └─────────────────┘              │
          │                                             │
          ▼                                             │
┌─────────────────┐                                     │
│ Fetch external  │◀────────────────────────────────────┘
│ API with key    │
└─────────┬───────┘
          │
          ▼
Data Processing:
┌─────────────────┐
│ API returns:    │
│ {rates: {XAU:   │
│ 0.0004}}        │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Calculate:      │
│ 1 ÷ 0.0004 =    │
│ 2523.36 GBP     │
└─────────┬───────┘
          │
          ▼
Response Back:
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Return JSON:    │    │ Frontend        │    │ DOM Update:     │
│ {price: 2523.36,│───▶│ receives data   │───▶│ Display         │
│ currency: GBP}  │    │                 │    │ £2523.36        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 4. Investment Calculation Flow (Detailed)
```
User Interaction:
┌─────────────────┐
│ User types £1000│
│ Clicks "Invest  │
│ Now!"           │
└─────────┬───────┘
          │
          ▼
Frontend Processing:
┌─────────────────┐
│ handleInvestment│
│ (e)             │
│ e.preventDefault│
│ ()              │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Get amount from │
│ input field:    │
│ amount = "1000" │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ POST request to │
│ /api/invest     │
│ Body: {amount:  │
│ 1000}           │
└─────────┬───────┘
          │
          ▼
Backend Processing:
┌─────────────────┐    ┌─────────────────┐
│ server.js       │    │ apiHandler.js   │
│ routes POST     │───▶│ handleInvestment│
│ /api/invest     │    │ API()           │
└─────────────────┘    └─────────┬───────┘
                                 │
                                 ▼
┌─────────────────┐    ┌─────────────────┐
│ Parse request   │    │ Get fresh gold  │
│ body: {amount:  │    │ price by calling│
│ 1000}           │    │ fetchRealGold   │
└─────────────────┘    │ Price()         │
                       └─────────┬───────┘
                                 │
                                 ▼
┌─────────────────┐
│ Calculate:      │
│ ounces = 1000 ÷ │
│ 2523.36 =       │
│ 0.396 ounces    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Build response: │
│ {success: true, │
│ ouncesOwned:    │
│ "0.396",        │
│ message: "you   │
│ bought 0.396    │
│ ounces for      │
│ £1000"}         │
└─────────┬───────┘
          │
          ▼
Frontend Display:
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Receive JSON    │    │ Update dialog   │    │ Show dialog     │
│ response        │───▶│ text with       │───▶│ modal to user   │
│                 │    │ message         │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🔧 Backend Deep Dive

### server.js - Main Router
**File Reference:** `server.js`

**Purpose:** Central request router and server starter - acts as the traffic controller for your entire application.

**Core Concepts:**

1. **HTTP Server Creation Theory:**
   - Node.js `http.createServer()` creates a web server that listens for requests
   - Each request triggers a callback function with `req` (request) and `res` (response) objects
   - The server acts as the entry point - all web traffic flows through here first

2. **Routing Strategy:**
   - **URL Parsing:** Uses Node's `URL` constructor to cleanly extract pathname from full URLs
   - **Method-Based Routing:** Different HTTP methods (GET, POST) trigger different logic
   - **Delegation Pattern:** Server doesn't handle business logic - it delegates to specialized handlers
   - **Fallback Logic:** Any unmatched routes fall through to static file serving

3. **Modular Architecture Theory:**
   - **Separation of Concerns:** Routing logic separate from file serving and API logic
   - **Single Responsibility Principle:** Server only decides "where to send this request"
   - **Import Strategy:** ES6 modules allow clean separation of functionality
   - **Scalability:** Easy to add new routes without modifying existing handler code

4. **Request Flow Control:**
   - Every request follows: Receive → Parse → Route → Delegate → Response
   - Server acts as orchestrator, not implementer
   - Error handling bubbles up from handlers to server level

### staticHandler.js - File Server
**File Reference:** `handlers/staticHandler.js`

**Purpose:** Transforms URLs into file system operations - the bridge between web requests and actual files.

**Core Concepts:**

1. **Route Mapping Theory:**
   - **Static Route Table:** Pre-defined mapping of URLs to files prevents directory traversal attacks
   - **Content-Type Strategy:** Each file type needs correct MIME type for browser interpretation
   - **Path Security:** Only serving files explicitly in the route map prevents unauthorized access
   - **File Extension Logic:** Different file types (HTML, CSS, JS, images) need different headers

2. **File System Operations:**
   - **Asynchronous I/O:** Using `fs.readFile()` with callbacks prevents blocking the event loop
   - **Error Handling Strategy:** File not found vs. permission errors vs. disk errors
   - **Memory Management:** Files are read into memory temporarily then sent to browser
   - **Performance Considerations:** Each request reads from disk (no caching in basic version)

3. **HTTP Response Theory:**
   - **Status Codes:** 200 for success, 404 for not found, 500 for server errors
   - **Headers:** Content-Type tells browser how to interpret file data
   - **Response Body:** Actual file content sent as binary data
   - **Response Lifecycle:** StatusCode → Headers → Body → End

4. **Web Server Fundamentals:**
   - **MIME Types:** Browser needs to know if content is HTML, CSS, JavaScript, or image
   - **Static vs Dynamic:** These files don't change based on user or database data
   - **Caching Strategy:** Browsers can cache static files for performance
   - **Security Model:** Only serve files you explicitly allow

### apiHandler.js - Business Logic
**File Reference:** `handlers/apiHandler.js`

**Purpose:** Contains the core business logic - where data transformation and external API integration happens.

**Core Concepts:**

1. **API Endpoint Design Theory:**
   - **RESTful Principles:** GET for data retrieval, POST for data submission
   - **Stateless Design:** Each request contains all information needed to process it
   - **JSON Communication:** Standardized data format for frontend-backend communication
   - **Response Structure:** Consistent JSON schema for all API responses

2. **External API Integration Strategy:**
   - **API Key Security:** Keys stored server-side, never exposed to browser
   - **Rate Limiting Awareness:** External APIs have usage limits and costs
   - **Data Transformation:** Converting external API format to your application's format
   - **Error Resilience:** Graceful degradation when external services fail

3. **Asynchronous Programming Theory:**
   - **Async/Await Pattern:** Modern JavaScript for handling time-dependent operations
   - **Promise Chain Management:** Operations that depend on external network calls
   - **Error Propagation:** How errors flow through async function calls
   - **Concurrent Operations:** When to wait vs when to run operations in parallel

4. **Stream Processing (POST Requests):**
   - **HTTP Body Parsing:** POST data arrives in chunks, must be assembled
   - **Event-Driven Processing:** Using Node.js events (data, end) to handle streams
   - **Memory Management:** Efficiently handling request body data
   - **Data Validation:** Ensuring received data is properly formatted JSON

5. **Mathematical Business Logic:**
   - **Rate Conversion Theory:** Understanding how currency/commodity APIs work
   - **Precision Handling:** Dealing with floating-point numbers in financial calculations
   - **Unit Conversion:** XAU (troy ounces) per GBP vs GBP per XAU inversion
   - **Calculation Accuracy:** Using toFixed() and parseFloat() for consistent precision

6. **Error Handling Architecture:**
   - **Layered Error Strategy:** Network errors, parsing errors, calculation errors
   - **Fallback Mechanisms:** Always have a backup plan for critical functionality
   - **User-Friendly Errors:** Converting technical errors into actionable messages
   - **Logging Strategy:** What to log for debugging vs what to hide from users

---

##  Frontend Deep Dive

### index.html - Structure
**File Reference:** `public/index.html`

**Purpose:** Semantic HTML structure with accessibility and progressive enhancement principles.

**Core Concepts:**

1. **Semantic HTML Theory:**
   - **Document Structure:** Proper use of `main`, `section`, `form` for screen readers and SEO
   - **Content Hierarchy:** H1 for main title, H2 for sections, proper nesting
   - **Accessibility First:** ARIA attributes, proper labels, focus management
   - **Progressive Enhancement:** Core functionality works without JavaScript

2. **Form Design Principles:**
   - **Input Validation:** HTML5 `required` attribute for client-side validation
   - **Label Association:** Proper `for` attributes linking labels to inputs
   - **User Experience:** Placeholder text and clear call-to-action buttons
   - **Accessibility:** Screen reader friendly form structure

3. **Modern HTML5 Features:**
   - **Dialog Element:** Native modal functionality without JavaScript libraries
   - **Semantic Elements:** Clear content structure for both humans and machines
   - **ARIA Live Regions:** Dynamic content updates announced to screen readers
   - **Mobile Viewport:** Responsive design meta tag for mobile devices

4. **Component Architecture:**
   - **Price Display Component:** Live-updating price with connection status
   - **Investment Form Component:** Input validation and submission handling
   - **Result Modal Component:** Accessible dialog for displaying results
   - **State Management:** Visual feedback for connection status and loading states

### index.js - Frontend Logic
**File Reference:** `public/index.js`

**Purpose:** Handles user interactions and API communication - the brain of the frontend application.

**Core Concepts:**

1. **DOM Manipulation Theory:**
   - **Element Selection Strategy:** Using `getElementById()` and `querySelector()` effectively
   - **Content Update Patterns:** `textContent` vs `innerHTML` for security and performance
   - **Event-Driven Architecture:** How user actions trigger JavaScript functions
   - **State Management:** Keeping UI in sync with application data

2. **Fetch API Principles:**
   - **HTTP Client Theory:** Browser's built-in way to make network requests
   - **Promise-Based Architecture:** Modern async programming with fetch()
   - **Request Configuration:** Setting method, headers, and body for different API calls
   - **Response Processing:** Converting HTTP responses to usable JavaScript data

3. **Form Handling Strategy:**
   - **Event Prevention:** `preventDefault()` stops default browser form submission
   - **Data Extraction:** Getting user input from form fields safely
   - **Validation Strategy:** Client-side validation vs server-side validation
   - **User Feedback:** Providing immediate response to user actions

4. **Error Handling Philosophy:**
   - **Progressive Degradation:** App still works when network fails
   - **User Experience:** Converting technical errors into user-friendly messages
   - **Debug Information:** Console logging for developers vs user messages
   - **Recovery Strategies:** How to handle and recover from different error types

5. **Async Programming Patterns:**
   - **Event Loop Understanding:** How JavaScript handles multiple async operations
   - **Promise Chain Management:** Handling sequential async operations
   - **Error Propagation:** How errors flow through async function calls
   - **Loading States:** Managing UI during async operations

6. **Browser API Integration:**
   - **Dialog API:** Using native browser modals with `showModal()` and `close()`
   - **Event Listeners:** Connecting user interactions to application logic
   - **Module Loading:** ES6 modules in the browser environment
   - **Browser Compatibility:** Understanding what features work where

---

## 📡 API Documentation

### GET /api/gold-price
**Purpose:** Get current gold price in GBP per troy ounce

**Request:**
```
GET /api/gold-price
```

**Response:**
```json
{
    "price": 2523.36,
    "currency": "GBP",
    "unit": "per troy ounce",
    "timestamp": "2025-08-08T12:34:56.789Z"
}
```

**Error Handling:**
- Network failure → Returns fallback price (2345.89)
- API rate limit → Returns fallback price
- Invalid API response → Returns fallback price

### POST /api/invest
**Purpose:** Calculate investment and gold purchase amount

**Request:**
```
POST /api/invest
Content-Type: application/json

{
    "amount": 1000
}
```

**Response:**
```json
{
    "success": true,
    "investmentAmount": 1000,
    "pricePerOunce": 2523.36,
    "ouncesOwned": "0.396",
    "message": "you bought 0.396 ounces for £1000"
}
```

**Error Response:**
```
HTTP 400 Bad Request
invalid data
```

**Error Conditions:**
- Invalid JSON in request body
- Missing amount field
- Non-numeric amount
- Network error during price fetch

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (version 18+ recommended for built-in fetch)
- npm (comes with Node.js)
- Text editor (VS Code recommended)
- Web browser (Chrome/Firefox/Edge)

### Step-by-Step Setup

1. **Create Project Directory**
   ```bash
   mkdir gold_digger_solo_project
   cd gold_digger_solo_project
   ```

2. **Initialize Node.js Project**
   ```bash
   npm init -y
   ```

3. **Install Dependencies**
   ```bash
   npm install node-fetch
   ```

4. **Configure ES6 Modules**
   ```bash
   # Add to package.json:
   "type": "module"
   ```

5. **Create File Structure**
   ```
   mkdir handlers public
   touch server.js
   touch handlers/staticHandler.js handlers/apiHandler.js
   touch public/index.html public/index.css public/index.js
   ```

6. **Get API Key**
   - Visit: https://metalpriceapi.com/
   - Sign up for free account
   - Copy your API key
   - Add to `handlers/apiHandler.js`

7. **Run the Application**
   ```bash
   node server.js
   ```

8. **Test in Browser**
   - Open: http://localhost:3000
   - Verify gold price loads
   - Test investment calculation

### Environment Variables (Optional Enhancement)
```bash
# Create .env file
echo "METALPRICE_API_KEY=your_api_key_here" > .env
```

---

## 🎓 Learning Concepts

### Backend Concepts Covered

1. **HTTP Server Creation**
   - Creating server with Node.js `http` module
   - Request and response objects
   - Status codes and headers

2. **Routing**
   - URL parsing and pathname extraction
   - Method-based routing (GET vs POST)
   - Request delegation to handlers

3. **File System Operations**
   - Reading files asynchronously
   - Path manipulation and joining
   - MIME type handling

4. **API Integration**
   - Making HTTP requests from server
   - JSON parsing and manipulation
   - Error handling for external services

5. **Async Programming**
   - Promises and async/await
   - Error handling with try-catch
   - Sequential vs parallel operations

6. **Stream Processing**
   - Handling POST request bodies
   - Event-driven data collection
   - Buffer to string conversion

7. **Modular Architecture**
   - ES6 module imports/exports
   - Separation of concerns
   - Function composition

### Frontend Concepts Covered

1. **DOM Manipulation**
   - Element selection and modification
   - Event listener attachment
   - Dynamic content updates

2. **Fetch API**
   - GET and POST requests
   - JSON serialization/deserialization
   - Promise handling

3. **Form Handling**
   - Preventing default form submission
   - Input value extraction
   - Form validation

4. **Modern HTML5**
   - Semantic elements
   - Dialog element for modals
   - Accessibility attributes

5. **Event-Driven Programming**
   - User interaction handling
   - Asynchronous event processing
   - Error feedback to users

### Full-Stack Integration Concepts

1. **Client-Server Communication**
   - HTTP protocol understanding
   - Request/response lifecycle
   - Status code meanings

2. **Data Flow**
   - Frontend → Backend → External API flow
   - Error propagation through layers
   - State management across tiers

3. **Security Considerations**
   - API key protection (server-side only)
   - Input validation and sanitization
   - Error message safety

4. **Performance Optimization**
   - Caching strategies (fallback values)
   - Error recovery mechanisms
   - Async operation efficiency

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. "Cannot find module" Error
**Problem:** ES6 import/export not working
```bash
Error: Cannot use import statement outside a module
```
**Solution:** Add `"type": "module"` to `package.json`

#### 2. "fetch is not defined" (Node.js < 18)
**Problem:** fetch not available in older Node versions
**Solution:** Install and import node-fetch:
```bash
npm install node-fetch
```
```javascript
import fetch from "node-fetch";
```

#### 3. Gold Price Always Shows Fallback
**Problem:** External API not responding or rate limited
**Debug Steps:**
1. Check console for API error messages
2. Verify API key is correct
3. Check internet connection
4. Try accessing API URL directly in browser

#### 4. Investment Form Not Working
**Problem:** Form submits but nothing happens
**Debug Steps:**
1. Check browser console for JavaScript errors
2. Verify event listeners are attached
3. Check network tab for failed API calls
4. Ensure server is running

#### 5. Static Files Not Loading
**Problem:** CSS/JS/images not displaying
**Debug Steps:**
1. Check file paths are correct
2. Verify files exist in public/ directory
3. Check MIME types in staticHandler.js
4. Look for 404 errors in browser network tab

#### 6. CORS Errors (if extending)
**Problem:** Browser blocks requests from different origins
**Solution:** Add CORS headers in server responses:
```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
```

### Development Tips

1. **Use Browser DevTools**
   - Console tab for JavaScript errors
   - Network tab for API call inspection
   - Elements tab for DOM inspection

2. **Add Debug Logging**
   ```javascript
   console.log('API Response:', data);
   console.log('Calculated price:', priceInGBP);
   ```

3. **Test APIs Separately**
   - Use Postman or curl to test backend APIs
   - Verify responses before connecting frontend

4. **Check File Permissions**
   - Ensure public/ files are readable
   - Verify Node.js has file system access

### Performance Monitoring

**Add Response Time Logging:**
```javascript
// In server.js
const startTime = Date.now();
// ... handle request ...
console.log(`Request processed in ${Date.now() - startTime}ms`);
```

**Monitor API Call Frequency:**
```javascript
// Add caching to reduce API calls
let lastPriceUpdate = 0;
let cachedPrice = null;

if (Date.now() - lastPriceUpdate > 60000) { // 1 minute cache
    cachedPrice = await fetchRealGoldPrice();
    lastPriceUpdate = Date.now();
}
return cachedPrice;
```

---

##  Future Enhancements

### Beginner Level
1. **Price Refresh Button** - Manual price updates
2. **Investment History** - Store calculations in array
3. **Different Currencies** - USD, EUR support
4. **Loading Indicators** - Show spinner during API calls

### Intermediate Level
1. **Database Integration** - SQLite for persistent storage
2. **User Authentication** - Login/register system
3. **Portfolio Tracking** - Multiple investments
4. **Price Charts** - Historical price visualization

### Advanced Level
1. **Real-time Updates** - WebSocket price streaming
2. **Microservices** - Split into multiple services
3. **Caching Layer** - Redis for performance
4. **Deploy to Cloud** - AWS/Heroku deployment

---

##  Additional Resources

### Documentation
- [Node.js Official Docs](https://nodejs.org/docs/)
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [HTML Dialog Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)

### Learning Path
1. **JavaScript Fundamentals** - Async/await, Promises, DOM
2. **Node.js Basics** - HTTP module, File system, Modules
3. **API Design** - REST principles, Status codes, JSON
4. **Error Handling** - Try-catch, Graceful degradation
5. **Security** - Input validation, API key management

---

##  Conclusion

This project demonstrates a complete full-stack application with:
- **Modular Architecture** for maintainability
- **Real-world API Integration** for live data
- **Professional Error Handling** for reliability
- **Modern JavaScript** with ES6+ features
- **Responsive User Interface** with semantic HTML

The step-by-step learning approach ensures understanding of each component and how they work together to create a professional web application.

**Key Takeaways:**
- Backend and frontend are separate but connected layers
- APIs are the bridge between your app and external services
- Error handling is crucial at every level
- Modular code is easier to maintain and extend
- Real-world applications require robust architecture

---


