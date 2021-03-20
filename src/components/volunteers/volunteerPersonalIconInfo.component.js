import React from "react";

import {
  convertEducationLevel,
  convertEmploymentStatus,
} from "../utilities/volunteerUtilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faBriefcase,
  faGraduationCap,
  faBirthdayCake,
} from "@fortawesome/pro-solid-svg-icons";

const VolunteerPersonalIconInfo = ({ volunteer }) => {
  return (
    <>
      <div className="flex flex-row items-center gap-2">
        <FontAwesomeIcon
          style={{ width: "20px", height: "20px" }}
          icon={faMapMarkerAlt}
        />{" "}
        <h5 className="m-0">{volunteer.city}</h5>
      </div>
      <div className="flex flex-row items-center gap-2">
        <FontAwesomeIcon
          style={{ width: "20px", height: "20px" }}
          icon={faBriefcase}
        />
        <h5 className="m-0">
          {convertEmploymentStatus(volunteer.employmentStatus)}
        </h5>
      </div>
      <div className="flex flex-row items-center gap-2">
        <FontAwesomeIcon
          style={{ width: "20px", height: "20px" }}
          icon={faGraduationCap}
        />
        <h5 className="m-0">
          {convertEducationLevel(volunteer.educationLevel)}
        </h5>
      </div>
      <div className="flex flex-row items-center gap-2">
        <FontAwesomeIcon
          style={{ width: "20px", height: "20px" }}
          icon={faBirthdayCake}
        />
        <h5 className="m-0">{getAge(volunteer.dob)}</h5>
      </div>
    </>
  );
};

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default VolunteerPersonalIconInfo;
