/**
 * Asaas (payments) client. STUB — real impl arrives in Phase F2 (paywall).
 */

export interface CreatePaymentParams {
  customerId: string;
  amount: number; // BRL cents
  description: string;
  externalReference?: string;
}

export interface CreateSubscriptionParams {
  customerId: string;
  planId: string;
  cycle: 'MONTHLY' | 'YEARLY';
  externalReference?: string;
}

export interface AsaasPayment {
  id: string;
  status: 'PENDING' | 'CONFIRMED' | 'RECEIVED' | 'OVERDUE' | 'REFUNDED' | 'CANCELLED';
  invoiceUrl?: string;
}

export async function createPayment(_params: CreatePaymentParams): Promise<AsaasPayment> {
  throw new Error('TODO Phase F2: Asaas createPayment not yet implemented');
}

export async function createSubscription(_params: CreateSubscriptionParams): Promise<AsaasPayment> {
  throw new Error('TODO Phase F2: Asaas createSubscription not yet implemented');
}
