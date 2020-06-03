import React, { Fragment } from 'react';
import axios from 'axios';
import { API, rootURL, production } from '../../config';

import Address from '../shared/address.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import '../../css/ProfileInfoView.css';

const ProfileInfoView = (props) => {
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 
  const { user } = props
  return (
    <div className="profileContainer" style={{ fontFamily: "proximaNova" }}>
      <h5 className="text-muted"> Username </h5>
      <p> {user.username} </p>
      <h5 className="text-muted"> Email </h5>
      <p> {user.email} </p>
      <h5 className="text-muted"> Mobile </h5>
      <p> {user.mobile ? user.mobile: "Not addded"} </p>
      <h5 className="text-muted"> CNIC </h5>
      <p> {user.cnic ? user.cnic: "Not addded"} </p>
      <h5 className="text-muted"> Address </h5>
      <Address address={user.address} />
      <h5 className="text-muted"> Email </h5>
      <p> {user.email} </p>
      <h5 className="text-muted"> Approved </h5>
      <p> {user.approved ? "You have been approved" : "You have not been approved"} </p>
      <h5 className="text-muted"> Verified </h5>
      <Verified verified={user.verified}/>
      <h5 className="text-muted"> You created this account on </h5>
      <p> {new Date(user.createdAt).toLocaleDateString("en-US", dateOptions)} </p>
    </div>
  )
}

const Verified = (props) => {
  return (
    <Fragment>
      <p id="verifyButtonEmail"> {props.verified ? "You have been verified" : "You have not been verified"} </p>
      {!props.verified &&
        <button className="standardButton" onClick={() => {
          sendVerificationEmail();
        }}> 
          <FontAwesomeIcon icon={faEnvelope} style={{marginRight: "0.4em"}}></FontAwesomeIcon>
          Verify
        </button>
      }
    </Fragment>
  )
}

const sendVerificationEmail = () => {
  axios({
    method: 'post',
    url: rootURL(production)+API+'/emailVerification',
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
    credentials: 'include'
  })
  .catch((error) => {
    console.log("this error")
    console.log(error.response)
  })
}

export default ProfileInfoView;