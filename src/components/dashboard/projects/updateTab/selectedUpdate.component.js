import React from 'react';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faCaretCircleLeft, faCaretCircleRight } from "@fortawesome/pro-duotone-svg-icons";
import ImageCarousel from '../../../sharedComponents/imageCarousel.component';

const SelectedUpdate = ({ update, setSelectedUpdate }) => {
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 

  return (
    <>
    <div className="headerButtonsContainer">
      <button className="standardButtonWithoutColour mcGreenBG" onClick={() => setSelectedUpdate(null)}> <FontAwesomeIcon icon={faChevronCircleLeft} style={{textAlign: 'left', marginRight: "0.3em"}}/> Back </button>
    </div>
    <div className="projectSelectedUpdateContainer">
      <div className="projectDashCard projectSelectedUpdateInfo">
        <p className="projectTitle"> Title </p>
        <p className="projectText"> {update.title} </p>
        <p className="projectTitle"> Published </p>
        <p className="projectText"> {new Date(update.date).toLocaleDateString("en-US", dateOptions)} </p>
      </div>
      <div className="projectDashCard projectSelectedUpdateImages">
        <ImageCarousel images={update.images} height="400px" width="auto" />
      </div>
      <div className="projectDashCard projectSelectedUpdateDesc">
        <p className="projectTitle"> Description </p>
        <p className="projectText"> {update.description} </p>
      </div>
    </div>
    </>
  )
}

export default SelectedUpdate