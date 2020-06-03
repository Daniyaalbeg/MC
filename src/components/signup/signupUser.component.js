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
  mobile: Yup.string()
  .required("*Number is required")
  .min(7, "*Number must be longer than 7 charachters")
  .max(14, "*Number must be less than 14 charachters")
  .matches(/^(?:(([+]|00)92)|0)((3[0-6][0-9]))(\d{7})$/, "*This is not a valid Pakistani mobile numbers"),
  cnic: Yup.string()
  .matches(/^[0-9+]{5}-[0-9+]{7}-[0-9]{1}|[0-9+]{6}-[0-9+]{6}-[0-9]{1}$/, "*This is not a valid CNIC, make sure it is in this format: 12345-1234567-1 or 123456-123456-1"),
  addressLine1: Yup.string()
  .min(1, "*Address Line 1 must be longer than 1 charachter")
  .max(50, "*Adderss Line 1 must be less than 50 charachters"),
  addressLine2: Yup.string()
  .min(1, "*Address Line 2 must be longer than 1 charachter")
  .max(50, "*Adderss Line 2 must be less than 50 charachters"),
  city: Yup.string()
  .required("*City is required")
  .min(1, "*City name must be longer than 1 charachter")
  .max(50, "*City name must be less than 50 charachters"),
  region: Yup.string()
  .required("*Region is required")
  .min(1, "*Region name must be longer than 1 charachter")
  .max(50, "*Region name must be less than 50 charachters"),
  postCode: Yup.string()
  .min(1, "*Post Code must be longer than 1 charachter")
  .max(20, "*Post Code must be less than 20 charachters"),
  country: Yup.string()
  .required("*Country is required")
  .min(1, "*Country name must be longer than 1 charachter")
  .max(60, "*Country name must be less than 60 charachters"),
  agreedToTerms: Yup.bool()
  .oneOf([true], "*Must accept terms and conditions")
})

const SignupUser = ({ dispatch, hasErrors, loading, success, auth, signUpError }) => {
  dispatch(signupReset())

  if (auth) {
    return (
      <Redirect push to="/dashboard" />
    )
  }

  return (
    <Card bsPrefix='card' bg='light' text='dark' className="signUpCard">
      {/* {success &&
        <Redirect push to="/" />
      } */}
      {/* {auth &&
        <Redirect push to="/dashboard" />
      } */}
      <Card.Header>Sign up form</Card.Header>
      <Formik 
        initialValues={{
          email: "",
          username: "",
          password: "",
          mobile: "",
          cnic: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          region: "",
          postCode: "",
          country: "",
          agreedToTerms: false
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
         
          const data = {
            email: values.email,
            username: values.username,
            password: values.password,
            mobile: values.mobile,
            cnic: values.cnic,
            addressLine1: values.addressLine1,
            addressLine2: values.addressLine2,
            city: values.city,
            region: values.region,
            postCode: values.postCode,
            country: values.country,
          }
          // alert(JSON.stringify(data))
          dispatch(signUpUser(data))
        }}
      >
        {({values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
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
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be 5-20 characters long, contain an uppercase letter, number, and one of the following: @$!%*#?&. It must not contain spaces or emoji.
          </Form.Text>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formMobile">
          <Form.Label>Mobile <span className="red">*</span></Form.Label>
          <Form.Control
            name="mobile"
            type="tel"
            placeholder="Mobile no."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.mobile}
            isValid={touched.mobile && !errors.mobile}
            isInvalid={errors.mobile}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.mobile}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formCnic">
          <Form.Label>CNIC</Form.Label>
          <Form.Control
            name="cnic"
            type="tel"
            placeholder="CNIC no."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.cnic}
            isValid={touched.cnic && !errors.cnic}
            isInvalid={errors.cnic}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.cnic}</Form.Control.Feedback>
        </Form.Group>

        <Card.Subtitle className="mb-2 text-muted" style={{marginTop: "24px"}}> Address </Card.Subtitle>

        <Form.Group controlId="formAddressLine1">
          <Form.Label>Address Line 1</Form.Label>
          <Form.Control
            name="addressLine1"
            type="text"
            placeholder="Address Line 1"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.addressLine1}
            isValid={touched.addressLine1 && !errors.addressLine1}
            isInvalid={errors.addressLine1}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.addressLine1}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formAddressLine2">
          <Form.Label>Address Line 2</Form.Label>
          <Form.Control
            name="addressLine2"
            type="text"
            placeholder="Address Line 2"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.addressLine1}
            isValid={touched.addressLine2 && !errors.addressLine2}
            isInvalid={errors.addressLine2}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.addressLine2}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formCity">
          <Form.Label>City <span className="red">*</span></Form.Label>
          <Form.Control
            name="city"
            type="text"
            placeholder="City"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.city}
            isValid={touched.city && !errors.city}
            isInvalid={errors.city}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formRegion">
            <Form.Label>Province / Region <span className="red">*</span></Form.Label>
            <Form.Control
              name="region"
              type="text"
              placeholder="Province / Region"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.region}
              isValid={touched.region && !errors.region}
              isInvalid={errors.region}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{errors.region}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formPostCode">
          <Form.Label>Post Code / Zip Code</Form.Label>
          <Form.Control
            name="postCode"
            type="text"
            placeholder="Post Code / Zip Code"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.postCode}
            isValid={touched.postCode && !errors.postCode}
            isInvalid={errors.postCode}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.postCode}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formCountry">
          <Form.Label>Country <span className="red">*</span></Form.Label>
          <Form.Control
            name="country"
            type="text"
            placeholder="Country"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.country}
            isValid={touched.country && !errors.country}
            isInvalid={errors.country}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
        </Form.Group>
        </Form.Row>

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