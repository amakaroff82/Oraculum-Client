import moment from 'moment';
import numeral from 'numeral';
import 'numeral/locales';
import { split } from 'ramda';
import { NUMBER_FORMAT_SINGLE_DECIMAL } from './constants';

//import { getIntl } from './localization';

const changeNumeralLocale = locale => {
  //localeData throws an error if there is no locale data!
  numeral.localeData(locale);
  numeral.locale(locale);
};

/*const setInternationalFormat = () => {
  const locale = getIntl().locale.toLowerCase();
  try {
    changeNumeralLocale(locale);
  } catch (err) {
    //in cases where we are sending down country and language, but numeral only supports the language
    const langOnly = split('-', locale)[0];
    try {
      changeNumeralLocale(langOnly);
    } catch (err) {
      // fail silently
    }
  }
};*/

export const getShorthandFormattedNumber = (
  num,
  format = NUMBER_FORMAT_SINGLE_DECIMAL
) => {
  //setInternationalFormat();

  return numeral(num).format(format) || num;
};

export const getPrevMonth = () => {
  const locale = getIntl().locale.toLowerCase();
  moment.locale(locale);
  return moment()
    .subtract(1, 'months')
    .toDate();
};
