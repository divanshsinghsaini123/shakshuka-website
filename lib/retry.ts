/**
 * Retry utility for handling flaky network calls
 */

export interface RetryOptions {
  /** Maximum number of retry attempts (default: 3) */
  maxRetries?: number;
  /** Initial delay in milliseconds before first retry (default: 1000) */
  initialDelay?: number;
  /** Maximum delay in milliseconds (default: 10000) */
  maxDelay?: number;
  /** Multiplier for exponential backoff (default: 2) */
  backoffMultiplier?: number;
  /** Function to determine if an error should trigger a retry (default: retry on all errors) */
  shouldRetry?: (error: unknown, attempt: number) => boolean;
  /** Custom delay function (optional, overrides default exponential backoff) */
  delayFn?: (attempt: number) => number;
}

/**
 * Sleep for a given number of milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Calculate delay with exponential backoff and jitter
 */
function calculateDelay(
  attempt: number,
  initialDelay: number,
  maxDelay: number,
  backoffMultiplier: number
): number {
  const exponentialDelay = initialDelay * Math.pow(backoffMultiplier, attempt - 1);
  const jitter = Math.random() * 0.3 * exponentialDelay; // Add up to 30% jitter
  const delay = Math.min(exponentialDelay + jitter, maxDelay);
  return Math.floor(delay);
}

/**
 * Retry a function with exponential backoff
 * 
 * @param fn - The async function to retry
 * @param options - Retry configuration options
 * @returns The result of the function
 * @throws The last error if all retries fail
 * 
 * @example
 * ```ts
 * const result = await retry(
 *   () => fetch('/api/data'),
 *   { maxRetries: 3, initialDelay: 1000 }
 * );
 * ```
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    backoffMultiplier = 2,
    shouldRetry = () => true,
    delayFn
  } = options;

  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Don't retry if this is the last attempt or if shouldRetry returns false
      if (attempt === maxRetries || !shouldRetry(error, attempt)) {
        throw error;
      }

      // Calculate delay
      const delay = delayFn 
        ? delayFn(attempt)
        : calculateDelay(attempt, initialDelay, maxDelay, backoffMultiplier);

      // Log retry attempt (optional - can be removed in production if not needed)
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Retry attempt ${attempt}/${maxRetries} after ${delay}ms`, error);
      }

      // Wait before retrying
      await sleep(delay);
    }
  }

  // This should never be reached, but TypeScript needs it
  throw lastError;
}

/**
 * Retry configuration for fetch calls
 */
export const fetchRetryOptions: RetryOptions = {
  maxRetries: 3,
  initialDelay: 500,
  maxDelay: 5000,
  backoffMultiplier: 2,
  shouldRetry: (error: unknown) => {
    // Retry on network errors, timeouts, or 5xx server errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return true; // Network error
    }
    if (error instanceof Error && error.message.includes('timeout')) {
      return true; // Timeout error
    }
    // For Response objects, retry on 5xx errors
    if (error && typeof error === 'object' && 'status' in error) {
      const status = (error as { status: number }).status;
      return status >= 500 && status < 600;
    }
    return true; // Default: retry on unknown errors
  }
};

/**
 * Retry configuration for Redis/database calls
 */
export const redisRetryOptions: RetryOptions = {
  maxRetries: 3,
  initialDelay: 200,
  maxDelay: 2000,
  backoffMultiplier: 2,
  shouldRetry: (error: unknown) => {
    // Retry on network errors, timeouts, or connection errors
    if (error instanceof Error) {
      const message = error.message.toLowerCase();
      return (
        message.includes('network') ||
        message.includes('timeout') ||
        message.includes('connection') ||
        message.includes('econnrefused') ||
        message.includes('econnreset')
      );
    }
    return true;
  }
};

