import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { Redirect } from 'react-router-dom';
import { Formik, Field, setFieldValue } from 'formik';
import * as Yup from 'yup';
import { Checkbox } from './Checkboxs.component';
import { creatingNewRation } from '../../Actions/createRationActions';
import SelectMap from './selectMap.component';

import '../../css/form.css';

const validationSchema = Yup.object().shape({
  name: Yup.string()
  .required("*Ration name is required")
  .min(1, "*Ration name must be longer than 1 charachter")
  .max(50, "*Ration name must be less than 50 charachters")
  .matches(/^[a-zA-Z0-9_ ]*$/, "*Ration name must only contain letters or numbers"),
  description: Yup.string()
  .required("*Description is required")
  .min(1, "*Description must be longer than 1 charachter")
  .max(1000, "*Description must be less than 1000 charachters"),
  numOfItems: Yup.number()
  .required("*Number of items is required")
  .integer("*Provided number must be an integer")
  .min(1, "*You cannot have less than 1 item...")
  .max(10000, "*You cannot have more than 1000 items... If you do please message danyaalbeg@gmail.com to get this added"),
  descriptionOfItems: Yup.string()
  .required("*Description of items is required")
  .min(1, "*Description must be longer than 1 charachter")
  .max(1000, "*Description  must be less than 1000 charachters"),
  // location: Yup.array(Yup.number())
  // .required("*Must add a location"),
  agreedToTerms: Yup.bool()
  .oneOf([true], "*Must accept terms and conditions"),
  mapClicked: Yup.bool()
  .oneOf([true], "*Must accept terms and conditions"),
});

const CreateRation = ({dispatch, loading, hasErrors, success, auth}) => {
  const [location, setLocation] = useState([])

  return (
    <Card bg="light" text="dark">
      <Fragment>
       {!auth &&
          <Redirect push to="/" />
        }
        {success && 
          <Redirect push to="/" /> 
        }
      </Fragment>
      <Card.Header> Create New Ration Drive </Card.Header>

      <Formik
        initialValues={{
          name: "",
          description: "",
          numOfItems: "",
          descriptionOfItems: "",
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
          const newRationDrive = {
            name: values.name,
            description: values.description,
            totalNumberOfItems: values.numOfItems,
            itemsDescription: values.descriptionOfItems,
            location: newPoint,
            date: values.date
          }
          dispatch(creatingNewRation(newRationDrive))
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
        {/* <Card.Title>  </Card.Title> */}
        <Form.Group controlId="formBasicName">
          <Form.Label>Name of Ration Drive</Form.Label>
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
          <Form.Label>Description of Ration Drive</Form.Label>
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
          <Form.Label>Total Quantity of Rations</Form.Label>
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
          <Form.Label>Content of Rations Given </Form.Label>
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

        <Form.Group>
          <Form.Label> Date of the Ration Drive (Can be in the future) </Form.Label>
          <br />
          <DatePicker
            selected={values.date}
            onChange={(date) => values.date = date}
            name="date"
            className="datePicker"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Select Location of the Ration Drive </Form.Label>
          <SelectMap
            id="location"
            name="location"
            className="selectMap"
            callBack={(location) => {
              setLocation(location)
              setFieldValue("mapClicked", true)
            }}
          />
          <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
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
          {loading ? 'Creating Ration' : 'Create Ration'}
        </Button>

        <Form.Text className="text-muted">
          Note: Once we have verified your information only then will you be able to add charity drives and become visible on the page.
        </Form.Text>

        </Card.Body>
      </Form>
      )}
      </Formik>
    </Card>
  )
}

const MapStateToProps = (state) => ({
  auth: state.auth.auth,
  loading: state.createRation.loading,
  hasErrors: state.createRation.hasErrors,
  success: state.createRation.success
});

export default connect(MapStateToProps)(CreateRation)