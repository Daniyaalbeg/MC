import React, { useState, useEffect, Fragment } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

const ResetPassword = (props) => {
  const [email, setEmail] = useState("")

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const submit = () => {
    axios({
      method: 'post',
      url: 'http://localhost:8000/reset/password',
      headers: {'Content-Type': 'application/json'},
      data: {
        email: email
      }
    })
    .then((res) => <Link push to='/' />)
    .catch((error) => console.log(error));
  }

  return (
    // <Fragment>
    //   <div className="resetForm" dangerouslySetInnerHTML={{__html: formData}}></div>
    // </Fragment>
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={email} placeholder="Enter email" onChange={handleChange}/>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={submit}>
        Submit
      </Button>
  </Form>
  );
}

export default ResetPassword;