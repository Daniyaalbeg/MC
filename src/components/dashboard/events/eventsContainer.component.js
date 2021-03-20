import React, { useState } from "react";
import { Link } from "react-router-dom";
import EventAccordionContainer from "./eventAccordionContainer.component";
import StandardCard from "../../sharedComponents/standardCard.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faExclamationTriangle } from "@fortawesome/pro-duotone-svg-icons";

const EventsContainer = ({
  createdOrganisations,
  createdOrganisationsIds,
  eventsDict,
}) => {
  const [selectedOrg, setSelectedOrg] = useState(null);

  if (!createdOrganisationsIds || createdOrganisationsIds.length === 0) {
    return (
      <div className="emptyDBContainer">
        <p>
          {" "}
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="cnicExclamationIcon"
          />{" "}
          You need to create an organisation before adding distributions{" "}
        </p>
        <Link to="signupOrg">
          <button className="standardButtonWithoutColour mcGreyBG">
            {" "}
            <FontAwesomeIcon
              icon={faPlus}
              style={{ marginRight: "0.3em" }}
            />{" "}
            Create Organisation{" "}
          </button>
        </Link>
      </div>
    );
  }

  if (selectedOrg) {
    return (
      <EventAccordionContainer
        org={selectedOrg}
        setSelectedOrg={setSelectedOrg}
        eventsDict={eventsDict}
      />
    );
  } else {
    return (
      <>
        <h2 className="eventHeadingSelect">
          {" "}
          Select an organisation to add events{" "}
        </h2>
        <div className="cardsDashContainer">
          {createdOrganisationsIds.map((id) => {
            const org = createdOrganisations[id];
            return (
              <div
                key={org._id}
                className="eventCardDash grow"
                onClick={() => setSelectedOrg(org)}
              >
                <StandardCard
                  name={org.name}
                  image={org.imageURL}
                  setSelectedOrg={setSelectedOrg}
                />
              </div>
            );
          })}
        </div>
      </>
    );
  }
};

export default EventsContainer;
