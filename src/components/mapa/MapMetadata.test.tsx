import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MapMetadata } from './MapMetadata';

describe('MapMetadata', () => {
  it('renders formatted date and city', () => {
    render(<MapMetadata birthDate="1990-02-14" birthTime="03:42" birthCity="BH" birthState="MG" />);
    expect(screen.getByText(/14\/02\/1990/)).toBeInTheDocument();
    expect(screen.getByText(/BH\/MG/)).toBeInTheDocument();
  });

  it('shows em-dash when birthTime is null', () => {
    render(<MapMetadata birthDate="1990-02-14" birthCity="BH" />);
    expect(screen.getByText(/—/)).toBeInTheDocument();
  });

  it('disables button when rate-limited', () => {
    render(<MapMetadata birthDate="1990-02-14" birthCity="BH" rateLimited />);
    expect(screen.getByRole('button', { name: /Alterar/ })).toBeDisabled();
  });

  it('calls onEdit when button clicked', async () => {
    const user = (await import('@testing-library/user-event')).default.setup();
    const onEdit = vi.fn();
    render(<MapMetadata birthDate="1990-02-14" birthCity="BH" onEdit={onEdit} />);
    await user.click(screen.getByRole('button', { name: /Alterar/ }));
    expect(onEdit).toHaveBeenCalled();
  });
});
