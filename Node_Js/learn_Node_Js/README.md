# Full-Stack Node.js Application Tutorial

Build a complete full-stack Node.js application with static file serving, REST API, file I/O operations, input sanitization, EventEmitters, and Server-Sent Events.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Project Features](#project-features)
- [Learning Path with Time Estimates](#learning-path-with-time-estimates)
- [Installation & Setup](#installation--setup)
- [Project Structure Guide](#project-structure-guide)
- [Step-by-Step Guide](#step-by-step-guide)
- [Best Practices](#best-practices)
- [Debugging Workshop](#debugging-workshop)
- [Additional Resources](#additional-resources)

## Overview

This tutorial will guide you through building a full-stack Node.js application that demonstrates core server-side concepts. By the end, you'll have a working application with real-time features and understand how modern web servers work under the hood.

**What You'll Build:**
- A web server that can handle multiple users
- A REST API for data management
- Real-time updates using Server-Sent Events
- Secure input handling to prevent attacks

## Prerequisites

**Essential Knowledge:**
- Basic JavaScript (variables, functions, promises)
- Understanding of what a web server does
- Familiarity with JSON format

**Required Software:**
- Node.js v20+ installed
- A code editor (VS Code recommended)
- Terminal/Command Prompt access

## Project Features

Our application includes:
- ✅ HTTP server setup and configuration
- ✅ Static file serving (HTML, CSS, JS)  
- ✅ RESTful API endpoints
- ✅ JSON data persistence
- ✅ Input validation and sanitization
- ✅ Real-time updates via Server-Sent Events
- ✅ Event-driven architecture with EventEmitters

## Learning Path with Time Estimates

### Phase 1: Foundation (45 minutes)
- ⏱️ **Project Setup** (10 minutes)
- ⏱️ **Basic HTTP Server** (10 minutes)
- ⏱️ **Understanding Response Methods** (8 minutes)
- ⏱️ **Working with Paths** (12 minutes)
- ⏱️ **File System Basics** (15 minutes)

### Phase 2: Static Assets (60 minutes)
- ⏱️ **Serving HTML Files** (20 minutes)
- ⏱️ **Multiple File Types** (15 minutes)
- ⏱️ **Path Resolution** (15 minutes)
- ⏱️ **Error Handling** (10 minutes)

### Phase 3: API Development (90 minutes)
- ⏱️ **Reading JSON Data** (20 minutes)
- ⏱️ **GET Endpoints** (25 minutes)
- ⏱️ **POST Endpoints** (30 minutes)
- ⏱️ **Input Sanitization** (15 minutes)

### Phase 4: Advanced Features (75 minutes)
- ⏱️ **EventEmitters** (30 minutes)
- ⏱️ **Server-Sent Events** (35 minutes)
- ⏱️ **Integration & Testing** (10 minutes)

## Installation & Setup

### Step 1: Initialize Your Project
```bash
mkdir fullstack-node-app
cd fullstack-node-app
npm init -y
```

### Step 2: Install Dependencies
```bash
npm install sanitize-html
```

### Step 3: Enable ES Modules
Add this to your `package.json`:
```json
{
  "type": "module"
}
```

### Step 4: Create Project Structure
```bash
mkdir public data utils handlers
touch server.js
```

## 📁 Project Structure Guide

```
📦 fullstack-node-app/
├── 🎯 server.js          # Your main entry point - START HERE  
├── 📋 package.json       # Project configuration
├── 📁 public/           # 🌐 Files browsers can access directly
│   ├── index.html       # Main webpage users see
│   ├── styles.css       # Website styling  
│   └── script.js        # Frontend JavaScript code
├── 📁 data/             # 💾 Your app's data storage
│   └── data.json        # Stores user submissions & app data
├── 📁 utils/            # 🛠️ Helper functions (reusable code)
│   ├── serveStatic.js   # Handles sending HTML/CSS/JS to browsers
│   ├── sendResponse.js  # Formats all server responses consistently
│   ├── getData.js       # Reads data from JSON files
│   └── sanitizeInput.js # Protects against malicious input
└── 📁 handlers/         # 🎯 Route logic (what happens for each URL)
    └── routeHandler.js  # Contains API endpoint logic
```

## Step-by-Step Guide

### Phase 1: Foundation

#### ✅ Checkpoint 1: Basic HTTP Server (10 minutes)

Let's start with the most basic web server possible:

```javascript
// server.js
import http from 'node:http'

const PORT = 8000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end('<html><h1>The server is working!</h1></html>')
})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))
```

**🔍 What's happening here?**
- `http.createServer()` creates a new web server
- Every time someone visits your website, the callback function runs
- `res` (response) is how you send data back to the user's browser
- `req` (request) contains information about what the user wants

**💡 Student Success Tip:** *"Think of your server like a restaurant. When a customer (browser) places an order (request), the kitchen (your server) prepares and serves food (response)."*

**Run your server:**
```bash
node server.js
```

**Expected output:**
```
Connected on port: 8000
```

**✅ You should now have:**
- [ ] A running server on port 8000
- [ ] "The server is working!" message when you visit `http://localhost:8000`
- [ ] Understanding of request/response cycle

**🚨 Common Pitfall:** If you see "port already in use," another program is using port 8000. Try changing `PORT` to 3000 or 8080.

---

#### ✅ Checkpoint 2: Understanding Response Methods (8 minutes)

Node.js gives you two ways to send headers. Let's understand both:

**Method 1: Separate calls (More flexible)**
```javascript
res.statusCode = 200
res.setHeader('Content-Type', 'text/html')
res.end(content)
```

**Method 2: writeHead() (More concise)**
```javascript
res.writeHead(200, {'Content-Type': 'text/html'})
res.end(content)
```

**🔍 Key Difference:**
- `writeHead()` locks in your headers - you can't change them after
- `setHeader()` allows modifications until you call `end()`

**🎯 When to use each:**
- Use `writeHead()` when you know exactly what headers you need
- Use `setHeader()` when you might need to modify headers based on conditions

**💡 Real-world example:** You might start with basic headers, then add security headers based on the user's request type.

---

#### ✅ Checkpoint 3: Working with Paths (12 minutes)

Understanding file paths is crucial for serving files correctly:

**Global Variables in Node.js:**
```javascript
// Modern ES Modules (Node v20+) - Use this!
const __dirname = import.meta.dirname

// Legacy ES Modules (before v20) - Only if you must
import path from 'node:path'
import url from 'node:url'
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
```

**🔍 What is `__dirname`?**
- It's the folder where your current JavaScript file lives
- Essential for finding other files in your project
- Prevents "file not found" errors when your app runs from different locations

**Path Types:**
```javascript
import path from 'node:path'

// Absolute path - Complete address from computer's root
const absPath = path.join(__dirname, 'public', 'index.html')
// Result: /Users/yourname/projects/fullstack-node-app/public/index.html

// Relative path - Address from current location  
const relPath = path.join('public', 'index.html')
// Result: public/index.html
```

**🎯 Why use `path.join()`?**
- Works on Windows (`\`) and Mac/Linux (`/`) 
- Prevents double slashes in paths
- Handles edge cases automatically

**🚨 Common Mistake:**
```javascript
// ❌ Don't do this - breaks on different operating systems
const badPath = __dirname + '/public/' + fileName

// ✅ Always use path.join()
const goodPath = path.join(__dirname, 'public', fileName)
```

**Test your understanding:**
```javascript
// utils/serveStatic.js
import path from 'node:path'

export function serveStatic(baseDir) {
    const filePath = path.join(baseDir, 'public', 'index.html')
    console.log('File will be served from:', filePath)
}
```

**Expected console output:**
```
File will be served from: /your/project/path/fullstack-node-app/public/index.html
```

---

#### ✅ Checkpoint 4: File System Basics (15 minutes)

The `fs` (File System) module lets your server read and write files:

**📚 Core FS Methods:**
- `readFile()` - Read files from disk
- `writeFile()` - Create or completely replace files
- `appendFile()` - Add content to existing files  
- `unlink()` - Delete files

**🔄 Sync vs Async - The Critical Choice:**

```javascript
import fs from 'node:fs'
import fsPromises from 'node:fs/promises'

// ❌ Synchronous - BLOCKS your entire server
const content = fs.readFileSync(filePath, 'utf8')

// ❌ Callback style - Leads to "callback hell"  
fs.readFile(filePath, 'utf8', (err, content) => {
    // Handle result here
})

// ✅ Promises - Modern, clean, non-blocking
const content = await fsPromises.readFile(filePath, 'utf8')
```

**🔍 Why avoid sync methods?**
Imagine your server as a restaurant kitchen:
- **Sync**: The entire kitchen stops while one chef reads a recipe
- **Async**: Chefs can work on multiple orders simultaneously

**File Encoding Explained:**
```javascript
// With 'utf8' encoding - Returns readable text
const textContent = await fs.readFile(filePath, 'utf8')
console.log(textContent) // "<html><body>Hello</body></html>"

// Without encoding - Returns raw bytes (Buffer)
const binaryContent = await fs.readFile(filePath)
console.log(binaryContent) // <Buffer 3c 68 74 6d 6c 3e 3c 62...>
```

**🎯 When to use each:**
- Use `'utf8'` for text files (HTML, CSS, JS, JSON)
- Use no encoding for binary files (images, PDFs, videos)

**Create a utility for consistent responses:**
```javascript
// utils/sendResponse.js
export function sendResponse(res, statusCode, contentType, payload) {
    res.statusCode = statusCode
    res.setHeader('Content-Type', contentType)
    res.end(payload)
}
```

**🔍 Why create utilities?**
- **DRY Principle**: Don't Repeat Yourself
- **Consistency**: All responses formatted the same way
- **Maintainability**: Change response format in one place

---

### Phase 2: Static Assets

#### ✅ Checkpoint 5: Serving HTML Files (20 minutes)

Now let's serve real HTML files instead of hardcoded strings:

```javascript
// utils/serveStatic.js
import path from 'node:path'
import fs from 'node:fs/promises'
import { sendResponse } from './sendResponse.js'

export async function serveStatic(req, res, baseDir) {
    const filePath = path.join(baseDir, 'public', 'index.html')
    
    try {
        const content = await fs.readFile(filePath)
        sendResponse(res, 200, 'text/html', content)
    } catch (err) {
        console.error('Error reading file:', err)
        sendResponse(res, 404, 'text/html', '<h1>File Not Found</h1>')
    }
}
```

**🔍 Breaking down the flow:**
1. **Build file path** using `path.join()` for safety
2. **Try to read** the file asynchronously  
3. **If successful**: Send file content to browser
4. **If error**: Send 404 error page

**🎯 Error Handling Pattern:**
Always wrap file operations in try-catch blocks. File operations can fail for many reasons:
- File doesn't exist
- Permission denied
- Disk full
- Network issues (if file is on network drive)

**Update your main server:**
```javascript
// server.js
import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'

const PORT = 8000
const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {
    await serveStatic(req, res, __dirname)
})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))
```

**Create a simple HTML file to test:**
```html
<!-- public/index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>My Node.js App</title>
</head>
<body>
    <h1>Welcome to My Full-Stack App!</h1>
    <p>This HTML is served by Node.js</p>
</body>
</html>
```

**✅ You should now have:**
- [ ] HTML file served from disk instead of hardcoded string
- [ ] Proper error handling for missing files
- [ ] Understanding of async file operations

**🎯 Quick Test:** Try renaming `index.html` temporarily and refresh your browser. You should see the 404 error message.

---

#### ✅ Checkpoint 6: Multiple File Types (15 minutes)

Real websites need CSS, JavaScript, images, etc. Let's handle multiple file types:

```javascript
// Enhanced utils/serveStatic.js
export async function serveStatic(req, res, baseDir) {
    const publicDir = path.join(baseDir, 'public')
    const pathToResource = path.join(
        publicDir, 
        req.url === '/' ? 'index.html' : req.url
    )
    
    // Get file extension to determine content type
    const ext = path.extname(pathToResource)
    
    const contentTypes = {
        '.html': 'text/html',
        '.css': 'text/css', 
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.ico': 'image/x-icon'
    }
    
    const contentType = contentTypes[ext] || 'text/plain'
    
    try {
        const content = await fs.readFile(pathToResource)
        sendResponse(res, 200, contentType, content)
    } catch (err) {
        sendResponse(res, 404, 'text/html', '<h1>404 - File Not Found</h1>')
    }
}
```

**🔍 Key improvements:**
1. **Dynamic path resolution**: `req.url` tells us what file the user wants
2. **Extension detection**: `path.extname()` gets the file type (`.html`, `.css`, etc.)
3. **Content-Type mapping**: Browsers need to know what type of file they're receiving
4. **Fallback handling**: Unknown file types get `text/plain`

**🎯 How URL mapping works:**
```
User visits:           Server looks for:
/                  →   public/index.html
/styles.css        →   public/styles.css  
/script.js         →   public/script.js
/images/logo.png   →   public/images/logo.png
```

**Test with a CSS file:**
```css
/* public/styles.css */
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 40px;
}

h1 {
    color: #333;
    border-bottom: 2px solid #007acc;
}
```

**Update your HTML to use the CSS:**
```html
<!-- public/index.html -->
<head>
    <title>My Node.js App</title>
    <link rel="stylesheet" href="/styles.css">
</head>
```

**✅ You should now have:**
- [ ] CSS file loading and styling your page
- [ ] Understanding of content-type headers
- [ ] URL to file path mapping working

---

### Phase 3: API Development

#### ✅ Checkpoint 7: Reading JSON Data (20 minutes)

APIs work with data. Let's create a data layer:

```javascript
// utils/getData.js
import path from 'node:path'
import fs from 'node:fs/promises'

export async function getData() {
    try {
        const pathJSON = path.join('data', 'data.json')
        const data = await fs.readFile(pathJSON, 'utf8')
        const parsedData = JSON.parse(data)
        return parsedData
    } catch (err) {
        console.error('Error reading data:', err)
        return []  // Return empty array if file doesn't exist
    }
}
```

**🔍 The data flow:**
1. **Build path** to JSON file
2. **Read file** as UTF-8 text (JSON is always text)
3. **Parse JSON** string into JavaScript objects/arrays
4. **Return data** or empty array if error

**Create sample data:**
```json
[
    {
        "id": 1,
        "title": "First Sighting",
        "location": "Central Park",
        "description": "Amazing wildlife spotted!",
        "timestamp": "2025-01-08T10:30:00.000Z"
    },
    {
        "id": 2, 
        "title": "Mountain Adventure",
        "location": "Rocky Mountains",
        "description": "Incredible views from the summit",
        "timestamp": "2025-01-07T15:45:00.000Z"
    }
]
```

**🎯 Why return empty array on error?**
- **Fail gracefully**: App continues working even if data file is missing
- **Consistent interface**: Always returns an array, never undefined
- **Better user experience**: Shows empty list instead of crashing

**Test your data function:**
```javascript
// Quick test (add to bottom of getData.js temporarily)
const testData = await getData()
console.log('Loaded data:', testData.length, 'items')
```

---

#### ✅ Checkpoint 8: GET API Endpoints (25 minutes)

Create your first REST API endpoint:

```javascript
// handlers/routeHandler.js
import { getData } from '../utils/getData.js'
import { sendResponse } from '../utils/sendResponse.js'

export async function handleGet(res) {
    const data = await getData()
    const content = JSON.stringify(data)
    sendResponse(res, 200, 'application/json', content)
}
```

**🔍 API endpoint breakdown:**
1. **Get data** from your JSON file
2. **Convert to JSON string** (browsers expect strings, not objects)
3. **Send with correct content-type** (`application/json`)
4. **Status 200** means "success"

**Add routing to your server:**
```javascript
// Enhanced server.js
import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import { handleGet } from './handlers/routeHandler.js'

const PORT = 8000
const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {
    const { method, url } = req
    
    // API routing
    if (url === '/api/data' && method === 'GET') {
        await handleGet(res)
    } else {
        // Serve static files for everything else
        await serveStatic(req, res, __dirname)
    }
})

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
```

**🎯 URL Routing Pattern:**
```
GET /api/data     → handleGet()     → Return JSON data
GET /            → serveStatic()    → Return index.html  
GET /styles.css   → serveStatic()    → Return CSS file
```

**Test your API:**
```bash
# In terminal
curl http://localhost:8000/api/data

# Or visit in browser
# http://localhost:8000/api/data
```

**Expected response:**
```json
[{"id":1,"title":"First Sighting",...}, {...}]
```

**✅ You should now have:**
- [ ] Working GET API endpoint
- [ ] JSON data returned properly
- [ ] Understanding of routing pattern

**💡 Student Success Tip:** *"APIs are like asking specific questions. GET /api/data means 'give me all the data.' Later we'll add POST to say 'here's new data to save.'"*

---

#### ✅ Checkpoint 9: POST Endpoints (30 minutes)

Let users add data to your application:

**Step 1: Parse incoming JSON**
```javascript
// utils/parseJSONBody.js
export async function parseJSONBody(req) {
    let body = ''
    
    // Collect incoming data chunks
    for await (const chunk of req) {
        body += chunk
    }
    
    try {
        return JSON.parse(body)
    } catch (err) {
        throw new Error(`Invalid JSON format: ${err.message}`)
    }
}
```

**🔍 Why chunks?**
HTTP requests can be large, so they arrive in small pieces (chunks). We collect all chunks before parsing the complete JSON.

**Step 2: Add new data to existing data**
```javascript
// utils/addNewSighting.js
import path from 'node:path'
import fs from 'node:fs/promises'
import { getData } from './getData.js'

export async function addNewSighting(newSighting) {
    try {
        // Get existing data
        const sightings = await getData()
        
        // Add metadata to new entry
        newSighting.id = Date.now() // Simple unique ID
        newSighting.timestamp = new Date().toISOString()
        
        // Add to existing data
        sightings.push(newSighting)
        
        // Save back to file with pretty formatting
        const pathJSON = path.join('data', 'data.json')
        await fs.writeFile(
            pathJSON,
            JSON.stringify(sightings, null, 2), // null, 2 = pretty formatting
            'utf8'
        )
        
        return newSighting
    } catch (err) {
        throw new Error(`Failed to add new sighting: ${err.message}`)
    }
}
```

**Step 3: Handle POST requests**
```javascript
// Enhanced handlers/routeHandler.js
import { parseJSONBody } from '../utils/parseJSONBody.js'
import { addNewSighting } from '../utils/addNewSighting.js'

export async function handlePost(req, res) {
    try {
        const parsedBody = await parseJSONBody(req)
        const newSighting = await addNewSighting(parsedBody)
        sendResponse(res, 201, 'application/json', JSON.stringify(newSighting))
    } catch (err) {
        console.error('POST error:', err)
        sendResponse(res, 400, 'application/json', JSON.stringify({
            error: err.message
        }))
    }
}
```

**🔍 HTTP Status codes:**
- **200**: GET success
- **201**: POST success (created new resource)
- **400**: Client error (bad request format)
- **500**: Server error (our code broke)

**Update server routing:**
```javascript
// Add to server.js routing
if (url === '/api/data' && method === 'GET') {
    await handleGet(res)
} else if (url === '/api/data' && method === 'POST') {
    await handlePost(req, res)
} else {
    await serveStatic(req, res, __dirname)
}
```

**Test your POST endpoint:**
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Entry","location":"My Room","description":"Testing the API"}' \
  http://localhost:8000/api/data
```

**✅ You should now have:**
- [ ] Working POST endpoint
- [ ] Data persisted to JSON file
- [ ] Proper error handling for invalid input
- [ ] Auto-generated IDs and timestamps

---

#### ✅ Checkpoint 10: Input Sanitization (15 minutes)

Protect your application from malicious input:

**🚨 What is XSS (Cross-Site Scripting)?**
Attackers inject malicious code into your website:
```javascript
// Malicious input
{
    "title": "<script>alert('Your site is hacked!')</script>",
    "description": "<img src=x onerror='document.location=\"evil-site.com\"'>"
}
```

If you display this data without sanitization, the malicious code executes in users' browsers!

**Install protection:**
```bash
npm install sanitize-html
```

**Create sanitization utility:**
```javascript
// utils/sanitizeInput.js
import sanitizeHtml from 'sanitize-html'

export function sanitizeInput(data) {
    const sanitizedData = {}
    
    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
            // Allow only safe HTML tags, remove everything else
            sanitizedData[key] = sanitizeHtml(value, {
                allowedTags: ['b', 'i', 'em', 'strong', 'p'],
                allowedAttributes: {}
            })
        } else {
            sanitizedData[key] = value
        }
    }
    
    return sanitizedData
}
```

**🔍 Sanitization examples:**
```javascript
sanitizeHtml('<h1>Safe title</h1>')                    // → "Safe title"
sanitizeHtml('<script>alert("hack")</script>')         // → "" (removed)
sanitizeHtml('<strong>Bold text</strong>')             // → "<strong>Bold text</strong>"
sanitizeHtml('<p>Paragraph with <em>emphasis</em></p>') // → "<p>Paragraph with <em>emphasis</em></p>"
```

**Apply sanitization to POST handler:**
```javascript
// Enhanced handlePost
export async function handlePost(req, res) {
    try {
        const parsedBody = await parseJSONBody(req)
        const sanitizedBody = sanitizeInput(parsedBody) // Add this line
        const newSighting = await addNewSighting(sanitizedBody)
        sendResponse(res, 201, 'application/json', JSON.stringify(newSighting))
    } catch (err) {
        console.error('POST error:', err)
        sendResponse(res, 400, 'application/json', JSON.stringify({
            error: err.message
        }))
    }
}
```

**🛡️ Security layers in your app:**
1. **Input sanitization** - Remove dangerous HTML/JavaScript
2. **JSON parsing validation** - Reject malformed data
3. **Error handling** - Don't expose internal details
4. **Content-Type headers** - Help browsers handle content safely

**Test sanitization:**
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"title":"<script>alert(\"hack\")</script>Safe Title","description":"Normal description"}' \
  http://localhost:8000/api/data
```

You should see the script tag removed but "Safe Title" preserved.

---

### Phase 4: Advanced Features

#### ✅ Checkpoint 11: EventEmitters (30 minutes)

EventEmitters enable decoupled, event-driven architecture:

**🔍 Real-world analogy:**
EventEmitters work like notifications on your phone:
1. Something happens (event occurs)
2. Your phone reacts (listener function runs)  
3. Multiple apps can react to the same event differently

**Basic EventEmitter example:**
```javascript
// Basic example for understanding
import { EventEmitter } from 'node:events'

const customerDetails = {
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890'
}

// Create the emitter (like a notification center)
const emailRequestEmitter = new EventEmitter()

// Define what happens when event occurs (listener function)  
function generateEmail(customer) {
    console.log(`📧 Email generated for ${customer.email}`)
    console.log(`Subject: Welcome ${customer.fullName}!`)
}

function logActivity(customer) {
    console.log(`📝 Activity logged for ${customer.fullName}`)
}

// Register listeners (subscribe to notifications)
emailRequestEmitter.on('emailRequest', generateEmail)
emailRequestEmitter.on('emailRequest', logActivity)

// Emit the event (trigger the notification)
setTimeout(() => {
    emailRequestEmitter.emit('emailRequest', customerDetails)
}, 2000)
```

**🔍 Key EventEmitter concepts:**
- **Emitter**: The object that sends notifications
- **Event**: A named notification (like 'emailRequest')
- **Listener**: Function that runs when event occurs
- **Emit**: Trigger the event
- **Multiple listeners**: One event can trigger many functions

**Practical application in your project:**
```javascript
// utils/notificationEmitter.js
import { EventEmitter } from 'node:events'

export const appEmitter = new EventEmitter()

// Set up listeners for different events
appEmitter.on('newSighting', (sighting) => {
    console.log(`🔔 New sighting added: "${sighting.title}" at ${sighting.location}`)
})

appEmitter.on('dataUpdate', (data) => {
    console.log('📊 Data has been updated, notifying connected clients...')
    // Later: trigger Server-Sent Events here
})

appEmitter.on('userError', (error) => {
    console.log(`⚠️ User error occurred: ${error.message}`)
})
```

**Integrate with your POST handler:**
```javascript
// Enhanced handlers/routeHandler.js
import { appEmitter } from '../utils/notificationEmitter.js'

export async function handlePost(req, res) {
    try {
        const parsedBody = await parseJSONBody(req)
        const sanitizedBody = sanitizeInput(parsedBody)
        const newSighting = await addNewSighting(sanitizedBody)
        
        // Emit events for other parts of your app
        appEmitter.emit('newSighting', newSighting)
        appEmitter.emit('dataUpdate', await getData())
        
        sendResponse(res, 201, 'application/json', JSON.stringify(newSighting))
    } catch (err) {
        appEmitter.emit('userError', err)
        sendResponse(res, 400, 'application/json', JSON.stringify({
            error: err.message
        }))
    }
}
```

**🎯 Why use EventEmitters?**
- **Decoupling**: POST handler doesn't need to know about logging, emails, etc.
- **Flexibility**: Easy to add new reactions to events
- **Maintainability**: Each feature stays in its own module
- **Scalability**: Can add/remove listeners without changing emitting code

**✅ Test the EventEmitter:**
1. Add a new sighting via POST request
2. Check your server console - you should see notification messages

---

#### ✅ Checkpoint 12: Server-Sent Events (35 minutes)

Enable real-time communication from server to client:

**🔍 What are Server-Sent Events?**
SSE allows your server to push updates to browsers automatically:
- **Use cases**: Live notifications, chat messages, stock prices, sports scores
- **One-way communication**: Server → Client only
- **Automatic reconnection**: Browser handles connection drops
- **Simple implementation**: Built into browsers, no extra libraries needed

**🎯 SSE vs WebSockets:**
- **SSE**: Server → Client only, simpler, automatic reconnection
- **WebSockets**: Bidirectional, more complex, manual reconnection handling

**Server-side SSE implementation:**
```javascript
// handlers/sseHandler.js
export function handleSSE(req, res) {
    // Set SSE headers - these are required!
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*' // Allow from any domain
    })
    
    console.log('📡 New SSE client connected')
    
    // Sample news stories for demonstration
    const stories = [
        'Breaking: New technology breakthrough announced',
        'Weather: Sunny skies expected this week', 
        'Sports: Local team wins championship',
        'Science: New species discovered in ocean depths',
        'Tech: AI makes breakthrough in medical research'
    ]
    
    // Send periodic updates
    const intervalId = setInterval(() => {
        const randomStory = stories[Math.floor(Math.random() * stories.length)]
        
        // SSE message format: "data: {JSON}\n\n"
        res.write(`data: ${JSON.stringify({
            event: 'news-update',
            story: randomStory,
            timestamp: new Date().toISOString()
        })}\n\n`)
    }, 3000) // Every 3 seconds
    
    // Clean up when client disconnects
    req.on('close', () => {
        clearInterval(intervalId)
        console.log('📡 SSE client disconnected')
    })
}
```

**🔍 SSE Message Format:**
```
data: {"message": "Hello World"}\n\n
```
- Must start with `data: `
- Must end with `\n\n` (two newlines)
- Content is typically JSON string

**Add SSE routing to server:**
```javascript
// Enhanced server.js routing
if (url === '/api/data' && method === 'GET') {
    await handleGet(res)
} else if (url === '/api/data' && method === 'POST') {
    await handlePost(req, res) 
} else if (url === '/events' && method === 'GET') {
    handleSSE(req, res) // Add this line
} else {
    await serveStatic(req, res, __dirname)
}
```

**Client-side implementation:**
```javascript
// public/script.js
console.log('🔌 Connecting to live updates...')

// Connect to Server-Sent Events
const eventSource = new EventSource('/events')

eventSource.onmessage = function(event) {
    const data = JSON.parse(event.data)
    console.log('📨 Received update:', data)
    
    // Update the UI with new data
    displayLiveUpdate(data)
}

eventSource.onerror = function(event) {
    console.error('❌ SSE connection error:', event)
}

function displayLiveUpdate(data) {
    const updatesDiv = document.getElementById('live-updates') || createUpdatesDiv()
    
    const updateElement = document.createElement('div')
    updateElement.className = 'live-update'
    updateElement.innerHTML = `
        <strong>${data.event}</strong>: ${data.story}
        <small>${new Date(data.timestamp).toLocaleTimeString()}</small>
    `
    
    // Add to top of updates
    updatesDiv.insertBefore(updateElement, updatesDiv.firstChild)
    
    // Keep only last 10 updates
    while (updatesDiv.children.length > 10) {
        updatesDiv.removeChild(updatesDiv.lastChild)
    }
}

function createUpdatesDiv() {
    const div = document.createElement('div')
    div.id = 'live-updates'
    div.innerHTML = '<h3>📡 Live Updates</h3>'
    document.body.appendChild(div)
    return div
}
```

**Enhance your HTML to include the script:**
```html
<!-- public/index.html -->
<head>
    <title>My Node.js App</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <h1>Welcome to My Full-Stack App!</h1>
    <div id="live-updates"></div>
    
    <script src="/script.js"></script>
</body>
</html>
```

**Add styling for live updates:**
```css
/* public/styles.css */
#live-updates {
    margin-top: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 5px;
}

.live-update {
    padding: 10px;
    margin: 5px 0;
    background-color: white;
    border-left: 4px solid #007acc;
    border-radius: 3px;
}

.live-update small {
    color: #666;
    float: right;
}
```

**🎯 Integration with real data updates:**
```javascript
// Enhanced utils/notificationEmitter.js
import { EventEmitter } from 'node:events'

export const appEmitter = new EventEmitter()
export const connectedClients = new Set() // Track SSE connections

appEmitter.on('newSighting', (sighting) => {
    console.log(`🔔 New sighting: ${sighting.title}`)
    
    // Notify all connected SSE clients
    const message = JSON.stringify({
        event: 'new-sighting',
        data: sighting,
        timestamp: new Date().toISOString()
    })
    
    connectedClients.forEach(client => {
        client.write(`data: ${message}\n\n`)
    })
})
```

**Enhanced SSE handler to track connections:**
```javascript
// Enhanced handlers/sseHandler.js
import { connectedClients } from '../utils/notificationEmitter.js'

export function handleSSE(req, res) {
    // ... existing SSE headers ...
    
    // Add this connection to tracked clients
    connectedClients.add(res)
    
    // ... existing interval code ...
    
    req.on('close', () => {
        clearInterval(intervalId)
        connectedClients.delete(res) // Remove from tracked clients
        console.log('📡 SSE client disconnected')
    })
}
```

**✅ You should now have:**
- [ ] Working Server-Sent Events endpoint
- [ ] Live updates appearing in browser every 3 seconds
- [ ] Real-time notifications when new data is added
- [ ] Proper connection management and cleanup

**🎯 Test the complete flow:**
1. Open your website in browser
2. You should see live updates appearing
3. Make a POST request to add new data
4. You should see a real-time notification in the browser

---

## 🎯 Final Integration Test (10 minutes)

Test all features working together:

**✅ Complete Feature Checklist:**
- [ ] Static files serve correctly (HTML, CSS, JS)
- [ ] GET /api/data returns JSON data
- [ ] POST /api/data adds new entries with sanitization
- [ ] Server-Sent Events provide live updates
- [ ] EventEmitters log activities to console
- [ ] Error handling works for invalid requests

**Test sequence:**
```bash
# 1. Test GET API
curl http://localhost:8000/api/data

# 2. Test POST API
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"title":"Final Test","location":"Test Lab","description":"Testing complete system"}' \
  http://localhost:8000/api/data

# 3. Test SSE (in separate terminal)
curl -N http://localhost:8000/events

# 4. Test static files
# Visit http://localhost:8000 in browser
```

---

## 🎓 Test Yourself

**Before considering this tutorial complete, you should be able to:**

1. **Explain the request/response cycle** and when to use different HTTP methods
2. **Describe why we use path.join()** instead of string concatenation for file paths  
3. **Identify the difference** between sync and async file operations
4. **Create a new API endpoint** that returns different data
5. **Explain how EventEmitters** enable decoupled architecture
6. **Describe when to use SSE vs WebSockets** for real-time features

**💡 Quick Quiz:**
1. What happens if you call `res.setHeader()` after `res.writeHead()`?
2. Why do we sanitize user input before saving it?
3. What are the three required headers for Server-Sent Events?

*Answers at the bottom of this document*

---

## 🚨 Common Pitfalls & Solutions

### Issue 1: "Cannot find module" errors
```javascript
// ❌ Wrong - missing file extension
import { getData } from './utils/getData'

// ✅ Correct - include .js extension
import { getData } from './utils/getData.js'
```

### Issue 2: CORS issues when testing
```javascript
// Add CORS headers to your responses
res.setHeader('Access-Control-Allow-Origin', '*')
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
```

### Issue 3: JSON parsing errors
```javascript
// Always validate before parsing
if (req.headers['content-type'] !== 'application/json') {
    throw new Error('Content-Type must be application/json')
}
```

### Issue 4: Path problems across operating systems
```javascript
// ❌ Breaks on Windows
const filePath = __dirname + '/public/' + fileName

// ✅ Works everywhere  
const filePath = path.join(__dirname, 'public', fileName)
```

---

## 🔧 Debugging Workshop

**Scenario 1: Server won't start**
```
Error: listen EADDRINUSE :::8000
```
**Solution:** Another process is using port 8000. Change your PORT variable or kill the other process.

**Scenario 2: 404 for all files**
```javascript
// Check your path construction
console.log('Looking for file at:', filePath)
console.log('File exists:', await fs.access(filePath).then(() => true).catch(() => false))
```

**Scenario 3: SSE not working**
- Check browser Network tab for `/events` connection
- Verify all three SSE headers are set
- Ensure data format ends with `\n\n`


---

## Best Practices Summary

### Security
```javascript
// Always sanitize user input
const clean = sanitizeInput(userInput)

// Use proper HTTP status codes  
res.statusCode = 201 // Created
res.statusCode = 400 // Bad Request
res.statusCode = 500 // Server Error
```

### Error Handling
```javascript
// Wrap async operations in try-catch
try {
    const result = await riskyOperation()
    return result
} catch (err) {
    console.error('Detailed error:', err.message)
    // Send appropriate error response
}
```

### Performance
```javascript
// Use async file operations
const content = await fs.readFile(path) // ✅ Non-blocking

// Avoid sync operations in request handlers
const content = fs.readFileSync(path) // ❌ Blocks entire server
```

---

## Next Steps

**Ready for more? Consider exploring:**

1. **Express.js Framework** - Simplifies routing and middleware
2. **Database Integration** - Replace JSON files with MongoDB or PostgreSQL
3. **Authentication** - Add user login/registration
4. **File Uploads** - Handle image and document uploads
5. **WebSockets** - Bidirectional real-time communication
6. **Deployment** - Host your app on Heroku, Vercel, or AWS

---

## Additional Resources

- [Node.js Official Documentation](https://nodejs.org/en/docs/)
- [HTTP Status Codes Reference](https://httpstatuses.com/)
- [Server-Sent Events MDN Guide](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [sanitize-html Documentation](https://www.npmjs.com/package/sanitize-html)
- [EventEmitter Examples](https://nodejs.org/api/events.html#events_class_eventemitter)

---

## Quiz Answers

1. **setHeader() after writeHead()**: The setHeader() call is ignored because headers have already been sent
2. **Input sanitization**: Prevents XSS attacks where malicious scripts could execute in users' browsers  
3. **SSE headers**: `Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`

---

** Congratulations!** You've built a complete full-stack Node.js application with modern features. You now understand the fundamentals of server-side development and can build upon this foundation for larger projects.
