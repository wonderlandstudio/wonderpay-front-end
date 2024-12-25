import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/utils';
import OverviewSection from '../OverviewSection';

describe('OverviewSection', () => {
  it('renders overview cards', () => {
    renderWithProviders(<OverviewSection />);
    
    expect(screen.getByText(/Total Receivables/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Payables/i)).toBeInTheDocument();
    expect(screen.getByText(/Cash Flow/i)).toBeInTheDocument();
  });
});