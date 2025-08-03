# Testing Practice

Master testing fundamentals, Jest, React Testing Library, and API testing for interviews.

## 🚀 Quick Setup

### Frontend Testing (React + TypeScript)
```bash
# Create React app with testing setup
npx create-react-app test-practice --template typescript
cd test-practice

# Additional testing libraries
npm install --save-dev @testing-library/jest-dom @testing-library/user-event
npm install --save-dev msw  # Mock Service Worker for API mocking
```

### Backend Testing (Node.js + TypeScript)
```bash
mkdir api-testing
cd api-testing
npm init -y
npm install express cors dotenv
npm install --save-dev jest typescript ts-jest @types/jest @types/node @types/express @types/supertest supertest
```

### Jest Configuration
```typescript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts'
  ],
  coverageReporters: ['text', 'lcov', 'html'],
};
```

## 🧪 Unit Testing Fundamentals

### Testing Pure Functions
```typescript
// src/utils/mathUtils.ts
export const add = (a: number, b: number): number => a + b;

export const multiply = (a: number, b: number): number => a * b;

export const divide = (a: number, b: number): number => {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
};

export const factorial = (n: number): number => {
  if (n < 0) throw new Error('Negative number');
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
};

export const isPrime = (n: number): boolean => {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
};
```

```typescript
// src/utils/__tests__/mathUtils.test.ts
import { add, multiply, divide, factorial, isPrime } from '../mathUtils';

describe('Math Utils', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should add negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    it('should add zero', () => {
      expect(add(5, 0)).toBe(5);
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Division by zero');
    });

    it('should handle decimal results', () => {
      expect(divide(1, 3)).toBeCloseTo(0.333, 2);
    });
  });

  describe('factorial', () => {
    it('should calculate factorial of positive numbers', () => {
      expect(factorial(5)).toBe(120);
      expect(factorial(0)).toBe(1);
      expect(factorial(1)).toBe(1);
    });

    it('should throw error for negative numbers', () => {
      expect(() => factorial(-1)).toThrow('Negative number');
    });
  });

  describe('isPrime', () => {
    it('should identify prime numbers', () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(3)).toBe(true);
      expect(isPrime(17)).toBe(true);
    });

    it('should identify non-prime numbers', () => {
      expect(isPrime(1)).toBe(false);
      expect(isPrime(4)).toBe(false);
      expect(isPrime(9)).toBe(false);
    });
  });
});
```

## ⚛️ React Component Testing

### Testing Components with React Testing Library
```typescript
// src/components/Counter/Counter.tsx
import React, { useState } from 'react';

interface CounterProps {
  initialValue?: number;
  step?: number;
  onCountChange?: (count: number) => void;
}

export function Counter({ initialValue = 0, step = 1, onCountChange }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    const newCount = count + step;
    setCount(newCount);
    onCountChange?.(newCount);
  };

  const decrement = () => {
    const newCount = count - step;
    setCount(newCount);
    onCountChange?.(newCount);
  };

  const reset = () => {
    setCount(initialValue);
    onCountChange?.(initialValue);
  };

  return (
    <div data-testid="counter">
      <h2>Counter: {count}</h2>
      <button onClick={increment} data-testid="increment-btn">
        +{step}
      </button>
      <button onClick={decrement} data-testid="decrement-btn">
        -{step}
      </button>
      <button onClick={reset} data-testid="reset-btn">
        Reset
      </button>
    </div>
  );
}
```

```typescript
// src/components/Counter/__tests__/Counter.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from '../Counter';

describe('Counter Component', () => {
  it('renders with initial value', () => {
    render(<Counter initialValue={5} />);
    expect(screen.getByText('Counter: 5')).toBeInTheDocument();
  });

  it('increments count when increment button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter />);
    
    const incrementBtn = screen.getByTestId('increment-btn');
    await user.click(incrementBtn);
    
    expect(screen.getByText('Counter: 1')).toBeInTheDocument();
  });

  it('decrements count when decrement button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={5} />);
    
    const decrementBtn = screen.getByTestId('decrement-btn');
    await user.click(decrementBtn);
    
    expect(screen.getByText('Counter: 4')).toBeInTheDocument();
  });

  it('resets to initial value when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={10} />);
    
    // Change the count first
    await user.click(screen.getByTestId('increment-btn'));
    expect(screen.getByText('Counter: 11')).toBeInTheDocument();
    
    // Reset
    await user.click(screen.getByTestId('reset-btn'));
    expect(screen.getByText('Counter: 10')).toBeInTheDocument();
  });

  it('uses custom step value', async () => {
    const user = userEvent.setup();
    render(<Counter step={5} />);
    
    await user.click(screen.getByTestId('increment-btn'));
    expect(screen.getByText('Counter: 5')).toBeInTheDocument();
  });

  it('calls onCountChange callback when count changes', async () => {
    const onCountChange = jest.fn();
    const user = userEvent.setup();
    
    render(<Counter onCountChange={onCountChange} />);
    
    await user.click(screen.getByTestId('increment-btn'));
    expect(onCountChange).toHaveBeenCalledWith(1);
  });

  it('displays correct button labels with step', () => {
    render(<Counter step={3} />);
    
    expect(screen.getByText('+3')).toBeInTheDocument();
    expect(screen.getByText('-3')).toBeInTheDocument();
  });
});
```

### Testing Forms and User Interactions
```typescript
// src/components/UserForm/UserForm.tsx
import React, { useState } from 'react';

interface User {
  name: string;
  email: string;
  age: number;
}

interface UserFormProps {
  onSubmit: (user: User) => void;
  initialData?: Partial<User>;
}

export function UserForm({ onSubmit, initialData }: UserFormProps) {
  const [formData, setFormData] = useState<User>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    age: initialData?.age || 0,
  });

  const [errors, setErrors] = useState<Partial<User>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<User> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Age must be between 1 and 120';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof User, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="user-form">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          data-testid="name-input"
        />
        {errors.name && <span data-testid="name-error">{errors.name}</span>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          data-testid="email-input"
        />
        {errors.email && <span data-testid="email-error">{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          type="number"
          value={formData.age}
          onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
          data-testid="age-input"
        />
        {errors.age && <span data-testid="age-error">{errors.age}</span>}
      </div>

      <button type="submit" data-testid="submit-btn">
        Submit
      </button>
    </form>
  );
}
```

```typescript
// src/components/UserForm/__tests__/UserForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserForm } from '../UserForm';

describe('UserForm Component', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders form fields', () => {
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Age:')).toBeInTheDocument();
    expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
  });

  it('submits valid form data', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    await user.type(screen.getByTestId('name-input'), 'John Doe');
    await user.type(screen.getByTestId('email-input'), 'john@example.com');
    await user.type(screen.getByTestId('age-input'), '25');
    
    await user.click(screen.getByTestId('submit-btn'));
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      age: 25,
    });
  });

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    await user.click(screen.getByTestId('submit-btn'));
    
    expect(screen.getByTestId('name-error')).toHaveTextContent('Name is required');
    expect(screen.getByTestId('email-error')).toHaveTextContent('Email is required');
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    await user.type(screen.getByTestId('email-input'), 'invalid-email');
    await user.click(screen.getByTestId('submit-btn'));
    
    expect(screen.getByTestId('email-error')).toHaveTextContent('Email is invalid');
  });

  it('clears errors when user starts typing', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    // Trigger validation error
    await user.click(screen.getByTestId('submit-btn'));
    expect(screen.getByTestId('name-error')).toBeInTheDocument();
    
    // Start typing to clear error
    await user.type(screen.getByTestId('name-input'), 'J');
    expect(screen.queryByTestId('name-error')).not.toBeInTheDocument();
  });

  it('populates form with initial data', () => {
    const initialData = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      age: 30,
    };
    
    render(<UserForm onSubmit={mockOnSubmit} initialData={initialData} />);
    
    expect(screen.getByDisplayValue('Jane Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('jane@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('30')).toBeInTheDocument();
  });
});
```

## 🌐 API Testing with Supertest

### Express API Setup
```typescript
// src/app.ts
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

interface User {
  id: number;
  name: string;
  email: string;
}

let users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

let nextId = 3;

// GET /users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET /users/:id
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST /users
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  if (users.some(u => u.email === email)) {
    return res.status(409).json({ error: 'Email already exists' });
  }
  
  const user: User = { id: nextId++, name, email };
  users.push(user);
  res.status(201).json(user);
});

// PUT /users/:id
app.put('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  users[userIndex] = { ...users[userIndex], name, email };
  res.json(users[userIndex]);
});

// DELETE /users/:id
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  users.splice(userIndex, 1);
  res.status(204).send();
});

export default app;
```

### API Integration Tests
```typescript
// src/__tests__/api.test.ts
import request from 'supertest';
import app from '../app';

describe('Users API', () => {
  beforeEach(() => {
    // Reset users array before each test
    // In real app, you'd reset your test database
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      const response = await request(app)
        .get('/users')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('email');
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user by id', async () => {
      const response = await request(app)
        .get('/users/1')
        .expect(200);

      expect(response.body).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
      });
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/users/999')
        .expect(404);

      expect(response.body).toEqual({
        error: 'User not found'
      });
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'Bob Johnson',
        email: 'bob@example.com'
      };

      const response = await request(app)
        .post('/users')
        .send(newUser)
        .expect(201);

      expect(response.body).toMatchObject(newUser);
      expect(response.body).toHaveProperty('id');
    });

    it('should return 400 for missing required fields', async () => {
      const response = await request(app)
        .post('/users')
        .send({ name: 'Bob Johnson' }) // missing email
        .expect(400);

      expect(response.body).toEqual({
        error: 'Name and email are required'
      });
    });

    it('should return 409 for duplicate email', async () => {
      const duplicateUser = {
        name: 'Another John',
        email: 'john@example.com' // already exists
      };

      const response = await request(app)
        .post('/users')
        .send(duplicateUser)
        .expect(409);

      expect(response.body).toEqual({
        error: 'Email already exists'
      });
    });
  });

  describe('PUT /users/:id', () => {
    it('should update an existing user', async () => {
      const updatedUser = {
        name: 'John Updated',
        email: 'john.updated@example.com'
      };

      const response = await request(app)
        .put('/users/1')
        .send(updatedUser)
        .expect(200);

      expect(response.body).toMatchObject({
        id: 1,
        ...updatedUser
      });
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .put('/users/999')
        .send({ name: 'Test', email: 'test@example.com' })
        .expect(404);

      expect(response.body).toEqual({
        error: 'User not found'
      });
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete an existing user', async () => {
      await request(app)
        .delete('/users/1')
        .expect(204);

      // Verify user is deleted
      await request(app)
        .get('/users/1')
        .expect(404);
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .delete('/users/999')
        .expect(404);

      expect(response.body).toEqual({
        error: 'User not found'
      });
    });
  });
});
```

## 🎭 Mocking with Jest and MSW

### Jest Mocking Examples
```typescript
// src/services/userService.ts
export class UserService {
  async fetchUser(id: number): Promise<{ id: number; name: string }> {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error('User not found');
    }
    return response.json();
  }

  async createUser(userData: { name: string; email: string }) {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  }
}

// src/services/__tests__/userService.test.ts
import { UserService } from '../userService';

// Mock fetch globally
global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    mockFetch.mockClear();
  });

  it('should fetch user successfully', async () => {
    const mockUser = { id: 1, name: 'John Doe' };
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    } as Response);

    const user = await userService.fetchUser(1);
    
    expect(user).toEqual(mockUser);
    expect(mockFetch).toHaveBeenCalledWith('/api/users/1');
  });

  it('should throw error when user not found', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    await expect(userService.fetchUser(999)).rejects.toThrow('User not found');
  });

  it('should create user with correct data', async () => {
    const userData = { name: 'Jane Doe', email: 'jane@example.com' };
    const createdUser = { id: 1, ...userData };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => createdUser,
    } as Response);

    const result = await userService.createUser(userData);

    expect(result).toEqual(createdUser);
    expect(mockFetch).toHaveBeenCalledWith('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
  });
});
```

## 🧠 Testing Interview Questions

### **Q: What are the different types of testing?**
- **Unit**: Individual functions/components
- **Integration**: Multiple components working together
- **E2E**: Full user workflows
- **Snapshot**: UI regression testing

### **Q: What is Test-Driven Development (TDD)?**
1. **Red**: Write failing test
2. **Green**: Write minimal code to pass
3. **Refactor**: Improve code while keeping tests green

### **Q: What should you test?**
- **User interactions**: Clicks, form submissions
- **Business logic**: Calculations, validations
- **Edge cases**: Error conditions, boundary values
- **API responses**: Success/error scenarios

### **Q: What should you NOT test?**
- Implementation details
- Third-party libraries
- Browser APIs (unless you're wrapping them)

### **Q: Mock vs Stub vs Spy?**
- **Mock**: Replace entire object/function
- **Stub**: Replace with predetermined response
- **Spy**: Watch calls to real function

## 🎯 Practice Exercises

1. **Calculator Component** - Test math operations and error handling
2. **Todo List** - Test CRUD operations and state management
3. **Shopping Cart** - Test item management and price calculations
4. **User Authentication** - Test login/logout flow and protected routes
5. **API Client** - Test HTTP requests with various response scenarios

## 🔗 Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [MSW (Mock Service Worker)](https://mswjs.io/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)