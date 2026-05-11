/**
 * Meta WhatsApp Business client. STUB — real impl in Phase F2.
 */

export interface SendMessageParams {
  to: string; // E.164, no '+'
  type: 'text' | 'template';
  body?: string;
  templateName?: string;
  languageCode?: string;
  components?: unknown[];
}

export interface SendMessageResult {
  messageId: string;
}

export async function sendMessage(_params: SendMessageParams): Promise<SendMessageResult> {
  throw new Error('TODO Phase F2: WhatsApp Meta sendMessage not yet implemented');
}
