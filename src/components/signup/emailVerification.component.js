import React, { useEffect, useState, Fragment } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import '../../css/misc.css'
import { API } from '../../config'


const EmailVerification = (props) => {
  const [requested, setRequested] = useState(false)
  const [verified, setVerified] = useState(false)
  let { token } = useParams();

  useEffect(() => {
    if (!requested) {
      setRequested(true)
      axios({
        url: 'http://'+API+'/emailVerification/verify',
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'x-access-token': token}
      })
      .then((res) => setVerified(true))
      .catch((error) => console.log(error.response))
    }
  }, [requested, token])

  if (verified) {
    return (
      <h2 className="title"> You have succesfully verified your email. </h2>
    )
  } else {
      return (
        <Fragment>
          <div className="spinner-middle">
          <Spinner animation="border" role="status" size="lg">
          <span className="sr-only">Loading...</span>
          </Spinner>
          </div>
        </Fragment>
      )
  }
}

export default EmailVerification;