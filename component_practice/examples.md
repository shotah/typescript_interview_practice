# React Component Examples - DoorDash Interview Prep

## 🍕 DoorDash-Style Components

### 1. Restaurant Card Component

```typescript
// src/components/RestaurantCard/RestaurantCard.tsx
import React from 'react';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  imageUrl: string;
  isOpen: boolean;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
}

export function RestaurantCard({ restaurant, onSelect }: RestaurantCardProps) {
  const handleClick = () => {
    if (restaurant.isOpen) {
      onSelect(restaurant);
    }
  };

  return (
    <div 
      className={`restaurant-card ${!restaurant.isOpen ? 'closed' : ''}`}
      onClick={handleClick}
      data-testid={`restaurant-${restaurant.id}`}
    >
      <img 
        src={restaurant.imageUrl} 
        alt={restaurant.name}
        className="restaurant-image"
      />
      
      <div className="restaurant-info">
        <h3>{restaurant.name}</h3>
        <p className="cuisine">{restaurant.cuisine}</p>
        
        <div className="restaurant-meta">
          <span className="rating">⭐ {restaurant.rating}</span>
          <span className="delivery-time">{restaurant.deliveryTime}</span>
          <span className="delivery-fee">
            {restaurant.deliveryFee === 0 ? 'Free delivery' : `$${restaurant.deliveryFee} delivery`}
          </span>
        </div>
        
        {!restaurant.isOpen && (
          <div className="closed-overlay">
            <span>Currently Closed</span>
          </div>
        )}
      </div>
    </div>
  );
}
```

### 2. Order Tracking Component

```typescript
// src/components/OrderTracker/OrderTracker.tsx
import React, { useState, useEffect } from 'react';

type OrderStatus = 'placed' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';

interface Order {
  id: string;
  status: OrderStatus;
  estimatedDeliveryTime: string;
  restaurant: {
    name: string;
    phone: string;
  };
  driver?: {
    name: string;
    phone: string;
    location: { lat: number; lng: number };
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

interface OrderTrackerProps {
  orderId: string;
}

export function OrderTracker({ orderId }: OrderTrackerProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) {
          throw new Error('Order not found');
        }
        const orderData = await response.json();
        setOrder(orderData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load order');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchOrder, 30000);
    
    return () => clearInterval(interval);
  }, [orderId]);

  const getStatusMessage = (status: OrderStatus): string => {
    const messages = {
      placed: 'Order placed successfully',
      confirmed: 'Restaurant is preparing your order',
      preparing: 'Your food is being prepared',
      out_for_delivery: 'Your order is on the way!',
      delivered: 'Order delivered!'
    };
    return messages[status];
  };

  const getProgressPercentage = (status: OrderStatus): number => {
    const progress = {
      placed: 20,
      confirmed: 40,
      preparing: 60,
      out_for_delivery: 80,
      delivered: 100
    };
    return progress[status];
  };

  if (loading) return <div className="loading">Loading order details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!order) return <div className="not-found">Order not found</div>;

  return (
    <div className="order-tracker" data-testid="order-tracker">
      <h2>Order #{order.id}</h2>
      
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${getProgressPercentage(order.status)}%` }}
          />
        </div>
        <p className="status-message">{getStatusMessage(order.status)}</p>
      </div>

      {/* Order Details */}
      <div className="order-details">
        <h3>From {order.restaurant.name}</h3>
        <p>Estimated delivery: {order.estimatedDeliveryTime}</p>
        
        {/* Items */}
        <div className="order-items">
          <h4>Your Items:</h4>
          {order.items.map((item, index) => (
            <div key={index} className="order-item">
              <span>{item.quantity}x {item.name}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Driver Info */}
        {order.driver && order.status === 'out_for_delivery' && (
          <div className="driver-info">
            <h4>Your Driver: {order.driver.name}</h4>
            <button onClick={() => window.open(`tel:${order.driver!.phone}`)}>
              Call Driver
            </button>
          </div>
        )}

        {/* Restaurant Contact */}
        <div className="restaurant-contact">
          <button onClick={() => window.open(`tel:${order.restaurant.phone}`)}>
            Call Restaurant
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 3. Food Item Selection Component

```typescript
// src/components/FoodItem/FoodItem.tsx
import React, { useState } from 'react';

interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
  customizations?: Array<{
    name: string;
    options: Array<{
      name: string;
      price: number;
    }>;
    required: boolean;
  }>;
}

interface CartItem extends FoodItem {
  quantity: number;
  selectedCustomizations: Record<string, string>;
}

interface FoodItemProps {
  item: FoodItem;
  onAddToCart: (cartItem: CartItem) => void;
}

export function FoodItemComponent({ item, onAddToCart }: FoodItemProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<Record<string, string>>({});
  const [showCustomizations, setShowCustomizations] = useState(false);

  const handleCustomizationChange = (customizationName: string, optionName: string) => {
    setSelectedCustomizations(prev => ({
      ...prev,
      [customizationName]: optionName
    }));
  };

  const validateCustomizations = (): boolean => {
    if (!item.customizations) return true;
    
    return item.customizations.every(customization => {
      if (customization.required) {
        return selectedCustomizations[customization.name];
      }
      return true;
    });
  };

  const calculateTotalPrice = (): number => {
    let total = item.price * quantity;
    
    if (item.customizations) {
      item.customizations.forEach(customization => {
        const selectedOption = selectedCustomizations[customization.name];
        if (selectedOption) {
          const option = customization.options.find(opt => opt.name === selectedOption);
          if (option) {
            total += option.price * quantity;
          }
        }
      });
    }
    
    return total;
  };

  const handleAddToCart = () => {
    if (!validateCustomizations()) {
      alert('Please select all required customizations');
      return;
    }

    const cartItem: CartItem = {
      ...item,
      quantity,
      selectedCustomizations
    };

    onAddToCart(cartItem);
    
    // Reset form
    setQuantity(1);
    setSelectedCustomizations({});
    setShowCustomizations(false);
  };

  if (!item.isAvailable) {
    return (
      <div className="food-item unavailable" data-testid={`food-item-${item.id}`}>
        <img src={item.image} alt={item.name} />
        <div className="item-info">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p className="price">${item.price.toFixed(2)}</p>
          <p className="unavailable-text">Currently Unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="food-item" data-testid={`food-item-${item.id}`}>
      <img src={item.image} alt={item.name} />
      
      <div className="item-info">
        <h3>{item.name}</h3>
        <p className="description">{item.description}</p>
        <p className="price">${item.price.toFixed(2)}</p>

        <button 
          className="customize-btn"
          onClick={() => setShowCustomizations(!showCustomizations)}
        >
          {showCustomizations ? 'Hide Options' : 'Customize'}
        </button>

        {showCustomizations && (
          <div className="customizations">
            {/* Quantity */}
            <div className="quantity-selector">
              <label>Quantity:</label>
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            {/* Customizations */}
            {item.customizations?.map(customization => (
              <div key={customization.name} className="customization-group">
                <h4>
                  {customization.name} 
                  {customization.required && <span className="required">*</span>}
                </h4>
                
                {customization.options.map(option => (
                  <label key={option.name} className="customization-option">
                    <input
                      type="radio"
                      name={customization.name}
                      value={option.name}
                      checked={selectedCustomizations[customization.name] === option.name}
                      onChange={() => handleCustomizationChange(customization.name, option.name)}
                    />
                    <span>
                      {option.name} 
                      {option.price > 0 && <span className="option-price">+${option.price.toFixed(2)}</span>}
                    </span>
                  </label>
                ))}
              </div>
            ))}

            <div className="add-to-cart-section">
              <p className="total-price">Total: ${calculateTotalPrice().toFixed(2)}</p>
              <button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

### 4. Shopping Cart Component

```typescript
// src/components/ShoppingCart/ShoppingCart.tsx
import React from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedCustomizations: Record<string, string>;
}

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
  deliveryFee: number;
  tax: number;
}

export function ShoppingCart({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout, 
  deliveryFee, 
  tax 
}: ShoppingCartProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryFee + tax;

  if (items.length === 0) {
    return (
      <div className="shopping-cart empty" data-testid="shopping-cart">
        <h2>Your Cart</h2>
        <p>Your cart is empty</p>
        <p>Add some delicious items to get started!</p>
      </div>
    );
  }

  return (
    <div className="shopping-cart" data-testid="shopping-cart">
      <h2>Your Cart ({items.length} items)</h2>
      
      <div className="cart-items">
        {items.map(item => (
          <div key={`${item.id}-${JSON.stringify(item.selectedCustomizations)}`} className="cart-item">
            <div className="item-details">
              <h4>{item.name}</h4>
              
              {/* Show customizations */}
              {Object.keys(item.selectedCustomizations).length > 0 && (
                <div className="customizations">
                  {Object.entries(item.selectedCustomizations).map(([key, value]) => (
                    <p key={key} className="customization">
                      {key}: {value}
                    </p>
                  ))}
                </div>
              )}
              
              <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
            </div>

            <div className="quantity-controls">
              <button 
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="quantity">{item.quantity}</span>
              <button 
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
              <button 
                onClick={() => onRemoveItem(item.id)}
                className="remove-btn"
                aria-label="Remove item"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-line">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="summary-line">
          <span>Delivery Fee:</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        
        <div className="summary-line">
          <span>Tax:</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="summary-line total">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button 
          className="checkout-btn"
          onClick={onCheckout}
          disabled={items.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
```

### 5. Address Search Component

```typescript
// src/components/AddressSearch/AddressSearch.tsx
import React, { useState, useEffect, useRef } from 'react';

interface Address {
  id: string;
  formatted: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface AddressSearchProps {
  onAddressSelect: (address: Address) => void;
  placeholder?: string;
  initialValue?: string;
}

export function AddressSearch({ 
  onAddressSelect, 
  placeholder = "Enter delivery address",
  initialValue = ""
}: AddressSearchProps) {
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/geocode/search?q=${encodeURIComponent(query)}`);
        const addresses = await response.json();
        setSuggestions(addresses);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Address search failed:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          selectAddress(suggestions[selectedIndex]);
        }
        break;
      
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const selectAddress = (address: Address) => {
    setQuery(address.formatted);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    onAddressSelect(address);
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }, 200);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `/api/geocode/reverse?lat=${latitude}&lng=${longitude}`
          );
          const address = await response.json();
          selectAddress(address);
        } catch (error) {
          console.error('Reverse geocoding failed:', error);
          alert('Could not determine your address');
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Could not access your location');
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="address-search" data-testid="address-search">
      <div className="search-input-container">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleInputBlur}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder={placeholder}
          className="address-input"
          data-testid="address-input"
        />
        
        <button
          type="button"
          onClick={getCurrentLocation}
          className="location-btn"
          disabled={isLoading}
          aria-label="Use current location"
        >
          📍
        </button>
      </div>

      {isLoading && (
        <div className="loading-indicator">Searching...</div>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="suggestions-dropdown"
          data-testid="address-suggestions"
        >
          {suggestions.map((address, index) => (
            <div
              key={address.id}
              className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => selectAddress(address)}
              data-testid={`suggestion-${index}`}
            >
              <div className="address-main">{address.formatted}</div>
              <div className="address-details">
                {address.city}, {address.state} {address.zipCode}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## 🧪 Component Testing Examples

### Testing the Restaurant Card

```typescript
// src/components/RestaurantCard/__tests__/RestaurantCard.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RestaurantCard } from '../RestaurantCard';

const mockRestaurant = {
  id: '1',
  name: 'Pizza Palace',
  cuisine: 'Italian',
  rating: 4.5,
  deliveryTime: '30-45 min',
  deliveryFee: 2.99,
  imageUrl: 'https://example.com/pizza.jpg',
  isOpen: true
};

describe('RestaurantCard', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it('renders restaurant information correctly', () => {
    render(<RestaurantCard restaurant={mockRestaurant} onSelect={mockOnSelect} />);
    
    expect(screen.getByText('Pizza Palace')).toBeInTheDocument();
    expect(screen.getByText('Italian')).toBeInTheDocument();
    expect(screen.getByText('⭐ 4.5')).toBeInTheDocument();
    expect(screen.getByText('30-45 min')).toBeInTheDocument();
    expect(screen.getByText('$2.99 delivery')).toBeInTheDocument();
  });

  it('calls onSelect when clicked and restaurant is open', () => {
    render(<RestaurantCard restaurant={mockRestaurant} onSelect={mockOnSelect} />);
    
    fireEvent.click(screen.getByTestId('restaurant-1'));
    
    expect(mockOnSelect).toHaveBeenCalledWith(mockRestaurant);
  });

  it('does not call onSelect when restaurant is closed', () => {
    const closedRestaurant = { ...mockRestaurant, isOpen: false };
    render(<RestaurantCard restaurant={closedRestaurant} onSelect={mockOnSelect} />);
    
    fireEvent.click(screen.getByTestId('restaurant-1'));
    
    expect(mockOnSelect).not.toHaveBeenCalled();
  });

  it('shows closed overlay when restaurant is closed', () => {
    const closedRestaurant = { ...mockRestaurant, isOpen: false };
    render(<RestaurantCard restaurant={closedRestaurant} onSelect={mockOnSelect} />);
    
    expect(screen.getByText('Currently Closed')).toBeInTheDocument();
  });

  it('shows free delivery when delivery fee is 0', () => {
    const freeDeliveryRestaurant = { ...mockRestaurant, deliveryFee: 0 };
    render(<RestaurantCard restaurant={freeDeliveryRestaurant} onSelect={mockOnSelect} />);
    
    expect(screen.getByText('Free delivery')).toBeInTheDocument();
  });
});
```

### Testing the Shopping Cart

```typescript
// src/components/ShoppingCart/__tests__/ShoppingCart.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ShoppingCart } from '../ShoppingCart';

const mockItems = [
  {
    id: '1',
    name: 'Margherita Pizza',
    price: 12.99,
    quantity: 2,
    selectedCustomizations: { size: 'Large', crust: 'Thin' }
  },
  {
    id: '2',
    name: 'Caesar Salad',
    price: 8.99,
    quantity: 1,
    selectedCustomizations: {}
  }
];

describe('ShoppingCart', () => {
  const mockProps = {
    items: mockItems,
    onUpdateQuantity: jest.fn(),
    onRemoveItem: jest.fn(),
    onCheckout: jest.fn(),
    deliveryFee: 2.99,
    tax: 2.50
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders cart items correctly', () => {
    render(<ShoppingCart {...mockProps} />);
    
    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument();
    expect(screen.getByText('Caesar Salad')).toBeInTheDocument();
    expect(screen.getByText('Your Cart (2 items)')).toBeInTheDocument();
  });

  it('shows customizations for items that have them', () => {
    render(<ShoppingCart {...mockProps} />);
    
    expect(screen.getByText('size: Large')).toBeInTheDocument();
    expect(screen.getByText('crust: Thin')).toBeInTheDocument();
  });

  it('calculates totals correctly', () => {
    render(<ShoppingCart {...mockProps} />);
    
    // Subtotal: (12.99 * 2) + (8.99 * 1) = 34.97
    expect(screen.getByText('$34.97')).toBeInTheDocument();
    // Delivery fee
    expect(screen.getByText('$2.99')).toBeInTheDocument();
    // Tax
    expect(screen.getByText('$2.50')).toBeInTheDocument();
    // Total: 34.97 + 2.99 + 2.50 = 40.46
    expect(screen.getByText('$40.46')).toBeInTheDocument();
  });

  it('calls onUpdateQuantity when quantity buttons are clicked', () => {
    render(<ShoppingCart {...mockProps} />);
    
    const increaseButtons = screen.getAllByLabelText('Increase quantity');
    fireEvent.click(increaseButtons[0]);
    
    expect(mockProps.onUpdateQuantity).toHaveBeenCalledWith('1', 3);
  });

  it('calls onRemoveItem when remove button is clicked', () => {
    render(<ShoppingCart {...mockProps} />);
    
    const removeButtons = screen.getAllByLabelText('Remove item');
    fireEvent.click(removeButtons[0]);
    
    expect(mockProps.onRemoveItem).toHaveBeenCalledWith('1');
  });

  it('shows empty cart message when no items', () => {
    render(<ShoppingCart {...mockProps} items={[]} />);
    
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText('Add some delicious items to get started!')).toBeInTheDocument();
  });

  it('disables checkout button when cart is empty', () => {
    render(<ShoppingCart {...mockProps} items={[]} />);
    
    // Should not render checkout button when empty
    expect(screen.queryByText('Proceed to Checkout')).not.toBeInTheDocument();
  });
});
```

## 🎯 Common Interview Patterns

### Error Boundaries

```typescript
// src/components/ErrorBoundary/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Send error to monitoring service
    // reportError(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary">
          <h2>Oops! Something went wrong.</h2>
          <p>We're sorry for the inconvenience. Please try refreshing the page.</p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Higher-Order Component (HOC)

```typescript
// src/hocs/withLoading.tsx
import React from 'react';

interface WithLoadingProps {
  isLoading: boolean;
}

export function withLoading<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  return function WithLoadingComponent(props: T & WithLoadingProps) {
    const { isLoading, ...restProps } = props;
    
    if (isLoading) {
      return <div className="loading-spinner">Loading...</div>;
    }
    
    return <WrappedComponent {...(restProps as T)} />;
  };
}

// Usage:
const RestaurantListWithLoading = withLoading(RestaurantList);
```

### Render Props Pattern

```typescript
// src/components/DataFetcher/DataFetcher.tsx
import React, { useState, useEffect } from 'react';

interface DataFetcherProps<T> {
  url: string;
  children: (data: {
    data: T | null;
    loading: boolean;
    error: string | null;
  }) => React.ReactNode;
}

export function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return <>{children({ data, loading, error })}</>;
}

// Usage:
<DataFetcher<Restaurant[]> url="/api/restaurants">
  {({ data, loading, error }) => {
    if (loading) return <div>Loading restaurants...</div>;
    if (error) return <div>Error: {error}</div>;
    return <RestaurantList restaurants={data || []} />;
  }}
</DataFetcher>
```

This examples file gives you practical, interview-ready React components that are specifically tailored to food delivery scenarios like DoorDash. Each example includes proper TypeScript typing, error handling, and accessibility considerations that interviewers look for!
