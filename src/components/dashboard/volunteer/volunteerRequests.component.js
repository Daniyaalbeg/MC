import React from "react";

import VolunteerRequestCard from "./volunteerRequestCard.component";

const VolunteerRequests = ({
  setSelectedRequest,
  volunteerRequestIds,
  volunteerRequests,
  filter,
}) => {
  const volunteerRequestsIdsFiltered = volunteerRequestIds.filter((id) => {
    if (volunteerRequests[id].status === filter) return true; //check if right status
    return false;
  });

  if (
    volunteerRequestsIdsFiltered &&
    volunteerRequestsIdsFiltered.length === 0
  ) {
    return (
      <div className="">
        <p> None Available </p>
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-wrap gap-4 mb-2">
      {volunteerRequestsIdsFiltered.map((id) => {
        return (
          <VolunteerRequestCard
            key={id}
            setSelectedRequest={setSelectedRequest}
            request={volunteerRequests[id]}
          />
        );
      })}
    </div>
  );
};

export default VolunteerRequests;
