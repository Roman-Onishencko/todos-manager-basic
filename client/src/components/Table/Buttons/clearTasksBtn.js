import React from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';

export default function ClearTasks(props) {
  const { isDone, category, userId } = props;
  return (
    <Button 
	    variant="raised" 
	    className="button button_red"
	    onClick={() => props.clearTasksList(isDone, category, userId)}
    >
      Clear Tasks
    </Button>
  );
}

ClearTasks.propTypes = {
  clearTasksList: PropTypes.func,
  taskDone: PropTypes.number,
  category: PropTypes.string,
  userId: PropTypes.string,
};