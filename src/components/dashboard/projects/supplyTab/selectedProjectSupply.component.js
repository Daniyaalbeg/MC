import React from 'react';

import ProjectCardDashProgressInfo from '../../../sharedComponents/projectCardDashProgressRing';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

const SelectedProjectSupply = ({ supply, setSelectedSupply }) => {
  return (
    <>
    <div className="headerButtonsContainer">
      <button className="standardButtonWithoutColour mcGreenBG" onClick={() => setSelectedSupply(null)}> <FontAwesomeIcon icon={faChevronCircleLeft} style={{textAlign: 'left', marginRight: "0.3em"}}/> Back </button>
    </div>
    <div className="projectDashSupplyContainer">
      <div className="projectDashCard projectSupplyCardA">
        <ProjectCardDashProgressInfo empty={false} title={'Total Received'} percent={supply.amountReceived/supply.amountNeeded*100} colour={'#1589C9'} />
      </div>
      <div className="projectDashCard projectSupplyCardB">
        <ProjectSupplyDetails supply={supply} />
      </div>
      <div className="projectDashCard projectSupplyCardC">
      
      </div>
      <div className="projectSupplyCardD">
        <ProjectSupplyReceivedListItem supply={supply} />
      </div>
    </div>
    </>      
  )
}

const suppliedBy = [
  {
    suppliedBy: "u687943692783465",
    userName: "Daniyaal Beg",
    userMobile: "03008555592",
    amount: "34",
    accepted: false
  },
  {
    suppliedBy: "u687943692783465",
    userName: "Feraas Beg",
    userMobile: "0932452764",
    amount: "12",
    accepted: true
  }
]

const ProjectSupplyReceivedListItem = ({ supply }) => {
  if (false) {//!supply.suppliedBy || supply.suppliedBy.length === 0) {
    return (
      <p> No one has sent you supply yet. </p>
    )
  } else {
    return (
      <table>
        <thead>
          <tr>
            <th> Name </th>
            <th> Contact </th>
            <th> Amount </th>
            <th> Accepted </th>
          </tr>
        </thead>
        {
          suppliedBy.map((supplyRequest) => {
            return (
              <tr>
                <td> {supplyRequest.userName} </td>
                <td> {supplyRequest.userMobile} </td>
                <td> {supplyRequest.amount} </td>
                <td> <SupplyAcceptPendingButton accepted={supplyRequest.accepted} /> </td>
              </tr>
            )
          })
        }
      </table>
    )
  }
}

const ProjectSupplyDetails = ({ supply }) => {
  return (
    <>
    <p className="projectTitle"> Name </p>
    <p className="projectText"> {supply.name} </p>
    <p className="projectTitle"> Received </p>
    <p className="projectText"> {supply.amountReceived} </p>
    <p className="projectTitle"> Needed </p>
    <p className="projectText"> {supply.amountNeeded} </p>
    </>
  )
}

const SupplyAcceptPendingButton = ({ accepted }) => {
  if (accepted) {
    return "Accepted"
  } else {
    return (
      <button className="standardButtonWithoutColour mcGreenBG"> Accept </button>
    )
  }
}

export default SelectedProjectSupply