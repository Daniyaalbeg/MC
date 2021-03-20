import React, { useState, useMemo } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { useFormik, Field } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import Dropzone, { useDropzone } from "react-dropzone";
import {
  baseStyle,
  acceptStyle,
  activeStyle,
  rejectStyle,
} from "../utilities/dropzoneStyles";
import Thumb from "../utilities/thumb.component";
import LoadingSpinner from "../utilities/loadingSpinner.component";
import SkillsSelection from "../sharedComponents/skillsSelection.component";
import {
  SelectBadgeOptionsForm,
  CategoryBadgeOptionsForm,
} from "../sharedComponents/selectBadgeOptions.component";
import { listOfLanguages } from "../utilities/dataOptions.component";

import {
  updatingVolunteer,
  updateVolunteerReset,
} from "../../Actions/volunteerActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsHelping } from "@fortawesome/pro-solid-svg-icons";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("*First name is required")
    .max(100, "*First name must be less than 100 charachters"),
  lastName: Yup.string()
    .required("*Last name is required")
    .max(100, "*Last name must be less than 100 charachters"),
  email: Yup.string()
    .required("*Email is required")
    .email("*Must be a valid email")
    .max(100, "*Email must be less than 100 charachters"),
  cnic: Yup.string().matches(
    /^(\d{13})?$|[0-9]{12}-[0-9]{1}$|[0-9]{5}-[0-9]{7}-[0-9]{1}$|[0-9]{6}-[0-9]{6}-[0-9]{1}$/,
    "*This is not a valid CNIC, make sure it is in this format: 1234567891234 or 12345-1234567-1 or 123456-123456-1"
  ),
  dob: Yup.date().required("*Date of birth is required"),
  gender: Yup.string().required("*Please select a gender"),
  about: Yup.string()
    .required("*About is required")
    .max(1000, "*About must be less than 1000 charachters"),
  contactNumber: Yup.string()
    .required("*Number is required")
    .min(7, "*Number must be longer than 7 charachters")
    .max(14, "*Number must be less than 14 charachters"),
  educationLevel: Yup.string().required("*Education is required"),
  employmentStatus: Yup.string().required("*Employment is required"),
  city: Yup.string()
    .required("*City is required")
    .min(1, "*City name must be longer than 1 charachter")
    .max(50, "*City name must be less than 50 charachters"),
  country: Yup.string()
    .required("*Country is required")
    .min(1, "*Country name must be longer than 1 charachter")
    .max(60, "*Country name must be less than 60 charachters"),
  languages: Yup.array().min(1, "*Please select at least one language"),
  skills: Yup.array().min(1, "*Please select at least one skill"),
  interests: Yup.array().min(1, "*Please select at least one interest"),
  agreedToTerms: Yup.bool().oneOf([true], "*Must accept terms and conditions"),
});

const UpdateVolunteerProfileForm = ({
  dispatch,
  hasErrors,
  loading,
  success,
  auth,
  userDict,
  userID,
}) => {
  const [imageFiles, setImageFiles] = useState([]);
  const [didUploadNewImage, setDidUploadNewImage] = useState(false);
  const [rejectedFilesState, setRejectedFilesState] = useState([]);
  const { isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg, image/gif",
    maxSize: 2000000,
  });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject]
  );

  const user = userDict[userID];

  const formik = useFormik({
    initialValues: {
      firstName: user.volunteer.firstName,
      lastName: user.volunteer.lastName,
      email: user.volunteer.email,
      cnic: user.volunteer.cnic,
      image: user.volunteer.image,
      dob: new Date(user.volunteer.dob),
      gender: user.volunteer.gender,
      about: user.volunteer.about,
      contactNumber: user.volunteer.contactNumber,
      educationLevel: user.volunteer.educationLevel,
      employmentStatus: user.volunteer.employmentStatus,
      disability: user.volunteer.disability,
      languages: user.volunteer.languages,
      haveSmartPhone: user.volunteer.haveSmartPhone,
      vehicle: user.volunteer.vehicle,
      preferredContact: user.volunteer.preferredContact,
      country: user.volunteer.country,
      city: user.volunteer.city,
      skills: user.volunteer.skills,
      interests: user.volunteer.interests,
      isPrivate: user.volunteer.isPrivate,
      agreedToTerms: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        cnic: values.cnic,
        image: values.image,
        dob: values.dob,
        gender: values.gender,
        about: values.about,
        contactNumber: values.contactNumber,
        educationLevel: values.educationLevel,
        employmentStatus: values.employmentStatus,
        disability: values.disability,
        languages: values.languages,
        haveSmartPhone: values.haveSmartPhone,
        vehicle: values.vehicle,
        preferredContact: values.preferredContact,
        city: values.city,
        country: values.country,
        skills: values.skills,
        interests: values.interests,
        isPrivate: values.isPrivate,
      };
      dispatch(updatingVolunteer(data, didUploadNewImage));
      // alert(JSON.stringify(data))
    },
  });

  if (!auth || !user || !user.volunteer) {
    return <Redirect to="/dashboard" />;
  }
  if (success) {
    dispatch(updateVolunteerReset());
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="formCardContainer">
      <div className="standardForm">
        <form noValidate onSubmit={formik.handleSubmit}>
          <div className="formMainHeader">
            <FontAwesomeIcon icon={faHandsHelping} size="2x" />
            <h2> Volunteer Update </h2>
          </div>
          <div className="formMainBody">
            <div className="formRow">
              <div className="formGroup">
                <p className="formGroupHeader">
                  First Name <span className="red">*</span>{" "}
                </p>
                <input
                  autoFocus
                  autoComplete="given-name"
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                {formik.errors.firstName && (
                  <p className="formInputError"> {formik.errors.firstName} </p>
                )}
              </div>

              <div className="formGroup">
                <p className="formGroupHeader">
                  Last Name <span className="red">*</span>{" "}
                </p>
                <input
                  autoComplete="family-name"
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                {formik.errors.lastName && (
                  <p className="formInputError"> {formik.errors.lastName} </p>
                )}
              </div>
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">
                Email <span className="red">*</span>{" "}
              </p>
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

            <div className="formGroup">
              <p className="formGroupHeader">
                Profile Picture (Under 1mb, file must have extension of either
                .jpg, .jpeg or .png)
              </p>
              <Dropzone
                accept="image/jpeg, image/png, image/jpg, image/gif"
                maxSize={11000000}
                onDropRejected={(rejectedFiles) => {
                  console.log("rejected");
                  setRejectedFilesState(rejectedFiles);
                }}
                onDrop={(acceptedFiles, rejectedFiles) => {
                  if (rejectedFiles.length === 0) {
                    setRejectedFilesState([]);
                  }
                  if (acceptedFiles.length !== 1) {
                    setRejectedFilesState(acceptedFiles);
                    return;
                  }
                  setDidUploadNewImage(true);
                  setImageFiles(acceptedFiles);
                  formik.setFieldValue("image", acceptedFiles[0]);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <>
                    <div {...getRootProps({ style })}>
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop your image here, or click to select image
                      </p>
                      <div className="thumbnailRow">
                        {imageFiles.map((file) => {
                          return <Thumb file={file} key={file.name} />;
                        })}
                      </div>
                    </div>
                    {rejectedFilesState.length === 0 ? null : (
                      <p className="redError">
                        {" "}
                        Some files were rejected. Make sure there is only 1
                        image less than 1mb.{" "}
                      </p>
                    )}
                  </>
                )}
              </Dropzone>
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">
                Date of Birth <span className="red">*</span>
              </p>
              <DatePicker
                selected={formik.values.dob}
                onChange={(date) => {
                  formik.setFieldValue("dob", date);
                }}
                name="dob"
                className="datePicker"
                // maxDate={new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
              {formik.errors.dob && (
                <p className="formInputError"> {formik.errors.dob} </p>
              )}
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">
                Gender <span className="red">*</span>{" "}
              </p>
              <select
                name="gender"
                onChange={(e) => formik.setFieldValue("gender", e.target.value)}
              >
                <option value="" disabled defaultValue>
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {formik.errors.gender && (
                <p className="formInputError"> {formik.errors.gender} </p>
              )}
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">
                About Me <span className="red">*</span>{" "}
              </p>
              <textarea
                type="text"
                name="about"
                rows="3"
                placeholder="Enter information about yourself"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.about}
              />
              {formik.errors.about && (
                <p className="formInputError"> {formik.errors.about} </p>
              )}
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">
                Mobile <span className="red">*</span>{" "}
              </p>
              <input
                autoComplete="tel"
                type="text"
                name="contactNumber"
                placeholder="Enter mobile number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contactNumber}
              />
              {formik.errors.contactNumber && (
                <p className="formInputError">
                  {" "}
                  {formik.errors.contactNumber}{" "}
                </p>
              )}
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">
                Highest level of Education <span className="red">*</span>{" "}
              </p>
              <select
                name="educationLevel"
                onChange={(e) =>
                  formik.setFieldValue("educationLevel", e.target.value)
                }
              >
                <option value="" disabled defaultValue>
                  Select your level
                </option>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="other">Other</option>
              </select>
              {formik.errors.educationLevel && (
                <p className="formInputError">
                  {" "}
                  {formik.errors.educationLevel}{" "}
                </p>
              )}
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">
                Employment Status <span className="red">*</span>{" "}
              </p>
              <select
                name="employmentStatus"
                onChange={(e) =>
                  formik.setFieldValue("employmentStatus", e.target.value)
                }
              >
                <option value="" disabled defaultValue>
                  Select your status
                </option>
                <option value="STUDENT">Student</option>
                <option value="HOME-MAKER">Home Maker</option>
                <option value="PRIVATE-SECTOR">Private Sector</option>
                <option value="PUBLIC-SECTOR">Public Sector</option>
                <option value="GOVERNMENT">Government</option>
                <option value="PART-TIME">Part Time</option>
                <option value="UNEMPLOYED">Unemployed</option>
                <option value="SELF-EMPLOYED">Self Employed</option>
                <option value="RETIRED">Retired</option>
                <option value="OTHER">other</option>
              </select>
              {formik.errors.employmentStatus && (
                <p className="formInputError">
                  {" "}
                  {formik.errors.employmentStatus}{" "}
                </p>
              )}
            </div>

            <div className="formGroup">
              <div className="formGroupCheckBox">
                <input
                  type="checkbox"
                  name="hasDisability"
                  id="formCheckbox"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.hasDisability}
                />
                <p className="agreedTo">Do you have a disability?</p>
              </div>
              {formik.values.hasDisability && (
                <div>
                  <p className="formGroupHeader">What is your disability? </p>
                  <input
                    type="text"
                    name="disability"
                    placeholder="Enter you disability"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.disability}
                  />
                  {formik.errors.disability && (
                    <p className="formInputError">
                      {" "}
                      {formik.errors.disability}{" "}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="formGroup">
              <div className="formGroupCheckBox">
                <input
                  type="checkbox"
                  name="haveSmartPhone"
                  id="formCheckbox"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.haveSmartPhone}
                />
                <p className="agreedTo">Do you have a smart phone?</p>
              </div>
              {formik.errors.haveSmartPhone && (
                <p className="formInputError">{formik.errors.haveSmartPhone}</p>
              )}
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">
                Do you have a vehicle? <span className="red">*</span>{" "}
              </p>
              <select
                name="vehicle"
                onChange={(e) =>
                  formik.setFieldValue("vehicle", e.target.value)
                }
              >
                <option value="blank" disabled defaultValue>
                  Choose an option
                </option>
                <option value="none">No</option>
                <option value="car">Car</option>
                <option value="motorbike">Motorbike</option>
                <option value="van">Van</option>
              </select>
              {formik.errors.vehicle && (
                <p className="formInputError"> {formik.errors.vehicle} </p>
              )}
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">Preferred Contact</p>
              <textarea
                type="text"
                name="preferredContact"
                rows="3"
                placeholder="Enter preferred contact"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.preferredContact}
              />
              {formik.errors.preferredContact && (
                <p className="formInputError">
                  {" "}
                  {formik.errors.preferredContact}{" "}
                </p>
              )}
            </div>

            <div className="formRow">
              <div className="formGroup">
                <p className="formGroupHeader">
                  City <span className="red">*</span>{" "}
                </p>
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

              <div className="formGroup">
                <p className="formGroupHeader">
                  Country <span className="red">*</span>{" "}
                </p>
                <input
                  autoComplete="country-name"
                  type="text"
                  name="country"
                  placeholder="Enter Country"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                />
                {formik.errors.country && (
                  <p className="formInputError"> {formik.errors.country} </p>
                )}
              </div>
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">
                Skills <span className="red">*</span>{" "}
              </p>
              <SkillsSelection
                selectedSkills={formik.values.skills}
                setFieldValue={formik.setFieldValue}
              />
              {formik.errors.skills && (
                <p className="formInputError"> {formik.errors.skills} </p>
              )}
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">
                Select what Interests you <span className="red">*</span>{" "}
              </p>
              <CategoryBadgeOptionsForm
                fieldName="interests"
                setFieldValue={formik.setFieldValue}
                options={formik.values.interests}
              />
              {formik.errors.interests && (
                <p className="formInputError"> {formik.errors.interests} </p>
              )}
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">
                What languages can you speak? <span className="red">*</span>{" "}
              </p>
              <SelectBadgeOptionsForm
                fieldName="languages"
                setFieldValue={formik.setFieldValue}
                options={formik.values.languages}
                baseOptions={listOfLanguages}
              />
              {formik.errors.languages && (
                <p className="formInputError"> {formik.errors.languages} </p>
              )}
            </div>

            <div className="formGroup">
              <div className="formGroupCheckBox">
                <input
                  type="checkbox"
                  name="isPrivate"
                  id="formCheckbox"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.isPrivate}
                />
                <p className="agreedTo">
                  Do you want your profile to be private?
                </p>
              </div>
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
                  <LoadingSpinner
                    size="1x"
                    style={{ marginRight: "8px", minHeight: "unset" }}
                  />
                ) : (
                  "Update Volunteer"
                )}
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

            {success && (
              <p className="successReply"> Volunteer update successful. </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVolunteerProfileForm;
