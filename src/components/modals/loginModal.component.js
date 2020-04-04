import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../../css/form.css';

const validationSchema = Yup.object().shape({
  username: Yup.string()
  .required("*Email is required")
  .email("*Must be a valid email address")
  .max(100, "*Email must be less than 100 characters"),
  password: Yup.string()
  .required('No password provided.') 
  .min(8, 'Password is too short - should be 8 chars minimum.')
  .matches('(?=.*[A-Z].)', 'Password must have one upper case letter.')
  .matches('(?=.*[a-z].)','Password must have one lower case letter.')
  .matches('(?=.*\d).','Password must have a number.')
});

const LoginForm = (props) => {
  return (
  <Formik 
    initialValues={{ username: "", password: ""}}
    validationSchema={validationSchema}
    onSubmit={(values, {setSubmitting, resetForm}) => {
      setSubmitting(true);
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resetForm();
        setSubmitting(false);
      }, 500);
    }}
    >
      {( {values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting } ) => (
        <Form noValidate onSubmit={handleSubmit}>
          {/* {console.log(errors)} */}
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="username"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              isValid={touched.username && !errors.username}
              isInvalid={errors.username}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              // isValid={touched.password && !errors.password}
              // isInvalid={errors.password}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            <Form.Text className="text-muted">
              <Link to='/resetPassword' onClick={props.handleClose}>Forgot password?</Link>
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in' : 'Log in'}
            </Button>
            <Button variant="secondary" onClick={props.handleClose} style={{marginLeft: "15px"}}>
              Close
            </Button>
          </Form.Group>
          <Form.Text className="text-muted"> Don't have an account? <Link to='/signup' onClick={props.handleClose}> Sign up </Link></Form.Text>
        </Form>
      )}
    </Formik>
  );
}

function LoginModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Log in
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <LoginForm handleClose={handleClose} />

        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;