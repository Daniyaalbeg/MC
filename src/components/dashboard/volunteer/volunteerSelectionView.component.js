import React from "react";

import VolunteerRequestsInfo from "./volunteerRequestsInfo.component";
import VolunteerProfile from "./volunteerProfile.component";

const VolunteerSelectionView = ({ volunteer }) => {
  return (
    <div>
      <VolunteerProfile volunteer={volunteer} />
      <VolunteerRequestsInfo />
    </div>
  );
};

export default VolunteerSelectionView;
