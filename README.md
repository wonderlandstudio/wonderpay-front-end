# WonderPay Frontend Documentation

## Overview

WonderPay is a private bill pay and payments automation platform designed for clients, partners, and colleagues in music, entertainment, and luxury hospitality. The platform streamlines Accounts Payable (AP) & Accounts Receivable (AR) operations while offering working capital solutions.

## User Flow

### Authentication Flow
1. **Landing Page** (`/`)
   - Initial entry point
   - Call-to-action for signup/login
   - Overview of platform features

2. **Authentication** (`/login`)
   - Email/password login
   - OAuth providers integration
   - Password reset functionality
   - New account creation

### Main Application Flow

1. **Dashboard** (`/dashboard`)
   - Overview metrics
   - Recent transactions
   - Quick action buttons
   - Financial charts
   - Components:
     - `OverviewSection`: Displays financial metrics and charts
     - `TransactionsList`: Recent activity feed
     - `StatusCard`: Individual metric displays

2. **Bill Pay** (`/dashboard/bill-pay`)
   - List of bills to pay
   - Filtering and sorting options
   - Payment scheduling
   - Components:
     - `BillPayHeader`: Navigation and actions
     - `BillPayFilters`: Search and filter controls
     - `TransactionsList`: Bill listings
     - `TransactionItem`: Individual bill display
     - `PaymentDialog`: Payment processing modal

3. **New Bill** (`/dashboard/bill-pay/new`)
   - Bill creation form
   - Vendor selection
   - Amount and due date input
   - Components:
     - `BillForm`: Main form component
     - `VendorSelector`: Vendor search and selection
     - `DatePicker`: Due date selection
     - `AmountInput`: Monetary input with validation

4. **Invoice Details** (`/dashboard/bill-pay/:invoiceId`)
   - Detailed bill information
   - Payment history
   - Status updates
   - Components:
     - `InvoiceHeader`: Title and actions
     - `InvoiceDetails`: Line items and totals
     - `PaymentHistory`: Transaction log
     - `StatusUpdates`: Timeline of changes

5. **Invoice Generator** (`/dashboard/bill-pay/generate`)
   - Multi-step invoice creation
   - PDF preview
   - Components:
     - `InvoiceSteps`: Step indicator
     - `CompanyDetailsForm`: Business information
     - `InvoiceDetailsForm`: Line items and amounts
     - `InvoiceTermsForm`: Payment terms
     - `PaymentDetailsForm`: Payment method setup
     - `InvoicePDFDocument`: PDF generation

6. **Receivables** (`/dashboard/receivables`)
   - Invoice management
   - Payment tracking
   - Components:
     - `ReceivablesList`: Invoice listings
     - `ReceivableItem`: Individual invoice
     - `StatusCard`: Payment status display
     - `FilterControls`: Search and filtering

7. **Settings Pages**
   - Profile management
   - Organization settings
   - Team management
   - Payment methods
   - Components:
     - `SettingsLayout`: Common layout wrapper
     - `SettingsSidebar`: Navigation menu
     - Various settings forms for each section

## Component Architecture

### Layout Components

1. **DashboardLayout**
   - Purpose: Main application wrapper
   - Location: `src/components/layout/DashboardLayout.tsx`
   - Features:
     - Responsive sidebar
     - Header with notifications
     - Content area management
     - Authentication check

2. **Header**
   - Purpose: Top navigation bar
   - Location: `src/components/layout/Header.tsx`
   - Features:
     - User profile menu
     - Notifications
     - Quick actions
     - Search functionality

3. **Sidebar**
   - Purpose: Main navigation
   - Location: `src/components/layout/Sidebar.tsx`
   - Features:
     - Navigation links
     - Collapsible sections
     - Active state management

### Bill Pay Components

1. **BillPayHeader**
   - Purpose: Section header with actions
   - Location: `src/components/bill-pay/BillPayHeader.tsx`
   - Features:
     - Add new bill button
     - Section title
     - Action buttons

2. **TransactionsList**
   - Purpose: Display bill listings
   - Location: `src/components/bill-pay/TransactionsList.tsx`
   - Features:
     - Virtualized list
     - Sort functionality
     - Filter implementation
     - Status indicators

3. **TransactionItem**
   - Purpose: Individual bill display
   - Location: `src/components/bill-pay/TransactionItem.tsx`
   - Features:
     - Payment status
     - Due date display
     - Amount formatting
     - Action buttons

4. **StatusCard**
   - Purpose: Financial metric display
   - Location: `src/components/bill-pay/StatusCard.tsx`
   - Features:
     - Amount formatting
     - Status indication
     - Visual styling

### Invoice Components

1. **InvoiceGenerator**
   - Purpose: Create new invoices
   - Location: `src/components/invoice/InvoiceGenerator.tsx`
   - Features:
     - Multi-step form
     - Form validation
     - PDF preview
     - Save/submit actions

2. **InvoiceDetailsForm**
   - Purpose: Invoice line items
   - Location: `src/components/invoice/InvoiceDetailsForm.tsx`
   - Features:
     - Dynamic line items
     - Tax calculation
     - Total computation
     - Currency handling

3. **CompanyDetailsForm**
   - Purpose: Business information
   - Location: `src/components/invoice/CompanyDetailsForm.tsx`
   - Features:
     - Company details input
     - Logo upload
     - Address management

4. **PaymentDetailsForm**
   - Purpose: Payment method setup
   - Location: `src/components/invoice/PaymentDetailsForm.tsx`
   - Features:
     - Payment terms
     - Method selection
     - Due date setting

### Payment Components

1. **PaymentDialog**
   - Purpose: Process payments
   - Location: `src/components/payments/PaymentDialog.tsx`
   - Features:
     - Payment method selection
     - Amount confirmation
     - Processing status
     - Success/error handling

2. **PaymentMethodSelector**
   - Purpose: Choose payment method
   - Location: `src/components/payments/PaymentMethodSelector.tsx`
   - Features:
     - Saved methods list
     - Add new method
     - Default selection

### Form Components

1. **AddressForm**
   - Purpose: Address input
   - Location: `src/components/forms/AddressForm.tsx`
   - Features:
     - Address validation
     - Format standardization
     - Google Places integration

2. **CardForm**
   - Purpose: Credit card input
   - Location: `src/components/forms/CardForm.tsx`
   - Features:
     - Card validation
     - Number formatting
     - Security features

## State Management

### Authentication State
- Managed through Supabase Auth context
- User session handling
- Permission checks
- Token management

### Application State
- React Query for server state
- Context for global settings
- Local state for UI components
- Form state management

## UI/UX Implementation

### Design System
- Consistent color palette
- Typography scale
- Spacing system
- Component variants

### Responsive Design
- Mobile-first approach
- Breakpoint system
- Flexible layouts
- Touch interactions

### Accessibility
- ARIA labels
- Keyboard navigation
- Screen reader support
- Focus management

## Error Handling

### Form Validation
- Input validation
- Error messages
- Field highlighting
- Submit prevention

### API Errors
- Error boundaries
- Toast notifications
- Retry mechanisms
- Fallback UI

## Performance Optimization

### Code Splitting
- Route-based splitting
- Component lazy loading
- Dynamic imports
- Bundle optimization

### Caching Strategy
- React Query caching
- Local storage
- Memory caching
- Cache invalidation

## Development Guidelines

### Component Creation
1. Create new file in appropriate directory
2. Import necessary dependencies
3. Define TypeScript interfaces
4. Implement component logic
5. Add proper documentation
6. Include test coverage

### State Management
1. Determine state scope
2. Choose appropriate solution
3. Implement state logic
4. Add error handling
5. Optimize performance

### Styling Approach
1. Use Tailwind classes
2. Follow mobile-first
3. Implement dark mode
4. Ensure accessibility
5. Test responsiveness

This documentation provides a comprehensive guide for rebuilding the WonderPay frontend, including detailed component breakdowns, user flows, and implementation guidelines.