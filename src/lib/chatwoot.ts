/**
 * Chatwoot (suporte) client. STUB — real impl in Phase F2.
 */

export interface CreateConversationParams {
  inboxId: string | number;
  contact: { name: string; email?: string; phone?: string };
  message: string;
}

export interface ChatwootConversation {
  id: number;
  status: 'open' | 'resolved' | 'pending';
}

export async function createConversation(
  _params: CreateConversationParams,
): Promise<ChatwootConversation> {
  throw new Error('TODO Phase F2: Chatwoot createConversation not yet implemented');
}
