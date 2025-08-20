# React Best Practices for Interviews

## 🎯 Code Quality Standards

### 1. TypeScript Usage

#### ✅ DO: Proper Interface Definitions
```typescript
interface UserProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  onEdit: (userId: string) => void;
  isEditable?: boolean;
}
```

#### ❌ AVOID: Any types or missing interfaces
```typescript
// Bad
function UserProfile(props: any) { }

// Bad
function UserProfile({ user, onEdit }: { user: any, onEdit: any }) { }
```

#### ✅ DO: Generic Types for Reusable Components
```typescript
interface DataTableProps<T> {
  data: T[];
  columns: Array<{
    key: keyof T;
    header: string;
    render?: (value: T[keyof T], item: T) => React.ReactNode;
  }>;
  onRowClick?: (item: T) => void;
}

function DataTable<T>({ data, columns, onRowClick }: DataTableProps<T>) {
  // Implementation
}
```

### 2. Component Structure

#### ✅ DO: Consistent File Organization
```
components/
├── Button/
│   ├── Button.tsx
│   ├── Button.module.css
│   ├── Button.test.tsx
│   └── index.ts
└── UserCard/
    ├── UserCard.tsx
    ├── UserCard.module.css
    ├── UserCard.test.tsx
    └── index.ts
```

#### ✅ DO: Proper Export Patterns
```typescript
// Button/index.ts
export { default } from './Button';
export type { ButtonProps } from './Button';

// components/index.ts
export { default as Button } from './Button';
export { default as UserCard } from './UserCard';
```

### 3. State Management

#### ✅ DO: Use Appropriate State Solutions
```typescript
// Local state for component-specific data
const [isOpen, setIsOpen] = useState(false);

// Derived state with useMemo
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(props.data);
}, [props.data]);

// Lift state up when sharing between siblings
function Parent() {
  const [sharedState, setSharedState] = useState(initialValue);
  return (
    <>
      <ChildA value={sharedState} onChange={setSharedState} />
      <ChildB value={sharedState} />
    </>
  );
}
```

#### ❌ AVOID: Unnecessary State
```typescript
// Bad - don't store derived values in state
const [fullName, setFullName] = useState('');
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');

// Good - compute derived values
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const fullName = `${firstName} ${lastName}`.trim();
```

## 🔄 Performance Optimization

### 1. Preventing Unnecessary Re-renders

#### ✅ DO: Memoize Expensive Components
```typescript
const ExpensiveComponent = React.memo<Props>(({ data, onAction }) => {
  // Expensive rendering logic
  return <ComplexVisualization data={data} />;
});

// With custom comparison function
const SmartComponent = React.memo<Props>(
  ({ user, settings }) => {
    return <UserDisplay user={user} settings={settings} />;
  },
  (prevProps, nextProps) => {
    // Only re-render if user ID changes
    return prevProps.user.id === nextProps.user.id;
  }
);
```

#### ✅ DO: Use useCallback for Event Handlers
```typescript
function TodoList({ todos, onToggle, onDelete }) {
  // Memoize callbacks to prevent child re-renders
  const handleToggle = useCallback((id: string) => {
    onToggle(id);
  }, [onToggle]);

  const handleDelete = useCallback((id: string) => {
    onDelete(id);
  }, [onDelete]);

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
```

#### ✅ DO: Use useMemo for Expensive Calculations
```typescript
function ProductList({ products, filters, sortBy }) {
  const processedProducts = useMemo(() => {
    return products
      .filter(product => {
        return filters.every(filter => filter.test(product));
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price': return a.price - b.price;
          case 'name': return a.name.localeCompare(b.name);
          default: return 0;
        }
      });
  }, [products, filters, sortBy]);

  return (
    <div>
      {processedProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### 2. Code Splitting and Lazy Loading

#### ✅ DO: Lazy Load Route Components
```typescript
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Dashboard />
          </Suspense>
        } />
        <Route path="/profile" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Profile />
          </Suspense>
        } />
      </Routes>
    </Router>
  );
}
```

## 🛡️ Error Handling

### 1. Error Boundaries

#### ✅ DO: Implement Comprehensive Error Boundaries
```typescript
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    
    // Log to monitoring service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Report to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // reportError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <details>
            <summary>Error details</summary>
            <pre>{this.state.error?.stack}</pre>
          </details>
          <button onClick={() => window.location.reload()}>
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 2. Graceful Error Handling in Components

#### ✅ DO: Handle Async Errors Properly
```typescript
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/users/${userId}`, {
          signal: controller.signal
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch user: ${response.status}`);
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    return () => controller.abort();
  }, [userId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return <div>User not found</div>;

  return <UserDetails user={user} />;
}
```

## ♿ Accessibility Best Practices

### 1. Semantic HTML and ARIA

#### ✅ DO: Use Proper Semantic Elements
```typescript
function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="product-card">
      <header>
        <h3>{product.name}</h3>
        <p className="price">${product.price}</p>
      </header>
      
      <img 
        src={product.image} 
        alt={`${product.name} product image`}
      />
      
      <section className="description">
        <p>{product.description}</p>
      </section>
      
      <footer>
        <button 
          onClick={() => onAddToCart(product)}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>
      </footer>
    </article>
  );
}
```

#### ✅ DO: Implement Keyboard Navigation
```typescript
function DropdownMenu({ options, onSelect }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < options.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : options.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          onSelect(options[selectedIndex]);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
    }
  };

  return (
    <div className="dropdown" onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        Select option
      </button>
      
      {isOpen && (
        <ul role="listbox" className="dropdown-menu">
          {options.map((option, index) => (
            <li
              key={option.id}
              role="option"
              aria-selected={index === selectedIndex}
              className={index === selectedIndex ? 'highlighted' : ''}
              onClick={() => onSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## 🧪 Testing Best Practices

### 1. Component Testing Strategy

#### ✅ DO: Test User Interactions, Not Implementation Details
```typescript
// Good - tests user behavior
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('SearchComponent', () => {
  it('filters results when user types in search box', async () => {
    const user = userEvent.setup();
    const mockOnSearch = jest.fn();
    
    render(<SearchComponent onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByRole('searchbox');
    await user.type(searchInput, 'pizza');
    
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('pizza');
    });
  });

  it('shows no results message when search returns empty', async () => {
    render(<SearchComponent results={[]} />);
    
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
```

#### ✅ DO: Mock External Dependencies
```typescript
// Mock API calls
jest.mock('./api/userService', () => ({
  fetchUser: jest.fn(),
  updateUser: jest.fn(),
}));

// Mock complex child components
jest.mock('./components/ComplexChart', () => {
  return function MockComplexChart(props: any) {
    return <div data-testid="complex-chart" {...props} />;
  };
});
```

### 2. Custom Hooks Testing

#### ✅ DO: Test Custom Hooks in Isolation
```typescript
import { renderHook, act } from '@testing-library/react';

describe('useCounter', () => {
  it('initializes with provided value', () => {
    const { result } = renderHook(() => useCounter(5));
    
    expect(result.current.count).toBe(5);
  });

  it('increments count when increment is called', () => {
    const { result } = renderHook(() => useCounter(0));
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});
```

## 📐 Architecture Patterns

### 1. Container/Presentational Pattern

#### ✅ DO: Separate Logic from Presentation
```typescript
// Container Component (logic)
function UserProfileContainer({ userId }: { userId: string }) {
  const { data: user, loading, error } = useUser(userId);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (userData: UserData) => {
    try {
      await updateUser(userId, userData);
      setIsEditing(false);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <UserProfilePresentation
      user={user}
      loading={loading}
      error={error}
      isEditing={isEditing}
      onEdit={() => setIsEditing(true)}
      onSave={handleSave}
      onCancel={() => setIsEditing(false)}
    />
  );
}

// Presentational Component (UI)
interface UserProfilePresentationProps {
  user?: User;
  loading: boolean;
  error?: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (data: UserData) => void;
  onCancel: () => void;
}

function UserProfilePresentation({
  user,
  loading,
  error,
  isEditing,
  onEdit,
  onSave,
  onCancel
}: UserProfilePresentationProps) {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      {isEditing ? (
        <UserEditForm 
          user={user} 
          onSave={onSave} 
          onCancel={onCancel} 
        />
      ) : (
        <UserDisplay user={user} onEdit={onEdit} />
      )}
    </div>
  );
}
```

### 2. Compound Components Pattern

#### ✅ DO: Create Flexible, Reusable Component APIs
```typescript
interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

function Tabs({ children, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

Tabs.List = function TabsList({ children }: { children: React.ReactNode }) {
  return <div className="tabs-list" role="tablist">{children}</div>;
};

Tabs.Tab = function Tab({ id, children }: TabProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');
  
  return (
    <button
      role="tab"
      aria-selected={context.activeTab === id}
      onClick={() => context.setActiveTab(id)}
      className={`tab ${context.activeTab === id ? 'active' : ''}`}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function TabPanel({ id, children }: TabPanelProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');
  
  if (context.activeTab !== id) return null;
  
  return (
    <div role="tabpanel" className="tab-panel">
      {children}
    </div>
  );
};

// Usage:
<Tabs defaultTab="profile">
  <Tabs.List>
    <Tabs.Tab id="profile">Profile</Tabs.Tab>
    <Tabs.Tab id="settings">Settings</Tabs.Tab>
  </Tabs.List>
  
  <Tabs.Panel id="profile">
    <UserProfile />
  </Tabs.Panel>
  
  <Tabs.Panel id="settings">
    <UserSettings />
  </Tabs.Panel>
</Tabs>
```

## 🔧 Development Workflow

### 1. Component Development Checklist

#### Before Starting:
- [ ] Understand the requirements clearly
- [ ] Design the component API (props interface)
- [ ] Consider all possible states (loading, error, empty, success)
- [ ] Plan for accessibility from the beginning

#### During Development:
- [ ] Start with TypeScript interfaces
- [ ] Implement the happy path first
- [ ] Add error handling and edge cases
- [ ] Include proper ARIA attributes
- [ ] Add data-testid for testing
- [ ] Consider performance implications

#### Before Submission:
- [ ] Test manually in different states
- [ ] Write unit tests for key functionality
- [ ] Check accessibility with screen reader
- [ ] Verify keyboard navigation works
- [ ] Review code for performance issues
- [ ] Ensure proper TypeScript typing

### 2. Code Review Guidelines

#### ✅ Look for:
- Proper TypeScript usage
- Accessible markup and interactions
- Error handling and edge cases
- Performance optimizations where needed
- Testability and separation of concerns
- Consistent code style and naming

#### ❌ Red flags:
- Any types or missing interfaces
- Missing error boundaries or error handling
- Accessibility violations
- Performance issues (unnecessary re-renders)
- Tight coupling between components
- Missing or inadequate tests

## 💡 Interview-Specific Tips

1. **Start Simple**: Build the basic functionality first, then add complexity
2. **Think Out Loud**: Explain your decision-making process
3. **Ask Questions**: Clarify requirements and constraints
4. **Consider Edge Cases**: What happens when things go wrong?
5. **Show Testing Mindset**: Write components that are easy to test
6. **Demonstrate Best Practices**: Show you know modern React patterns
7. **Be Pragmatic**: Balance perfection with time constraints

Remember: Interviewers want to see how you approach problems, handle complexity, and make technical decisions. Focus on demonstrating your thinking process as much as your coding skills!
