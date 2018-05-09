import React from 'react';
import { Autocomplete as RtAutocomplete } from 'react-toolbox/lib/autocomplete';
import { withStyles } from 'material-ui/styles';
import { FormControl, FormHelperText } from 'material-ui/Form';

const styles = theme => ({
  autocompleteWrapper: {
    width: '100%',
    '&>div::after': {
      // this is used for the dropdown arrow.
      borderTopColor: theme.palette.input.helperText,
    },
    '& input': {
      borderBottomColor: theme.palette.input.bottomLine,
      color: theme.palette.input.inputText,
    },
    '& span': {
      color: theme.palette.input.helperText,
    },
    '& label': {
      color: theme.palette.input.labelText,
    },
  },
});

export const Autocomplete = ({
  direction,
  suggestionMatch,
  label,
  source,
  disabled,
  multiple,
  classes,
  helperTextClassName,
  helperText,
  FormHelperTextProps,
  required,
  className,
  input: { value, onBlur, onChange },
  meta: { error },
}) => {
  const hasError = !!error;
  const hasHelperText = !!helperText;
  const separator = hasError && hasHelperText ? ' | ' : '';

  return (
    <FormControl
      className={className}
      disabled={disabled}
      error={!!error}
      fullWidth
      margin="normal"
      required={required}
    >
      <RtAutocomplete
        className={classes.autocompleteWrapper}
        direction={direction}
        suggestionMatch={suggestionMatch}
        label={label}
        source={source}
        disabled={disabled}
        onBlur={() => onBlur()}
        onChange={value => onChange(value)}
        multiple={multiple}
        selectedPosition="below"
        value={value}
      />
      {(hasError || hasHelperText) && (
        <FormHelperText
          className={helperTextClassName}
          {...FormHelperTextProps}
        >
          {hasError && error}
          {separator}
          {hasHelperText && helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default withStyles(styles)(Autocomplete);
