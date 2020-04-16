import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { signUp } from '../../Actions/signUpActions';
import CheckboxGroup, { Checkbox } from './Checkboxs.component';

import '../../css/form.css';

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
  supplierName: Yup.string()
  .required("*Organisation name is required")
  .min(1, "*Organisation name must be longer than 1 charachter")
  .max(50, "*Organisation name must be less than 50 charachters")
  .matches(/^[a-zA-Z0-9_ ]*$/, "*Organisation name must only contain letters or numbers"),
  //BANKING STUFF
  bankName: Yup.string()
  .min(1, "*Bank name must be longer than 1 charachter")
  .max(50, "*Bank name must be less than 50 charachter")
  .matches(/^[a-zA-Z0-9_ ]*$/, "*Bank name must only contain letters or numbers"),
  bankBranch: Yup.string()
  .min(1, "*Bank branch must be longer than 1 charachter")
  .max(50, "*Bank branch must be less than 50 charachter"),
  accountTitle: Yup.string()
  .min(1, "*Account title must be longer than 1 charachter")
  .max(50, "*Account title must be less than 50 charachter"),
  accountNumber: Yup.string()
  .min(1, "*Account Number must be longer than 1 charachter")
  .max(50, "*Account Number must be less than 50 charachter")
  .matches(/^[0-9_]*$/, "*Account number must only contain numbers"),
  IBAN: Yup.string()
  .min(1, "*IBAN number must be longer than 1 charachter")
  .max(50, "*IBAN number must be less than 50 charachter"),
  swiftCode: Yup.string()
  .min(1, "*Swift code must be longer than 1 charachter")
  .max(50, "*Swift code must be less than 50 charachter"),
  easyPaisa: Yup.string()
  // .min(10, "*Easypaisa number must be longer than 1 charachter")
  // .max(11, "*Easypaisa number must be less than 50 charachter")
  .matches(/^(?:(([+]|00)92)|0)((3[0-6][0-9]))(\d{7})$/, "Easypaisa number must be a valid mobile number"),
  jazzCash: Yup.string()
  // .min(1, "*Jazzcash number must be longer than 1 charachter")
  // .max(50, "*Jazzcash number must be less than 50 charachter")
  .matches(/^(?:(([+]|00)92)|0)((3[0-6][0-9]))(\d{7})$/, "Jazzcash number must be a valid mobile number"),
  description: Yup.string()
  .required("*Description is required")
  .min(1, "*Description name must be longer than 1 charachter")
  .max(1000, "*Description name must be less than 1000 charachters"),
  addressInfo: Yup.string()
  .required("*Address is required")
  .min(10, "*Address name must be longer than 1 charachter")
  .max(100, "*Address name must be less than 100 charachters"),
  contactName: Yup.string()
  .required("*Contact name is required")
  .min(1, "*Contact name must be longer than 1 charachter")
  .max(50, "*Contact name must be longer than 50 charachters"),
  contactNumber: Yup.string()
  .required("*Number is required")
  .min(7, "*Number must be longer than 7 charachters")
  .max(14, "*Number must be less than 14 charachters")
  .matches(/^(?:(([+]|00)92)|0)((3[0-6][0-9]))(\d{7})$/, "*Only valid Pakistani mobile numbers"),
  contactInfo: Yup.string()
  .required("*Contact info is required")
  .min(10, "*Contact info must be longer than 10 charachters")
  .max(100, "*Contact info must be less than 100 charachters"),
  supplierWebsite: Yup.string()
  .url("*Please enter a valid URL e.g. http://www.google.com"),
  facebookURL: Yup.string()
  .url("*Please enter a valid URL e.g. http://www.google.com"),
  instagramURL: Yup.string()
  .url("*Please enter a valid URL e.g. http://www.google.com"),
  twitterURL: Yup.string()
  .url("*Please enter a valid URL e.g. http://www.google.com"),
  agreedToTerms: Yup.bool()
  .oneOf([true], "*Must accept terms and conditions")
});

const Signup = ({ dispatch, hasErrors, loading, success, auth }) => {
  return (
    <Card bsPrefix='card' bg='light' text='dark'>
      <Fragment>
        {success || auth &&
          <Redirect push to="/" />
        }
      </Fragment>
      <Card.Header>Sign up form</Card.Header>
      <Formik 
        initialValues={{
          email: "",
          username: "",
          password: "",
          supplierName: "",
          bankName: "",
          bankBranch: "",
          accountTitle: "",
          accountNumber: "",
          IBAN: "",
          swiftCode: "",
          jazzCash: "",
          easyPaisa: "",
          typeInfo: "Individual",
          areaOfWork: [],
          description: "",
          addressInfo: "",
          contactName: "",
          contactNumber: "",
          contactInfo: "",
          supplierWebsite: "",
          facebookURL: "",
          twitterURL: "",
          instagramURL: "",
          agreedToTerms: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const bankingDetails = {
            bankName: values.bankName,
            bankBranch: values.bankBranch,
            accountTitle: values.accountTitle,
            accountNumber: values.accountNumber,
            IBAN: values.IBAN,
            swiftCode: values.swiftCode,
            jazzCash: values.jazzCash,
            easyPaisa: values.easyPaisa,
          }
          const data = {
            email: values.email,
            username: values.username,
            password: values.password,
            supplierName: values.supplierName,
            bankingDetails: bankingDetails,
            typeInfo: values.typeInfo,
            areaOfWork: values.areaOfWork,
            description: values.description,
            address: values.addressInfo,
            contactName: values.contactName,
            contactNumber: values.contactNumber,
            contactInfo: values.contactInfo,
            supplierWebsite: values.supplierWebsite,
            facebookURL: values.facebookURL,
            twitterURL: values.twitterURL,
            instagramURL: values.instagramURL,
          }
          dispatch(signUp(data))
        }}
      >
        {({values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setFieldTouched, }) => (
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
        <Form.Group controlId="formsupplierName">
          <Form.Label>Organisation name</Form.Label>
          <Form.Control
            name="supplierName"
            type="text"
            placeholder="Enter organisation name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.supplierName}
            isValid={touched.supplierName && !errors.supplierName}
            isInvalid={errors.supplierName}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.supplierName}</Form.Control.Feedback>
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

        {/* <Form.Group controlId="formBankingDetails">
          <Form.Label>Your bank details for donations</Form.Label>
          <Form.Control
            name="bankingDetails"
            as="textarea" 
            rows="5" 
            placeholder="Enter only text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.bankingDetails}
            isValid={touched.bankingDetails && !errors.bankingDetails}
            isInvalid={errors.bankingDetails}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.bankingDetails}</Form.Control.Feedback>
        </Form.Group> */}
        <br />
        <hr />
        <br />
        <Card.Subtitle className="mb-2 text-muted"> Banking Details for Donation </Card.Subtitle>

        <Form.Row>
          <Form.Group as={Col} controlId="formBankName">
            <Form.Label> Bank name </Form.Label>
            <Form.Control
            name="bankName"
            type="text"
            placeholder="Enter bank name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.bankName}
            isValid={touched.bankName && !errors.bankName}
            isInvalid={errors.bankName}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{errors.bankName}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formBankBranch">
            <Form.Label> Branch Code </Form.Label>
            <Form.Control
            name="bankBranch"
            type="text"
            placeholder="Enter bank branch"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.bankBranch}
            isValid={touched.bankBranch && !errors.bankBranch}
            isInvalid={errors.bankBranch}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{errors.easyPaisa}</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formAccountTitle">
            <Form.Label> Account title </Form.Label>
            <Form.Control
            name="accountTitle"
            type="text"
            placeholder="Enter account title"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.accountTitle}
            isValid={touched.accountTitle && !errors.accountTitle}
            isInvalid={errors.accountTitle}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{errors.easyPaisa}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formAccountNumber">
            <Form.Label> Account Number </Form.Label>
            <Form.Control
            name="accountNumber"
            type="text"
            placeholder="Enter account number"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.accountNumber}
            isValid={touched.accountNumber && !errors.accountNumber}
            isInvalid={errors.accountNumber}
            />
          </Form.Group>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.easyPaisa}</Form.Control.Feedback>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formIBAN">
            <Form.Label> IBAN </Form.Label>
            <Form.Control
            name="IBAN"
            type="text"
            placeholder="Enter IBAN"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.IBAN}
            isValid={touched.IBAN && !errors.IBAN}
            isInvalid={errors.IBAN}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{errors.IBAN}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formSwift">
            <Form.Label> Swift Code </Form.Label>
            <Form.Control
            name="swiftCode"
            type="text"
            placeholder="Enter swift code"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.swiftCode}
            isValid={touched.swiftCode && !errors.swiftCode}
            isInvalid={errors.swiftCode}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{errors.swiftCode}</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formEasyPaisa">
          <Form.Label>Easypaisa number</Form.Label>
          <Form.Control
            name="easyPaisa"
            type="text"
            placeholder="03XXXXXXXXX"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.easyPaisa}
            isValid={touched.easyPaisa && !errors.easyPaisa}
            isInvalid={errors.easyPaisa}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.easyPaisa}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formJazzCash">
          <Form.Label>Jazzcash number</Form.Label>
          <Form.Control
            name="jazzCash"
            type="text"
            placeholder="03XXXXXXXXX"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.jazzCash}
            isValid={touched.jazzCash && !errors.jazzCash}
            isInvalid={errors.jazzCash}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.jazzCash}</Form.Control.Feedback>
        </Form.Group>

        <hr />

        <Form.Group controlId="formType">
          <Form.Label>Type of Organisation</Form.Label>
          <Form.Control
            as="select"
            name="typeInfo"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.typeInfo}
          >
            <option>Armed Forces</option>
            <option>Community</option>
            <option>Corporate</option>
            <option>Civil Society</option>
            <option>Government</option>
            <option>Individual</option>
            <option>NGO</option>
          </Form.Control>
        </Form.Group>
        
        <Form.Group>
          <Form.Label> Category </Form.Label>
          <CheckboxGroup
            id="areaOfWork"
            value={values.areaOfWork}
            error={errors.areaOfWork}
            touched={touched.areaOfWork}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
          >
            <Field
              component={Checkbox}
              name="areaOfWork"
              id="communication"
              label="Communication"
            />  
            <Field
              component={Checkbox}
              name="areaOfWork"
              id="communityDevelopment"
              label="Community Development"
            />
            <Field
              component={Checkbox}
              name="areaOfWork"
              id="education"
              label="Education"
            />
            <Field
              component={Checkbox}
              name="areaOfWork"
              id="environment"
              label="Environment"
            />
            <Field
              component={Checkbox}
              name="areaOfWork"
              id="gender"
              label="Gender"
            />
            <Field
              component={Checkbox}
              name="areaOfWork"
              id="health"
              label="Health"
            />
            <Field
              component={Checkbox}
              name="areaOfWork"
              id="humanrights"
              label="Human Rights"
            />
            <Field
              component={Checkbox}
              name="areaOfWork"
              id="infrastructure"
              label="Infrastructure"
            />
              <Field
                component={Checkbox}
                name="areaOfWork"
                id="justice"
                label="Justice"
              />
            <Field
              component={Checkbox}
              name="areaOfWork"
              id="livelihood"
              label="Livelihood"
            />
            <Field
              component={Checkbox}
              name="areaOfWork"
              id="poverty"
              label="Poverty"
            />
            <Field
              component={Checkbox}
              name="areaOfWork"
              id="other"
              label="Other"
            />
          </CheckboxGroup>
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

        <Form.Group controlId="formContactName">
          <Form.Label> Name of Point of Contact / Representative</Form.Label>
          <Form.Control
            name="contactName"
            type="text"
            placeholder="Enter name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.contactName}
            isValid={touched.contactName && !errors.contactName}
            isInvalid={errors.contactName}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.contactName}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formContactNumber">
          <Form.Label>Point of Contact Mobile Number</Form.Label>
          <Form.Control
            name="contactNumber"
            type="text"
            placeholder="Enter mobile number"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.contactNumber}
            isValid={touched.contactNumber && !errors.contactNumber}
            isInvalid={errors.contactNumber}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.contactNumber}</Form.Control.Feedback>
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
            name="supplierWebsite"
            type="text"
            placeholder="Enter website"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.supplierWebsite}
            isValid={touched.supplierWebsite && !errors.supplierWebsite}
            isInvalid={errors.supplierWebsite}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.supplierWebsite}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formFacebook">
          <Form.Label>Facebook</Form.Label>
          <Form.Control
            name="facebookURL"
            type="text"
            placeholder="https://www.facebook.com"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.facebookURL}
            isValid={touched.facebookURL && !errors.facebookURL}
            isInvalid={errors.facebookURL}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.facebookURL}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formInstagram">
          <Form.Label>Instagram</Form.Label>
          <Form.Control
            name="instagramURL"
            type="text"
            placeholder="https://instagram.com"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.instagramURL}
            isValid={touched.instagramURL && !errors.instagramURL}
            isInvalid={errors.instagramURL}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.instagramURL}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formTwitter">
          <Form.Label>Twitter</Form.Label>
          <Form.Control
            name="twitterURL"
            type="text"
            placeholder="https://twitter.com"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.twitterURL}
            isValid={touched.twitterURL && !errors.twitterURL}
            isInvalid={errors.twitterURL}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.twitterURL}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Field
            component={Checkbox}
            name="agreedToTerms"
            id="agreedToTerms"
            label="Agree to Terms & Conditions"
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Signing up' : 'Sign up'}
        </Button>

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

const MapStateToProps = (state) => ({
  loading: state.signUp.loading,
  hasErrors: state.signUp.hasErrors,
  success: state.signUp.success,
  auth: state.auth.auth
});

export default connect(MapStateToProps)(Signup);