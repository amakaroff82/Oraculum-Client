import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import mapProps from 'recompose/mapProps';
import { connect } from 'react-redux';

export default (...args) => Component =>
  compose(
    getContext({ hostContext: PropTypes.object.isRequired }),
    mapProps(({ hostContext, ...rest }) => ({ ...hostContext, ...rest })),
    connect(...args)
  )(Component);
