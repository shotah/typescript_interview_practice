# Node.js HTTP Requests Practice

Modern HTTP requests using built-in `fetch` (Node 18+).

## 🚀 Quick Setup

```bash
mkdir http-practice
cd http-practice
npm init -y
node --version  # Make sure you're on Node 18+

# That's it! No dependencies needed - fetch is built-in
```

## ⚡ How to Run Async Code

### Option 1: Use Top-Level Await (Node 14.8+)
Create a `.mjs` file or add `"type": "module"` to package.json:

```javascript
// fetch-test.mjs
const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
const data = await response.json();
console.log(data);
```

```bash
node fetch-test.mjs
```

### Option 2: IIFE Wrapper (Works Everywhere)
```javascript
// fetch-test.js
(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
})();
```

```bash
node fetch-test.js
```

### Option 3: Function + Call Pattern
```javascript
// fetch-test.js
async function main() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
```

```bash
node fetch-test.js
```

### 🎯 Quick Reference for Code Runner

**For VS Code Code Runner (Ctrl+Alt+N)**, use the **IIFE wrapper**:

```javascript
(async () => {
  // Your async code here
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  console.log(await response.json());
})();
```

**For terminal**, any option works:
```bash
node your-file.js        # IIFE or function+call
node your-file.mjs       # top-level await
```

## 📚 Modern HTTP Requests with Fetch
### 1. **GET Request**
```javascript
async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Usage
const posts = await fetchData();
console.log(posts);
```

### 2. **POST Request**
```javascript
async function createPost(postData) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('POST error:', error);
    throw error;
  }
}

// Usage
const newPost = await createPost({ title: 'Test', body: 'Hello', userId: 1 });
console.log(newPost);
```

### 3. **All HTTP Methods**
```javascript
// GET
const get = await fetch('https://jsonplaceholder.typicode.com/posts/1');

// POST
const post = await fetch('https://api.example.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'New Post' })
});

// PUT
const put = await fetch('https://api.example.com/posts/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id: 1, title: 'Updated' })
});

// DELETE
const del = await fetch('https://api.example.com/posts/1', {
  method: 'DELETE'
});
```

## 🔧 Essential Patterns

### With Authentication
```javascript
async function authenticatedRequest(url, token) {
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return await response.json();
}
```

### With Timeout
```javascript
async function requestWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
}
```

## 🧠 Interview Quick Facts

- **Always check `response.ok`** before parsing JSON
- **Use try/catch** for network errors  
- **AbortController** for timeouts and cancellation
- **Status codes**: 200s = success, 400s = client error, 500s = server error

## 🎯 Quick Practice

Test these with JSONPlaceholder API:

```javascript
// GET all posts
const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await posts.json();

// POST new post
const newPost = await fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Test', body: 'Hello', userId: 1 })
});
const result = await newPost.json();
```

## 🔗 Resources

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Free test API
- [Fetch API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [HTTP Status Codes](https://httpstatuses.com/)