import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Spinner, Card, Row, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { Formik, Field, setFieldValue } from 'formik';
import * as Yup from 'yup';
import { createProject, creatingProjectReset } from '../../Actions/projectActions';
import { Checkbox } from '../utilities/Checkboxs.component';
import { baseStyle, acceptStyle, activeStyle, rejectStyle } from '../utilities/dropzoneStyles';
import SelectMap from './selectMap.component';
import Dropzone, { useDropzone } from 'react-dropzone';
import Thumb from '../utilities/thumb.component';

const validationSchema = Yup.object().shape({
  name: Yup.string()
  .required("*Project name is required")
  .min(1, "*Project name must be longer than 1 charachter")
  .max(50, "*Project name must be less than 50 charachters")
  .matches(/^[a-zA-Z0-9_ ]*$/, "*Project name must only contain letters or numbers"),
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
  date: Yup.date()
  .min(new Date(), "*Date must be in the future"),
  agreedToTerms: Yup.bool()
  .oneOf([true], "*Must accept terms and conditions"),
  mapClicked: Yup.bool()
  .oneOf([true], "*Must select a location"),
});

const CreateProject = ({ dispatch, auth, orgID, loading, success, hasErrors }) => {
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

  if (!orgID || !auth) {
    return <Redirect to="/dashboard" />
  }

  if (success) {
    dispatch(creatingProjectReset())
    return <Redirect to="/dashboard" />
  }

  return (
    <Card bg="light" text="dark" className="signUpCard">
      <Card.Header> Create New Project </Card.Header>
      <Formik
        initialValues={{
          name: "",
          description: "",
          problem: "",
          solution: "",
          date: new Date(),
          images: [],
          mapClicked: false,
          agreedToTerms: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const newPoint = {
            type: 'Point',
            coordinates: location
          }
          let project = {
            name: values.name, 
            description: values.description,
            problem: values.problem,
            solution: values.solution,
            completionDate: values.date,
            images: values.images,
            location: newPoint,
            orgID: orgID
          }
          dispatch(createProject(project))
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
          <Form.Label>Name of Project <span className="red">*</span></Form.Label>
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
          <Form.Label>Description of Project <span className="red">*</span></Form.Label>
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

        <Form.Group controlId="formBasicProblem">
          <Form.Label>What problem are you solving? <span className="red">*</span></Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Enter problem"
            name="problem"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.problem}
            isValid={touched.problem && !errors.problem}
            isInvalid={errors.problem}
          />
          <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.problem}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicSolution">
          <Form.Label>What is the solution to the problem? <span className="red">*</span></Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Enter solution"
            name="solution"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.solution}
            isValid={touched.solution && !errors.solution}
            isInvalid={errors.solution}
          />
          <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.solution}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicDate">
          <Form.Label> When will the project be completed? <span className="red">*</span> </Form.Label>
          <br />
          <DatePicker
            selected={values.date}
            onChange={(date) => {
              setFieldValue('date', date);
            }}
            name="date"
            className="datePicker"
            minDate={new Date()}
          />
          <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicImages">
          <Form.Label> Images of the Project (Under 1mb, only 3 images, files must have extension of either .jpg, .jpeg or .png) </Form.Label>
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
              <>
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
              </>
          )}
          {/* <div {...getRootProps({style})}>
            <input {...getInputProps()} />
            <p>Drag 'n' images here, or click to select images</p>
            <Row> {thumbFiles} </Row>
          </div>
          {rejectedFiles.length === 0 ? null : <p className="redError"> Some files were rejected. make sure they are not more than 1mb. </p>}     */}
          </Dropzone>
        </Form.Group>

        <Form.Group controlId="formBasicLocation">
          <Form.Label> Location of the Project <span className="red">*</span> </Form.Label>
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

        <Form.Group controlId="formBasicAgreed">
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
          <button className="standardButton" type="submit" disabled={loading} style={{ marginRight: '8px' }}>
            {
              loading ? 
              <Spinner animation="grow" size="sm" style={{ marginRight: '8px' }} /> 
              :
              null
            }
            {loading ? 'Creating Project' : 'Create Project'}
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
          Note: Once we have verified your project will it become visible on the page.
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
  orgID: ownProps.match.params.orgID,
  loading: state.projectInfo.createProject.loading,
  hasErrors: state.projectInfo.createProject.hasErrors,
  success: state.projectInfo.createProject.success,
})

export default connect(MapStateToProps)(CreateProject)