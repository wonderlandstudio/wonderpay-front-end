# Project Overview

## Introduction

WonderPay is a comprehensive financial management platform that streamlines Accounts Payable (AP) & Accounts Receivable (AR) operations while offering working capital solutions.

## Core Features

- **Bill Pay**: Manage and process payments to vendors
- **Receivables**: Track and manage incoming payments
- **Invoice Generation**: Create and manage professional invoices
- **Capital Management**: Access working capital solutions
- **Client Management**: Manage client relationships

## User Flow

### Authentication
- Email/password login
- OAuth providers integration
- Password reset functionality
- New account creation

### Main Application Flow
1. Dashboard overview with key metrics
2. Bill pay management
3. Invoice generation
4. Receivables tracking
5. Capital management
6. Client management
7. Organization settings

## Environment Setup

```bash
# Required environment variables
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_MONITE_API_URL=your_monite_api_url
VITE_MONITE_VERSION=your_monite_version
```

## API Integration

The application integrates with:
- Supabase for authentication and data storage
- Monite for payment processing
- Custom API endpoints for specific business logic