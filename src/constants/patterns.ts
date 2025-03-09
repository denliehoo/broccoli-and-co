import { REGEX } from './regex';

export const PATTERNS = {
  EMAIL: {
    value: REGEX.EMAIL,
    message: 'Please enter a valid email',
  },
};

export const RANGE_PATTERNS = {
  MIN_LENGTH: (label: string, min: number) => ({
    value: min,
    message: `${label} must be at least ${min} characters`,
  }),
  MAX_LENGTH: (label: string, max: number) => ({
    value: max,
    message: `${label} cannot exceed ${max} characters`,
  }),
};
