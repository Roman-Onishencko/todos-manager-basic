import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Modal from 'material-ui/Modal';
import Typography from 'material-ui/Typography';
import * as actions from '../../reduxBase/actions/actions';
import { Map } from 'immutable';

import Inputs from '../../components/Identification/inputs';
import RegistrationBtn from '../../components/Identification/Buttons/registration';
import AuthorizationBtn from '../../components/Identification/Buttons/authorization';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 55,
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

class Registration extends React.Component {
  static propTypes = {
    userRegister: PropTypes.func,
  }

  state = {
    userName: '',
    userLogin: '',
    userEmail: '',
    userPass: '',
  };

  handleChangeInput = (event) => {
    if(event.target.value.length > 0) {
      this.setState({ [event.target.name]: event.target.value })
    } else {
      this.setState({ [event.target.name]: ''})
    }
  }

  sendRegistrationData = () => {
    const { userName, userLogin, userEmail, userPass } = this.state;
    this.props.userRegister(new Map
      ({
        id: Date.now(),
        userName,
        userLogin,
        userEmail,
        userPass,
      })
    )
  }

  render() {
    const { classes } = this.props;
    const { userName, userLogin, userEmail, userPass } = this.state;
    const active = userName && userLogin && userEmail && userPass;
    const currentPath = this.props.match.path;
    return (
      <div>
        <Modal
          aria-labelledby="registration"
          aria-describedby="registration"
          open
        > 
          <div style={getModalStyle()} className={classes.paper}>
            <Typography className={classes.header} variant="title" id="modal-title">
             	Registration
            </Typography>
            <Inputs handleChangeInput={this.handleChangeInput} />
            <div className="register-buttons">
            	<AuthorizationBtn />
            	<RegistrationBtn active={!!active} currentPath={currentPath} sendRegistrationData={this.sendRegistrationData} />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const RegistrationWrapped = withStyles(styles)(Registration);

export default connect(
  state => ({
     usersReducer: state.usersReducer
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(RegistrationWrapped);