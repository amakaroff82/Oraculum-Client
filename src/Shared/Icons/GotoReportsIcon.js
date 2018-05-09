import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let GotoReportsIcon = props => (
  <SvgIcon {...props}>
    <defs>
      <clipPath id="clip-path-1" transform="translate(-14 -3.93)">
        <polygon
          clipRule="evenodd"
          points="14 16.36 25.4 16.36 25.6 19 26 21 30 21 30 32 14 32.3 14 16.36"
        />
      </clipPath>
      <clipPath id="clip-path-2" transform="translate(-14 -3.93)">
        <rect x="14" y="16" width="17" height="16" />
      </clipPath>
      <clipPath id="clip-path-3" transform="translate(-14 -3.93)">
        <polygon
          clipRule="evenodd"
          points="32.37 19.23 32.37 13.74 26.89 13.74 26.89 14.72 30.69 14.73 25.28 20.14 25.98 20.84 31.39 15.43 31.39 19.23 32.37 19.23"
        />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-path-1)">
      <g clipPath="url(#clip-path-2)">
        <g clipPath="url(#clip-path-2)">
          <path
            d="M19.2,16.37H30v16H14V21.57ZM28.67,31V17.83H20.41V22.9H15.33V31ZM15.86,21.57H19.2v-3.2Zm2.55,9.59h2.13V26.9H18.41Zm3.45-8.27V31.3H24V22.9Zm3.34,8.27h2.13V24.77H25.2Z"
            transform="translate(-14 -3.93)"
          />
        </g>
      </g>
    </g>
    <g clipPath="url(#clip-path-3)">
      <rect
        x="19.23"
        y="8.24"
        width="19.54"
        height="17.76"
        transform="translate(-17.61 21.59) rotate(-45)"
      />
    </g>
  </SvgIcon>
);

GotoReportsIcon = pure(GotoReportsIcon);
GotoReportsIcon.muiName = 'SvgIcon';
GotoReportsIcon.defaultProps = {
  viewBox: '0 10 18 18',
};

export default GotoReportsIcon;
