# Express API Practice

Document the process of going from 0 to 100 with a basic Express API using automated tools.

## 🚀 Quick Start (Recommended)

### 1. Generate Express App

```bash
# Create a new Express app with all the boilerplate
npx express-generator --no-view my-api
cd my-api
npm install
npm start
```

### 2. Add TypeScript Support (Optional)

```bash
# Add TypeScript dependencies
npm install --save-dev typescript @types/node @types/express ts-node nodemon

# Generate TypeScript configuration
npx tsc --init --target ES2020 --module commonjs --outDir ./dist --rootDir ./src

# Generate Eslint configuration
npx eslint --init

# Add dev script to package.json:
# "dev": "nodemon --exec ts-node src/app.ts"
```

### 3. Test Your Server

```bash
# Development mode
npm run dev

# Test the health endpoint
curl http://localhost:3000/
```

## 🛠️ Generator Options

```bash
# Basic API (no views)
npx express-generator --no-view my-api

# With template engine
npx express-generator --view=ejs my-webapp

# With CSS preprocessor
npx express-generator --css=sass my-webapp

# TypeScript starter (third-party)
npx create-ts-express my-api

# With authentication (third-party)
npx create-ts-express my-auth-api --auth
```

## 📁 What Gets Generated

```
my-api/
├── bin/www              # Server startup
├── public/              # Static files
├── routes/
│   ├── index.js
│   └── users.js
├── app.js               # Express config
├── package.json
└── README.md
```

## 🔧 Adding a Health Endpoint

Add to your `routes/index.js`:

```javascript
router.get('/health', function(req, res) {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

## 📋 Essential Commands Summary

```bash
# Create project
npx express-generator --no-view my-api
cd my-api
npm install

# Add TypeScript (optional)
npm install --save-dev typescript @types/node @types/express ts-node nodemon

# Generate TypeScript configuration
npx tsc --init --target ES2020 --module commonjs --outDir ./dist --rootDir ./src

# Start development
npm start              # or npm run dev if using nodemon

# Test health endpoint
curl http://localhost:3000/health
```

## 📚 Interview Study Guide

### Core Express Concepts You Should Know

#### 1. **What is Express?**

- Minimal web framework for Node.js
- Handles HTTP requests/responses
- Middleware-based architecture
- Built on top of Node.js `http` module

#### 2. **Request/Response Cycle**

```javascript
app.get('/users/:id', (req, res) => {
  // req.params.id - URL parameters
  // req.query - Query string (?name=value)
  // req.body - POST data
  // req.headers - HTTP headers
  
  res.status(200).json({ user: 'data' });
});
```

#### 3. **Middleware Deep Dive**

```javascript
// Application-level middleware
app.use(express.json());

// Router-level middleware
router.use('/users', authMiddleware);

// Error-handling middleware (4 parameters!)
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// Built-in middleware
app.use(express.static('public'));
```

#### 4. **HTTP Methods & RESTful Routes**

```javascript
app.get('/users', getAllUsers);       // READ all
app.get('/users/:id', getUser);       // READ one
app.post('/users', createUser);       // CREATE
app.put('/users/:id', updateUser);    // UPDATE (full)
app.patch('/users/:id', patchUser);   // UPDATE (partial)
app.delete('/users/:id', deleteUser); // DELETE
```

#### 5. **Common Interview Questions**

**Q: Difference between `app.use()` and `app.get()`?**

- `app.use()` - Middleware for all HTTP methods
- `app.get()` - Route handler for GET requests only

**Q: What is `next()` function?**

- Passes control to next middleware
- `next()` - continue to next middleware
- `next(error)` - skip to error handler

**Q: How to handle errors in Express?**

```javascript
// Async error handling
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/users', asyncHandler(async (req, res) => {
  const users = await User.find(); // might throw error
  res.json(users);
}));
```

#### 6. **Environment & Configuration**

```javascript
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'development') {
  app.use(morgan('dev')); // logging middleware
}
```

### 🔗 Essential Resources

#### Documentation

- [Express.js Official Docs](https://expressjs.com/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MDN HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

#### Practice Questions

- [Express Interview Questions](https://github.com/sudheerj/node-interview-questions)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

#### Quick Reference

```javascript
// Most common patterns you'll be asked about:

// 1. Basic server setup
const app = express();
app.listen(3000);

// 2. Middleware usage
app.use(express.json());
app.use('/api', routes);

// 3. Route parameters
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
});

// 4. Error handling
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// 5. CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
```

### 🧠 Mental Models for Interviews

1. **Think of Express as a pipeline** - requests flow through middleware
2. **Middleware = functions with access to req, res, next**
3. **Routes = endpoints that handle specific HTTP methods + paths**
4. **Error handling happens at the end of the pipeline**

### ⚡ Quick Wins for Interviews

- Know how to set up basic server in 5 lines
- Understand middleware execution order
- Can explain RESTful routing
- Know difference between `app.use()` vs `app.get()`
- Understand async error handling with try/catch

## Next Steps

- Add route handlers in the `routes/` directory
- Implement middleware for authentication, logging, etc.
- Set up a database connection
- Add error handling middleware
- Practice building RESTful APIs
