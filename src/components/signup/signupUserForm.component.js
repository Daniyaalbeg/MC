import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Spinner from 'react-bootstrap/Spinner';
import { signUpUser } from '../../Actions/signUpActions';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/pro-solid-svg-icons";

const validationSchema = Yup.object().shape({
  firstname: Yup.string()
  .required("*First name is required")
  .max(100, "*First name must be less than 100 charachters"),
  lastname: Yup.string()
  .required("*Last name is required")
  .max(100, "*Last name must be less than 100 charachters"),
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
  // .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,20}$/, "*Password must contain an uppercase, lowercase letter, number and special charachter"),
  .matches(/(?=^.{5,20}$)((?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=(.*\d){1,}))((?!.*[",;&|'])|(?=(.*\W){1,}))(?!.*[",;&|'])^.*$/, "*Password must contain an uppercase, lowercase letter, and number"),
  mobile: Yup.string()
  .required("*Number is required")
  .min(7, "*Number must be longer than 7 charachters")
  .max(14, "*Number must be less than 14 charachters"),
  // .matches(/^(?:(([+]|00)92)|0)((3[0-6][0-9]))(\d{7})$/, "*This is not a valid Pakistani mobile numbers"),
  cnic: Yup.string()
  .matches(/^(\d{13})?$|[0-9]{12}-[0-9]{1}$|[0-9]{5}-[0-9]{7}-[0-9]{1}$|[0-9]{6}-[0-9]{6}-[0-9]{1}$/, "*This is not a valid CNIC, make sure it is in this format: 1234567891234 or 12345-1234567-1 or 123456-123456-1"),
  // addressLine1: Yup.string()
  // .min(1, "*Address Line 1 must be longer than 1 charachter")
  // .max(50, "*Adderss Line 1 must be less than 50 charachters"),
  city: Yup.string()
  .required("*City is required")
  .min(1, "*City name must be longer than 1 charachter")
  .max(50, "*City name must be less than 50 charachters"),
  // region: Yup.string()
  // .required("*Region is required")
  // .min(1, "*Region name must be longer than 1 charachter")
  // .max(50, "*Region name must be less than 50 charachters"),
  // postCode: Yup.string()
  // .min(1, "*Post Code must be longer than 1 charachter")
  // .max(20, "*Post Code must be less than 20 charachters"),
  country: Yup.string()
  .required("*Country is required")
  .min(1, "*Country name must be longer than 1 charachter")
  .max(60, "*Country name must be less than 60 charachters"),
  agreedToTerms: Yup.bool()
  .oneOf([true], "*Must accept terms and conditions")
})

const SignupUserForm = ({ dispatch, hasErrors, loading, success, auth, signUpError }) => {

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      mobile: "",
      cnic: "",
      addressLine1: "",
      city: "",
      region: "",
      postCode: "",
      country: "",
      agreedToTerms: false
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        username: values.username,
        password: values.password,
        mobile: values.mobile,
        cnic: values.cnic,
        addressLine1: values.addressLine1,
        city: values.city,
        region: values.region,
        postCode: values.postCode,
        country: values.country,
      }
      dispatch(signUpUser(data))
    },
  });

  return (
    <div className="formCardContainer">
      <div className="standardForm">
        <form noValidate onSubmit={formik.handleSubmit}>
          <div className="formMainHeader">
            <FontAwesomeIcon icon={faUser} size="2x" />
            <h2> Sign Up </h2>
          </div>
          <div className="formMainBody">

            <div className="formRow">
              <div className="formGroup">
                <p className="formGroupHeader">First Name <span className="red">*</span> </p>
                <input
                  autoFocus
                  autoComplete="given-name"
                  type="text"
                  name="firstname"
                  placeholder="Enter first name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstname}
                />
                {formik.errors.firstname && (
                  <p className="formInputError"> {formik.errors.firstname} </p>
                )}
              </div>

              <div className="formGroup">
                <p className="formGroupHeader">Last Name <span className="red">*</span> </p>
                <input
                  autoComplete="family-name"
                  type="text"
                  name="lastname"
                  placeholder="Enter last name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastname}
                />
                {formik.errors.lastname && (
                  <p className="formInputError"> {formik.errors.lastname} </p>
                )}
              </div>
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">Email <span className="red">*</span> </p>
              <input
                autoComplete="email"
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email && (
                <p className="formInputError"> {formik.errors.email} </p>
              )}
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">Username <span className="red">*</span> </p>
              <input
                autoComplete="username"
                type="text"
                name="username"
                placeholder="Enter username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.errors.username && (
                <p className="formInputError"> {formik.errors.username} </p>
              )}
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">Password <span className="red">*</span> </p>
              <input
                autoComplete="new-password"
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.errors.password && (
                <p className="formInputError"> {formik.errors.password} </p>
              )}
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">Mobile <span className="red">*</span> </p>
              <input
                autoComplete="tel"
                type="text"
                name="mobile"
                placeholder="Enter mobile number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobile}
              />
              {formik.errors.mobile && (
                <p className="formInputError"> {formik.errors.mobile} </p>
              )}
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">CNIC Number</p>
              <input
                type="text"
                name="cnic"
                placeholder="Enter CNIC"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cnic}
              />
              {formik.errors.cnic && (
                <p className="formInputError"> {formik.errors.cnic} </p>
              )}
            </div>

            {/* <div className="formGroup">
              <p className="formGroupHeader">Address Line <span className="red">*</span> </p>
              <input
              autoComplete="street-address"
                type="text"
                name="addressLine1"
                placeholder="Enter address line"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.addressLine1}
              />
              {formik.errors.addressLine1 && (
                <p className="formInputError"> {formik.errors.addressLine1} </p>
              )}
            </div> */}

            <div className="formRow">
              <div className="formGroup">
                <p className="formGroupHeader">City <span className="red">*</span> </p>
                <input
                  autoComplete="address-level2"
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                />
                {formik.errors.city && (
                  <p className="formInputError"> {formik.errors.city} </p>
                )}
              </div>

              {/* <div className="formGroup">
                <p className="formGroupHeader">Region</p>
                <input
                  autoComplete="address-level1"
                  type="text"
                  name="region"
                  placeholder="Enter region"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.region}
                />
                {formik.errors.region && (
                  <p className="formInputError"> {formik.errors.region} </p>
                )}
              </div>

              <div className="formGroup">
                <p className="formGroupHeader">Postal Code</p>
                <input
                  autoComplete="postal-code"
                  type="text"
                  name="postCode"
                  placeholder="Enter postcode / zipcode"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.postCode}
                />
                {formik.errors.postCode && (
                  <p className="formInputError"> {formik.errors.postCode} </p>
                )}
              </div> */}
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">Country <span className="red">*</span> </p>
              <input
                autoComplete="country-name"
                type="text"
                name="country"
                placeholder="Enter country"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
              />
              {formik.errors.country && (
                <p className="formInputError"> {formik.errors.country} </p>
              )}
            </div>

            <div className="formGroup">
              <div className="formGroupCheckBox">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  id="formCheckbox"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.agreedToTerms}
                />
                <p className="agreedTo">
                  {" "}
                  Agreed to{" "}
                  <Link to="/termsandconditions" target="_blank">
                    {" "}
                    Terms & Conditions{" "}
                  </Link>
                </p>
              </div>
              {formik.errors.agreedToTerms && (
                <p className="formInputError">
                  {" "}
                  {formik.errors.agreedToTerms}{" "}
                </p>
              )}
            </div>

            <div className="formButtons">
              <button
                className="standardButtonWithoutColour mcGreenBG"
                type="submit"
                disabled={loading}
                style={{ marginRight: "8px" }}
              >
                {loading ? (
                  <Spinner
                    animation="grow"
                    size="sm"
                    style={{ marginRight: "8px" }}
                  />
                ) : null}
                {loading ? "Signing Up" : "Sign Up"}
              </button>
              <button
                type="button"
                className="standardButton redVersion"
                onClick={formik.resetForm}
                disabled={loading}
              >
                Reset
              </button>
            </div>

            {success &&
              <p className="successReply"> Sign up successfull. A verification email has been sent to {formik.values.email} </p>
            }

            {hasErrors &&
              <ErrorComponent signUpError={signUpError} />
            }
            
            <p className="text-muted" style={{marginTop: '8px'}}>
              Note: Only once we have verified your information will you be able to add charity drives and appear on the page.
            </p>

          </div>
        </form>
      </div>
    </div>
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


export default connect(MapStateToProps)(SignupUserForm);