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
  }
}

export default ContributedMessage