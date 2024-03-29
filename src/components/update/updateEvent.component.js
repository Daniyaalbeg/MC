import React, { useState, useMemo } from "react";
import { connect } from "react-redux";
import { Card, Form, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Link, Redirect, useParams } from "react-router-dom";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Checkbox } from "../utilities/Checkboxs.component";
import {
  updateEvent,
  updatingEventRedirect,
} from "../../Actions/updateActions";
import UpdateMap from "./updateMap.component";
import {
  activeStyle,
  rejectStyle,
  baseStyle,
  acceptStyle,
} from "../utilities/dropzoneStyles";
import Dropzone, { useDropzone } from "react-dropzone";
import Thumb from "../utilities/thumb.component";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("*Event name is required")
    .min(1, "*Event name must be longer than 1 charachter")
    .max(50, "*Event name must be less than 50 charachters")
    .matches(
      /^[a-zA-Z0-9_ ]*$/,
      "*Event name must only contain letters or numbers"
    ),
  description: Yup.string()
    .required("*Description is required")
    .min(1, "*Description must be longer than 1 charachter")
    .max(1000, "*Description must be less than 1000 charachters"),
  numOfItems: Yup.number()
    .required("*Number of items is required")
    .integer("*Provided number must be an integer")
    .min(1, "*You cannot have less than 1 item...")
    .max(
      10000,
      "*You cannot have more than 1000 items... If you do please message danyaalbeg@gmail.com to get this added"
    ),
  descriptionOfItems: Yup.string()
    .required("*Description of items is required")
    .min(1, "*Description must be longer than 1 charachter")
    .max(1000, "*Description  must be less than 1000 charachters"),
  // location: Yup.array(Yup.number())
  // .required("*Must add a location"),
  // typeOfRation: Yup.string()
  // .required("*Type of rations distributed is required")
  // .min(1, "*Must be longer than 1 charachter")
  // .max(100, "*Must be less than 1000 charachters"),
  agreedToTerms: Yup.bool().oneOf([true], "*Must accept terms and conditions"),
  mapClicked: Yup.bool().oneOf([true], "*Must select a location"),
});

const UpdateEvent = ({
  dispatch,
  loading,
  hasErrors,
  success,
  auth,
  eventsDict,
  orgID,
}) => {
  const [location, setLocation] = useState([]);
  const [rejectedFilesState, setRejectedFilesState] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [newImage, setNewImage] = useState(false);
  const [imageNumberError, setImageNumberError] = useState("");
  const { isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg, image/gif",
    maxSize: 2000000,
  });
  const { id } = useParams();
  const eventToUpdate = eventsDict[id];

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject]
  );

  if (!loaded) {
    if (eventToUpdate === null && !loaded) {
      return <Redirect to="/dashboard" />;
    } else {
      setLocation(eventToUpdate.location.coordinates);
    }
    setLoaded(true);
  }

  if (success) {
    dispatch(updatingEventRedirect());
  }

  if (eventToUpdate === null) {
    return <Redirect push to="/dashboard" />;
  }
  if (!auth) {
    return <Redirect push to="/dashboard" />;
  }
  if (success) {
    return <Redirect push to="/dashboard" />;
  }

  return (
    <Card bg="light" text="dark" className="signUpCard">
      <Card.Header> Update Event </Card.Header>

      <Formik
        initialValues={{
          name: eventToUpdate.name,
          description: eventToUpdate.description,
          numOfItems: eventToUpdate.totalNumberOfItems,
          descriptionOfItems: eventToUpdate.itemsDescription,
          typeOfRation: eventToUpdate.typeOfRation,
          images: eventToUpdate.images,
          date: Date.parse(eventToUpdate.date),
          agreedToTerms: false,
          mapClicked: true,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const updatedPoint = {
            type: "Point",
            coordinates: location,
          };
          const updatedEvent = {
            ...eventToUpdate,
            name: values.name,
            description: values.description,
            totalNumberOfItems: values.numOfItems,
            itemsDescription: values.descriptionOfItems,
            typeOfRation: values.typeOfRation,
            images: values.images,
            location: updatedPoint,
            date: values.date,
          };
          if (newImage) {
            updatedEvent.newImage = true;
          }
          dispatch(updateEvent(updatedEvent, orgID));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Card.Body>
              {/* <Card.Title>  </Card.Title> */}
              <Form.Group controlId="formBasicName">
                <Form.Label>
                  Name of Event <span className="red">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  isValid={touched.name && !errors.name}
                  isInvalid={errors.name}
                />
                <Form.Control.Feedback type="valid">
                  Looks good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicDescription">
                <Form.Label>
                  Description of Ration Drive <span className="red">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  placeholder="Enter description"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  isValid={touched.description && !errors.description}
                  isInvalid={errors.description}
                />
                <Form.Control.Feedback type="valid">
                  Looks good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicNumberOfItems">
                <Form.Label>
                  Total Quantity of Rations <span className="red">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter number of items"
                  name="numOfItems"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.numOfItems}
                  isValid={touched.numOfItems && !errors.numOfItems}
                  isInvalid={errors.numOfItems}
                />
                <Form.Control.Feedback type="valid">
                  Looks good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.numOfItems}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicDescriptionOfItems">
                <Form.Label>
                  Content of Rations Given <span className="red">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  placeholder="Enter description of items"
                  name="descriptionOfItems"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.descriptionOfItems}
                  isValid={
                    touched.descriptionOfItems && !errors.descriptionOfItems
                  }
                  isInvalid={errors.descriptionOfItems}
                />
                <Form.Control.Feedback type="valid">
                  Looks good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.descriptionOfItems}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formTypeOfRation">
                <Form.Label>
                  Type of Rations distributed <span className="red">*</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="typeOfRation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.typeOfRation}
                >
                  <option value="clothes">Clothes</option>
                  <option value="food">Food</option>
                  <option value="money">Money</option>
                  <option value="ppe">PPE</option>
                  <option value="ramadan">Ramadan</option>
                  <option value="other">Other</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  {" "}
                  Images of Event (Under 2mb, only 3 images, files must have
                  extension of either .jpg, .jpeg or .png){" "}
                </Form.Label>
                <Dropzone
                  accept="image/jpeg, image/png, image/jpg, image/gif"
                  maxSize={20000000}
                  onDropRejected={(rejectedFiles) => {
                    console.log("rejected");
                    setRejectedFilesState(rejectedFiles);
                  }}
                  onDrop={(acceptedFiles, rejectedFiles) => {
                    if (rejectedFiles.length === 0) {
                      setRejectedFilesState([]);
                    }
                    if (acceptedFiles.length > 3) {
                      setImageNumberError(true);
                    } else {
                      setImageNumberError(false);
                      setNewImage(true);
                      setFieldValue("images", acceptedFiles);
                    }
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <>
                      <div {...getRootProps({ style })}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' images here, or click to select images</p>
                        <div className="rowThumb">
                          {" "}
                          {values.images.map((file) => {
                            return <Thumb file={file} key={file.name} />;
                          })}{" "}
                        </div>
                      </div>
                      {rejectedFilesState.length === 0 ? null : (
                        <p className="redStandardError">
                          {" "}
                          Some files were rejected. make sure they are not more
                          than 2mb.{" "}
                        </p>
                      )}
                      {imageNumberError ? (
                        <p className="redStandardError">
                          {" "}
                          Only 3 images are allowed{" "}
                        </p>
                      ) : null}
                    </>
                  )}
                  {/* <div {...getRootProps({style})}>
            <input {...getInputProps()} />
            <p>Drag 'n' images here, or click to select images</p>
            <Row> {thumbFiles} </Row>
          </div>
          {rejectedFiles.length === 0 ? null : <p className="redError"> Some files were rejected. make sure they are not more than 2mb. </p>}     */}
                </Dropzone>
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  {" "}
                  Date of the Event <span className="red">*</span>{" "}
                </Form.Label>
                <br />
                <DatePicker
                  selected={values.date}
                  onChange={(date) => {
                    setFieldValue("date", date);
                  }}
                  name="date"
                  className="datePicker"
                  maxDate={new Date()}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  {" "}
                  Select Location of the Event Drive{" "}
                  <span className="red">*</span>{" "}
                </Form.Label>
                <UpdateMap
                  id="mapClicked"
                  name="mapClicked"
                  className="selectMap"
                  location={eventToUpdate.location}
                  callBack={(location) => {
                    setLocation(location);
                    setFieldValue("mapClicked", true);
                  }}
                />
                {!values.mapClicked && (
                  <p className="input-feedback">
                    {" "}
                    *Must select a location on the map{" "}
                  </p>
                )}
              </Form.Group>

              <Form.Group>
                <Field
                  component={Checkbox}
                  name="agreedToTerms"
                  id="agreedToTerms"
                  label={
                    <p className="agreedTo">
                      {" "}
                      Agreed to{" "}
                      <Link to="/termsandconditions" target="_blank">
                        {" "}
                        Terms & Conditions{" "}
                      </Link>
                    </p>
                  }
                  isValid={touched.agreedToTerms && !errors.agreedToTerms}
                  isInvalid={errors.agreedToTerms}
                />
              </Form.Group>

              <div className="formButtons">
                <button
                  className="standardButton"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner
                      animation="grow"
                      size="sm"
                      style={{ marginRight: "8px" }}
                    />
                  ) : null}
                  {loading ? "Updating Event" : "Update Event"}
                </button>

                <Link to="/dashboard" style={{ marginLeft: "10px" }}>
                  <button
                    className="standardButton redVersion"
                    type="submit"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </Link>
              </div>

              {hasErrors && (
                <>
                  <br />
                  <p className="redError">
                    {" "}
                    An error has occured please try again later or email
                    support.
                  </p>
                </>
              )}
            </Card.Body>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

const MapStateToProps = (state, ownProps) => ({
  auth: state.auth.auth,
  loading: state.updateInfo.loading,
  hasErrors: state.updateInfo.hasErrors,
  success: state.updateInfo.success,
  eventsDict: state.userInfo.events,
});

export default connect(MapStateToProps)(UpdateEvent);
