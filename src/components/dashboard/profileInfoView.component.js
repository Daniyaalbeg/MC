import React, { Fragment } from 'react';
import axios from 'axios';
import { API, rootURL, production } from '../../config'

const ProfileInfoView = (props) => {
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 
  return (
    <div style={{ fontFamily: "proximaNova" }}>
      <br />
      <h6 className="text-muted"> Username </h6>
      <p> {props.username} </p>
      <hr />
      <h6 className="text-muted"> Email </h6>
      <p> {props.email} </p>
      <hr />
      <h6 className="text-muted"> Approved </h6>
      <p> {props.approved ? "You have been approved" : "You have not been approved"} </p>
      <hr />
      <h6 className="text-muted"> Verified </h6>
      <Verified verified={props.verified} token={props.token}/>
      <hr />
      <h6 className="text-muted"> You created this account on </h6>
      <p> {new Date(props.createdAt).toLocaleDateString("en-US", dateOptions)} </p>
    </div>
  )
}

const Verified = (props) => {
  return (
    <Fragment>
      <p> {props.verified ? "You have been verified" : "You have not been verified"} </p>
      {!props.verified &&
        <button className="standardButton" onClick={() => {
          sendVerificationEmail(props.token);
        }}> Verify </button>
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