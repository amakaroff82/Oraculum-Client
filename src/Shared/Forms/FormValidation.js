import React from 'react';
import moment from 'moment';

export const MAX_JOURNEY_NAME_LENGTH = 200;
export const MAX_DESCRIPTION_LENGTH = 250;
export const MAX_APPROVAL_BY_LENGTH = 50;
export const MAX_APPROVAL_INFORMATION_LENGTH = 500;
export const MAX_TOPIC_NAME_LENGTH = 50;
export const MAX_TOPIC_UNIQUE_TAG_LENGTH = 10;
export const MAX_SEGMENT_NAME_LENGTH = 45;
export const MAX_SEGMENT_DESCRIPTION_LENGTH = 250;
export const MAX_DISPLAY_NAME_LENGTH = 100;
export const MAX_OPT_OUT_LANGUAGE_LENGTH = 500;
export const MAX_OPT_IN_LANGUAGE_LENGTH = 500;
export const MAX_TASK_NAME_LENGTH = 100;
export const MAX_TASK_NOTES_LENGTH = 250;
export const MIN_DATE = '1970-01-01';
export const MAX_DATE = '4000-12-31';

export const checkRequired = value => {
  if (!value) {
    return "formValidation_required";
  }
};

export const checkSymbols = value => {
  if (/[\^&<>"'/)(]/.test(value)) {
    return "formValidation_invalidSymbols";
  }
};

export const checkNormalSymbolsOnly = value => {
  if (!/^[\w\s]+$/i.test(value)) {
    return "formValidation_invalidNormalSymbolsOnly";
  }
};

export const checkLength = (value, length) => {
  if (value && value.length > length) {
    return "formValidation_tooManyCharacters";
  }
};

export const checkDate = (date, taskWidget) => {
  if (moment(date).isBefore(MIN_DATE)) {
    return "formValidation_mustBeAfterDate";
  } else if (moment(date).isAfter(MAX_DATE)) {
    return "formValidation_mustBeBeforeDate";
  }
};

export const checkUrl = value => {
  const test = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
    value
  );
  if (!test) {
    return "formValidation_invalidUrl";
  }
};

export const checkEmail = value => {
  const test = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    value
  );
  if (!test) {
    return "formValidation_invalidEmail";
  }
};
