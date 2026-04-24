import { describe, test, expect } from 'vitest';
import { formatAssets } from '../../src/lib/formatAssets';

describe('formatAssets', () => {
  test('formats values under 100 as lakh', () => {
    expect(formatAssets(45)).toBe('₹45 lakh');
    expect(formatAssets(99)).toBe('₹99 lakh');
  });

  test('formats values 100 or above as crore', () => {
    expect(formatAssets(150)).toBe('₹1.5 crore');
    expect(formatAssets(200)).toBe('₹2 crore');
    expect(formatAssets(125)).toBe('₹1.3 crore'); // rounds to 1 decimal
  });

  test('handles zero and negative values', () => {
    expect(formatAssets(0)).toBe('₹0');
    expect(formatAssets(-10)).toBe('₹0');
  });
});
