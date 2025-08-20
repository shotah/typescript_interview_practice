# Express Examples - DoorDash Interview Prep

## 🔥 Async Error Handling Patterns

### The Problem: Async Errors Get Lost

```typescript
// ❌ This won't work properly - async errors get lost!
app.get('/orders/:id', async (req, res, next) => {
  const order = await Order.findById(req.params.id); // If this throws...
  res.json(order); // ...error never reaches your 4-param handler!
});
```

**Why?** Express doesn't automatically catch async errors. They become **unhandled promise rejections**.

### The Solution: AsyncHandler Wrapper

```typescript
// 1. Define the async wrapper
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// 2. Use it to wrap your async route handler
app.get('/orders/:id', asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
}));
```

### Execution Flow

```
Request → asyncHandler → Your async function
                           ↓
                        Error occurs
                           ↓
                    .catch(next) captures it
                           ↓
                    Calls next(error)
                           ↓
                  4-param error middleware
```

### Why Promise.resolve()?

**Interview Gold:** `Promise.resolve()` handles **all three cases**:

```typescript
// Case 1: Async function returning Promise
async (req, res) => { await something(); } // Promise.resolve wraps the Promise

// Case 2: Sync function returning value  
(req, res) => { return "hello"; } // Promise.resolve creates Promise from value

// Case 3: Sync function throwing
(req, res) => { throw new Error("oops"); } // Promise.resolve catches sync throws too
```

## 🎯 4-Parameter Error Middleware

### The Magic of 4 Parameters

```typescript
// ✅ ERROR MIDDLEWARE - Express recognizes this by the 4 parameters
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({error: err.message || 'Internal Server Error'});
});

// ❌ REGULAR MIDDLEWARE - Only 3 parameters
app.use((req: Request, res: Response, next: NextFunction) => {
  // This won't catch errors!
});
```

### How to Trigger Error Middleware

```typescript
// Method 1: Pass error to next()
app.get('/error-route', (req, res, next) => {
  const error = new Error('Something went wrong!');
  next(error); // This triggers your error middleware
});

// Method 2: Async errors need special handling
app.get('/async-error', async (req, res, next) => {
  try {
    await someAsyncOperation();
  } catch (error) {
    next(error); // Pass to error middleware
  }
});

// Method 3: Thrown errors in sync routes
app.get('/sync-error', (req, res, next) => {
  throw new Error('Sync error'); // Auto-caught by Express
});
```

### Enhanced Error Handling for APIs

```typescript
// DoorDash-style error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error on ${req.method} ${req.path}:`, err.stack);
  
  // Different error types for different status codes
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Invalid input',
      details: err.message
    });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Authentication required'
    });
  }
  
  if (err.name === 'OrderNotFoundError') {
    return res.status(404).json({
      error: 'Order not found'
    });
  }
  
  // Generic 500 error
  res.status(500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error' 
      : err.message
  });
});
```

### Passing Errors to Next Handler

```typescript
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'SpecialError') {
    // Handle this error
    return res.status(400).json({error: err.message});
  }
  
  // Pass other errors to next error handler
  next(err);
});
```

## 🍕 Real DoorDash Examples

### Order Management API

```typescript
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Get order details
app.get('/api/orders/:orderId', asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  
  // This could throw various errors:
  const order = await Order.findById(orderId); // Database error
  if (!order) {
    const error = new Error('Order not found');
    error.name = 'OrderNotFoundError';
    throw error; // Gets caught by asyncHandler!
  }
  
  const restaurant = await Restaurant.findById(order.restaurantId); // Another potential error
  const driver = await Driver.findById(order.driverId); // Yet another potential error
  
  res.json({
    order,
    restaurant: restaurant.name,
    driver: driver.name,
    estimatedDelivery: order.estimatedDelivery
  });
}));

// Update order status
app.patch('/api/orders/:orderId/status', asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  
  if (!['preparing', 'out_for_delivery', 'delivered'].includes(status)) {
    const error = new Error('Invalid order status');
    error.name = 'ValidationError';
    throw error; // Caught and sent to error handler
  }
  
  const updatedOrder = await Order.findByIdAndUpdate(
    orderId, 
    { status, updatedAt: new Date() }, 
    { new: true }
  );
  
  if (!updatedOrder) {
    const error = new Error('Order not found');
    error.name = 'OrderNotFoundError'; 
    throw error;
  }
  
  res.json(updatedOrder);
}));

// Create new order
app.post('/api/orders', asyncHandler(async (req, res) => {
  const { restaurantId, items, deliveryAddress, customerId } = req.body;
  
  // Validation
  if (!restaurantId || !items || !deliveryAddress || !customerId) {
    const error = new Error('Missing required fields: restaurantId, items, deliveryAddress, customerId');
    error.name = 'ValidationError';
    throw error;
  }
  
  // Check if restaurant exists and is open
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    const error = new Error('Restaurant not found');
    error.name = 'OrderNotFoundError';
    throw error;
  }
  
  if (!restaurant.isOpen) {
    const error = new Error('Restaurant is currently closed');
    error.name = 'ValidationError';
    throw error;
  }
  
  // Calculate total and create order
  const total = calculateOrderTotal(items, restaurant.menu);
  const estimatedDelivery = calculateDeliveryTime(deliveryAddress, restaurant.location);
  
  const newOrder = await Order.create({
    restaurantId,
    customerId,
    items,
    deliveryAddress,
    total,
    estimatedDelivery,
    status: 'pending',
    createdAt: new Date()
  });
  
  res.status(201).json(newOrder);
}));
```

### Restaurant Management

```typescript
// Get restaurants with filtering
app.get('/api/restaurants', asyncHandler(async (req, res) => {
  const { 
    cuisine, 
    location, 
    priceRange, 
    isOpen = true,
    limit = 20,
    offset = 0 
  } = req.query;
  
  const filters: any = {};
  
  if (cuisine) filters.cuisine = { $in: cuisine.split(',') };
  if (location) {
    // Geospatial query for nearby restaurants
    filters.location = {
      $near: {
        $geometry: { type: 'Point', coordinates: location.split(',').map(Number) },
        $maxDistance: 5000 // 5km radius
      }
    };
  }
  if (priceRange) filters.priceRange = { $in: priceRange.split(',') };
  if (isOpen === 'true') filters.isOpen = true;
  
  const restaurants = await Restaurant
    .find(filters)
    .limit(parseInt(limit as string))
    .skip(parseInt(offset as string))
    .sort({ averageRating: -1 });
  
  const total = await Restaurant.countDocuments(filters);
  
  res.json({
    restaurants,
    pagination: {
      total,
      limit: parseInt(limit as string),
      offset: parseInt(offset as string),
      hasMore: total > parseInt(offset as string) + parseInt(limit as string)
    }
  });
}));

// Update restaurant status
app.patch('/api/restaurants/:restaurantId/status', asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  const { isOpen, closeReason } = req.body;
  
  if (typeof isOpen !== 'boolean') {
    const error = new Error('isOpen must be a boolean value');
    error.name = 'ValidationError';
    throw error;
  }
  
  const updateData: any = { isOpen, lastUpdated: new Date() };
  if (!isOpen && closeReason) {
    updateData.closeReason = closeReason;
  }
  
  const restaurant = await Restaurant.findByIdAndUpdate(
    restaurantId,
    updateData,
    { new: true }
  );
  
  if (!restaurant) {
    const error = new Error('Restaurant not found');
    error.name = 'OrderNotFoundError';
    throw error;
  }
  
  res.json(restaurant);
}));
```

## 🚀 Alternative Modern Approach

### Using express-async-errors Package

```typescript
// Install: npm install express-async-errors
import 'express-async-errors'; // Just import this at the top

// Now you can write async routes without wrappers:
app.get('/orders/:id', async (req, res) => {
  const order = await Order.findById(req.params.id); // Errors auto-caught!
  res.json(order);
});
```

### Alternative AsyncHandler Implementation

```typescript
// Different syntax for the same functionality
const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Or as a one-liner
const asyncHandler = fn => (req, res, next) => fn(req, res, next).catch(next);
```

## 🧪 Testing Error Handling

### Unit Tests for Error Scenarios

```typescript
import request from 'supertest';
import app from '../app';

describe('Order API Error Handling', () => {
  it('should return 404 for non-existent order', async () => {
    const response = await request(app)
      .get('/api/orders/nonexistent-id')
      .expect(404);
    
    expect(response.body.error).toBe('Order not found');
  });
  
  it('should return 400 for invalid order status', async () => {
    const response = await request(app)
      .patch('/api/orders/123/status')
      .send({ status: 'invalid-status' })
      .expect(400);
    
    expect(response.body.error).toBe('Invalid order status');
  });
  
  it('should handle database errors gracefully', async () => {
    // Mock the database to throw an error
    jest.mock('./models/Order');
    Order.findById.mockRejectedValue(new Error('Database connection failed'));
    
    const response = await request(app)
      .get('/api/orders/123')
      .expect(500);
    
    expect(response.body.error).toBe('Internal Server Error');
  });
});
```

## 🧠 Interview Questions & Answers

### Q: "What happens if you forget to use asyncHandler?"
**Answer:** 
- Unhandled promise rejections
- Server might crash or hang  
- Errors don't reach your error middleware
- In production, this could bring down your entire service

### Q: "What happens if you only use 3 parameters in error middleware?"
**Answer:** Express won't recognize it as error middleware - it becomes regular middleware and won't catch errors!

### Q: "Where should error middleware be placed?"
**Answer:** Always last - after all routes and other middleware

### Q: "How do you test async error handling?"
**Answer:** Mock dependencies to throw errors and verify the response status and error message

### Q: "What's the difference between throwing an error and calling next(error)?"
**Answer:** 
- `throw error` in sync code: Express auto-catches it
- `throw error` in async code: Becomes unhandled rejection (bad!)
- `next(error)` in both: Always works, explicitly passes to error middleware

## 📋 Quick Reference Checklist

### ✅ Error Handling Best Practices
- [ ] Use 4-parameter error middleware signature
- [ ] Place error middleware last in the stack
- [ ] Use asyncHandler for all async routes
- [ ] Return appropriate HTTP status codes
- [ ] Log errors with context (method, path, stack)
- [ ] Don't expose sensitive error details in production
- [ ] Test error scenarios with unit tests
- [ ] Use custom error types for different scenarios

### ✅ DoorDash-Specific Error Types
- [ ] OrderNotFoundError (404)
- [ ] ValidationError (400) 
- [ ] UnauthorizedError (401)
- [ ] RestaurantClosedError (400)
- [ ] DeliveryAreaError (400)
- [ ] PaymentError (402)

### ✅ Production Considerations
- [ ] Rate limiting for API endpoints
- [ ] Sanitize error messages
- [ ] Implement proper logging (Winston, etc.)
- [ ] Use error monitoring (Sentry, Rollbar)
- [ ] Circuit breaker pattern for external services
- [ ] Graceful degradation for non-critical features
