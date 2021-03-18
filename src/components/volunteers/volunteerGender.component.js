import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMars,
  faVenus,
  faTransgender,
} from "@fortawesome/pro-solid-svg-icons";

const GenderComponent = ({ gender, colour }) => {
  let genderComponent = null;
  if (gender === "male") {
    genderComponent = <FontAwesomeIcon icon={faMars} color={colour} />;
  } else if (gender === "female") {
    genderComponent = <FontAwesomeIcon icon={faVenus} color={colour} />;
  } else {
    genderComponent = <FontAwesomeIcon icon={faTransgender} color={colour} />;
  }

  return genderComponent;
};

export default GenderComponent;
