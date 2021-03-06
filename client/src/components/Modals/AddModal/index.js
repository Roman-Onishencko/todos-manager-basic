import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Modal from 'material-ui/Modal';
import Typography from 'material-ui/Typography';
import { Map } from 'immutable';

import TaskInput from '../input';
import Buttons from '../buttons';
import Radios from '../radios';

function getModalStyle() {
  const top = 45;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-50%, -50%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  header: {
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: '1.45em',
  }
});

class AddModal extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    createTask: PropTypes.func,
    hideTaskModal: PropTypes.func,
    classes: PropTypes.object.isRequired,
    userId: PropTypes.string,
  }

  state = {
    inputValue: '',
    timeValue: 'day',
    priorityValue: '2',
  };

  handleChangeInput = (event) => {
    if(event.target.value.trim().length > 0) {
      this.setState({ inputValue: event.target.value })
    } else {
      this.setState({ inputValue: '' })
    }
  }

  handleChangeRadio = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSaveTask = (e) => {
    e.preventDefault();
    const task = new Map({
      text: this.state.inputValue,
      isDone: 0,
      priority: this.state.priorityValue,
      category:this.state.timeValue,
    });
    const { userId } = this.props;
    this.props.createTask(task, userId);
    this.props.hideTaskModal();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="add-task"
          aria-describedby="add-task"
          open={this.props.open}
        > 
          <div style={getModalStyle()} className={classes.paper}>
            <Typography className={classes.header} variant="title" id="modal-title">
              Add Task
            </Typography>
            <TaskInput handleChangeInput={this.handleChangeInput} label="Add task" />
            <Radios 
              handleChangeRadio={this.handleChangeRadio}
              timeValue={this.state.timeValue}
              priorityValue={this.state.priorityValue}
            />
            <Buttons 
              hideTaskModal={this.props.hideTaskModal} 
              handleSaveTask={this.handleSaveTask} 
              readyToSave={this.state.inputValue.length > 0}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

const AddModalWrapped = withStyles(styles)(AddModal);

export default AddModalWrapped;