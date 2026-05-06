/**
 * Paperclip (interpretation generator) client. STUB — real impl in Phase F1.
 *
 * `InterpretationGenerator` is the swap interface so we can fall back to
 * Anthropic SDK if Paperclip is down (env `INTERPRETATION_GENERATOR=anthropic`).
 */

export interface InterpretationInput {
  topic: 'mapa_natal' | 'transito' | 'pelicula_do_dia' | 'pelicula_da_semana';
  context: Record<string, unknown>;
  locale: 'pt-BR' | 'en-US' | 'es-419';
}

export interface InterpretationOutput {
  text: string;
  modelVersion: string;
  generatedAt: string;
}

export interface InterpretationGenerator {
  generate(input: InterpretationInput): Promise<InterpretationOutput>;
}

export interface CreateTaskParams {
  agentId: string;
  skillId: string;
  payload: Record<string, unknown>;
  callbackUrl?: string;
}

export interface PaperclipTask {
  id: string;
  status: 'queued' | 'running' | 'done' | 'failed';
  output?: unknown;
}

export async function createTask(_params: CreateTaskParams): Promise<PaperclipTask> {
  throw new Error('TODO Phase F1: Paperclip createTask not yet implemented');
}
