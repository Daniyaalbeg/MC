import React, { useState } from 'react';

import UserImagePlaceholder from '../../sharedComponents/userImagePlaceholder.component';
import { WhatCategories } from '../../iconController/iconCategories.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faChevronCircleUp } from '@fortawesome/pro-duotone-svg-icons';


const VolunteerSelectionView = ({ volunteer }) => {
  return (
    <div>
      <VolunteerProfile volunteer={volunteer} />
      <VolunteerRequestsInfo volunteer={volunteer} />
    </div>
  )
}

const requests = [
  {
    _id: 1,
    motivation: "I love this project",
    previosExperience: "I have experience in etc etc etc",
    availability: "I am available monday tuesday wednesdat",
    additionalInformation: "I can help with other stuff to",
    accepted: false
  },
  {
    _id: 2,
    motivation: "I love this project",
    previosExperience: "I have experience in etc etc etc",
    availability: "I am available monday tuesday wednesdat",
    additionalInformation: "I can help with other stuff to",
    accepted: false
  },
  {
    _id: 3,
    motivation: "I love this project",
    previosExperience: "I have experience in etc etc etc",
    availability: "I am available monday tuesday wednesdat",
    additionalInformation: "I can help with other stuff to",
    accepted: false
  },
  {
    _id: 4,
    motivation: "I love this project",
    previosExperience: "I have experience in etc etc etc",
    availability: "I am available monday tuesday wednesdat",
    additionalInformation: "I can help with other stuff to",
    accepted: false
  }
]

const VolunteerRequestsInfo = ({ volunteer }) => {
  const [selectedRequest, setSelectedRequest] = useState(null)

  if (selectedRequest) {
    return (
      <div className="volunteerCard">
        selected Volunteer request
        <button onClick={() => setSelectedRequest(null)}>back</button>
      </div>
    )
  }

  if (true) {
    return (
      <div className="volunteerCard">
        Oppurtunities  
        <VolunteerRequests volunteer={volunteer} setSelectedRequest={setSelectedRequest} />
      </div>
    )  
  } else {
    return (
      <div className="volunteerCard">
        Oppurtunities  
        <p className="emptyVolunteerRequestList"> You have not volunteered yet. </p>
      </div>
    )
  }
}

const VolunteerRequests = ({ volunteer, setSelectedRequest }) => {
  return (
    <div className="volunteerRequestsList">
      {
        requests.map((request) => {
          return <VolunteerRequest key={request._id} setSelectedRequest={setSelectedRequest} request={request} />
        })
      }
    </div>
  )
}

const VolunteerRequest = ({ request, setSelectedRequest }) => {
  return (
    <div className="volunteerRequest" onClick={() => setSelectedRequest(request)}>
      <p> You have not volunteered yet. </p>    
    </div>
  )
}

const VolunteerProfile = ({ volunteer }) => {
  const [expanded, setExpanded] = useState()

  return (
    <>
      <div className="volunteerCard">
        <div className="volunteerProfile">
          <div className="volunteerProfileA">
            <UserImagePlaceholder image={volunteer.image} />
            <p> {volunteer.firstName} {volunteer.lastName} </p>
          </div>
          <div className="volunteerProfileB">
            My Causes
            <div>
              <WhatCategories types={volunteer.interests} />
            </div>
          </div>
          <div className="volunteerProfileC">
            My Skills
            <div className="categoryBadgeContainer" style={{ justifyContent: 'flex-start' }}>
              {
                volunteer.skills.map((skill) => {
                  return <span style={{fontSize: "12px"}} key={skill}> {skill} </span>
                })
              }
            </div>
          </div>
          <div className="volunteerProfileButtons">
            <button> <FontAwesomeIcon icon={faEdit} /> </button>
          </div>
        </div>
        <button onClick={() => setExpanded((expanded) => !expanded)}> <FontAwesomeIcon icon={faChevronCircleUp} style={{transform: expanded ? "rotate(0deg)":"rotate(180deg)"}} size="2x" /> </button>
        {expanded &&
          <VolunteerProfileInfo volunteer={volunteer} />
        }
      </div>
    </>
  )
}

const VolunteerProfileInfo = ({ volunteer }) => {
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 

  return (
    <div>
      <div>
        <p className="volunteerTitle"> Email </p>
        <p className="volunteerText"> {volunteer.email} </p>
      </div>
      <div>
        <p className="volunteerTitle"> Cnic </p>
        <p className="volunteerText"> {volunteer.cnic ? volunteer.cnic : '-'} </p>
      </div>
      <div>
        <p className="volunteerTitle"> Date of Birth </p>
        <p className="volunteerText"> {new Date(volunteer.dob).toLocaleDateString("en-US", dateOptions)} </p>
      </div>
      <div>
        <p className="volunteerTitle"> Gender </p>
        <p className="volunteerText"> {volunteer.gender} </p>
      </div>
      <div>
        <p className="volunteerTitle"> About me </p>
        <p className="volunteerText"> {volunteer.about} </p>
      </div>
      <div>
        <p className="volunteerTitle"> Contact Number </p>
        <p className="volunteerText"> {volunteer.contactNumber} </p>
      </div>
      <div>
        <p className="volunteerTitle"> Education </p>
        <p className="volunteerText"> {volunteer.educationLevel} </p>
      </div>
      <div>
        <p className="volunteerTitle"> Emplyment </p>
        <p className="volunteerText"> {volunteer.employmentStatus} </p>
      </div>
      {volunteer.disability &&
        <div>
          <p className="volunteerTitle"> Disability </p>
          <p className="volunteerText"> {volunteer.disability} </p>
        </div>
      }
      <div>
        <p className="volunteerTitle"> Smart Phone </p>
        <p className="volunteerText"> {volunteer.haveSmartPhone ? "I have a smart phone" : "I do not have a smart phone"} </p>
      </div>
      <div>
        <p className="volunteerTitle"> Vehicle </p>
        <p className="volunteerText"> {volunteer.vehicle} </p>
      </div>
      {volunteer.preferredContact &&
        <div>
          <p className="volunteerTitle"> Preferred Contact </p>
          <p className="volunteerText"> {volunteer.preferredContact} </p>
        </div>
      }
      <div>
        <p className="volunteerTitle"> City </p>
        <p className="volunteerText"> {volunteer.city} </p>
      </div>
      <div>
        <p className="volunteerTitle"> Country </p>
        <p className="volunteerText"> {volunteer.country} </p>
      </div>
      <div>
        <p className="volunteerTitle"> Languages </p>
        <p className="volunteerText"> {volunteer.languages} </p>
      </div>
    </div>
  )
}

export default VolunteerSelectionView
