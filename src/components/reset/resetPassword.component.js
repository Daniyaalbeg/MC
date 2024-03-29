import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import axios from 'axios';
import '../../css/form.css';
import { API, rootURL, production } from '../../config'


const ResetPassword = (props) => {
  const [email, setEmail] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const submit = (e) => {
    e.preventDefault()
    axios({
      method: 'post',
      url: rootURL(production)+API+'/reset/password',
      headers: {'Content-Type': 'application/json'},
      data: {
        email: email
      },
    })
    .then((res) => setSuccess(true))
    .catch((error) => console.log(error));
  }

  return (
    <Card bg='light' text='dark' className='signUpCard'>
    <Card.Header>Reset Password</Card.Header>
    <Card.Body>
    <Form noValidate onSubmit={null}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={email} placeholder="Enter email" onChange={handleChange}/>
      </Form.Group>

      <button className="standardButton" type="submit" onClick={submit}>
        Submit
      </button>
  </Form>
  {success &&
    <div>
      <br />
      <h6> If an email exists you will recieve a password reset link. </h6>    
    </div>
  }
  </Card.Body>
  </Card>
  );
}

export default ResetPassword;