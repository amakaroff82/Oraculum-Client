import R from 'ramda';

const parseKey = key => {
  const keys = key.split('.');

  return R.flatten(
    keys.map(item => {
      if (item.indexOf('[') >= 0) {
        return item.split('[').map(el => {
          if (el.indexOf(']') >= 0) {
            return parseInt(el.slice(0, el.indexOf(']')), 10);
          }
          return el;
        });
      } else {
        item = item[0].toLowerCase() + item.slice(1);
      }
      return item;
    })
  );
};

export const parseError = errors => {
  let parsedErrors = {};
  for (let key in errors) {
    parsedErrors = R.assocPath(
      parseKey(key),
      errors[key].join('; '),
      parsedErrors
    );
  }
  return parsedErrors;
};
