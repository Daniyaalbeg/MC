import React, { Fragment, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Row, Card, Form, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { Formik, Field, setFieldValue } from 'formik';
import * as Yup from 'yup';
import { Checkbox } from '../utilities/Checkboxs.component';
import { creatingNewEvent, creatingEventRedirect, creatingEventReset } from '../../Actions/createEventActions';
import { baseStyle, acceptStyle, activeStyle, rejectStyle } from '../utilities/dropzoneStyles';
import SelectMap from './selectMap.component';
import Dropzone, { useDropzone } from 'react-dropzone';
import Thumb from '../utilities/thumb.component';

import '../../css/form.css';

// const dropzoneStyle = {
//   width: "100%",
//   height: "auto",
//   borderWidth: 2,
//   borderColor: "rgb(102, 102, 102)",
//   borderStyle: "dashed",
//   borderRadius: 5,
// }

const validationSchema = Yup.object().shape({
  name: Yup.string()
  .required("*Event name is required")
  .min(1, "*Event name must be longer than 1 charachter")
  .max(50, "*Event name must be less than 50 charachters")
  .matches(/^[a-zA-Z0-9_ ]*$/, "*Event name must only contain letters or numbers"),
  description: Yup.string()
  .required("*Description is required")
  .min(1, "*Description must be longer than 1 charachter")
  .max(1000, "*Description must be less than 1000 charachters"),
  numOfItems: Yup.number()
  .required("*Number of items is required")
  .typeError("*Provided number must be an integer")
  .min(1, "*You cannot have less than 1 item...")
  .max(10000, "*You cannot have more than 10000 items... If you do please message info@ministryofchange.org to get this added"),
  descriptionOfItems: Yup.string()
  .required("*Description of items is required")
  .min(1, "*Description must be longer than 1 charachter")
  .max(1000, "*Description  must be less than 1000 charachters"),
  // location: Yup.array(Yup.number())
  // .required("*Must add a location"),
  // typeOfEvent: Yup.string()
  // .required("*Type of rations distributed is required")
  // .min(1, "*Must be longer than 1 charachter")
  // .max(100, "*Must be less than 1000 charachters"),
  agreedToTerms: Yup.bool()
  .oneOf([true], "*Must accept terms and conditions"),
  mapClicked: Yup.bool()
  .oneOf([true], "*Must select a location"),
});

const CreateEvent = ({ dispatch, loading, hasErrors, success, auth, orgID }) => {
  const [location, setLocation] = useState([])
  const [imageFiles, setImageFiles] = useState([]);
  const [rejectedFilesState, setRejectedFilesState] = useState([]);
  const {
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/jpeg, image/png, image/jpg, image/gif',
    maxSize: 2000000,
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject
  ]);

  if (!orgID) {
    return <Redirect to="/dashboard" />
  }

  if (success) {
    dispatch(creatingEventReset())
    dispatch(creatingEventRedirect())
  }

  return (
    <Card bg="light" text="dark" className="signUpCard">
      <Fragment>
        {!auth &&
          <Redirect push to="/" />
        }
        {success &&
          <Redirect push to="/dashboard" /> 
        }
      </Fragment>
      <Card.Header> Create New Distribution </Card.Header>

      <Formik
        initialValues={{
          name: "",
          description: "",
          numOfItems: "",
          descriptionOfItems: "",
          typeOfEvent: "clothes",
          images: [],
          date: new Date(),
          agreedToTerms: false,
          mapClicked: false
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const newPoint = {
            type: 'Point',
            coordinates: location
          }
          const newEvent = {
            name: values.name,
            description: values.description,
            totalNumberOfItems: values.numOfItems,
            itemsDescription: values.descriptionOfItems,
            typeOfRation: values.typeOfEvent,
            images: values.images,
            location: newPoint,
            date: values.date
          }
          dispatch(creatingNewEvent(newEvent, orgID))
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
        setFieldTouched,
        resetForm, }) => (
      <Form noValidate onSubmit={handleSubmit}>
        <Card.Body>
        {/* <Card.Title>  </Card.Title> */}
        <Form.Group controlId="formBasicName">
          <Form.Label>Name of Distribution <span className="red">*</span></Form.Label>
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
          <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description of Distribution <span className="red">*</span></Form.Label>
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
          <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicNumberOfItems">
          <Form.Label>Total Quantity of Distribution <span className="red">*</span></Form.Label>
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
          <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.numOfItems}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicDescriptionOfItems">
          <Form.Label>Contents of Distribution e.g. (Rations) <span className="red">*</span></Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Enter description of items"
            name="descriptionOfItems"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.descriptionOfItems}
            isValid={touched.descriptionOfItems && !errors.descriptionOfItems}
            isInvalid={errors.descriptionOfItems}
          />
          <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.descriptionOfItems}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formTypeOfEvent">
          <Form.Label>Type of Distribution <span className="red">*</span></Form.Label>
          <Form.Control
            as="select"
            name="typeOfEvent"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.typeOfEvent}
          >
            <option value="clothes" defaultValue>Clothes</option>
            <option value="food">Food</option>
            <option value="money">Money</option>
            <option value="ppe">PPE (Personal Protection Equipment)</option>
            {/* <option value="ramadan">Ramadan</option> */}
            <option value="other">Other</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label> Images of Distribution (Under 1mb, only 3 images, files must have extension of either .jpg, .jpeg or .png) </Form.Label>
          <Dropzone 
            accept = 'image/jpeg, image/png, image/jpg, image/gif'
            maxSize = {11000000}
            onDropRejected={(rejectedFiles) => {
              console.log('rejected')
              setRejectedFilesState(rejectedFiles)
            }}
            onDrop={(acceptedFiles, rejectedFiles) => {
              if (rejectedFiles.length === 0) {
                setRejectedFilesState([])
              }
              setImageFiles(acceptedFiles);
              setFieldValue('images', acceptedFiles);
          }}>
            {({getRootProps, getInputProps}) => (
              <Fragment>
              <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>Drag 'n' images here, or click to select images</p>
                <Row> {
                imageFiles.map((file) => {
                  return <Thumb file={file} key={file.name} />
                })
              } </Row>
              </div>
              {rejectedFilesState.length === 0 ? null : <p className="redError"> Some files were rejected. make sure they are not more than 1mb. </p>}
              </Fragment>
          )}
          {/* <div {...getRootProps({style})}>
            <input {...getInputProps()} />
            <p>Drag 'n' images here, or click to select images</p>
            <Row> {thumbFiles} </Row>
          </div>
          {rejectedFiles.length === 0 ? null : <p className="redError"> Some files were rejected. make sure they are not more than 1mb. </p>}     */}
          </Dropzone>
        </Form.Group>

      

        <Form.Group>
          <Form.Label> Date of the Distribution (Can be in the future or past) <span className="red">*</span> </Form.Label>
          <br />
          <DatePicker
            selected={values.date}
            onChange={(date) => {
              setFieldValue('date', date);
            }}
            name="date"
            className="datePicker"
            maxDate={new Date()}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Location of the Distribution <span className="red">*</span> </Form.Label>
          <SelectMap
            id="mapClicked"
            name="mapClicked"
            className="selectMap"
            callBack={(location) => {
              setLocation(location)
              setFieldValue("mapClicked", true)
            }}
          />
          {!values.mapClicked &&
            <p className="input-feedback"> *Must select a location on the map </p>
          }
        </Form.Group>

        <Form.Group>
          <Field
            component={Checkbox}
            name="agreedToTerms"
            id="agreedToTerms"
            label={<p className="agreedTo"> Agreed to <Link to="/termsandconditions" target="_blank" > Terms & Conditions </Link></p>}
            isValid={touched.agreedToTerms && !errors.agreedToTerms}
            isInvalid={errors.agreedToTerms}
          />
        </Form.Group>
        
        <div className="formButtons">
          <button className="standardButton" type="submit" disabled={loading}>
            {
              loading ? 
              <Spinner animation="grow" size="sm" style={{ marginRight: '8px' }} /> 
              :
              null
            }
            {loading ? 'Creating Event' : 'Create Event'}
          </button>
          <button type="button" className="standardButton redVersion" onClick={resetForm} disabled={loading}>
            Reset
          </button>
        </div>

        {hasErrors &&
          <>
            <br />
            <p className="redError"> An error has occured please try again later or email support.</p>
          </>
        }

        <Form.Text className="text-muted">
          Note: Once we have verified your information only then will you be able to add distribution and become visible on the page.
        </Form.Text>

        </Card.Body>
      </Form>
      )}
      </Formik>
    </Card>
  )
}

const MapStateToProps = (state, ownProps) => ({
  auth: state.auth.auth,
  loading: state.createEvent.loading,
  hasErrors: state.createEvent.hasErrors,
  success: state.createEvent.success,
  orgID: ownProps.match.params.orgID
});

export default connect(MapStateToProps)(CreateEvent)