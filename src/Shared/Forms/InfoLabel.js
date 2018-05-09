import React from 'react';
import Tooltip from 'react-toolbox/lib/tooltip';
import Grid from 'material-ui/Grid';
import InformationCircleIcon from 'material-ui-apollo-icons/InformationCircle';

const IconToolTipContainer = Tooltip(Grid);

export const InfoLabel = ({ label, tooltip }) => {
  const iconStyles = {
    height: '18px',
    width: '18px',
  };
  return (
    <Grid container spacing={8}>
      <Grid item>{label}</Grid>
      <IconToolTipContainer item tooltip={tooltip}>
        <InformationCircleIcon style={iconStyles} />
      </IconToolTipContainer>
    </Grid>
  );
};

export const InfoLabelStyleSheet = theme => ({
  infoLabel: {
    width: '100%',
  },
});

export default InfoLabel;
