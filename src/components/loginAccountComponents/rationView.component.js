import React, { useState } from 'react';
import '../../css/rationView.css';
import { Accordion } from 'react-bootstrap';

import RationItemCard from './rationItemCard.component'

const RationView = (props) => {
  const [selectedRationId, setSelectedRationId] = useState("");
  const rations = props.rations;

  const RenderRations = () => {
    if (Array.isArray(rations) && props.rations.length) {
      const listOfRations = rations.map((ration) =>
        <RationItemCard ration={ration} key={ration._id} open={ration._id === selectedRationId}/>
      )
      const list = 
        <Accordion onSelect={setSelectedRationId} className="rationListCard">
            {listOfRations}
        </Accordion>
      return list;
    } else {
      return (<h6 className="text-muted, errorText"> No ration drives to display </h6>)
    }
  }

  return (
    RenderRations()
  )
}


export default RationView