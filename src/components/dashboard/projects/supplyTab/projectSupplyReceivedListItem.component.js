import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { acceptSupplyRequest } from '../../../../Actions/projectActions';
import MapForDisplay from '../../../sharedComponents/mapForDisplay.component';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";


const SupplyRequestItem = ({ project, supply, supplyRequest }) => {
  const [viewExpand, setViewExpand] = useState(false)
  const dispatch = useDispatch()

  const toggleView = (viewExpand) => {
    setViewExpand(!viewExpand)
  }

  return (
    <div>
      <div className={viewExpand ? "projectSupplyRequestItem projectSupplyRequestItemExpanded" : "projectSupplyRequestItem"} onClick={() => toggleView(viewExpand)}>
        <div className="projectSupplyRequestItemHeader">
          <div className="projectSupplyRequestItemLeft">
            <p className="supplyRequestAmount"> {supplyRequest.amount} </p>
            <p className="supplyRequestAmountTitle"> items offered </p>
          </div>
          <div className="projectSupplyRequestItemRight">
            {supplyRequest.accepted ? "Accepted" : "Pending"}
            <button onClick={() => toggleView(viewExpand)}>
              <FontAwesomeIcon icon={faCaretDown} rotation={viewExpand ? 180 : null} />
            </button>
          </div>
        </div>
        <SupplyRequestItemExpanded viewExpand={viewExpand} project={project} supply={supply} supplyRequest={supplyRequest} />
      </div>
    </div>
  )
}

const SupplyRequestItemExpanded = ({ viewExpand, project, supply, supplyRequest }) => {
  if (viewExpand) {
    return (
      <div className="projectSupplyRequestItemBody">
        <div className="projectSupplyRequestItemBodyLeft">
          <p className="projectTitle"> Description </p>
          <p className="projectText"> {supplyRequest.description} </p>
          <p className="projectTitle"> Name </p>
          <p className="projectText"> {supplyRequest.username} </p>
          <p className="projectTitle"> Mobile </p>
          <p className="projectText"> {supplyRequest.mobile} </p>
          {supplyRequest.contactDetails &&
          <>
            <p className="projectTitle"> Other Contact Details </p>
            <p className="projectText"> {supplyRequest.contactDetails} </p>
          </>
          }
          <p className="projectText"> {supplyRequest.canDeliver ? "They can deliver" : "They cannot deliver"} </p>
          <SupplyAcceptPendingButton accepted={supplyRequest.accepted} project={project} supply={supply} supplyRequest={supplyRequest} />
        </div>
        <div className="projectSupplyRequestItemBodyRight">
          {(!supplyRequest.canDeliver && supplyRequest.location) &&
            <MapForDisplay location={supplyRequest.location} />
          }
        </div>
      </div>
    )
  } else return null
}

const ProjectSupplyReceivedList = ({ project, supply }) => {
  if (!supply.suppliedBy || supply.suppliedBy.length === 0) {
    return (
      <p style={{textAlign: 'center'}}> You have not recieved any supply requests yet. </p>
    )
  } else {
    return (
      <div className="projectSupplyRequestContainer">
        <p> Supply Requests </p>
        {
          supply.suppliedBy.map((supplyRequest) => {
            return <SupplyRequestItem key={supplyRequest._id} project={project} supply={supply} supplyRequest={supplyRequest} />
          })
        }
      </div>
    )
  }
}


const SupplyAcceptPendingButton = ({ accepted, project, supplyRequest, supply }) => {
  const dispatch = useDispatch()

  if (accepted) {
    return null
  } else {
    return (
      <button className="standardButtonWithoutColour mcGreenBG" onClick={() => {
        dispatch(acceptSupplyRequest(project._id, supply._id, supplyRequest._id))
      }} > Recieve </button>
    )
  }
}

export default ProjectSupplyReceivedList