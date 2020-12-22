import React from 'react';
import { useDispatch } from 'react-redux';

import StandardCard from '../../sharedComponents/standardCard.component';

const OrganisationCard = ({ org, setSelectedOrg, orgBGColour, orgTextColour }) => {
  return (
    <div className={"orgCardDash grow " + orgBGColour} onClick={setSelectedOrg}>
      <StandardCard name={org.name} image={org.imageURL} orgTextColour={orgTextColour} />
    </div>
  )
}

export default OrganisationCard