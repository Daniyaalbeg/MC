import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

import '../css/form.css';
import { ListGroup } from 'react-bootstrap';

const validationSchema = Yup.object().shape({
  email: Yup.string()
  .required("*Email is required")
  .email("*Must be a valid email")
  .max(100, "*Email must be less than 100 charachters"),
  username: Yup.string()
  .required("*Username is required")
  .min(5, "*Username must be longer than 5 charachters")
  .max(20, "*Username must be less than 20 charachters")
  .matches(/^[a-zA-Z0-9_]*$/, "*Username must be only letters or numbers"),
  password: Yup.string()
  .required("*Password is required")
  .min(5, "*Password must be longer than 5 charachters")
  .max(20, "*password must be less than 20 charachters")
  .matches("", )
  .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,20}$/, "*Password must contain an uppercase, lowercase letter, number and special charachter"),
  organisationName: Yup.string()
  .required("*Organisation name is required")
  .min(1, "*Organisation name must be longer than 1 charachter")
  .max(50, "*Organisation name must be less than 50 charachters")
  .matches(/^[a-zA-Z0-9_]*$/, "*Organisation name must only contain letters or numbers"),
  description: Yup.string()
  .required("*Description is required")
  .min(1, "*Description name must be longer than 1 charachter")
  .max(100, "*Description name must be less than 100 charachters"),
  donationInfo: Yup.string()
  .min(1, "*Donation Info name must be longer than 1 charachter")
  .max(100, "*Donation Info name must be less than 100 charachters"),
  addressInfo: Yup.string()
  .required("*Address is required")
  .min(10, "*Address name must be longer than 1 charachter")
  .max(100, "*Address name must be less than 100 charachters"),
  numberInfo: Yup.string()
  .required("*Number is required")
  .min(7, "*Number must be longer than 7 charachters")
  .max(14, "*Number must be less than 14 charachters")
  .matches(/^(?:(([+]|00)92)|0)((3[0-6][0-9]))(\d{7})$/, "*Only valid Pakistani mobile numbers"),
  contactInfo: Yup.string()
  .required("*Contact info is required")
  .min(10, "*Contact info must be longer than 10 charachters")
  .max(100, "*Contact info must be less than 100 charachters"),
  websiteInfo: Yup.string()
  .url("*Please enter a valid URL e.g. http://www.google.com")
});

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
  return (
    <Card bsPrefix='card' bg='light' text='dark'>
      <Card.Header>Sign up form</Card.Header>
      <Formik 
        initialValues={{
          email: "",
          username: "",
          password: "",
          organisationName: "",
          description: "",
          donationInfo: "",
          typeInfo: "Individual",
          addressInfo: "",
          numberInfo: "",
          contactInfo: "",
          websiteInfo: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          setSubmitting(true);
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
            this.setState({redirect: true});
          }, 500);
        }}
      >
        {({values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting }) => (
        <Form noValidate onSubmit={handleSubmit}>
        <Card.Body>
        <Card.Title>Personal Info</Card.Title>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email" 
            placeholder="Enter email"
            name="email"
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
          <Form.Label>Username</Form.Label>
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            isValid={touched.password && !errors.password}
            isInvalid={errors.password}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>
        </Card.Body>

        <hr></hr>

        <Card.Body>
        <Card.Title>Organisation Info</Card.Title>
        <Form.Group controlId="formOrganisationName">
          <Form.Label>Organisation name</Form.Label>
          <Form.Control
            name="organisationName"
            type="text"
            placeholder="Enter organisation name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.organisationName}
            isValid={touched.organisationName && !errors.organisationName}
            isInvalid={errors.organisationName}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.organisationName}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            rows="5"
            placeholder="Enter only text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            isValid={touched.description && !errors.description}
            isInvalid={errors.description}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDonationInfo">
          <Form.Label>Your bank details for donations</Form.Label>
          <Form.Control
            name="donationInfo"
            as="textarea" 
            rows="5" 
            placeholder="Enter only text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.donationInfo}
            isValid={touched.donationInfo && !errors.donationInfo}
            isInvalid={errors.donationInfo}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.donationInfo}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formType">
          <Form.Label>Type of organisation</Form.Label>
          <Form.Control
            as="select"
            name="typeInfo"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.typeInfo}
          >
            <option>Individual</option>
            <option>Organisation</option>
            <option>Other</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            name="addressInfo"
            as="textarea" 
            rows="3" 
            placeholder="Enter address"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.addressInfo}
            isValid={touched.addressInfo && !errors.addressInfo}
            isInvalid={errors.addressInfo}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.addressInfo}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formContactNumber">
          <Form.Label>Pakistani Mobile Number</Form.Label>
          <Form.Control
            name="numberInfo"
            type="text"
            placeholder="Enter mobile number"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.numberInfo}
            isValid={touched.numberInfo && !errors.numberInfo}
            isInvalid={errors.numberInfo}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.numberInfo}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formContactInfo">
          <Form.Label>Other contact info</Form.Label>
          <Form.Control
            name="contactInfo"
            as="textarea" 
            rows="2" 
            placeholder="Enter other contact info"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.contactInfo}
            isValid={touched.contactInfo && !errors.contactInfo}
            isInvalid={errors.contactInfo}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.contactInfo}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formWebsite">
          <Form.Label>Website</Form.Label>
          <Form.Control
            name="websiteInfo"
            type="text"
            placeholder="Enter website"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.websiteInfo}
            isValid={touched.websiteInfo && !errors.websiteInfo}
            isInvalid={errors.websiteInfo}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.websiteInfo}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Signing up' : 'Sign up'}
        </Button>

        <Form.Text className="text-muted">
          Note: Only once we have verified your information will you be able to add charity drives and appear on the page.
        </Form.Text>

      </Card.Body>
      </Form>
    )}
    </Formik>
    </Card>
  )}
}

export default Signup;