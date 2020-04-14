import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import '../../css/form.css';

const createRation = ({dispatch, loading, hasErrors, success, auth}) => {
  
  return (
    <Card bg="light" text="dark">
      <Fragment>
       {!auth &&
          <Redirect push to="/" />
        }
        {success && 
          <Redirect push to="/" /> 
        }
      </Fragment>
      <Card.Header> Create a new event </Card.Header>
      <Form noValidate>
        <Card.Title> Stuff </Card.Title>
      </Form>
    </Card>
    // <Card bsPrefix='card' bg='light' text='dark'>
    //   <Fragment>
    //     {!auth &&
    //       <Redirect push to="/" />
    //     }
    //     {success && 
    //       <Redirect push to="/" /> 
    //     }
    //   </Fragment>
    //   <Card.header> Create an Event </Card.header>

    //   <Form noValidate>
    //     <Card.Title> Stuff </Card.Title>
    //   </Form>
    // </Card>
  )
}

const MapStateToProps = (state) => ({
  auth: state.auth.auth,
  loading: state.createRation.loading,
  hasErrors: state.createRation.hasErrors,
  success: state.createRation.success
});

export default connect(MapStateToProps)(createRation)