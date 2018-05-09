import React from 'react';
import { ListItem, ListItemText } from 'material-ui/List';

export const renderListItems = (listItemData, listAction, identifierKey) => {
  if (listItemData && listAction && identifierKey) {
    return listItemData.map((element, index) => {
      return (
        <ListItem
          key={element[identifierKey]}
          button
          onClick={() => listAction(element)}
        >
          <ListItemText color="primary" primary={element[identifierKey]} />
        </ListItem>
      );
    });
  }
};
