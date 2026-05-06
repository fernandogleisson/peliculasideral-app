import { describe, it, expect } from 'vitest';
import { chartHash } from '@/lib/astrologer';

describe('chartHash', () => {
  it('produces same hash for equivalent input (rounded coords)', () => {
    const a = chartHash({
      date: '1990-02-14',
      time: '03:42',
      lat: -19.9167,
      lng: -43.9345,
      tz: 'America/Sao_Paulo',
    });
    const b = chartHash({
      date: '1990-02-14',
      time: '03:42',
      lat: -19.91670001,
      lng: -43.93450001,
      tz: 'America/Sao_Paulo',
    });
    expect(a).toBe(b);
  });

  it('differs for different time', () => {
    const a = chartHash({ date: '1990-02-14', time: '03:42', lat: 0, lng: 0, tz: 'UTC' });
    const b = chartHash({ date: '1990-02-14', time: '03:43', lat: 0, lng: 0, tz: 'UTC' });
    expect(a).not.toBe(b);
  });

  it('differs for different house system', () => {
    const a = chartHash({
      date: '1990-02-14',
      time: '03:42',
      lat: 0,
      lng: 0,
      tz: 'UTC',
      houseSystem: 'placidus',
    });
    const b = chartHash({
      date: '1990-02-14',
      time: '03:42',
      lat: 0,
      lng: 0,
      tz: 'UTC',
      houseSystem: 'whole_sign',
    });
    expect(a).not.toBe(b);
  });
});
