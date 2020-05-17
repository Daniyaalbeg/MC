import React, { Fragment, useState } from 'react';
import { Form, Card } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import '../../css/form.css';
import { API, rootURL, production } from '../../config'

import axios from 'axios';

function equalTo(ref, msg) {
	return this.test({
		name: 'equalTo',
		exclusive: false,
    message: msg || '${path} must be the same as ${reference}',
		params: {
			reference: ref.path
		},
		test: function(value) {
      return value == this.resolve(ref) 
		}
	})
};

Yup.addMethod(Yup.string, 'equalTo', equalTo);

const validationSchema = Yup.object().shape({
  password: Yup.string()
  .required("*Password is required")
  .min(5, "*Password must be longer than 5 charachters")
  .max(20, "*Password must be less than 20 charachters")
  .matches("", )
  .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,20}$/, "*Password must contain an uppercase, lowercase letter, number and special charachter"),
  password2: Yup.string()
  .required('*Password is required')
  .equalTo(Yup.ref('password'))
});

const ResettingPassword = (props) => {
  const [hasErrors, setHasErrors] = useState(false)
  var error = null
  var response = null
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const { match: { params } } = props;

  return (
    <div>
    <Card bsPrefix='card' bg='light' text='dark' className="signUpCard">
    <Card.Header>Reset Password</Card.Header>
    <Card.Body>
    <Formik
      initialValues={{ password: "", password2: ""}}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setSending(true)
        axios({
          method: 'post',
          url: rootURL(production)+API+'/reset/resetPassword',
          headers: {'Content-Type': 'application/json'},
          data: {
            password: values.password,
            id: params.id,
            token: params.token
          },
        })
        .then((res) => {
          response = res.data;
          setSending(false)
          setSuccess(true)
        })
        .catch((error) => {
          console.log(error)
          setHasErrors(true)
        });
      }}
      >{( {values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit }) => (
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={values.password}
            placeholder="Enter new password"
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={touched.password && !errors.password}
                isInvalid={errors.password}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword2">
          <Form.Label>Enter Password Again</Form.Label>
          <Form.Control
            type="password"
            name="password2"
            value={values.password2}
            placeholder="Enter new password again"
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={touched.password2 && !errors.password2}
            isInvalid={errors.password2}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.password2}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <button className="standardButton" type="submit" disabled={sending}>
            {sending ? 'Submiting' : 'Submit'}
          </button>
        </Form.Group>
      </Form>
    )}
    </Formik>
    </Card.Body>
    </Card>

    {hasErrors &&
      <div className="error">
        <h4> Something went wrong. Please try again later or contact us. </h4>
        <p> {error} </p>
      </div>
    }
    {success &&
      <h4 className="successReply"> Password updated succesfully. </h4>
    }
    </div>
  )
}

export default ResettingPassword;