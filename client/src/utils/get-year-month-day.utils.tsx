import { parseCurrentDateString } from '../helpers/parse-current-date-string.helpers';

/**
 * Returns the current year, month, and day as english character string.
 */
export function getYearMonthDay(): {
  day: string;
  month: string;
  year: string;
} {
  return {
    day: parseCurrentDateString('dd'),
    month: parseCurrentDateString('MMMM'),
    year: parseCurrentDateString('yyyy'),
  };
}
