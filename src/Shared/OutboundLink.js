import React from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

export const NEWTAB = '_blank';
export const CHANGETOP = '_top';
export const MIDDLECLICK = 1;

class OutboundLink extends React.Component {
  static trackLink() {
    console.warn('ga tracking not enabled');
  }

  constructor(props) {
    super(props);
    OutboundLink.origTrackLink = OutboundLink.trackLink;
    OutboundLink.trackLink = ReactGA.outboundLink.bind(ReactGA);
    ReactGA.OutboundLink = OutboundLink;
  }

  handleClick = e => {
    const props = this.props;
    const eventMeta = { label: props.eventLabel };
    const sameTarget = props.target !== NEWTAB;
    const topTarget = props.target === CHANGETOP;
    const normalClick = !(
      e.ctrlKey ||
      e.shiftKey ||
      e.metaKey ||
      e.button === MIDDLECLICK
    );

    if (sameTarget && normalClick) {
      e.preventDefault();
      OutboundLink.trackLink(eventMeta, function() {
        if (topTarget) {
          window.top.location.href = props.to;
        } else {
          window.location.href = props.to;
        }
      });
    } else {
      OutboundLink.trackLink(eventMeta, function() {});
    }

    if (props.onClick) {
      props.onClick(e);
    }
  };

  render() {
    const { eventLabel, to, ...props } = this.props;

    return React.createElement('a', {
      ...props,
      href: to,
      onClick: this.handleClick,
      title: eventLabel,
    });
  }
}

OutboundLink.propTypes = {
  eventLabel: PropTypes.string.isRequired,
};

OutboundLink.defaultProps = {
  target: NEWTAB,
};

export default OutboundLink;
