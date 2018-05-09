const ParseApiValues = (oceValues, topicName) => {
  var values = {};

  const parse = (values, labelName = 'code', valueName = 'code') => {
    return values.map(function(a) {
      return {
        label: a[labelName],
        value: a[valueName],
      };
    });
  };

  const parseAutocomplete = values => {
    var result = {};
    for (var v of values) {
      result[v['code']] = v['code'];
    }
    return result;
  };

  values.topics = parse(oceValues.data.topics, 'displayName', 'name');

  values.products = {};
  values.topicDescription = '';
  if (topicName) {
    var productObjects = [];
    for (var topic of oceValues.data.topics) {
      if (topic.name === topicName) {
        productObjects = topic.products;
        values.topicDescription = topic.description;
        break;
      }
    }
    for (var o of productObjects) {
      values.products[o.product.id] = o.product.name;
    }
  }

  values.campaigns =
    (oceValues.data.campaigns &&
      parse(oceValues.data.campaigns, 'description', 'code')) ||
    [];
  values.campaignTypes = parse(oceValues.data.campaignTypes);
  values.objectives = parse(oceValues.data.objectives);
  values.audiences = parseAutocomplete(oceValues.data.audiences);
  values.emailTypes =
    (oceValues.data.emailTypes &&
      parse(oceValues.data.emailTypes, 'description', 'code')) ||
    [];

  return values;
};

export default ParseApiValues;
