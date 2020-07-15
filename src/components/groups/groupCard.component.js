import React from 'react'
import imagePlaceholder from '../../assets/Images/temp.jpg';

const GroupCard = ({ group }) => {
  return (
    <div>
      {group.groupImage ? <img src={group.groupImage} alt="" /> : <img src={imagePlaceholder} alt="" /> }
      <p> {group.groupName} </p>
    </div>
  )
}

export default GroupCard