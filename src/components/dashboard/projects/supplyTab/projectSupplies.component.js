import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SelectedProjectSupply from './selectedProjectSupply.component';
import AddSupplyModal from './addSupplyModal.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const ProjectSupplies = ({ project }) => {
  const [selectedSupply, setSelectedSupply] = useState(null)
  const [addSupplyModal, setAddSupplyModal] = useState(false)

  if (selectedSupply) {
    return (
      <SelectedProjectSupply supply={selectedSupply} setSelectedSupply={setSelectedSupply} />
    )
  } else {
    return (
      <>
      <div className="headerButtonsContainerSingleRight">
        <span className="standardButtonWithoutColour mcGreenBG" onClick={() => setAddSupplyModal(true)}> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}}/>  Add Supply </span>
      </div>
      <div className="projectDashSupplyContainerGrid">
        {
          project.supplies.map((supply) => {
            return <ProjectSupplyListItem key={supply._id} onClick={() => setSelectedSupply(supply)} supply={supply} />
          })
        }
      </div>
      {addSupplyModal &&
        <AddSupplyModal project={project} setAddSupplyModal={setAddSupplyModal} />
      }
      </>
    )
  }
}

const ProjectSupplyListItem = ({ onClick, supply }) => {
  return (
    <div className="projectDashCard projectSupplyListItem" onClick={onClick}>
      <p className="projectText"> {supply.name} </p>
      <div>
        <p className="projectText" style={{textAlign: "end"}}> {supply.amountReceived}/{supply.amountNeeded} </p>
        <p className="projectText" style={{ color: supply.supplyReceived ? "green": "red"}}> {supply.supplyReceived ? "Aquired" : "Aquiring"} </p>
      </div>
    </div>
  )
}

export default ProjectSupplies