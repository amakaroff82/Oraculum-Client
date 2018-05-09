import React from 'react';
import PropTypes from 'prop-types';
import { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import SelectMenu from '../SelectMenu';
import { withStyles } from 'material-ui/styles';

// SelectField will show 4.5 menu items by default. Scrollbar will auto-show
// if there are more items. Use MenuProps to override this default.
const VISIBLE_MENU_ITEM_COUNT = 4.5;

// Hardcoded values from material-ui source
const MUI_MENU_ITEM_HEIGHT = 48;
const MUI_MENU_PADDING_TOP = 8;

const defaultMaxHeight =
  MUI_MENU_ITEM_HEIGHT * VISIBLE_MENU_ITEM_COUNT + MUI_MENU_PADDING_TOP;

const styles = theme => ({
  selectInput: {
    margin: '20px 0px',
  },
});

export const SelectField = ({
  className,
  classes,
  disabled,
  FormHelperTextProps,
  helperText,
  helperTextClassName,
  InputLabelProps,
  items,
  label,
  labelClassName,
  MenuProps,
  multiple,
  required,
  // redux-form props
  input,
  meta: { touched, error },
}) => {
  const hasError = touched && !!error;
  const hasHelperText = !!helperText;
  const separator = hasError && hasHelperText ? ' | ' : '';

  const menuProps = MenuProps || {
    PaperProps: { style: { maxHeight: defaultMaxHeight } },
  };

  return (
    <FormControl
      className={(className, classes.selectInput)}
      disabled={disabled}
      error={touched && !!error}
      fullWidth
      margin="normal"
      required={required}
      {...input}
    >
      {label && (
        <InputLabel
          htmlFor={input.name}
          className={labelClassName}
          {...InputLabelProps}
        >
          {label}
        </InputLabel>
      )}

      <SelectMenu
        InputId={input.name}
        InputProps={input}
        items={items}
        MenuProps={menuProps}
        multiple={multiple}
        onChange={value => input.onChange(value)}
        value={input.value}
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

SelectField.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })
  ).isRequired,
};

export default withStyles(styles, { name: 'SelectField' })(SelectField);
