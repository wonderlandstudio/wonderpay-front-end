# Architecture

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # Base UI components
│   ├── layout/        # Layout components
│   ├── bill-pay/      # Bill pay related components
│   ├── invoice/       # Invoice related components
│   └── payments/      # Payment related components
├── contexts/          # React contexts
├── hooks/             # Custom React hooks
├── integrations/      # Third-party integrations
├── pages/             # Page components
├── services/          # API services
├── types/             # TypeScript types
└── utils/            # Utility functions
```

## Key Concepts

### Component Architecture
- Atomic design principles
- Component composition
- Props interface definitions
- Consistent styling patterns

### Data Flow
1. UI Components trigger actions
2. Services handle API calls
3. State management via React Query
4. UI updates based on state changes

### Error Handling
- Global error boundary
- Service-level error handling
- User-friendly error messages
- Toast notifications

### Performance
- Code splitting
- Lazy loading
- Memoization
- Optimistic updates