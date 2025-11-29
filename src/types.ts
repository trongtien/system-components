// Export all TypeScript types and interfaces
export * from './types/index';
export * from './components/index';

// Re-export types for custom elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'system-button': any;
      'system-typography': any;
      'system-notify': any;
      'system-input': any;
    }
  }
}