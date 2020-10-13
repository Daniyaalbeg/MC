import React, { useState, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createProject, creatingProjectReset } from "../../Actions/projectActions";
import { baseStyle, acceptStyle, activeStyle, rejectStyle } from "../utilities/dropzoneStyles";
import SelectMap from "./selectMap.component";
import Dropzone, { useDropzone } from "react-dropzone";
import Thumb from "../utilities/thumb.component";
import CategoryOptions from '../sharedComponents/categoryOptions.component';
import { CategoryBadgeOptionsForm } from '../sharedComponents/categoryBadgeOptions.component'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram } from "@fortawesome/pro-solid-svg-icons";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("*Project name is required")
    .min(1, "*Project name must be longer than 1 charachter")
    .max(50, "*Project name must be less than 50 charachters")
    .matches(
      /^[a-zA-Z0-9,!?_ ]*$/,
      "*Project name must only contain letters or numbers"
    ),
  tagline: Yup.string()
  .required("*Tagline is required")
  .min(1, "*Tagline must be longer than 1 charachter")
  .max(1000, "*Tagline must be less than 100 charachters"),
  description: Yup.string()
    .required("*Description is required")
    .min(1, "*Description must be longer than 1 charachter")
    .max(1000, "*Description must be less than 1000 charachters"),
  problem: Yup.string()
    .required("*Problem description is required")
    .min(1, "*Problem description must be longer than 1 charachter")
    .max(1000, "*Problem description must be less than 1000 charachters"),
  solution: Yup.string()
    .required("*Solution description is required")
    .min(1, "*Solution description must be longer than 1 charachter")
    .max(1000, "*Solution description must be less than 1000 charachters"),
  date: Yup.date().min(new Date(), "*Date must be in the future"),
  agreedToTerms: Yup.bool().oneOf([true], "*Must accept terms and conditions"),
  mapClicked: Yup.bool().oneOf([true], "*Must select a location"),
});

const CreateProject = ({ dispatch, auth, orgID, loading, success, hasErrors, history }) => {
  const [location, setLocation] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
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

  const formik = useFormik({
    initialValues: {
      name: "",
      tagline: "",
      description: "",
      problem: "",
      solution: "",
      primaryCategory: "animalWelfare",
      secondaryCategories: [],
      date: new Date(),
      images: [],
      mapClicked: false,
      agreedToTerms: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newPoint = {
        type: "Point",
        coordinates: location,
      };
      let project = {
        name: values.name,
        tagline: values.tagline,
        description: values.description,
        problem: values.problem,
        solution: values.solution,
        primaryCategory: values.primaryCategory,
        secondaryCategories: values.secondaryCategories,
        completionDate: values.date,
        images: values.images,
        location: newPoint,
        orgID: orgID,
      };
      dispatch(createProject(project));
    },
  });

  useEffect(() => {
    if (!orgID || !auth) {
      history.push('/dashboard')
    }
  }, [orgID, auth])

  useEffect(() => {
    if (success) {
      dispatch(creatingProjectReset());
      history.push('/dashboard')
    }
  }, [success])

  return (
    <div className="formCardContainer">
      <div className="createProjectForm">
        <form noValidate onSubmit={formik.handleSubmit}>
          <div className="formMainHeader">
            <FontAwesomeIcon icon={faProjectDiagram} size="2x" />
            <h2> Create Project </h2>
          </div>
          <div className="formMainBody">
            <div className="formGroup">
              <p className="formGroupHeader">Name of Project</p>
              <input
                autoFocus
                type="text"
                name="name"
                placeholder="Enter Project Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.errors.name && (
                <p className="formInputError"> {formik.errors.name} </p>
              )}
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">Tagline</p>
              <textarea
                type="text"
                name="tagline"
                rows="2"
                placeholder="Enter tagline"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tagline}
              />
              {formik.errors.tagline && (
                <p className="formInputError"> {formik.errors.tagline} </p>
              )}
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">Description</p>
              <textarea
                type="text"
                name="description"
                rows="3"
                placeholder="Enter Description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {formik.errors.description && (
                <p className="formInputError"> {formik.errors.description} </p>
              )}
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">What problem are you solving?</p>
              <textarea
                type="text"
                name="problem"
                rows="3"
                placeholder="Enter Problem"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.problem}
              />
              {formik.errors.problem && (
                <p className="formInputError"> {formik.errors.problem} </p>
              )}
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">What is your proposed solution?</p>
              <textarea
                type="text"
                name="solution"
                rows="3"
                placeholder="Enter solution"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.solution}
              />
              {formik.errors.solution && (
                <p className="formInputError"> {formik.errors.solution} </p>
              )}
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">What category does the project fall under?</p>
              <select
                name="primaryCategory"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.primaryCategory}
              >
                <CategoryOptions />
              </select>
              {formik.errors.primaryCategory && (
                <p className="formInputError"> {formik.errors.primaryCategory} </p>
              )}
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">Select any other categories that may be valid</p>
              <CategoryBadgeOptionsForm setFieldValue={formik.setFieldValue} secondaryCategories={formik.values.secondaryCategories} />
              {/* {formik.errors.solution && (
                <p className="formInputError"> {formik.errors.secondary} </p>
              )} */}
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">Estimated project date</p>
              <DatePicker
                selected={formik.values.date}
                onChange={(date) => {
                  formik.setFieldValue("date", date);
                }}
                name="date"
                className="datePicker"
                minDate={new Date()}
              />
              {formik.errors.date && (
                <p className="formInputError"> {formik.errors.date} </p>
              )}
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">
                Images of the Project (Under 1mb, only 3 images, files must have
                extension of either .jpg, .jpeg or .png)
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
                  setImageFiles(acceptedFiles);
                  formik.setFieldValue("images", acceptedFiles);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <>
                    <div {...getRootProps({ style })}>
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop images here, or click to select images
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
                        Some files were rejected. make sure they are not more
                        than 1mb.{" "}
                      </p>
                    )}
                  </>
                )}
              </Dropzone>
            </div>

            <div className="formGroup">
              <p className="formGroupHeader">Location of the project?</p>
              <SelectMap
                id="mapClicked"
                name="mapClicked"
                className="selectMap"
                callBack={(location) => {
                  setLocation(location);
                  formik.setFieldValue("mapClicked", true);
                }}
              />
              {!formik.values.mapClicked && (
                <p className="formInputError">
                  {" "}
                  *Must select a location on the map{" "}
                </p>
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

            {/* <Form.Group controlId="formBasicAgreed">
              <Field
                component={Checkbox}
                name="agreedToTerms"
                id="agreedToTerms"
                label={<p className="agreedTo"> Agreed to <Link to="/termsandconditions" target="_blank" > Terms & Conditions </Link></p>}
                isValid={touched.agreedToTerms && !errors.agreedToTerms}
                isInvalid={errors.agreedToTerms}
              />
            </Form.Group> */}

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
                {loading ? "Creating Project" : "Create Project"}
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

            {hasErrors && (
              <>
                <br />
                <p className="redError">
                  {" "}
                  An error has occured please try again later or email support.
                </p>
              </>
            )}

            <p className="text-muted">
              Note: Once we have verified your project will it become visible on
              the page.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const MapStateToProps = (state, ownProps) => ({
  auth: state.auth.auth,
  orgID: ownProps.match.params.orgID,
  history: ownProps.history,
  loading: state.projectInfo.createProject.loading,
  hasErrors: state.projectInfo.createProject.hasErrors,
  success: state.projectInfo.createProject.success,
});

export default connect(MapStateToProps)(CreateProject);
