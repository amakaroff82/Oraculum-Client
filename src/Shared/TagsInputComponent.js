import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import { MenuItem } from 'material-ui/Menu';
import Select from 'react-select';
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';
import ChevronDown from 'material-ui-apollo-icons/ChevronDown';
import ChevronUp from 'material-ui-apollo-icons/ChevronUp';
import Close from 'material-ui-apollo-icons/Close';

class Option extends React.Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event);
  };

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

function SelectWrapped(props) {
  const { classes, ...other } = props;

  return (
    <Select
      optionComponent={Option}
      noResultsText={<Typography>{'No tags found'}</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ChevronUp /> : <ChevronDown />;
      }}
      clearRenderer={() => <Close />}
      valueComponent={valueProps => {
        const { value, children, onRemove } = valueProps;

        const onDelete = event => {
          event.preventDefault();
          event.stopPropagation();
          onRemove(value);
        };

        if (onRemove) {
          return (
            <Chip
              tabIndex={-1}
              label={children}
              className={classes.chip}
              deleteIcon={<Close onTouchEnd={onDelete} />}
              onDelete={onDelete}
            />
          );
        }

        return <div className="Select-value">{children}</div>;
      }}
      {...other}
    />
  );
}

const ITEM_HEIGHT = 48;

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit / 4,
  },
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      minWidth: '200px',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
      maxHeight: '36px',
      overflow: 'auto',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: '16px',
      //fontSize: theme.typography.pxToRem(16),
      padding: 0,
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
      padding: '3px 0',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
    '.Select': {
      height: 'auto',
    }
  },
});

class TagsInputComponent extends Component {
  state = {
    selectedTags: null,
  };

  handleChange = value => {
    const { onChange } = this.props;
    this.setState({
      selectedTags: value,
    });
    onChange(value ? value.split(',') : []);
  };

  render() {
    const { classes, tags } = this.props;

    return (
      <Input
        fullWidth
        inputComponent={SelectWrapped}
        value={this.state.selectedTags}
        onChange={this.handleChange}
        placeholder="Select multiple tags"
        name="react-select-chip"
        inputProps={{
          classes,
          multi: true,
          instanceId: 'react-select-chip',
          id: 'react-select-chip',
          simpleValue: true,
          options: tags.map(tag => ({
            value: tag.text,
            label: tag.text,
          })),
        }}
      />
    );
  }
}

TagsInputComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(TagsInputComponent);