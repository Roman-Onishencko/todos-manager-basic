import React from 'react';
import Button from 'material-ui/Button';

export default function FilterCategoriesBtn(props) {
  return (
    <Button variant="raised" className="button button_grey" onClick={props.changeFiltersVisibility}>
      {props.filtersOpened ? "Close Filters" : "Open Filters"}
    </Button>
  );
}