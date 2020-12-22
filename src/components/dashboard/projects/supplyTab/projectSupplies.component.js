import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';

import SelectedProjectSupply from './selectedProjectSupply.component';
import GenericModal from '../../../sharedComponents/genericModal.component';
import AddSupplyForm from './addSupplyForm.component';
import { selectProjectDashSupply } from '../../../../Actions/projectActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const ProjectSupplies = ({ project, selectedSupplyID, suppliesDict }) => {
  if (selectedSupplyID) {
    return (
      <SelectedProjectSupply project={project} supply={suppliesDict[selectedSupplyID]} />
    )
  } else {
    return (
      <ProjectSupplyContent project={project} suppliesDict={suppliesDict} />
    )
  }
}

const ProjectSupplyContent = ({ project, suppliesDict }) => {
  const [addSupplyModal, setAddSupplyModal] = useState(false)
  const dispatch = useDispatch()

  const projectSupplies = project.supplies.map((supplyID) => suppliesDict[supplyID])

  if (!project.supplies || project.supplies.length === 0) {
    return (
      <>
      <div className="emptyDBContainer">
        <p> <FontAwesomeIcon icon={faExclamationTriangle} className="cnicExclamationIcon" style={{color: 'red'}} /> You have not created any supplies yet. </p>
        <button onClick={() => setAddSupplyModal(true)} className="standardButtonWithoutColour mcGreenBG"> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}} /> Add Supply </button>
      </div>
      {addSupplyModal &&
        <GenericModal showModal={setAddSupplyModal}>
          <AddSupplyForm project={project} showModal={setAddSupplyModal} />
        </GenericModal>
      }
      </>
    )
  } else {
    return (
      <>
      <div className="headerButtonsContainerSingleRight">
        <span className="standardButtonWithoutColour mcGreenBG" onClick={() => setAddSupplyModal(true)}> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}}/>  Add Supply </span>
      </div>
      <div className="projectDashSupplyContainerGrid">
        {
          projectSupplies.supplies.map((supply) => {
            return <ProjectSupplyListItem key={supply._id} onClick={() => dispatch(selectProjectDashSupply(supply))} supply={supply} />
          })
        }
      </div>
      {addSupplyModal &&
        <GenericModal showModal={setAddSupplyModal}>
          <AddSupplyForm project={project} showModal={setAddSupplyModal} />
        </GenericModal>
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

const MapStateToProps = (state) => ({
  selectedSupplyID: state.projectInfo.createProject.selectedProjectDashBoardSupply
})

export default connect(MapStateToProps)(ProjectSupplies)