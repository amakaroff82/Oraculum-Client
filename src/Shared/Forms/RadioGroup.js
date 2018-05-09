import React, { Component } from 'react';
import Radio, { RadioGroup as RadioButtonGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    marginTop: 25,
  },
  formLabel: {
    marginBottom: 5,
  },
  labelRadio: {
    height: 30,
  },
  groupRow: {
    flexDirection: 'row',
  },
};

class RadioGroup extends Component {
  state = {
    selectedValue: undefined,
  };

  handleChange = (e, value) => {
    this.setState({ selectedValue: value });
    this.props.input.onChange(value);
  };

  render() {
    const {
      checkedLabelClassName,
      label,
      input,
      source,
      disabled,
      row,
      classes,
    } = this.props;

    return (
      <FormControl className={classes.root}>
        <FormLabel className={classes.formLabel}>{label}</FormLabel>
        <RadioButtonGroup
          className={row && classes.groupRow}
          {...input}
          value={input.value + ''}
          onChange={this.handleChange}
        >
          {source.map((el, i) => (
            <FormControlLabel
              key={i}
              classes={{
                label:
                  el.value === this.props.input.value
                    ? checkedLabelClassName
                    : '',
              }}
              className={classes.labelRadio}
              value={el.value}
              label={el.label}
              disabled={disabled}
              control={<Radio />}
            />
          ))}
        </RadioButtonGroup>
      </FormControl>
    );
  }
}

export default withStyles(styles, { name: 'RadioGroup' })(RadioGroup);
