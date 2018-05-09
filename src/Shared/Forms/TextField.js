import React from 'react';
import { TextField as MuiTextField } from 'material-ui';
import { InfoLabel, InfoLabelStyleSheet } from './InfoLabel';
import { withStyles } from 'material-ui/styles';

const applyRequiredFieldIndicator = labelText => {
  return labelText + ' *';
};

const TextField = ({
  input,
  label,
  labelClassName,
  multiline,
  rows,
  disabled,
  type,
  required,
  infoTooltip,
  classes,
  onBlur,
  meta: { touched, error },
}) => {
  var labelContent = label;
  if (infoTooltip) {
    labelContent = (
      <InfoLabel
        label={required ? applyRequiredFieldIndicator(label) : label}
        tooltip={infoTooltip}
      />
    );
  }
  return (
    <MuiTextField
      {...input}
      multiline={multiline}
      label={labelContent}
      labelClassName={infoTooltip ? classes.infoLabel : labelClassName}
      rows={rows}
      type={type}
      error={touched && typeof error !== 'undefined'}
      helperText={touched && error}
      disabled={disabled}
      fullWidth
      margin="normal"
      required={required && !infoTooltip}
      onBlur={() => {
        if (typeof onBlur === 'function') {
          onBlur();
        }
        input.onBlur();
      }}
    />
  );
};

export default withStyles(InfoLabelStyleSheet)(TextField);
