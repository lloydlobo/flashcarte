import format from 'date-fns/format';
import { enGB } from 'date-fns/locale';

// TODO Add all types and remove 'any' from `formatStr` types.
export type DateFNSFormat = 'LLL' | 'LLLL' | 'LLLLL' | 'MMM' | 'MMMM' | 'MMMMM';

/**
 * Parses current month in string of loale english enGB.
 *
 * @param formatStr The format to parse in.
 *
 * LLL: Jan, Feb, ..., Dec
 * LLLL: January, February, ..., December
 * LLLLL: J, F, ..., D
 * MMM: Jan, Feb, ..., Dec
 * MMMM: January, February, ..., December
 * MMMMM: J, F, ..., D
 * @see https://date-fns.org/v2.14.0/docs/format
 */
export function parseCurrentDateString(formatStr: any | DateFNSFormat): string {
  const date = new Date();
  return format(
    new Date(date.getFullYear(), date.getMonth(), date.getDate()),
    formatStr,
    { locale: enGB },
  );
}
