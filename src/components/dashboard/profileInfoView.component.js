import React, { Fragment } from 'react';
import axios from 'axios';
import { API, rootURL, production } from '../../config'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import '../../css/ProfileInfoView.css'

const ProfileInfoView = (props) => {
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 
  return (
    <div className="profileContainer" style={{ fontFamily: "proximaNova" }}>
      <h6 className="text-muted"> Username </h6>
      <p> {props.username} </p>
      <h6 className="text-muted"> Email </h6>
      <p> {props.email} </p>
      <h6 className="text-muted"> Approved </h6>
      <p> {props.approved ? "You have been approved" : "You have not been approved"} </p>
      <h6 className="text-muted"> Verified </h6>
      <Verified verified={props.verified} token={props.token}/>
      <h6 className="text-muted"> You created this account on </h6>
      <p> {new Date(props.createdAt).toLocaleDateString("en-US", dateOptions)} </p>
    </div>
  )
}

const Verified = (props) => {
  return (
    <Fragment>
      <p id="verifyButtonEmail"> {props.verified ? "You have been verified" : "You have not been verified"} </p>
      {!props.verified &&
        <button className="standardButton" onClick={() => {
          sendVerificationEmail(props.token);
        }}> 
          <FontAwesomeIcon icon={faEnvelope} style={{marginRight: "0.4em"}}></FontAwesomeIcon>
          Verify
        </button>
      }
    </Fragment>
  )
}

const sendVerificationEmail = (token) => {
  axios({
    method: 'post',
    url: rootURL(production)+API+'/emailVerification',
    headers: {'Content-Type': 'application/json', 'x-access-token': token},
    withCredentials: true,
    credentials: 'include'
  })
  .catch((error) => {
    console.log("this error")
    console.log(error.response)
  })
}

export default ProfileInfoView;