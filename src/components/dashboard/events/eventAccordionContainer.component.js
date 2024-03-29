import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Accordion } from "react-bootstrap";

import EventItemCard from "./eventItemCard.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faExclamationTriangle } from "@fortawesome/pro-duotone-svg-icons";

const EventAccordionContainer = ({ org, setSelectedOrg, eventsDict }) => {
  const [selectedEventId, setSelectedEventId] = useState("");
  const eventIDs = org.events;

  const RenderEvents = () => {
    if (Array.isArray(eventIDs) && eventIDs.length) {
      const listOfEvents = eventIDs.map((id) => (
        <EventItemCard
          isUser={true}
          event={eventsDict[id]}
          key={eventsDict[id]._id}
          open={eventsDict[id]._id === selectedEventId}
        />
      ));
      const list = (
        <>
          <div className="headerButtonsContainer">
            <button
              className="standardButtonWithoutColour mcGreyBG"
              onClick={() => setSelectedOrg(null)}
            >
              {" "}
              <FontAwesomeIcon
                icon={faChevronCircleLeft}
                style={{ textAlign: "left", marginRight: "0.3em" }}
              />{" "}
              Back{" "}
            </button>
            <Link to={"createEvent/" + org._id}>
              <button className="createEventButton standardButton">
                {" "}
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ marginRight: "0.3em" }}
                />{" "}
                Create Distribution{" "}
              </button>
            </Link>
          </div>
          <Accordion
            style={{ textAlign: "left" }}
            onSelect={setSelectedEventId}
            className="eventListCard"
          >
            {listOfEvents}
          </Accordion>
        </>
      );
      return list;
    } else {
      return (
        <>
          <div className="headerButtonsContainer">
            <button
              className="standardButtonWithoutColour mcGreyBG"
              onClick={() => setSelectedOrg(null)}
            >
              {" "}
              <FontAwesomeIcon
                icon={faChevronCircleLeft}
                style={{ textAlign: "left", marginRight: "0.3em" }}
              />{" "}
              Back{" "}
            </button>
          </div>
          <div className="emptyDBContainer">
            <p>
              {" "}
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                className="cnicExclamationIcon"
              />{" "}
              No distributions to display{" "}
            </p>
            <Link to={"createEvent/" + org._id}>
              <button className="createEventButton standardButton">
                {" "}
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ marginRight: "0.3em" }}
                />{" "}
                Create Distribution{" "}
              </button>
            </Link>
          </div>
        </>
      );
    }
  };

  return RenderEvents();
};

export default EventAccordionContainer;
