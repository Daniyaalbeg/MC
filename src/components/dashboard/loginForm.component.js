import React from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import '../../css/form.css';
import { connect } from 'react-redux';

import { signupReset } from '../../Actions/signUpActions';
import { login } from '../../Actions/authActions';
import { resetUserInfoGet } from '../../Actions/userInfoActions'


const validationSchema = Yup.object().shape({
  email: Yup.string()
  .required("*Email is required")
  .email("*Must be a valid email address")
  .max(100, "*Email must be less than 100 characters"),
  password: Yup.string()
  .required('No password provided.') 
});

const LoginForm = ({dispatch, loading, hasErrors}) => {
  return (
  <Formik
    initialValues={{ email: "", password: ""}}
    validationSchema={validationSchema}
    onSubmit={(values) => {
      dispatch(resetUserInfoGet())
      dispatch(login({
        email: values.email,
        password: values.password
      }));
    }}
    >{( {values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit }) => (
        <Form noValidate onSubmit={handleSubmit} className="loginFormBorder">
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              isValid={touched.email && !errors.email}
              isInvalid={errors.email}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
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
              autoComplete="current-password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              // isValid={touched.password && !errors.password}
              // isInvalid={errors.password}
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            {hasErrors ? <Form.Text className="text-muted, red"> Wrong email or password, try again </Form.Text> : ""}
            <Form.Text className="text-muted">
              <Link to='/reset' className="link">Forgot password?</Link>
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <button className="standardButton" type="submit" disabled={loading}>
            {
              loading ? 
              <Spinner animation="grow" size="sm" style={{ marginRight: '8px' }} /> 
              :
              null
            }
            {loading ? 'Logging in' : 'Log in'}
            </button>
          </Form.Group>
          <Form.Text className="text-muted"> Don't have an account? <Link to='/signup' className="link" onClick={() =>{
              dispatch(signupReset())
            }}> Sign up </Link></Form.Text>
        </Form>
      )}
    </Formik>
  );
}

const MapStateToProps = (state) => ({
  loading: state.auth.loading,
  hasErrors: state.auth.hasErrors,
})

export default connect(MapStateToProps)(LoginForm)