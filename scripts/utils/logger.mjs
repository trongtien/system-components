/**
 * Logging Utilities
 * 
 * PURPOSE: Provide consistent logging with proper formatting and colors
 * 
 * FUNCTIONS:
 * - log.info(): General information logging with -> prefix
 * - log.success(): Success messages with [Success]: prefix  
 * - log.error(): Error messages with [Error]: prefix
 * - log.warning(): Warning messages with [Warning]: prefix
 * 
 * USED BY:
 * - All modules that need logging functionality
 * - Replaces scattered console.log statements with consistent format
 * 
 * DEPENDENCIES:
 * - None (pure logging utility)
 */

/**
 * Logging utility with consistent formatting
 */
export const log = {
  /**
   * General information logging
   * @param {string} message - Message to log
   */
  info: (message) => {
    console.log(`-> ${message}`);
  },

  /**
   * Success message logging
   * @param {string} message - Success message to log
   */
  success: (message) => {
    console.log(`[Success]: ${message}`);
  },

  /**
   * Error message logging  
   * @param {string} message - Error message to log
   */
  error: (message) => {
    console.log(`[Error]: ${message}`);
  },

  /**
   * Warning message logging
   * @param {string} message - Warning message to log
   */
  warning: (message) => {
    console.log(`[Warning]: ${message}`);
  }
};