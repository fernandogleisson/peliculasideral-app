/**
 * Smoke tests for stub clients.
 *
 * Each test verifies the module loads and exports the expected function.
 * Stubs throw `TODO Phase X` when called without env. Real impls (geoapify,
 * resend, outline.verifyWebhookSignature) are exercised only at function-
 * existence level here — full integration tests come per-feature.
 */
import { describe, it, expect } from 'vitest';

describe('lib/* client modules', () => {
  it('mux exports createUpload + getPlaybackId', async () => {
    const mod = await import('./mux');
    expect(typeof mod.createUpload).toBe('function');
    expect(typeof mod.getPlaybackId).toBe('function');
    await expect(mod.createUpload({})).rejects.toThrow(/TODO Phase F4/);
  });

  it('asaas exports createPayment + createSubscription', async () => {
    const mod = await import('./asaas');
    expect(typeof mod.createPayment).toBe('function');
    expect(typeof mod.createSubscription).toBe('function');
  });

  it('outline exports getDocument + listDocuments + verifyWebhookSignature', async () => {
    const mod = await import('./outline');
    expect(typeof mod.getDocument).toBe('function');
    expect(typeof mod.listDocuments).toBe('function');
    expect(typeof mod.verifyWebhookSignature).toBe('function');
    // No env → reject signature
    expect(mod.verifyWebhookSignature('x', null)).toBe(false);
  });

  it('paperclip exports createTask + InterpretationGenerator type', async () => {
    const mod = await import('./paperclip');
    expect(typeof mod.createTask).toBe('function');
  });

  it('geoapify exports autocompleteCity', async () => {
    const mod = await import('./geoapify');
    expect(typeof mod.autocompleteCity).toBe('function');
    // Short query short-circuits without env hit
    await expect(mod.autocompleteCity('a')).resolves.toEqual([]);
  });

  it('resend exports sendEmail', async () => {
    const mod = await import('./resend');
    expect(typeof mod.sendEmail).toBe('function');
  });

  it('whatsapp-meta exports sendMessage', async () => {
    const mod = await import('./whatsapp-meta');
    expect(typeof mod.sendMessage).toBe('function');
  });

  it('chatwoot exports createConversation', async () => {
    const mod = await import('./chatwoot');
    expect(typeof mod.createConversation).toBe('function');
  });

  it('cloudflare exports listDnsRecords + createDnsRecord', async () => {
    const mod = await import('./cloudflare');
    expect(typeof mod.listDnsRecords).toBe('function');
    expect(typeof mod.createDnsRecord).toBe('function');
  });
});
