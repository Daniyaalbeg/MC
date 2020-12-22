import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from '../../../Actions/authActions';
import { resetUserInfoGet } from '../../../Actions/userInfoActions';

const validationSchema = Yup.object().shape({
  email: Yup.string()
  .required()
  .email("*Must be a valid email address")
  .max(100, "*Email must be less than 100 characters"),
  password: Yup.string()
  .required() 
});

const LoginForm = ({ dispatch, loading, hasErrors, setSignUp }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(resetUserInfoGet())
      dispatch(login({
        email: values.email,
        password: values.password
      }));
    }
  })

  return (
    <form noValidate onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
      <div className="formGroup login">
        <p className="formGroupHeader login">Email Address</p>
        <input
          autoFocus
          autoComplete="username"
          type="email"
          name="email"
          placeholder=""
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
      </div>

      <div className="formGroup login">
        <p className="formGroupHeader login">Password</p>
        <input
          autoComplete="current-password"
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <p className="formText text-muted">
          <Link to='/reset' className="link">Forgot password?</Link>
        </p>
      </div>

      <div className="formGroup">
        <button className="standardButtonWithoutColour mcLightBG" style={{height: '2.2em', fontWeight: "bold"}} type="submit" disabled={loading}>
          {
          loading
          ? 
          <Spinner animation="border" size="sm" /> 
          :
          "Log in"
          }
        </button>  
        {hasErrors ? <p className="wrongPassword"> Wrong email or password, try again </p> : null}
      </div>

      <p className="text-muted"> 
        Don't have an account? &nbsp;
        <span className="formText link" onClick={() => setSignUp(true)}>
          Sign Up
        </span>
        {/* <Link to='/signup' className="link formText" onClick={() =>{
          dispatch(signupReset())
        }}> Sign up </Link>  */}
      </p>
    </form>
  )
}

const MapStateToProps = (state) => ({
  loading: state.auth.loading,
  hasErrors: state.auth.hasErrors,
})

export default connect(MapStateToProps)(LoginForm)