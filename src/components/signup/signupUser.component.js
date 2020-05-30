import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import { Card, Col, Form, Spinner } from 'react-bootstrap';
import { signUpUser, signupReset } from '../../Actions/signUpActions';
import { Checkbox } from '../utilities/Checkboxs.component';


import '../../css/form.css';
import '../../css/signupUser.css';

const validationSchema = Yup.object().shape({
  email: Yup.string()
  .required("*Email is required")
  .email("*Must be a valid email")
  .max(100, "*Email must be less than 100 charachters"),
  username: Yup.string()
  .required("*Username is required")
  .min(5, "*Username must be longer than 5 charachters")
  .max(20, "*Username must be less than 20 charachters")
  .matches(/^[a-zA-Z0-9_ ]*$/, "*Username must be only letters or numbers"),
  password: Yup.string()
  .required("*Password is required")
  .min(5, "*Password must be longer than 5 charachters")
  .max(20, "*password must be less than 20 charachters")
  .matches("", )
  .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,20}$/, "*Password must contain an uppercase, lowercase letter, number and special charachter"),
  agreedToTerms: Yup.bool()
  .oneOf([true], "*Must accept terms and conditions")
})

const SignupUser = ({ dispatch, hasErrors, loading, success, auth, signUpError }) => {

  return (
    <Card bsPrefix='card' bg='light' text='dark' className="signUpCard">
      {/* {success &&
        <Redirect push to="/" />
      } */}
      {(auth && success) ? dispatch(signupReset()) : ""}
      {auth &&
        <Redirect push to="/dashboard" />
      }
      <Card.Header>Sign up form</Card.Header>
      <Formik 
        initialValues={{
          email: "",
          username: "",
          password: "",
          agreedToTerms: false
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
         
          const data = {
            email: values.email,
            username: values.username,
            password: values.password,
            agreedToTerms: false,
          }
          dispatch(signUpUser(data))
        }}
      >
        {({values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          resetForm, }) => (
        <Form noValidate onSubmit={handleSubmit}>
        <Card.Body>
        <Form.Text className="text-muted">
          required fields <span className="red"> *</span>
        </Form.Text>
        {/* <Card.Title>Personal Info</Card.Title> */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address <span className="red">*</span></Form.Label>
          <Form.Control
            type="email" 
            placeholder="Enter email"
            name="email"
            autoComplete="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            isValid={touched.email && !errors.email}
            isInvalid={errors.email}
          />
          <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formUsername">
          <Form.Label>Username <span className="red">*</span></Form.Label>
          <Form.Control
            name="username"
            type="text"
            placeholder="Enter username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            isValid={touched.username && !errors.username}
            isInvalid={errors.username}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password <span className="red">*</span></Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            isValid={touched.password && !errors.password}
            isInvalid={errors.password}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Field
            style={{ width: "100%" }}
            component={Checkbox}
            name="agreedToTerms"
            id="agreedToTerms"
            label="Agree to Terms & Conditions"
            isValid={touched.agreedToTerms && !errors.agreedToTerms}
            isInvalid={errors.agreedToTerms}
          />
        </Form.Group>

        <button className="standardButton signUpButton" type="submit" disabled={loading}>
        {
          loading ? 
          <Spinner animation="grow" size="sm" style={{ marginRight: '8px' }} /> 
          :
          null
        }
        {loading ? 'Signing up' : 'Sign up'}
        </button>

        <button className="standardButton redVersion" onClick={resetForm} disabled={loading}>
          Reset
        </button>

        {success &&
          <p className="successReply"> Sign up successfull. A verification email has been sent to {values.email} </p>
        }

        {hasErrors &&
          <ErrorComponent signUpError={signUpError} />
        }

        <Form.Text className="text-muted">
          Note: Only once we have verified your information will you be able to add charity drives and appear on the page.
        </Form.Text>

      </Card.Body>
      </Form>
    )}
    </Formik>
    </Card>
  )
}

const ErrorComponent = (props) => {
  if (props.signUpError === 200) {
    return (
      <>
        <br />
        <p className="redError"> This email is already in use. Please use a different one</p>
      </>
    )
  } else {
    return (
      <>
        <br />
        <p className="redError"> An error has occured please try again later or email support.</p>
      </>
    )
  }
}

const MapStateToProps = (state) => ({
  loading: state.signUp.loading,
  hasErrors: state.signUp.hasErrors,
  success: state.signUp.success,
  auth: state.auth.auth,
  signUpError: state.signUp.error
});


export default connect(MapStateToProps)(SignupUser);