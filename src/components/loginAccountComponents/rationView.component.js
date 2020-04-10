import React, { useState } from 'react';
import '../../css/rationView.css';
import Card from 'react-bootstrap/Card';
import { ListGroup } from 'react-bootstrap';

import RationItemInfo from './rationItemInfo.component';
import RationItemCard from './rationItemCard.component'

const RationView = (props) => {
  const [showingTabs, setShowingTabs] = useState(true);
  const [selectedRationId, setSelectedRationId] = useState(0);
  const rations = props.rations;

  const onRationView = (id) => {
    setSelectedRationId(id);
    setShowingTabs(false);
    console.log(selectedRationId)
  }

  const backButton = () => {
    setShowingTabs(true);
  }

  const RenderRations = () => {
    if (Array.isArray(rations) && props.rations.length) {
      if (showingTabs) {
        const listOfRations = rations.map((ration) =>
          <RationItemCard ration={ration} key={ration._id} onClick={() => {
            setSelectedRationId(ration._id);
            setShowingTabs(false);
          }}/>
        )
        const list = (
          <Card className="rationListCard">
            <ListGroup variant="flush">
              {listOfRations}
            </ListGroup>
          </Card>
        )
        return list;
      } else {
        const rationProp = rations.filter((ration) => ration._id === selectedRationId)
        return (<RationItemInfo ration={rationProp} onClick={() => {
          backButton()
          // console.log(selectedRationId);
        }}/>)
      }
    } else {
      return (<h6 className="text-muted, errorText"> No ration drives to display </h6>)
    }
  }

  return (
    RenderRations()
  )
}


export default RationView