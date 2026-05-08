/**
 * Cloudflare DNS helpers. STUB — wraps MCP/REST calls in Phase F0+.
 */

export interface DnsRecord {
  type: 'A' | 'AAAA' | 'CNAME' | 'TXT' | 'MX';
  name: string;
  content: string;
  ttl?: number;
  proxied?: boolean;
}

export async function listDnsRecords(_zoneId?: string): Promise<DnsRecord[]> {
  throw new Error('TODO Phase F0: Cloudflare listDnsRecords not yet implemented');
}

export async function createDnsRecord(_record: DnsRecord, _zoneId?: string): Promise<DnsRecord> {
  throw new Error('TODO Phase F0: Cloudflare createDnsRecord not yet implemented');
}
