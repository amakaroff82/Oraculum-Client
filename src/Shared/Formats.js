export const SHORT_DATE_FORMAT = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
}; // Aug 1, 2017
export const LONG_DATE_FORMAT = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}; // September 21, 2017

export const SHORT_MONTH_DAY_FORMAT = { month: 'short', day: 'numeric' }; // Aug 1

export const SHORT_TIME_FORMAT = { hour: 'numeric', minute: '2-digit' }; // 3:22 AM

export const SHORT_DATETIME_FORMAT = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
}; // Jun 12, 2017 3:22 AM
export const LONG_DATETIME_FORMAT = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
}; // September 21, 2017 11:59 AM

export const PERCENT_FORMAT = { style: 'percent' }; // 53%

export const PERCENT_WHOLE_FORMAT = {
  style: 'percent',
  maximumFractionDigits: 0,
}; // 53%

export const PERCENT_FRACTIONAL_FORMAT = {
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
}; // 18.5%
