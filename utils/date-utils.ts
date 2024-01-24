import { format, utcToZonedTime } from 'date-fns-tz';

const DEFAULT_DATE_FORMATS: { [key: string]: string } = {
  time: 'h:mm a',
  date: 'MMMM d, yyyy',
  dateDayMonth: 'MMMM d',
  dateTime: 'MMMM d, h:mm a',
  hour: 'h a',
};
export function dateParseISOFromTimezone(date: string) {
  const d: number[] = date.split(/\D/).map((d: string) => parseInt(d));
  return new Date(d[0], d[1] - 1, d[2], d[3], d[4], d[5]);
}
export function dateFormat(date: Date, options?: { formatStr?: string; timeZone?: string }) {
  let formatStr;

  if (options?.formatStr) {
    // Try default formats first
    formatStr = DEFAULT_DATE_FORMATS[options.formatStr] ? DEFAULT_DATE_FORMATS[options.formatStr] : options.formatStr;
  } else {
    formatStr = DEFAULT_DATE_FORMATS.date;
  }
  if (options?.timeZone) {
    date = utcToZonedTime(date, options.timeZone);
    return format(date, formatStr, { timeZone: options.timeZone });
  }
  return format(date, formatStr);
}
