import { describe, it, expect } from 'vitest';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './Tooltip';

describe('Tooltip', () => {
  it('exports Tooltip primitives', () => {
    expect(Tooltip).toBeDefined();
    expect(TooltipTrigger).toBeDefined();
    expect(TooltipContent).toBeDefined();
    expect(TooltipProvider).toBeDefined();
  });
});
