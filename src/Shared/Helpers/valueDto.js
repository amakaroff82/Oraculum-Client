/// Create items for binding Std ValueDTOs from the web service
export const getDropDownValues = dtoArray => {
  if (!dtoArray) {
    return [];
  }
  return dtoArray.map(element => ({
    value: element.code,
    label: element.description || element.code,
  }));
};

export const getAutocompleteValues = dtoArray => {
  if (!dtoArray) {
    return [];
  }
  var result = {};
  for (var value of dtoArray) {
    result[value['code']] = value['description'] || value['code'];
  }
  return result;
};
