#  Build an Express API 


##  Introduction

This module teaches you the fundamental concepts of building RESTful APIs using Express.js. You'll learn the theoretical foundations and practical implementation patterns that make modern web APIs powerful, scalable, and maintainable.

##  Core Concepts

### What is an API?
An **Application Programming Interface (API)** is a set of rules and protocols that allows different software applications to communicate with each other. RESTful APIs use HTTP methods to perform operations on resources.

### Express.js Framework
Express.js is a minimal, unopinionated web framework for Node.js that provides:
- **Routing system** - Maps URLs to handler functions
- **Middleware support** - Functions that execute during request-response cycle
- **HTTP utility methods** - Simplified request/response handling
- **Template engine integration** - Dynamic content generation

### REST Architecture
**REST (Representational State Transfer)** principles:
- **Stateless** - Each request contains all necessary information
- **Resource-based** - URLs represent resources, not actions
- **HTTP methods** - GET, POST, PUT, DELETE for different operations
- **Uniform interface** - Consistent API structure

##  Lessons

### 1. Startup Planet Intro
**Concept Overview:** Project context and learning objectives

Understanding the scope of building a planets API that demonstrates core Express.js concepts. This lesson establishes the foundation for learning REST API development through a practical, space-themed example.

**Key Learning Points:**
- API design thinking
- Resource identification (planets as entities)
- HTTP as the communication protocol

---

### 2. Setting Things Up
**Concept Overview:** Project initialization and dependency management

Learn about Node.js project structure and package management. Understanding how Express.js fits into the Node.js ecosystem and why it's the preferred choice for building APIs.

**Key Learning Points:**
- **Package.json** - Project metadata and dependency tracking
- **Node modules** - Third-party library management
- **Development vs Production dependencies**
- **Script automation** for development workflow

**Minimal Setup:**
```javascript
// package.json essentials
{
  "name": "planets-api",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```

---

### 3. A Basic Server
**Concept Overview:** HTTP server fundamentals and Express application structure

Understanding how web servers work and how Express simplifies server creation. Learn about the request-response cycle and how Express handles incoming HTTP requests.

**Key Learning Points:**
- **HTTP Server** - Listens for requests on a specific port
- **Express Application** - Main application instance
- **Port binding** - Making your server accessible
- **Event-driven architecture** - How Node.js handles requests

**Basic Structure:**
```javascript
const express = require('express');
const app = express();

// Express app is now ready to handle requests
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

**Theory:** When a client makes an HTTP request, the server receives it, processes it through middleware and route handlers, then sends back a response.

---

### 4. Aside: Sending a Response
**Concept Overview:** HTTP response methods and status codes

Understanding different ways to send data back to clients and the importance of proper HTTP status codes for API communication.

**Key Learning Points:**
- **Response methods** - Different ways to send data
- **HTTP status codes** - Communicating request outcomes
- **Content-Type headers** - Telling clients what type of data you're sending
- **JSON as API standard** - Why JSON is preferred for APIs

**Response Types:**
```javascript
// JSON response (most common for APIs)
res.json({ message: "Hello World" });

// Plain text
res.send("Hello World");

// With status code
res.status(201).json({ created: true });
```

**Status Code Theory:**
- **200** - Success
- **201** - Created
- **404** - Not Found
- **500** - Server Error

---

### 5. Serving Data
**Concept Overview:** Static data serving and data structure design

Learn how APIs serve data and the importance of consistent data structures. Understanding how to organize and present data in a client-friendly format.

**Key Learning Points:**
- **Data modeling** - Structuring information logically
- **JSON format** - Standard data exchange format
- **Array responses** - Handling multiple resources
- **Data consistency** - Maintaining uniform structure

**Data Structure Example:**
```javascript
const planets = [
  {
    id: 1,
    name: "Earth",
    type: "terrestrial",
    distanceFromSun: 149.6 // million km
  }
];

app.get('/planets', (req, res) => {
  res.json(planets);
});
```

**Theory:** APIs should return data in predictable, well-structured formats that clients can easily parse and use.

---

### 6. Aside: Query Parameters
**Concept Overview:** URL query parameters and client-server communication

Understanding how clients can modify requests through URL parameters and how servers interpret these parameters to customize responses.

**Key Learning Points:**
- **Query string anatomy** - How parameters are structured in URLs
- **Parameter parsing** - How Express extracts query parameters
- **Optional parameters** - Handling missing or empty parameters
- **Type coercion** - Converting string parameters to appropriate types

**Query Parameter Structure:**
```
/planets?type=terrestrial&hasRings=false&limit=5
```

**Access in Express:**
```javascript
app.get('/planets', (req, res) => {
  const { type, hasRings, limit } = req.query;
  // All query parameters are strings by default
});
```

**Theory:** Query parameters allow clients to filter, sort, paginate, or otherwise modify the response without changing the base URL structure.

---

### 7. Filtering by Query Params
**Concept Overview:** Implementing server-side filtering logic

Learn how to process client requests for filtered data and implement efficient filtering algorithms. Understanding the balance between server-side processing and client-side filtering.

**Key Learning Points:**
- **Conditional logic** - Applying filters based on parameters
- **Array methods** - Using filter(), find(), map() for data manipulation
- **Multiple criteria** - Combining different filter conditions
- **Performance considerations** - Efficient filtering strategies

**Filtering Logic:**
```javascript
app.get('/planets', (req, res) => {
  let result = planets;
  
  if (req.query.type) {
    result = result.filter(planet => 
      planet.type.toLowerCase() === req.query.type.toLowerCase()
    );
  }
  
  res.json(result);
});
```

**Theory:** Server-side filtering reduces bandwidth usage and allows for more complex queries that might be difficult to implement client-side.

---

### 8. Aside: Path Parameters
**Concept Overview:** Dynamic routing and resource identification

Understanding how URLs can contain variable parts that identify specific resources. Learn about RESTful URL design and resource hierarchy.

**Key Learning Points:**
- **Dynamic routes** - URLs with variable segments
- **Resource identification** - Using IDs in URLs
- **Parameter extraction** - How Express captures path variables
- **RESTful naming** - Following REST conventions for URLs

**Path Parameter Syntax:**
```javascript
// Route definition with parameter
app.get('/planets/:id', (req, res) => {
  const planetId = req.params.id;
  // planetId contains the value from the URL
});
```

**Theory:** Path parameters make APIs more intuitive and follow REST principles by treating URLs as resource identifiers rather than function calls.

---

### 9. Add Path Parameters 1
**Concept Overview:** Single parameter implementation and resource retrieval

Implementing basic resource retrieval using path parameters. Understanding how to find specific resources and handle cases where resources don't exist.

**Key Learning Points:**
- **Resource lookup** - Finding specific items in collections
- **Error handling** - Responding when resources aren't found
- **Type conversion** - Converting string parameters to appropriate types
- **Validation** - Ensuring parameters are valid

**Implementation Pattern:**
```javascript
app.get('/planets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const planet = planets.find(p => p.id === id);
  
  if (!planet) {
    return res.status(404).json({ error: 'Planet not found' });
  }
  
  res.json(planet);
});
```

**Theory:** Individual resource endpoints are fundamental to REST APIs, allowing clients to request specific items rather than entire collections.

---

### 10. Path Parameters 2
**Concept Overview:** Advanced parameter patterns and nested resources

Learn about complex routing patterns with multiple parameters and nested resource relationships. Understanding URL hierarchy and resource relationships.

**Key Learning Points:**
- **Multiple parameters** - Handling several URL variables
- **Nested resources** - Representing resource relationships in URLs
- **Optional parameters** - Parameters that may or may not be present
- **Parameter validation** - Ensuring URL parameters are valid

**Advanced Patterns:**
```javascript
// Multiple parameters
app.get('/planets/:planetId/moons/:moonId', (req, res) => {
  const { planetId, moonId } = req.params;
  // Handle nested resource access
});

// Optional parameters
app.get('/planets/:id/:details?', (req, res) => {
  const { id, details } = req.params;
  // details may be undefined
});
```

**Theory:** Complex parameter patterns allow APIs to represent hierarchical data relationships and provide flexible access patterns.

---

### 11. express.Router()
**Concept Overview:** Modular routing and code organization

Understanding how to organize routes into logical modules using Express Router. Learn about middleware scoping and application architecture patterns.

**Key Learning Points:**
- **Route modularity** - Separating routes into logical groups
- **Router instances** - Creating sub-applications
- **Middleware scoping** - Applying middleware to specific route groups
- **Application architecture** - Organizing large applications

**Router Structure:**
```javascript
// routes/planets.js
const router = express.Router();

router.get('/', (req, res) => {
  // Handle /planets
});

router.get('/:id', (req, res) => {
  // Handle /planets/:id
});

module.exports = router;
```

**Theory:** Router modules promote code organization, reusability, and maintainability in larger applications by grouping related functionality.

---

### 12. Modularise The Code
**Concept Overview:** Application structure and separation of concerns

Learn about organizing Express applications using the Model-View-Controller (MVC) pattern and other architectural approaches. Understanding how to separate routing, business logic, and data access.

**Key Learning Points:**
- **Separation of concerns** - Different files for different responsibilities
- **Module system** - Using require/module.exports effectively
- **File organization** - Logical directory structure
- **Code reusability** - Writing modular, reusable components

**Application Structure:**
```
src/
├── app.js          // Main application setup
├── routes/         // Route definitions
├── controllers/    // Business logic
├── models/         // Data structures
└── middleware/     // Custom middleware
```

**Theory:** Well-organized code is easier to maintain, test, and scale. Modularization allows teams to work on different parts of an application independently.

---

### 13. Route Not Found
**Concept Overview:** Error handling and fallback routes

Understanding how to handle requests that don't match any defined routes. Learn about middleware order and error response patterns.

**Key Learning Points:**
- **Middleware order** - How Express processes requests sequentially
- **Catch-all routes** - Handling unmatched URLs
- **Error responses** - Providing helpful error messages
- **HTTP status codes** - Using appropriate error codes

**404 Handler Pattern:**
```javascript
// This middleware runs if no other routes match
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    requestedUrl: req.originalUrl
  });
});
```

**Theory:** Proper error handling improves user experience and helps developers debug API integration issues.

---

### 14. CORS
**Concept Overview:** Cross-Origin Resource Sharing and browser security

Understanding browser security policies and how to configure APIs for cross-origin requests. Learn about preflight requests and security implications.

**Key Learning Points:**
- **Same-origin policy** - Browser security restrictions
- **Cross-origin requests** - When browsers block requests
- **Preflight requests** - Browser's security checks
- **CORS headers** - Server responses that enable cross-origin access

**CORS Implementation:**
```javascript
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
```

**Theory:** CORS is essential for web applications where the frontend (running in browsers) needs to communicate with APIs hosted on different domains.

---

### 15. Wrapping Things Up
**Concept Overview:** API design review and architectural considerations

Reviewing the complete API structure and understanding how all components work together. Learn about API design principles and considerations for production applications.

**Key Learning Points:**
- **API consistency** - Maintaining uniform patterns across endpoints
- **Documentation importance** - Making APIs discoverable and usable
- **Performance considerations** - Optimizing response times
- **Security basics** - Protecting APIs from common threats

**Complete API Structure:**
- **Resource-based URLs** - /planets, /planets/:id
- **HTTP methods** - GET, POST, PUT, DELETE
- **Consistent responses** - Uniform JSON structure
- **Error handling** - Appropriate status codes and messages
- **Cross-origin support** - CORS configuration

---

##  API Design Principles

### RESTful Design
- **Resources over actions** - URLs represent things, not verbs
- **HTTP methods for operations** - Use GET, POST, PUT, DELETE appropriately
- **Stateless communication** - Each request is independent
- **Hierarchical structure** - Nested resources when appropriate

### Response Consistency
- **Uniform JSON structure** - Consistent field naming and structure
- **Proper status codes** - Use HTTP status codes correctly
- **Error formatting** - Standardized error response format
- **Metadata inclusion** - Include relevant metadata (timestamps, IDs)



---
**Key Takeaways:**
- Express.js simplifies HTTP server creation and management
- RESTful design principles create intuitive, predictable APIs
- Proper error handling and CORS configuration are essential
- Modular code organization improves maintainability and scalability
