import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState, withHandlers } from 'recompose';
import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

export const SelectMenu = ({
  handleChange,
  InputId,
  InputProps,
  items,
  multiple,
  MenuProps,
  value,
}) => {
  const inputId = InputId || 'select-input';

  return (
    <Select
      input={<Input id={inputId} {...InputProps} />}
      MenuProps={MenuProps}
      multiple={multiple}
      onChange={handleChange}
      value={value}
    >
      {items &&
        items.map((item, index) => {
          return (
            <MenuItem key={index} value={item.value}>
              {item.label}
            </MenuItem>
          );
        })}
    </Select>
  );
};

SelectMenu.propTypes = {
  InputId: PropTypes.string,
  InputProps: PropTypes.object,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })
  ).isRequired,
  multiple: PropTypes.bool,
  MenuProps: PropTypes.object,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
  ]).isRequired,
};

export default compose(
  withState('value', 'setValue', ({ value }) => value),
  withHandlers({
    handleChange: ({ setValue, onChange }) => e => {
      const value = e.target.value;
      setValue(value);
      onChange && onChange(value);
    },
  })
)(SelectMenu);
