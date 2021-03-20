import React, { useState } from "react";
import { connect } from "react-redux";
import VolunteerRequests from "./volunteerRequests.component";
import { BackButton } from "../../sharedComponents/buttons.component";

const VolunteerRequestsInfo = ({ volunteerRequestIds, volunteerRequests }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  if (selectedRequest) {
    return (
      <div className="volunteerCard">
        <div className="mb-2 flex flex-row gap-4 items-center">
          <BackButton onClick={() => setSelectedRequest(null)} title="Back" />
          <h3 className="mb-0 font-bold">
            {" "}
            {selectedRequest.requestedProject.name}{" "}
          </h3>
        </div>
        <div className="">
          <h5 className="text-gray-800 font-bold"> Description </h5>
          <p> {selectedRequest.description} </p>
          <h5 className="text-gray-800 font-bold"> Motivation </h5>
          <p> {selectedRequest.motivation} </p>
          <h5 className="text-gray-800 font-bold"> Previous Experience </h5>
          <p> {selectedRequest.previousExperience} </p>
          <h5 className="text-gray-800 font-bold"> Availability </h5>
          <p> {selectedRequest.availability} </p>
          <h5 className="text-gray-800 font-bold"> Additional Information </h5>
          <p> {selectedRequest.additionalInformation} </p>
          <h5 className="text-gray-800 font-bold"> Status </h5>
          <p> {selectedRequest.status} </p>
          {selectedRequest.decklinedReason === "DECLINED" ?? (
            <>
              <h5 className="text-gray-800 font-bold"> Declined Reason </h5>
              <p> {selectedRequest.declinedReason} </p>
            </>
          )}
        </div>
      </div>
    );
  }

  if (volunteerRequestIds) {
    //AJKSGHDJHGHJKAGHJASGDKHJAS
    return (
      <div className="volunteerCard">
        <h5 className="mb-2 font-bold text-gray-700"> Oppurtunities </h5>
        <h6 className="mb-2 font-bold text-gray-700"> Accepted </h6>
        <VolunteerRequests
          setSelectedRequest={setSelectedRequest}
          volunteerRequestIds={volunteerRequestIds}
          volunteerRequests={volunteerRequests}
          filter="ACCEPTED"
        />
        <h6 className="mb-2 font-bold text-gray-700"> Pending </h6>
        <VolunteerRequests
          setSelectedRequest={setSelectedRequest}
          volunteerRequestIds={volunteerRequestIds}
          volunteerRequests={volunteerRequests}
          filter="PENDING"
        />
        <h6 className="mb-2 font-bold text-gray-700"> Past </h6>
        <VolunteerRequests
          setSelectedRequest={setSelectedRequest}
          volunteerRequestIds={volunteerRequestIds}
          volunteerRequests={volunteerRequests}
          filter="DECLINED"
        />
      </div>
    );
  } else {
    return (
      <div className="volunteerCard">
        <h6 className="mb-1 font-bold text-gray-700"> Oppurtunities </h6>
        <p className="emptyVolunteerRequestList">
          {" "}
          You have not volunteered yet.{" "}
        </p>
      </div>
    );
  }
};

const MapStateToProps = (state) => ({
  volunteerRequestIds: state.userInfo.entityIds.userVolunteerRequests,
  volunteerRequests: state.userInfo.userVolunteerRequests,
});

export default connect(MapStateToProps)(VolunteerRequestsInfo);
