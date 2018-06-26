import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import { MenuItem } from 'material-ui/Menu';
import keycode from 'keycode';
import Downshift from 'downshift';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
    display: 'flex',
    'flex-direction': 'row',
    'align-items': 'center'
  },
});

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.text) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.text}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.text}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ text: PropTypes.string }).isRequired,
};

function getSuggestions(inputValue, tags) {
  let count = 0;

  return tags.filter(tag => {
    const keep =
      (!inputValue || tag.text.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
      count < 5;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

class TagsInputComponent extends Component {

  constructor(props) {
    super(props);
    const { tags } = props;
    this.state = {
      tags: tags,
      inputValue: '',
      selectedTags: [],
      errors: null,
    };
  }

  handleKeyDown = event => {
    const { inputValue, selectedTags } = this.state;
    if (selectedTags.length && !inputValue.length && keycode(event) === 'backspace') {
      this.setState({
        selectedTags: selectedTags.slice(0, selectedTags.length - 1),
      });
    }
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleChange = item => {
    let { selectedTags } = this.state;

    if (selectedTags.indexOf(item) === -1) {
      selectedTags = [...selectedTags, item];
    }

    this.setState({
      inputValue: '',
      selectedTags,
    });
  };

  handleDelete = item => () => {
    const selectedTags = [...this.state.selectedTags];
    selectedTags.splice(selectedTags.indexOf(item), 1);

    this.setState({ selectedTags });
  };


  render() {
    const {classes, tags} = this.props;
    const { inputValue, selectedTags } = this.state;

    return (
      <Downshift inputValue={inputValue} onChange={this.handleChange} selectedItem={selectedTags}>
        {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue: inputValue2,
            selectedItem: selectedItem2,
            highlightedIndex,
          }) => (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                startAdornment: selectedTags.map(item => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={classes.chip}
                    onDelete={this.handleDelete(item)}
                  />
                )),
                onChange: this.handleInputChange,
                onKeyDown: this.handleKeyDown,
                placeholder: 'Select multiple countries',
                id: 'integration-downshift-multiple',
              }),
            })}
            {isOpen ? (
              <Paper className={classes.paper} square>
                {getSuggestions(inputValue2, tags).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.text }),
                    highlightedIndex,
                    selectedItem: selectedItem2,
                  }),
                )}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    )
  }
}

export default withStyles(styles, { name: 'TagsInput' })(TagsInputComponent);
