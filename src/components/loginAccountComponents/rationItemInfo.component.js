import React, { useEffect, Component } from 'react';
import Button from 'react-bootstrap/Button';

import RationItemInfoMap from './rationitemInfoMap.component.js';

const RationItemInfo = (props) => {
  const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" }; 
  const ration = props.ration;
  return (
    <div>
      <h6 className="text-muted"> Name </h6>
      <p> {ration.name} </p>
      <hr />
      <h6 className="text-muted"> Description </h6>
      <p> {ration.description} </p>
      <hr />
      <h6 className="text-muted"> Number of rations distributed </h6>
      <p> {ration.totalNumberOfItems} </p>
      <hr />
      <h6 className="text-muted"> Descripiton of items </h6>
      <p> {ration.itemsDescription} </p>
      <hr />
      <h6 className="text-muted"> Map: </h6>
      <RationItemInfoMap ration={ration} />
      <hr />
      <h6 className="text-muted"> Happened on </h6>
      <p> {new Date(ration.date).toLocaleDateString("en-US", dateOptions)} </p>
      <Button variant="primary" onClick={props.onClick}> Back </Button>
    </div>
  )
}

export default RationItemInfo;