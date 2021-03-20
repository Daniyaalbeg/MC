import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/pro-solid-svg-icons";
import { connect } from "react-redux";

import EventsContainer from "./eventsContainer.component";
import HeaderIcons from "../HeaderIcons.component";

const EventView = ({
  createdOrganisations,
  createdOrganisationsIds,
  eventsDict,
}) => {
  return (
    <div className="eventViewContainer">
      <div className="eventViewHeader">
        <div className="eventTextIcon">
          <FontAwesomeIcon icon={faBoxOpen} />
          <p> Distributions </p>
        </div>
        <HeaderIcons />
      </div>
      <div className="eventViewContent">
        <EventsContainer
          createdOrganisations={createdOrganisations}
          createdOrganisationsIds={createdOrganisationsIds}
          eventsDict={eventsDict}
        />
      </div>
    </div>
  );
};

const MapStateToProps = (state) => ({
  createdOrganisations: state.userInfo.createdOrganisations,
  createdOrganisationsIds: state.userInfo.entityIds.createdOrganisations,
  eventsDict: state.userInfo.events,
});

export default connect(MapStateToProps)(EventView);
