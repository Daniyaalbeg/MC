import React, { useEffect } from 'react'

const ContributedMessage = ({ type, closeModal }) => {
  if (type === "SUPPLY") {
    return (
      <div className="contributedMessageContainer">
        <h4> Thanks for your contribution! </h4>
        <p> You will be sent an email confirming your request was made. Once the project owner accepts your request you will be notified. </p>
        <button className="standardButtonWithoutColour mcGreenBG" onClick={closeModal}> Dismiss </button>
      </div>
    )
  } else if (type === "VOLUNTEER") {
    return (
      <div className="contributedMessageContainer">
        <h4> Thanks for volunteering! </h4>
        <p> You will be sent an email confirming your request was made. The project owner will now look over your request. Once a decision is made you will be notified. </p>
        <button className="standardButtonWithoutColour mcGreenBG" onClick={closeModal}> Dismiss </button>
      </div>
    )
  }
}

export default ContributedMessage