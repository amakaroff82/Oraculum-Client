import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

export const ConditionalButton = ({
  buttonProps: { textId, textValues, ...buttonProps },
  condition,
  ...rest
}) =>
  (condition === undefined || condition) && buttonProps ? (
    <Button {...buttonProps} {...rest}>
      "text val"
    </Button>
  ) : null;

ConditionalButton.propTypes = {
  buttonProps: PropTypes.shape({
    textId: PropTypes.string,
  }),
  condition: PropTypes.bool,
};

ConditionalButton.displayName = 'ConditionalButton';

export const ActionButtons = ({
  classes,
  primaryButtonProps: {
    condition: primaryButtonCondition,
    ...primaryButtonProps
  } = { condition: false },
  cancelButtonProps: {
    condition: cancelButtonCondition,
    ...cancelButtonProps
  } = { condition: false },
  extraButtons,
  children,
}) => (
  <div>
    <ConditionalButton
      raised
      className={classes.button}
      buttonProps={{ textId: 'cancel', ...cancelButtonProps }}
      condition={cancelButtonCondition}
    />
    {extraButtons &&
      extraButtons.map(({ condition, ...buttonProps }, index) => (
        <ConditionalButton
          key={index}
          raised
          className={classes.button}
          buttonProps={buttonProps}
          condition={condition}
        />
      ))}
    <ConditionalButton
      raised
      className={classes.button}
      buttonProps={primaryButtonProps}
      condition={primaryButtonCondition}
      color="primary"
    />
    {children}
  </div>
);

const ButtonPropsPropType = PropTypes.shape({
  condition: PropTypes.bool,
});

ActionButtons.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  primaryButtonProps: ButtonPropsPropType,
  cancelButtonProps: ButtonPropsPropType,
  extraButtons: PropTypes.arrayOf(ButtonPropsPropType),
  children: PropTypes.node,
};

ActionButtons.displayName = 'ActionButtons';

export default withStyles(styles, { name: 'ActionButtons' })(ActionButtons);
