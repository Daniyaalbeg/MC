import React, { useEffect, Component } from 'react';
import Button from 'react-bootstrap/Button';

import RationItemInfoMap from './rationitemInfoMap.component.js';

const RationItemInfo = (props) => {
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 
  const ration = props.ration;
  return (
    <div>
      <p> {ration.description} </p>
      <hr />
      <h6 className="text-muted"> Number of rations distributed </h6>
      <p> {ration.totalNumberOfItems} </p>
      <hr />
      <h6 className="text-muted"> Descripiton of items </h6>
      <p> {ration.itemsDescription} </p>
      <hr />
      <RationItemInfoMap ration={ration} />
    </div>
  )
}

export default RationItemInfo;