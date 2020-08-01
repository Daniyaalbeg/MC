import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import { Card, Col, Form, Spinner } from 'react-bootstrap';
import { updateUser, updatingUserRedirect } from '../../Actions/updateActions';


const validationSchema = Yup.object().shape({
  username: Yup.string()
  .required("*Username is required")
  .min(5, "*Username must be longer than 5 charachters")
  .max(20, "*Username must be less than 20 charachters")
  .matches(/^[a-zA-Z0-9_ ]*$/, "*Username must be only letters or numbers"),
  mobile: Yup.string()
  .required("*Number is required")
  .min(7, "*Number must be longer than 7 charachters")
  .max(14, "*Number must be less than 14 charachters"),
  // .matches(/^(?:(([+]|00)92)|0)((3[0-6][0-9]))(\d{7})$/, "*This is not a valid Pakistani mobile numbers"),
  cnic: Yup.string()
  .matches(/^(\d{13})?$|[0-9]{12}-[0-9]{1}$|[0-9]{5}-[0-9]{7}-[0-9]{1}$|[0-9]{6}-[0-9]{6}-[0-9]{1}$/, "*This is not a valid CNIC, make sure it is in this format: 1234567891234 or 12345-1234567-1 or 123456-123456-1"),
  addressLine1: Yup.string()
  .min(1, "*Address Line 1 must be longer than 1 charachter")
  .max(50, "*Adderss Line 1 must be less than 50 charachters"),
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
})

const UpdateProfile = ({ dispatch, hasErrors, loading, success, signUpError, auth, user }) => {
if (!auth) {
  return <Redirect push to="/dashboard" />
}

  if (success) {
    dispatch(updatingUserRedirect())
    return <Redirect push to="/dashboard" />
  }

  return (
    <Card bsPrefix='card' bg='light' text='dark' className="signUpCard">
      <Card.Header>Update Profile</Card.Header>
      <Formik 
        initialValues={{
          username: user.username,
          mobile: user.mobile,
          cnic: user.cnic,
          line1: user.address.line1,
          city: user.address.city,
          region: user.address.region,
          postCode: user.address.postCode,
          country: user.address.country,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
         
          const data = {
            username: values.username,
            mobile: values.mobile,
            cnic: values.cnic,
            line1: values.line1,
            city: values.city,
            region: values.region,
            postCode: values.postCode,
            country: values.country,
          }
          dispatch(updateUser(data))
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
            name="line1"
            type="text"
            placeholder="Address Line 1"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.line1}
            isValid={touched.line1 && !errors.line1}
            isInvalid={errors.line1}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.line1}</Form.Control.Feedback>
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

        <div className="formButtons">
          <button className="standardButton signUpButton" type="submit" disabled={loading}>
          {
            loading ? 
            <Spinner animation="grow" size="sm" style={{ marginRight: '8px' }} /> 
            :
            null
          }
          {loading ? 'Updating' : 'Update'}
          </button>

          <button type="button" className="standardButton redVersion" onClick={resetForm} disabled={loading}>
            Reset
          </button>
        </div>

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
  return (
    <>
      <br />
      <p className="redError"> An error has occured please try again later or email support.</p>
    </>
  )
}

const MapStateToProps = (state) => ({
  loading: state.updateInfo.loading,
  hasErrors: state.updateInfo.hasErrors,
  success: state.updateInfo.success,
  auth: state.auth.auth,
  user: state.userInfo.user
});


export default connect(MapStateToProps)(UpdateProfile);