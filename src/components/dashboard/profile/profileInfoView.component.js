import React from 'react';
import axios from 'axios';
import { API, rootURL, production } from '../../../config';
import { Link } from 'react-router-dom';

import Address from '../../sharedComponents/address.component';
import HeaderIcons from '../HeaderIcons.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/pro-solid-svg-icons'
import { faEdit } from '@fortawesome/pro-duotone-svg-icons';

const ProfileInfoView = (props) => {
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 
  const { user } = props
  return (
    <div className="profileContainer" style={{ fontFamily: "proximaNova" }}>
      <div className="profileHeader">
        <div className="profileTextIcon">
          <FontAwesomeIcon icon={faUserCircle} />
          <p> Profile </p>
        </div>
        <HeaderIcons />
      </div>
      <div className="profileContent">
        <Link to="/updateProfile" className="profileEditButton">
          <button className="standardButtonWithoutColour editIconVersion mcOrangeBG">
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </Link>
        <p className="profileTitle"> Username </p>
        <p className="profileText"> {user.username} </p>
        <p className="profileTitle"> Email </p>
        <p className="profileText"> {user.email} </p>
        <p className="profileTitle"> Mobile </p>
        <p className="profileText"> {user.mobile ? user.mobile: "Not addded"} </p>
        <p className="profileTitle"> CNIC </p>
        <p className="profileText"> {displayCNIC(user.cnic)} </p>
        <p className="profileTitle"> Address </p>
        <Address address={user.address} />
        <p className="profileTitle"> Verified </p>
        <Verified verified={user.verified}/>
        <p className="profileTitle"> You created this account on </p>
        <p className="profileText"> {new Date(user.createdAt).toLocaleDateString("en-US", dateOptions)} </p>
      </div>
    </div>
  )
}

const displayCNIC = (cnic) => {
  if (cnic) {
    if (cnic.includes('-')) {
      return cnic
    } else {
      const cnicPart1 = cnic.substring(0, 5)
      const cnicPart2 = cnic.substring(5, 12)
      const cnicPart3 = cnic.substring(12,13)

      return cnicPart1 + '-' + cnicPart2 + '-' + cnicPart3
    }
  } else return "Not added"
}

const Verified = (props) => {
  return (
    <>
      <p id="verifyButtonEmail"> {props.verified ? "You have verified your account" : "You have not verified your account"} </p>
      {!props.verified &&
        <button className="standardButton profileVerifyButton" onClick={() => {
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