// Setup file for Vitest
import { vi } from 'vitest';

// Mock DOM APIs for Node environment
(globalThis as any).HTMLElement = class HTMLElement {};
(globalThis as any).Document = class Document {};
(globalThis as any).document = new (globalThis as any).Document();

// Mock window object
(globalThis as any).window = {
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  location: { href: 'http://localhost' }
};