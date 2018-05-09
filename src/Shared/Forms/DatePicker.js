import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'material-ui';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';

// This is the only format accepted by the TextField native datepicker.
const DATE_PICKER_FORMAT = 'YYYY-MM-DD';

const formatDateToDatePickerString = dateObject =>
  moment(dateObject).format(DATE_PICKER_FORMAT);

const styles = theme => ({
  selectInput: {
    margin: '20px 0px',
  },
});

export const DatePicker = ({
  disabled,
  classes,
  label,
  minDate,
  maxDate,
  required,
  // redux-form props
  input: { value, onChange },
  meta: { touched, error },
}) => {
  const datePickerValue = value && formatDateToDatePickerString(value);
  const min = minDate && formatDateToDatePickerString(minDate);
  const max = maxDate && formatDateToDatePickerString(maxDate);

  const handleChange = event => {
    // Convert from DATE_PICKER_FORMAT to Date object for redux-form field value.
    // Need to use moment because new Date() would shift a day when coming back
    // in with formatDateToDatePickerString()
    //   moment("2017-09-30").toDate() => Wed Sep 30 2017 00:00:00 GMT-0700 (PDT)
    //   new Date("2017-09-30") => Tue Sep 29 2017 17:00:00 GMT-0700 (PDT)
    onChange(moment(event.target.value).toDate());
  };

  return (
    <TextField
      className={classes.selectInput}
      disabled={disabled}
      error={touched && typeof error !== 'undefined'}
      fullWidth
      helperText={touched && error}
      inputProps={{ min, max }}
      InputLabelProps={{ shrink: true }}
      label={label}
      margin="normal"
      onChange={handleChange}
      required={required}
      type="date"
      value={datePickerValue}
    />
  );
};

DatePicker.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  minDate: PropTypes.object, // Date object
  maxDate: PropTypes.object, // Date object
  required: PropTypes.bool,
  // redux-form props
  input: PropTypes.object,
  meta: PropTypes.object,
};

export default withStyles(styles, { name: 'DatePicker' })(DatePicker);
