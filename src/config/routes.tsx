import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const BillPay = lazy(() => import('../pages/BillPay'));
const NewBill = lazy(() => import('../pages/NewBill'));
const InvoiceDetail = lazy(() => import('../pages/InvoiceDetail'));
const InvoiceGenerator = lazy(() => import('../pages/InvoiceGenerator'));
const Receivables = lazy(() => import('../pages/Receivables'));
const Capital = lazy(() => import('../pages/Capital'));
const QuickPay = lazy(() => import('../pages/QuickPay'));
const Clients = lazy(() => import('../pages/Clients'));
const ProfileSettings = lazy(() => import('../pages/settings/ProfileSettings'));
const AddressSettings = lazy(() => import('../pages/settings/AddressSettings'));
const MembersSettings = lazy(() => import('../pages/settings/MembersSettings'));
const CardsSettings = lazy(() => import('../pages/settings/CardsSettings'));
const BankAccountsSettings = lazy(() => import('../pages/settings/BankAccountsSettings'));
const AccountingSettings = lazy(() => import('../pages/settings/AccountingSettings'));
const OrganizationSettings = lazy(() => import('../pages/OrganizationSettings'));

export const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
];

export const protectedRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
  {
    path: '/dashboard/bill-pay',
    children: [
      { index: true, element: <BillPay /> },
      { path: 'new', element: <NewBill /> },
      { path: ':invoiceId', element: <InvoiceDetail /> },
      { path: 'generate', element: <InvoiceGenerator /> },
    ],
  },
  {
    path: '/dashboard/receivables',
    children: [
      { index: true, element: <Receivables /> },
      { path: ':invoiceId', element: <InvoiceDetail /> },
    ],
  },
  { path: '/dashboard/capital', element: <Capital /> },
  { path: '/dashboard/quick-pay', element: <QuickPay /> },
  { path: '/dashboard/clients', element: <Clients /> },
  {
    path: '/dashboard/settings',
    children: [
      { path: 'profile', element: <ProfileSettings /> },
      { path: 'address', element: <AddressSettings /> },
      { path: 'members', element: <MembersSettings /> },
      { path: 'cards', element: <CardsSettings /> },
      { path: 'bank-accounts', element: <BankAccountsSettings /> },
      { path: 'accounting', element: <AccountingSettings /> },
    ],
  },
  { path: '/dashboard/organization-settings', element: <OrganizationSettings /> },
];