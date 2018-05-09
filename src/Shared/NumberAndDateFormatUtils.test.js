import { getShorthandFormattedNumber } from './NumberAndDateFormatUtils';
import { NUMBER_FORMAT, NUMBER_FORMAT_SINGLE_DECIMAL } from './constants';

describe('getShorthandFormattedNumber US English', () => {
  beforeEach(() => {
    window.App = {
      /*localizationInfo: {
        locale: 'en-US',
        messages: {},
        modules: {},
      },*/
    };
  });

  it('should convert to no shorthand', () => {
    const startNum = 900;
    const returnNum = getShorthandFormattedNumber(startNum);

    expect(returnNum).toBe('900.0');
  });
  it('should convert to thousand shorthand', () => {
    const startNum = 45600;
    const returnNum = getShorthandFormattedNumber(startNum);

    expect(returnNum).toBe('45.6k');
  });
  it('should convert to million shorthand without decimal', () => {
    const startNum = 3000000; //3 million
    const returnNum = getShorthandFormattedNumber(startNum, NUMBER_FORMAT);

    expect(returnNum).toBe('3m');
  });
  it('should convert to million shorthand with decimal', () => {
    const startNum = 3000000; //3 million
    const returnNum = getShorthandFormattedNumber(
      startNum,
      NUMBER_FORMAT_SINGLE_DECIMAL
    );

    expect(returnNum).toBe('3.0m');
  });
});

describe('getShorthandFormattedNumber Italian Tests', () => {
  beforeEach(() => {
    window.App = {
      /*localizationInfo: {
        locale: 'it-IT',
        messages: {},
        modules: {},
      },*/
    };
  });

  it('should convert to no shorthand', () => {
    const startNum = 900;
    const returnNum = getShorthandFormattedNumber(startNum);

    expect(returnNum).toBe('900,0');
  });
  it('should convert to thousand shorthand', () => {
    const startNum = 45600;
    const returnNum = getShorthandFormattedNumber(startNum);

    expect(returnNum).toBe('45,6mila');
  });
  it('should convert to million shorthand without decimal', () => {
    const startNum = 3000000; //3 million
    const returnNum = getShorthandFormattedNumber(startNum, NUMBER_FORMAT);

    expect(returnNum).toBe('3mil');
  });
  it('should convert to million shorthand with decimal', () => {
    const startNum = 3000000; //3 million
    const returnNum = getShorthandFormattedNumber(
      startNum,
      NUMBER_FORMAT_SINGLE_DECIMAL
    );

    expect(returnNum).toBe('3,0mil');
  });
});

describe('getShorthandFormattedNumber Unknown Language', () => {
  beforeEach(() => {
    window.App = {
      /*localizationInfo: {
        locale: 'ThisIsnt-ALanguage',
        messages: {},
        modules: {},
      },*/
    };
  });

  it('should convert to no shorthand', () => {
    const startNum = 900;
    const returnNum = getShorthandFormattedNumber(startNum);

    expect(returnNum).toBe('900.0');
  });
  it('should convert to thousand shorthand', () => {
    const startNum = 45600;
    const returnNum = getShorthandFormattedNumber(startNum);

    expect(returnNum).toBe('45.6k');
  });
  it('should convert to million shorthand without decimal', () => {
    const startNum = 3000000; //3 million
    const returnNum = getShorthandFormattedNumber(startNum, NUMBER_FORMAT);

    expect(returnNum).toBe('3m');
  });
  it('should convert to million shorthand with decimal', () => {
    const startNum = 3000000; //3 million
    const returnNum = getShorthandFormattedNumber(
      startNum,
      NUMBER_FORMAT_SINGLE_DECIMAL
    );

    expect(returnNum).toBe('3.0m');
  });
});
