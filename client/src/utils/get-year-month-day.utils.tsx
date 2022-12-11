import { parseCurrentDateString } from '../helpers/parse-current-date-string.helpers';

/**
 * Returns the current date as a TYearMonthDay object.
 *
 * Returns the current year, month, and day as english character string.
 */
function getYearMonthDay(): TYearMonthDay<string> {
  return {
    day: parseCurrentDateString('dd'),
    month: parseCurrentDateString('MMMM'),
    year: parseCurrentDateString('yyyy'),
  };
}

export type TYearMonthDay<T> = { day: T; month: T; year: T };
export { getYearMonthDay };
