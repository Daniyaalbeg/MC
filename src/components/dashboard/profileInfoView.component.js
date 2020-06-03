import React from 'react';
import axios from 'axios';
import { API, rootURL, production } from '../../config';

import Address from '../shared/address.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/pro-solid-svg-icons'


import '../../css/profileInfoView.css';

const ProfileInfoView = (props) => {
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 
  const { user } = props
  return (
    <div className="profileContainer" style={{ fontFamily: "proximaNova" }}>
      <div className="profileHeader">
        <FontAwesomeIcon icon={faUserCircle} />
        <p> Profile </p>
      </div>
      <div className="profileContent">
        <p className="profileTitle"> Username </p>
        <p className="profileText"> {user.username} </p>
        <p className="profileTitle"> Email </p>
        <p className="profileText"> {user.email} </p>
        <p className="profileTitle"> Mobile </p>
        <p className="profileText"> {user.mobile ? user.mobile: "Not addded"} </p>
        <p className="profileTitle"> CNIC </p>
        <p className="profileText"> {user.cnic ? user.cnic: "Not addded"} </p>
        <p className="profileTitle"> Address </p>
        <Address address={user.address} />
        <p className="profileTitle"> Approved </p>
        <p className="profileText"> {user.approved ? "You have been approved" : "You have not been approved"} </p>
        <p className="profileTitle"> Verified </p>
        <Verified verified={user.verified}/>
        <p className="profileTitle"> You created this account on </p>
        <p className="profileText"> {new Date(user.createdAt).toLocaleDateString("en-US", dateOptions)} </p>
      </div>
    </div>
  )
}

const Verified = (props) => {
  return (
    <>
      <p id="verifyButtonEmail"> {props.verified ? "You have been verified" : "You have not been verified"} </p>
      {!props.verified &&
        <button className="standardButton" onClick={() => {
          sendVerificationEmail();
        }}> 
          <FontAwesomeIcon icon={faEnvelope} style={{marginRight: "0.4em"}}></FontAwesomeIcon>
          Verify
        </button>
      }
    </>
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