import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const createRation = ({dispatch, loading, hasErrors, success}) => {
  <Card bsPrefix='card' bg='light' text='dark'>
    <Fragment>
      {success && 
        <Redirect push to="/" /> 
      }
    </Fragment>
  </Card>
}

const MapStateToProps = (state) => ({
  loading: state.createRation.loading,
  hasErrors: state.createRation.hasErrors,
  success: state.createRation.success
});

export default connect(MapStateToProps)(createRation)