# State Management

## Authentication State

### Supabase Auth
- User session management
- Token handling
- Permission checks
- Protected routes

### Application State
- React Query for server state
- Context for global settings
- Local state for UI components

## Data Fetching

### React Query Implementation
```typescript
const { data, isLoading } = useQuery({
  queryKey: ['bills'],
  queryFn: fetchBills,
});
```

### Mutations
```typescript
const mutation = useMutation({
  mutationFn: createBill,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['bills'] });
  },
});
```

## Caching Strategy
- React Query caching
- Local storage persistence
- Cache invalidation rules
- Optimistic updates

## Global State
- Theme settings
- User preferences
- Application configuration
- Toast notifications