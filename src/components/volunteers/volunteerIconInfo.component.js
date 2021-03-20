import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileAlt,
  faWheelchair,
  faCar,
} from "@fortawesome/pro-solid-svg-icons";

const VolunteerIconInfo = ({ volunteer }) => {
  return (
    <div className="flex flex-row gap-4 my-4">
      <FontAwesomeIcon
        icon={faMobileAlt}
        style={{
          width: "24px",
          height: "24px",
          opacity: volunteer.haveSmartPhone ? "1" : "0.3",
        }}
      />
      <FontAwesomeIcon
        icon={faCar}
        style={{
          width: "24px",
          height: "24px",
          opacity: volunteer.vehicle ? "1" : "0.3",
        }}
      />
      <FontAwesomeIcon
        icon={faWheelchair}
        style={{
          width: "24px",
          height: "24px",
          opacity: volunteer.disability ? "1" : "0.3",
        }}
      />
    </div>
  );
};

export default VolunteerIconInfo;
