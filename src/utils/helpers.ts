/**
 * Generates a new unique event code.
 * The format is "VOL-YYYY-XXXXXX" where XXXX is a random string.
 */
export const generateNewCode = (): string => {
    return `VOL-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  };
  