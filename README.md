# WonderPay Frontend Documentation

## Overview

WonderPay is a private bill pay and payments automation platform designed for clients, partners, and colleagues in music, entertainment, and luxury hospitality. The platform streamlines Accounts Payable (AP) & Accounts Receivable (AR) operations while offering working capital solutions.

## Core Features

- **Bill Pay Management**: Create, track, and process bills with automated payment scheduling
- **Receivables Management**: Generate and manage invoices with real-time status tracking
- **Working Capital Solutions**: Access to WonderPay Capital for extended payment terms
- **Dashboard Analytics**: Overview of financial metrics and transaction history

## Tech Stack

### Core Technologies
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Query (@tanstack/react-query)
- **Authentication**: Supabase Auth
- **Form Handling**: React Hook Form with Zod validation

### Key Dependencies
```json
{
  "react": "^18.3.1",
  "react-router-dom": "^6.26.2",
  "@tanstack/react-query": "^5.56.2",
  "tailwindcss": "^3.4.11",
  "lucide-react": "^0.462.0",
  "date-fns": "^3.6.0",
  "zod": "^3.23.8"
}
```

## Project Structure

```
src/
├── components/
│   ├── bill-pay/          # Bill payment related components
│   ├── invoice/           # Invoice generation components
│   ├── layout/            # Layout components (Header, Sidebar)
│   ├── payments/          # Payment processing components
│   ├── receivables/       # Receivables management components
│   └── ui/               # Reusable UI components
├── contexts/             # React contexts
├── hooks/               # Custom React hooks
├── pages/              # Route components
├── services/           # API service layers
└── types/             # TypeScript type definitions
```

## Key Components

### Layout
- `DashboardLayout`: Main application layout with sidebar navigation
- `Header`: Top navigation bar with notifications
- `Sidebar`: Main navigation menu with user settings

### Bill Pay
- `BillPayHeader`: Header for bill pay section with action buttons
- `TransactionsList`: List of bill transactions
- `StatusCard`: Display card for bill payment status
- `PaymentDialog`: Modal for processing payments

### Invoices
- `InvoiceGenerator`: Multi-step form for creating invoices
- `InvoiceDetailsForm`: Form for invoice line items and details
- `CompanyDetailsForm`: Form for company information
- `PaymentDetailsForm`: Form for payment method details

## Routing Structure

```typescript
/                     # Landing page
/login                # Authentication
/dashboard            # Main dashboard
/dashboard/bill-pay   # Bill management
  ├── /new           # Create new bill
  ├── /:invoiceId    # Bill details
  └── /generate      # Generate invoice
/dashboard/receivables # Receivables management
/dashboard/settings    # User settings
  ├── /profile       # Profile settings
  ├── /address       # Address settings
  ├── /members       # Team members
  ├── /cards         # Payment methods
  ├── /bank-accounts # Bank accounts
  └── /accounting    # Accounting settings
```

## State Management

- **Authentication State**: Managed through Supabase Auth context
- **Settings**: Global settings context for user preferences
- **Data Fetching**: React Query for server state management
- **Forms**: React Hook Form for form state and validation

## UI/UX Guidelines

### Colors
- Primary brand colors are managed through CSS variables
- Consistent use of Tailwind's color palette
- Light/dark mode support through CSS classes

### Typography
- Font: Inter (Primary)
- Headings: Times New Roman (Brand elements)

### Components
All UI components are built on shadcn/ui, providing:
- Consistent styling
- Accessibility
- Dark mode support
- Responsive design

## Development Setup

1. **Prerequisites**
   - Node.js (Latest LTS version)
   - npm or yarn

2. **Installation**
   ```bash
   npm install
   ```

3. **Development Server**
   ```bash
   npm run dev
   ```

4. **Build**
   ```bash
   npm run build
   ```

## Best Practices

1. **Component Structure**
   - Keep components small and focused
   - Use TypeScript interfaces for props
   - Implement error boundaries where necessary

2. **State Management**
   - Use React Query for server state
   - Implement optimistic updates for better UX
   - Cache invalidation strategies for real-time updates

3. **Performance**
   - Lazy load routes and heavy components
   - Implement proper memoization
   - Use proper key props in lists

4. **Error Handling**
   - Implement proper error boundaries
   - Use toast notifications for user feedback
   - Proper form validation with error messages

## Contributing

1. Follow the existing code style and structure
2. Use TypeScript for all new components
3. Ensure responsive design for all new features
4. Write meaningful commit messages
5. Test across different browsers and devices

## Design System

The application uses a combination of shadcn/ui components and custom-styled elements. Key principles:

- Use Tailwind CSS for styling
- Follow mobile-first responsive design
- Maintain consistent spacing using Tailwind's spacing scale
- Use shadcn/ui components when possible
- Implement proper dark mode support

## Icons

The application uses Lucide React icons. Available icons include:
- Navigation: arrow-right, arrow-left, arrow-up, arrow-down
- Actions: check, x, plus, minus
- Currency: dollar-sign, euro, pound-sterling
- Finance: credit-card, wallet
- Users: user, users

## Forms

Forms are built using React Hook Form with Zod validation. Key principles:
- Implement proper error handling
- Use controlled components
- Implement proper validation
- Show loading states during submission

This documentation provides the essential information needed to rebuild the WonderPay frontend. For specific implementation details, refer to the individual component files and the existing codebase.