# Components

## Layout Components

### DashboardLayout
Main application wrapper with:
- Responsive sidebar
- Header with notifications
- Content area management

### Sidebar
Navigation component with:
- Collapsible menu
- Active state management
- User profile section

## Feature Components

### Bill Pay
- `BillPayHeader`: Section header with actions
- `TransactionsList`: Display bill listings
- `TransactionItem`: Individual bill display
- `StatusCard`: Financial metric display

### Invoice
- `InvoiceGenerator`: Multi-step form
- `InvoiceDetailsForm`: Line items management
- `CompanyDetailsForm`: Business information
- `PaymentDetailsForm`: Payment setup

### Payments
- `PaymentDialog`: Process payments
- `PaymentMethodSelector`: Payment method selection

## Form Components
- `AddressForm`: Address input and validation
- `CardForm`: Credit card input with validation

## UI Components
All components use Shadcn/UI and Tailwind CSS for consistent styling:
- Buttons
- Inputs
- Cards
- Dialogs
- Tables
- Toast notifications