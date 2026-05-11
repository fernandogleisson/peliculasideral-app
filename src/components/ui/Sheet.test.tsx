import { describe, it, expect } from 'vitest';
import { Sheet, SheetContent, SheetTitle } from './Sheet';

describe('Sheet', () => {
  it('exports Sheet, SheetContent, SheetTitle', () => {
    expect(Sheet).toBeDefined();
    expect(SheetContent).toBeDefined();
    expect(SheetTitle).toBeDefined();
  });
});
