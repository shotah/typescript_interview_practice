# TypeScript Interview Practice

Comprehensive practice repository for TypeScript, JavaScript, and web development interviews.

## 📁 Practice Areas

### 🌐 **Backend Development**
- **[express_practice/](./express_practice/)** - Express.js API development, middleware, routing, and server setup

### ⚛️ **Frontend Development** 
- **[component_practice/](./component_practice/)** - React components, hooks, state management, and patterns

### 🎮 **Algorithms & Game Logic**
- **[tic_tac_toe_practice/](./tic_tac_toe_practice/)** - Game algorithms, minimax, win detection, and React implementation
- **[leetcode/](./leetcode/)** - LeetCode solutions and algorithm practice
- **[recursion/](./recursion/)** - Recursive algorithms and problem solving

### 🌍 **HTTP & Networking**
- **[nodejs_requests_practice/](./nodejs_requests_practice/)** - HTTP requests, fetch, axios, error handling, and API integration

### 📚 **Legacy & Learning**
- **[old/](./old/)** - Earlier coding exercises and practice problems
- **[etc/](./etc/)** - Miscellaneous utilities and test files

## 🚀 Quick Start

### Express API Server
```bash
cd express_practice
npx express-generator --no-view my-api
cd my-api && npm install && npm start
```

### React Components
```bash
cd component_practice  
npx create-react-app component-test
cd component-test && npm start
```

### HTTP Requests Practice
```bash
cd nodejs_requests_practice
npm init -y
npm install axios node-fetch dotenv
```

## 🧠 Interview Focus Areas

### **Backend (Node.js/Express)**
- REST API design and implementation
- Middleware patterns and error handling
- Authentication and authorization
- Database integration patterns
- Performance and security best practices

### **Frontend (React)**
- Component lifecycle and hooks
- State management (useState, useEffect, context)
- Event handling and form validation
- Performance optimization techniques
- Testing strategies

### **Algorithms**
- Game logic and state management
- Tree traversal and graph algorithms
- Dynamic programming solutions
- Time/space complexity analysis
- Recursive problem solving

### **HTTP & APIs**
- Request/response patterns
- Error handling and retry logic
- Authentication (tokens, sessions)
- File uploads and data parsing
- Timeout and abort handling

## 🎯 Common Interview Questions

### Express/Node.js
- "Build a REST API for a todo application"
- "Explain middleware execution order"
- "How would you handle authentication?"
- "Implement error handling for async routes"

### React
- "Build a counter component with hooks"
- "Explain the difference between props and state"
- "Implement a todo list with add/remove functionality"
- "How would you optimize re-renders?"

### Algorithms
- "Implement tic-tac-toe game logic"
- "Check if a binary tree is balanced"
- "Find the longest palindromic substring"
- "Implement a cache with LRU eviction"

### HTTP/APIs
- "Make authenticated requests to an API"
- "Implement retry logic with exponential backoff"
- "Handle file uploads in Express"
- "Parse CSV data from API response"

## 🛠️ Development Setup

### Global Dependencies
```bash
# Essential tools
npm install -g typescript ts-node nodemon eslint prettier

# Optional but useful
npm install -g express-generator create-react-app
```

### VS Code Extensions
- TypeScript and JavaScript Language Features
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Thunder Client (API testing)

### Environment Configuration
```bash
# Create .env files for API keys and configuration
touch .env
echo "NODE_ENV=development" >> .env
echo "PORT=3000" >> .env
```

## 📖 Study Resources

### Documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Node.js Documentation](https://nodejs.org/en/docs/)

### Practice Platforms
- [LeetCode](https://leetcode.com/) - Algorithm practice
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - API testing
- [CodeWars](https://www.codewars.com/) - Programming challenges
- [HackerRank](https://www.hackerrank.com/) - Technical interviews

### Interview Preparation
- [Tech Interview Handbook](https://github.com/yangshun/tech-interview-handbook)
- [JavaScript Questions](https://github.com/lydiahallie/javascript-questions)
- [React Interview Questions](https://github.com/sudheerj/reactjs-interview-questions)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 🎪 Testing Your Knowledge

### Quick Challenges
1. **5 minutes**: Create an Express server with health endpoint
2. **10 minutes**: Build a React counter with increment/decrement
3. **15 minutes**: Implement tic-tac-toe win detection
4. **20 minutes**: Make authenticated API requests with error handling

### Build Projects
1. **Todo API** - Full CRUD with Express and database
2. **Weather App** - React frontend consuming weather API  
3. **Chat Application** - WebSocket implementation
4. **File Upload Service** - Handle multipart uploads

## 📊 Progress Tracking

- [ ] Express fundamentals (routing, middleware, error handling)
- [ ] React hooks and component patterns
- [ ] Algorithm implementation (sorting, searching, trees)
- [ ] HTTP request patterns and error handling
- [ ] Database integration (queries, migrations, relationships)
- [ ] Authentication and authorization patterns
- [ ] Testing strategies (unit, integration, e2e)
- [ ] Performance optimization techniques

---

**Good luck with your interviews!** 🚀

*Remember: Practice consistently, understand the fundamentals, and always think about edge cases and error handling.*