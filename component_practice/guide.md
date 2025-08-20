# React Component Interview Guide

## 🎯 Interview Strategy

### What Interviewers Look For
1. **Component Architecture** - Clean, reusable components
2. **TypeScript Proficiency** - Proper typing and interfaces
3. **State Management** - When to use useState vs props vs context
4. **Performance** - Avoiding unnecessary re-renders
5. **Testing Mindset** - Testable component design
6. **Real-world Patterns** - Error handling, loading states, accessibility

## 🏗️ Component Building Process

### 1. Start with the Interface
```typescript
// Always define your interface first
interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
  className?: string; // Optional styling
}
```

### 2. Think About States
```typescript
// What can change in your component?
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
```

### 3. Handle Side Effects
```typescript
// API calls, subscriptions, timers
useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await api.getData();
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  fetchData();
}, [dependency]);
```

### 4. Add Event Handlers
```typescript
const handleSubmit = useCallback((formData: FormData) => {
  // Validation
  if (!validateForm(formData)) return;
  
  // Submit
  onSubmit(formData);
}, [onSubmit]);
```

### 5. Return JSX with Proper Structure
```typescript
return (
  <div className="component-wrapper" data-testid="component-name">
    {/* Loading state */}
    {isLoading && <LoadingSpinner />}
    
    {/* Error state */}
    {error && <ErrorMessage message={error} />}
    
    {/* Main content */}
    {!isLoading && !error && (
      <MainContent data={data} />
    )}
  </div>
);
```

## 🔄 Common Interview Patterns

### 1. **Data Fetching Component**
```typescript
function useDataFetcher<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url, {
          signal: controller.signal
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
```

### 2. **Form with Validation**
```typescript
function useFormValidation<T>(initialValues: T, validationRules: ValidationRules<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = (field: keyof T, value: any): string | undefined => {
    const rule = validationRules[field];
    if (!rule) return undefined;
    
    if (rule.required && (!value || value.toString().trim() === '')) {
      return `${String(field)} is required`;
    }
    
    if (rule.minLength && value.toString().length < rule.minLength) {
      return `${String(field)} must be at least ${rule.minLength} characters`;
    }
    
    if (rule.pattern && !rule.pattern.test(value.toString())) {
      return rule.message || `${String(field)} is invalid`;
    }
    
    return undefined;
  };

  const handleChange = (field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, values[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateAll = (): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationRules).forEach(field => {
      const error = validateField(field as keyof T, values[field as keyof T]);
      if (error) {
        newErrors[field as keyof T] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, key) => {
      acc[key as keyof T] = true;
      return acc;
    }, {} as Partial<Record<keyof T, boolean>>));

    return isValid;
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    isValid: Object.keys(errors).length === 0
  };
}
```

### 3. **Optimized List Component**
```typescript
import React, { memo, useMemo } from 'react';

interface ListItem {
  id: string;
  name: string;
  category: string;
  price: number;
}

interface OptimizedListProps {
  items: ListItem[];
  filter: string;
  sortBy: 'name' | 'price';
  onItemClick: (item: ListItem) => void;
}

export const OptimizedList = memo<OptimizedListProps>(({ 
  items, 
  filter, 
  sortBy, 
  onItemClick 
}) => {
  // Expensive filtering and sorting operations
  const processedItems = useMemo(() => {
    let filtered = items;
    
    // Filter items
    if (filter) {
      filtered = items.filter(item => 
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.category.toLowerCase().includes(filter.toLowerCase())
      );
    }
    
    // Sort items
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.price - b.price;
    });
    
    return filtered;
  }, [items, filter, sortBy]);

  return (
    <div className="optimized-list">
      {processedItems.map(item => (
        <MemoizedListItem 
          key={item.id}
          item={item}
          onClick={onItemClick}
        />
      ))}
    </div>
  );
});

// Memoized list item to prevent unnecessary re-renders
const MemoizedListItem = memo<{
  item: ListItem;
  onClick: (item: ListItem) => void;
}>(({ item, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(item);
  }, [item, onClick]);

  return (
    <div className="list-item" onClick={handleClick}>
      <h3>{item.name}</h3>
      <p>{item.category}</p>
      <span>${item.price.toFixed(2)}</span>
    </div>
  );
});
```

## 📋 Interview Checklist

### Before You Start Coding
- [ ] Understand the requirements clearly
- [ ] Ask about edge cases
- [ ] Clarify the data structure
- [ ] Discuss accessibility requirements
- [ ] Ask about browser support

### While Coding
- [ ] Start with TypeScript interfaces
- [ ] Handle loading and error states
- [ ] Add proper event handlers
- [ ] Include accessibility attributes
- [ ] Use semantic HTML
- [ ] Add data-testid attributes for testing

### Component Architecture
- [ ] Single responsibility principle
- [ ] Proper props interface
- [ ] Reasonable default values
- [ ] Memoization where appropriate
- [ ] Clean separation of concerns

### Performance Considerations
- [ ] Avoid unnecessary re-renders
- [ ] Use useMemo for expensive calculations
- [ ] Use useCallback for event handlers
- [ ] Consider React.memo for expensive components
- [ ] Implement proper key props for lists

### Error Handling
- [ ] Handle API errors gracefully
- [ ] Validate user input
- [ ] Provide meaningful error messages
- [ ] Don't crash the entire app

### Testing Considerations
- [ ] Add data-testid attributes
- [ ] Write testable components
- [ ] Avoid tight coupling
- [ ] Mock external dependencies
- [ ] Test user interactions

## 🎤 Common Interview Questions

### **Q: "Build a component that fetches and displays a list of items"**

**Approach:**
1. Create interface for item type
2. Use custom hook for data fetching
3. Handle loading/error states
4. Implement search/filter functionality
5. Add proper accessibility

### **Q: "How would you optimize this component's performance?"**

**Key Points:**
- React.memo for component memoization
- useMemo for expensive calculations
- useCallback for event handlers
- Proper key props for lists
- Code splitting for large components

### **Q: "How do you handle form validation?"**

**Approach:**
1. Use controlled components
2. Validate on blur and submit
3. Show errors conditionally
4. Clear errors when user starts typing
5. Prevent submission if invalid

### **Q: "How would you test this component?"**

**Testing Strategy:**
- Unit tests for component logic
- Integration tests for user interactions
- Mock external dependencies
- Test accessibility features
- Snapshot tests for UI consistency

## 🚀 Advanced Patterns

### Custom Hooks for Reusability
```typescript
// Custom hook for managing modal state
function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  
  return { isOpen, open, close, toggle };
}

// Custom hook for localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}
```

### Compound Components Pattern
```typescript
// Modal compound component
interface ModalContextType {
  isOpen: boolean;
  close: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function Modal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const close = useCallback(() => setIsOpen(false), []);
  
  return (
    <ModalContext.Provider value={{ isOpen, close }}>
      {children}
    </ModalContext.Provider>
  );
}

Modal.Trigger = function ModalTrigger({ children }: { children: React.ReactNode }) {
  const context = useContext(ModalContext);
  if (!context) throw new Error('Modal.Trigger must be used within Modal');
  
  return (
    <button onClick={() => context.setIsOpen(true)}>
      {children}
    </button>
  );
};

Modal.Content = function ModalContent({ children }: { children: React.ReactNode }) {
  const { isOpen, close } = useContext(ModalContext)!;
  
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

// Usage:
<Modal>
  <Modal.Trigger>Open Modal</Modal.Trigger>
  <Modal.Content>
    <h2>Modal Title</h2>
    <p>Modal content goes here</p>
  </Modal.Content>
</Modal>
```

## 💡 Pro Tips

1. **Always think about the user experience** - loading states, error messages, accessibility
2. **Start simple, then add complexity** - get the basic functionality working first
3. **Ask questions during the interview** - clarify requirements, discuss trade-offs
4. **Think out loud** - explain your reasoning and decision-making process
5. **Consider edge cases** - empty states, network failures, invalid data
6. **Use TypeScript effectively** - proper typing shows professionalism
7. **Focus on reusability** - build components that can be used in multiple contexts
8. **Performance matters** - but don't over-optimize prematurely

Remember: Interviewers want to see how you think and solve problems, not just if you can write perfect code immediately!
