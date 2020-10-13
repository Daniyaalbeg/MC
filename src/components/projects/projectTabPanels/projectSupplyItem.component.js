import React from 'react';

const ProjectSupplyItem = ({ supply, onClick }) => {
  return (
    <div className="mainProjectSupplyItem" onClick={onClick}>
      <div>
        <p className="mainProjectSupplyAmount"> {supply.amountReceived} / {supply.amountNeeded} </p>
        <p className="mainProjectSupplyName"> {supply.name} </p>
      </div>
      <p className="mainProjectSupplyDesc"> {supply.description} </p>
    </div>
  )
}

export default ProjectSupplyItem