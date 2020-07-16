import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import HeaderIcons from './HeaderIcons.component';
import '../../css/groupInfoView.css';
import GroupCard from '../groups/groupCard.component';
import { ConnectedGroupModalDashboard } from '../groups/groupModal.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/pro-duotone-svg-icons';
import { faUsers } from '@fortawesome/pro-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const GroupInfoView = ({ groups }) => {
  return (
    <div className="groupContainer">
      <div className="groupHeader">
        <div className="groupTextIcon">
          <FontAwesomeIcon icon={faUsers} />
          <p> Groups - Whatsapp</p>
        </div>
        <HeaderIcons />
      </div>
      <div className="groupContent">
        <IsGroupEmpty groups={groups} />
      </div>
    </div>
  )
}

const Groups = ({ groups }) => {
  const [selectedGroup, setSelectedGroup] = useState(null)

  return (
    <>
    <div style={{textAlign: "right"}}>
      <Link to="createGroup"><button className="createGroupButton standardButton"> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}} /> Create Group </button></Link>
    </div>
    <div className="groupCardContainer">
      {
        groups.map((group) => {
          return (
            <div key={group._id} className="groupCard growSmall" style={{backgroundColor: "#1589C9"}} onClick={() => setSelectedGroup(group)}>
              <GroupCard group={group} />
            </div>
          )
        })
      }
    </div>
    {selectedGroup &&
      <ConnectedGroupModalDashboard group={selectedGroup} setSelectedGroup={setSelectedGroup} />
    }
    </>
  )
}

const IsGroupEmpty = ({ groups }) => {
  if (groups && groups.length === 0) {
    return (
      <div className="emptyDBContainer">
        <p> <FontAwesomeIcon icon={faExclamationTriangle} className="cnicExclamationIcon" /> You have not created any groups yet. </p>
        <Link to="createGroup"><button className="createGroupButton standardButton"> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}} /> Create Group </button></Link>
      </div>
    )
  } else {
    return <Groups groups={groups} />
  }
}


export default GroupInfoView