# Component Development Practice

Practice building components and understanding component patterns for interviews.

## 🚀 Quick Setup

### TypeScript (Recommended for Interviews)

```bash
npx create-react-app component-test --template typescript
cd component-test
npm start
```

## 📁 Folder Structure

```
src/
├── components/           # Reusable components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   └── index.ts      # Export barrel
│   ├── Counter/
│   │   ├── Counter.tsx
│   │   └── index.ts
│   └── index.ts          # Export all components
├── pages/               # Page components
│   ├── Home.tsx
│   └── About.tsx
├── hooks/               # Custom hooks
├── utils/               # Helper functions
├── types/               # TypeScript types
├── App.tsx
└── index.tsx
```

## 🔧 Adding Components to Your App

### 1. Create Component Export Barrel

```typescript
// src/components/index.ts
export { default as Button } from './Button';
export { default as Counter } from './Counter';
export { default as TodoList } from './TodoList';
```

### 2. Create a Component File

```typescript
// src/components/Button/Button.tsx
import React from 'react';
import './Button.module.css';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

function Button({ onClick, children, variant = 'primary', disabled = false }: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick} 
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
```

```typescript
// src/components/Button/index.ts
export { default } from './Button';
```

### 3. Import in App.tsx

```typescript
// src/App.tsx
import { Button, Counter, TodoList } from './components';

function App() {
  return (
    <div className="App">
      <Counter />
      <Button onClick={() => alert('Hello!')}>
        Click Me
      </Button>
    </div>
  );
}

export default App;
```

## 📚 Component Interview Topics

### 1. **Functional vs Class Components (TypeScript)**

```typescript
// Functional Component (preferred) - TypeScript
interface WelcomeProps {
  name: string;
}

function Welcome({ name }: WelcomeProps) {
  return <h1>Hello, {name}!</h1>;
}

// Class Component (legacy but still asked about)
class WelcomeClass extends React.Component<WelcomeProps> {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### 2. **State Management with TypeScript**

```typescript
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState<number>(0);
  
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

### 3. **Props and Event Handling (TypeScript)**

```typescript
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

function Button({ onClick, children, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

// Usage
<Button onClick={() => alert('Clicked!')} disabled={false}>
  Click Me
</Button>
```

### 4. **Common Patterns**

#### Controlled Components

```typescript
import { useState, FormEvent } from 'react';

function Form() {
  const [value, setValue] = useState<string>('');
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted:', value);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

#### Conditional Rendering

```typescript
interface LoginButtonProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

function LoginButton({ isLoggedIn, onLogin, onLogout }: LoginButtonProps) {
  return (
    <>
      {isLoggedIn ? (
        <button onClick={onLogout}>Logout</button>
      ) : (
        <button onClick={onLogin}>Login</button>
      )}
    </>
  );
}
```

#### Lists and Keys

```typescript
interface Todo {
  id: number;
  text: string;
  completed?: boolean;
}

interface TodoListProps {
  todos: Todo[];
}

function TodoList({ todos }: TodoListProps) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

## 🧠 Interview Questions

**Q: What is the difference between props and state?**

- Props: Read-only data passed from parent to child
- State: Internal component data that can change

**Q: When would you use useEffect?**

- Side effects: API calls, timers, DOM manipulation
- Cleanup: Removing event listeners, canceling requests

**Q: What are React keys and why are they important?**

- Help React identify which items have changed
- Should be unique and stable (not array index)

**Q: How do you type props in TypeScript?**

- Use interfaces or type aliases
- Mark optional props with `?`
- Use `React.ReactNode` for children

## 🛣️ React Router (Common Interview Topic)

### Setup

```bash
npm install react-router-dom
npm install --save-dev @types/react-router-dom  # TypeScript
```

### Basic Routing

```typescript
// App.tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Route Parameters

```typescript
import { useParams } from 'react-router-dom';

interface UserParams {
  id: string;
}

function UserProfile() {
  const { id } = useParams<UserParams>();
  
  return <h1>User Profile: {id}</h1>;
}
```

### Navigation Hooks

```typescript
import { useNavigate, useLocation } from 'react-router-dom';

function NavigationExample() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleGoBack = () => navigate(-1);
  const handleGoHome = () => navigate('/');
  
  return (
    <div>
      <p>Current path: {location.pathname}</p>
      <button onClick={handleGoBack}>Go Back</button>
      <button onClick={handleGoHome}>Go Home</button>
    </div>
  );
}
```

## 🗄️ State Management & Data Fetching (Advanced Interview Topics)

### The State Management Spectrum

```
Local State (useState) → Lifting State Up → Context → Global State → Server State
```

### 1. **Built-in React State**

```typescript
// Local component state
const [count, setCount] = useState(0);

// Sharing state via props (lifting up)
function Parent() {
  const [user, setUser] = useState(null);
  return <Child user={user} onUserChange={setUser} />;
}

// Context for avoiding prop drilling
const UserContext = createContext();
```

### 2. **TanStack Query (React Query) - Server State**

```bash
npm install @tanstack/react-query
```

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch data with caching
function PostList() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then(res => res.json()),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <ul>
      {posts?.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}

// Advanced mutations with cache updates
function CreatePost() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (newPost) => fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json()),
    
    // Optimistic update - update UI immediately
    onMutate: async (newPost) => {
      // Cancel any in-flight GET requests for ['posts'] to prevent race conditions
      // This does NOT cancel the POST request - that still happens!
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      
      const previousPosts = queryClient.getQueryData(['posts']);
      
      // Optimistically update cache - show new post immediately
      queryClient.setQueryData(['posts'], (old) => [
        ...old, 
        { ...newPost, id: Date.now(), pending: true }
      ]);
      
      return { previousPosts };
    },
    
    // On success, replace optimistic update with real data
    onSuccess: (newPost) => {
      queryClient.setQueryData(['posts'], (old) => 
        old.map(post => 
          post.pending ? newPost : post
        )
      );
    },
    
    // On error, rollback to previous state
    onError: (err, newPost, context) => {
      queryClient.setQueryData(['posts'], context.previousPosts);
    },
  });

  return (
    <button onClick={() => mutation.mutate({ title: 'New Post', body: 'Content' })}>
      Create Post
    </button>
  );
}

// What cancelQueries() actually does:
/*
Race condition without cancelQueries():
1. User clicks "Create Post"
2. POST request starts
3. Background GET refetch is also happening
4. We add post optimistically to cache
5. Background GET completes and overwrites our optimistic update!
6. POST finishes but user doesn't see the new post

With cancelQueries():
1. User clicks "Create Post" 
2. We cancel any in-flight GET requests for ['posts']
3. We add post optimistically (user sees it immediately)
4. POST request continues normally
5. No background GET to overwrite our optimistic update
6. POST completes and we replace optimistic data with real data
*/

// Update existing post without refetch
function UpdatePost({ post }) {
  const queryClient = useQueryClient();
  
  const updateMutation = useMutation({
    mutationFn: ({ id, updates }) => fetch(`/api/posts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json()),
    
    onSuccess: (updatedPost) => {
      // Update single post in cache
      queryClient.setQueryData(['posts'], (oldPosts) =>
        oldPosts.map(p => p.id === updatedPost.id ? updatedPost : p)
      );
      
      // Also update individual post cache if it exists
      queryClient.setQueryData(['posts', updatedPost.id], updatedPost);
    },
  });

  return (
    <button onClick={() => updateMutation.mutate({ 
      id: post.id, 
      updates: { title: 'Updated Title' } 
    })}>
      Update Post
    </button>
  );
}
```

### 3. **Zustand - Simple Global State**

```bash
npm install zustand
```

```typescript
import { create } from 'zustand';

interface BearStore {
  bears: number;
  increase: (by: number) => void;
  decrease: (by: number) => void;
}

const useBearStore = create<BearStore>((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
  decrease: (by) => set((state) => ({ bears: state.bears - by })),
}));

// Usage in components
function BearCounter() {
  const bears = useBearStore((state) => state.bears);
  return <h1>{bears} around here...</h1>;
}

function Controls() {
  const increase = useBearStore((state) => state.increase);
  return <button onClick={() => increase(1)}>Add bear</button>;
}
```

### 4. **Redux Toolkit - Complex Global State**

```bash
npm install @reduxjs/toolkit react-redux
```

```typescript
import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1; // Immer handles immutability
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// Component usage
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(counterSlice.actions.increment())}>
        +
      </button>
    </div>
  );
}
```

### 5. **Jotai - Atomic State Management**

```bash
npm install jotai
```

```typescript
import { atom, useAtom } from 'jotai';

const countAtom = atom(0);
const doubleCountAtom = atom((get) => get(countAtom) * 2);

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const [doubleCount] = useAtom(doubleCountAtom);

  return (
    <div>
      <div>Count: {count}</div>
      <div>Double: {doubleCount}</div>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}
```

## 🧠 State Management Interview Questions

### **Q: When would you use each state management tool?**

| Tool | Use Case | Pros | Cons |
|------|----------|------|------|
| **useState/Context** | Small apps, simple state | Built-in, no deps | Prop drilling, re-renders |
| **TanStack Query** | Server state, caching | Auto-caching, background refetch | Learning curve |
| **Zustand** | Global client state | Simple API, TypeScript-first | Less ecosystem |
| **Redux Toolkit** | Complex apps, time-travel debugging | DevTools, predictable | Boilerplate, complexity |
| **Jotai** | Granular reactivity | Bottom-up, atomic | Newer, smaller ecosystem |

### **Q: Client-side caching benefits?**

- ✅ **Faster UX** - Instant loading from cache
- ✅ **Reduced server load** - Fewer API calls
- ✅ **Offline support** - Data available without network
- ✅ **Background updates** - Stale-while-revalidate pattern

### **Q: Client-side caching drawbacks?**

- ❌ **Stale data** - Cache might be outdated
- ❌ **Memory usage** - Storing data in browser
- ❌ **Complexity** - Cache invalidation is hard
- ❌ **Initial bundle size** - Additional libraries

### **Q: When NOT to use client-side caching?**

- Real-time data (stock prices, chat)
- Sensitive data (payments, personal info)
- Simple apps with minimal API calls
- Data that changes frequently

### **Q: Server state vs Client state?**

```typescript
// Server state - data from APIs
const { data: users } = useQuery(['users'], fetchUsers);

// Client state - UI state, form data
const [isModalOpen, setIsModalOpen] = useState(false);
const [formData, setFormData] = useState({});
```

## 🎯 Interview Decision Framework

### **Choose useState when:**

- Local component state
- Simple boolean flags
- Form inputs

### **Choose Context when:**

- Avoiding prop drilling
- Theme, auth, language settings
- Small to medium apps

### **Choose TanStack Query when:**

- Any server data fetching
- Need caching and background updates
- Want loading/error states handled

### **Choose Zustand when:**

- Need global state
- Want simple API
- TypeScript-first approach

### **Choose Redux Toolkit when:**

- Large, complex applications
- Need time-travel debugging
- Team familiar with Redux patterns

### **Choose Jotai when:**

- Need fine-grained reactivity
- Bottom-up state architecture
- Avoiding unnecessary re-renders

## ⚡ Quick Practice Components

1. **Counter** - useState practice
2. **Todo List** - state + lists + events
3. **Form** - controlled inputs
4. **Modal** - conditional rendering
5. **Search** - useEffect + API calls
6. **User List** - TanStack Query + caching
7. **Shopping Cart** - Zustand global state

## 🔗 Resources

- [React Docs](https://react.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Jotai](https://jotai.org/)
- [React Interview Questions](https://github.com/sudheerj/reactjs-interview-questions)
- [React Patterns](https://reactpatterns.com/)
