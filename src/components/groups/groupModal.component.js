import React, { useState } from 'react';
import { connect } from 'react-redux';

import { WhatCategories } from '../iconController/iconCategories.component';
import getRandomColour from '../utilities/randomMCColour.component';
import { LightenDarkenColor } from '../utilities/colourUtils';
import { deleteGroup, resettingDeleteGroup } from '../../Actions/groupActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faExternalLinkSquare } from '@fortawesome/pro-solid-svg-icons';
import { faEdit, faTrashAlt } from '@fortawesome/pro-duotone-svg-icons'
import imagePlaceholder from '../../assets/Images/temp.jpg';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';


const GroupModalDashboard = ({ dispatch, group, setSelectedGroup, deleting, deleted, hasErrors }) => {
  const [randomColour] = useState(getRandomColour())
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (deleted) {
    dispatch(resettingDeleteGroup())
    setSelectedGroup(null)
  }

  return (
    <div className="groupModalPage" onClick={(e) => {
      setSelectedGroup(null)
    }}>
      <div className="groupModal" onClick={(e) => e.stopPropagation()} style={{background: "linear-gradient(to bottom right, "+LightenDarkenColor(randomColour, 20) +'b3'+", "+LightenDarkenColor(randomColour, -20)+'b3'+")"}}>
        <FontAwesomeIcon icon={faTimesCircle} size="2x" className="modalCloseButton" onClick={() => setSelectedGroup(null)} />
        <div className="modalTop">
          <div className="modalTopTop">
            {/* <div> */}
              <img src={group.groupImage ? group.groupImage : imagePlaceholder} alt="Whatsapp group logo" />
              <h1> {group.groupName} </h1>
            {/* </div> */}
            <button className="standardButton redVersion" disabled={deleting} onClick={() =>{
              confirmDelete ? dispatch(deleteGroup(group._id)) : setConfirmDelete(true)
            }}> {confirmDelete ? (deleting ? <Spinner animation="border" size="sm" />  : "Are you sure?") : <FontAwesomeIcon icon={faTrashAlt} /> } </button>
          </div>
          <div className="modalTopBottom">
            <p className="modalHeader"> Description </p>
            <p> {group.groupDescription} </p>
            <p className="modalHeader"> Admin </p>
            <p> {group.groupAdmin} </p>
            <p className="modalHeader"> Admin Contact </p>
            <p> {group.groupAdminContact} </p>
          </div>
        </div>
        <div className="modalMiddle">
          <WhatCategories group={group} />
        </div>
        <div className="modalBottom">
          <p className="modalHeader"> Affiliated Organisation </p>
          <p> {group.affiliatedOrg ? "This group is affiliated with your organisation" : "This group is not affiliated with your organisation"} </p>
        </div>
        <a href={group.groupWhatsappLink} style={{color: randomColour}} target="_blank" rel="noopener noreferrer"> <span> Join Group </span> </a>
      </div>
    </div>
  )
}

const GroupModal = ({ group, setSelectedGroup }) => {
  const randomColour = getRandomColour()
  return (
    <div className="groupModalPage" onClick={(e) => {
      setSelectedGroup(null)
    }}>
      <div className="groupModal" onClick={(e) => e.stopPropagation()} style={{background: "linear-gradient(to bottom right, "+LightenDarkenColor(randomColour, 20) +'b3'+", "+LightenDarkenColor(randomColour, -20)+'b3'+")"}}>
        <FontAwesomeIcon icon={faTimesCircle} size="2x" className="modalCloseButton" onClick={() => setSelectedGroup(null)} />
        <div className="modalTop">
          <div className="modalTopTop">
            <img src={group.groupImage ? group.groupImage : imagePlaceholder} alt="Whatsapp group logo" />
            <h1> {group.groupName} </h1>
          </div>
          <div className="modalTopBottom">
            <p className="modalHeader"> Description </p>
            <p> {group.groupDescription} </p>
            <p className="modalHeader"> Admin </p>
            <p> {group.groupAdmin} </p>
            <p className="modalHeader"> Admin Contact </p>
            <p> {group.groupAdminContact} </p>
          </div>
        </div>
        <div className="modalMiddle">
          <WhatCategories group={group} />
        </div>
        {group.affiliatedOrg &&
          <div className="modalBottom">
            <p className="modalHeader"> Affiliated Organisation </p>
            <Link to={"/organisations/" + group.createdBy.supplier._id}>
              <div className="modalAffiliatedOrg" style={{}}>
                <img src={group.createdBy.supplier.supplierImageURL} alt="Organisation Logo" />
                <p> <FontAwesomeIcon icon={faExternalLinkSquare} /> {group.createdBy.supplier.supplierName} </p>
              </div>
            </Link>
          </div>
        }
        <a href={group.groupWhatsappLink} style={{color: randomColour}} target="_blank" rel="noopener noreferrer"> <span> Join Group </span> </a>
      </div>
    </div>
  )
}

const MapsStateToProps = (state, ownProps) => ({
  deleted: state.deleteInfo.deleteGroup.deleted,
  deleting: state.deleteInfo.deleteGroup.deleting,
  hasErrors: state.deleteInfo.deleteGroup.hasErrors,
  group: ownProps.group,
  setSelectedGroup: ownProps.setSelectedGroup
})

const ConnectedGroupModalDashboard = connect(MapsStateToProps)(GroupModalDashboard)

export {
  ConnectedGroupModalDashboard,
  GroupModal
}