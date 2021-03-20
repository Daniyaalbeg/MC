import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  acceptVolunteerRequest,
  declineVolunteerRequest,
} from "../../../../Actions/projectActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/pro-duotone-svg-icons";
import {
  faCheck,
  faTimes,
  faChevronCircleLeft,
  faMale,
  faFemale,
  faTransgender,
} from "@fortawesome/pro-solid-svg-icons";

const VolunteerInfo = ({ volunteer, volunteerRequestDict }) => {
  return (
    <>
      <VolunteerRequirmentInfo volunteer={volunteer} />
      <VolunteerRequestsCheck
        volunteer={volunteer}
        volunteerRequestDict={volunteerRequestDict}
      />
    </>
  );
};

const VolunteerRequestsCheck = ({ volunteer, volunteerRequestDict }) => {
  let content = null;
  if (volunteer.volunteerRequests && volunteer.volunteerRequests.length !== 0) {
    content = (
      <VolunteerRequests
        volunteer={volunteer}
        volunteerRequestDict={volunteerRequestDict}
      />
    );
  } else {
    content = <p> No Requests yet. </p>;
  }

  return (
    <div className="volunteerRequestListContainer">
      <h4> Volunteer Requests </h4>
      {content}
    </div>
  );
};

const VolunteerRequests = ({
  volunteer,
  volunteerRequestDict = { volunteerRequestDict },
}) => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  if (selectedRequest) {
    return (
      <SelectedVolunteerRequest
        request={volunteerRequestDict[selectedRequest]}
        setSelectedRequest={setSelectedRequest}
      />
    );
  } else {
    return (
      <div className="volunteerRequestList">
        {volunteer.volunteerRequests.map((request) => {
          return (
            <VolunteerRequest
              key={request}
              request={volunteerRequestDict[request]}
              setSelectedRequest={setSelectedRequest}
            />
          );
        })}
      </div>
    );
  }
};

const SelectedVolunteerRequest = ({ request, setSelectedRequest }) => {
  const { volunteer } = request.requestingVolunteer;

  return (
    <div className="projectDashCard">
      <div className="headerButtonsContainer">
        <button
          className="standardButtonWithoutColour mcGreenBG"
          onClick={() => setSelectedRequest(null)}
        >
          {" "}
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            style={{ textAlign: "left", marginRight: "0.3em" }}
          />{" "}
          Back{" "}
        </button>
      </div>
      <div className="volunteerRequestSelected">
        {volunteer.image && (
          <div className="volunteerRequestSelectedImage">
            <img src={volunteer.image} />
          </div>
        )}
        <div className="volunteerRequestSelectedInfo">
          <p className="projectTitle"> Name </p>
          <p className="projectText">
            {" "}
            {volunteer.firstName} {volunteer.lastName}{" "}
          </p>
          <p className="projectTitle"> Age </p>
          <p className="projectText"> {calcAge(volunteer.dob)} </p>
          <p className="projectTitle"> Gender </p>
          <p className="projectText"> {getGenderIcon(volunteer.gender)} </p>
          <p className="projectTitle"> Contact Number </p>
          <p className="projectText"> {volunteer.contactNumber} </p>
          <p className="projectTitle"> Location </p>
          <p className="projectText">
            {" "}
            {volunteer.city}, {volunteer.country}{" "}
          </p>
        </div>
        <div className="volunteerRequestSelectedContent">
          <p className="projectTitle"> Description </p>
          <p className="projectText"> {request.description} </p>
          <p className="projectTitle"> Motivation </p>
          <p className="projectText"> {request.motivation} </p>
          <p className="projectTitle"> Previous Experience </p>
          <p className="projectText"> {request.previousExperience} </p>
          <p className="projectTitle"> Availability </p>
          <p className="projectText"> {request.availability} </p>
          <p className="projectTitle"> Additional Information </p>
          <p className="projectText"> {request.additionalInformation} </p>
          <br />
          <VolunteerRequestButtons request={request} />
        </div>
      </div>
    </div>
  );
};

const VolunteerRequestButtons = ({ request }) => {
  const dispatch = useDispatch();

  if (request.status === "PENDING") {
    return (
      <>
        <button
          onClick={() => dispatch(acceptVolunteerRequest(request._id))}
          className="standardButtonWithoutColour mcGreenBG"
          style={{ height: 34, width: 34, marginRight: "8px" }}
        >
          {" "}
          <FontAwesomeIcon icon={faCheck} />{" "}
        </button>
        <button
          onClick={() => dispatch(declineVolunteerRequest(request._id))}
          className="standardButtonWithoutColour mcRedBG"
          style={{ height: 34, width: 34 }}
        >
          {" "}
          <FontAwesomeIcon icon={faTimes} />{" "}
        </button>
      </>
    );
  } else if (request.status === "ACCEPTED") {
    return (
      <p className="w-auto inline-block px-2 py-1 rounded-lg bg-green-500 font-bold text-white">
        {" "}
        Accepted{" "}
      </p>
    );
  } else {
    return <p className=""> Declined </p>;
  }
};

const VolunteerRequest = ({ request, setSelectedRequest }) => {
  const { volunteer } = request.requestingVolunteer;

  return (
    <div
      className="projectDashCard projectVolunteerRequestListItem"
      onClick={() => setSelectedRequest(() => request._id)}
    >
      {volunteer.image && (
        <div className="volunteerRequestImage">
          <img src={volunteer.image} />
        </div>
      )}
      <div className="volunteerRequestHeader">
        <h4>
          {" "}
          {volunteer.firstName} {volunteer.lastName}{" "}
        </h4>
        <div>
          <span className="volunteerAge"> {calcAge(volunteer.dob)} </span>
          <span className="volunteerGender">
            {" "}
            {getGenderIcon(volunteer.gender)}{" "}
          </span>
        </div>
        <h6>
          {" "}
          {volunteer.city}, {volunteer.country}{" "}
        </h6>
      </div>
    </div>
  );
};

const getGenderIcon = (gender) => {
  if (gender === "male") {
    return <FontAwesomeIcon style={{ color: "blue" }} icon={faMale} />;
  } else if (gender === "female") {
    return <FontAwesomeIcon style={{ color: "pink" }} icon={faFemale} />;
  } else {
    return <FontAwesomeIcon style={{ color: "red" }} icon={faTransgender} />;
  }
};

const calcAge = (birthday) => {
  const dif = Date.now() - new Date(birthday).getTime();
  const ms = new Date(dif);
  return Math.abs(ms.getUTCFullYear() - 1970);
};

const VolunteerRequirmentInfo = ({ volunteer }) => {
  return (
    <div
      className="projectDashCard"
      style={{ height: "fit-content", position: "relative" }}
    >
      <h6> Volunteer Needs </h6>
      <p className="projectTitle"> Volunteer Skills Needed </p>
      <div
        className="categoryBadgeContainer"
        style={{ justifyContent: "flex-start" }}
      >
        {volunteer.skills.map((skill) => {
          return <span key={skill}> {skill} </span>;
        })}
      </div>
      <p className="projectTitle"> Description </p>
      <p className="projectText"> {volunteer.description} </p>
      {/* FIX */}
      <button
        className="standardButtonWithoutColour mcGreenBG"
        onClick={() => console.log("edit")}
        style={{ position: "absolute", top: "8px", right: "8px" }}
      >
        {" "}
        <FontAwesomeIcon icon={faEdit} />{" "}
      </button>
    </div>
  );
};

export default VolunteerInfo;
