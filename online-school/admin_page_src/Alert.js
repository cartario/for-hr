import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { ALERT_DELAY } from 'core/const';
import * as actions from './actions';

const AlertComponent = ({ alert, setAlert }) => (
  <>
    <Snackbar
      open={alert.errors}
      autoHideDuration={ALERT_DELAY}
      onClose={() => setAlert({ errors: null })}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={() => setAlert({ errors: null })}
        severity="error"
        sx={{ width: '100%' }}
      >
        {alert.errors}
      </Alert>
    </Snackbar>
    <Snackbar
      open={alert.success}
      autoHideDuration={ALERT_DELAY}
      onClose={() => setAlert({ success: null })}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={() => setAlert({ success: null })}
        severity="success"
        sx={{ width: '100%' }}
      >
        {alert.success}
      </Alert>
    </Snackbar>
  </>
);

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AlertComponent);
