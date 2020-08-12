import React, { useState } from 'react'

import OrganisationCard from '../organisations/organisationCard.component';

const OrgSelection = ({ orgs, children, orgBGColour, orgTextColour }) => {
  const [selectedOrg, setSelectedOrg] = useState(null)

  if (selectedOrg) {
    return React.cloneElement(children, { org: selectedOrg, setSelectedOrg: setSelectedOrg })
  } else {
    return (
      <>
        <h2 className="eventHeadingSelect"> Select an Organisation to add Projects to </h2>
        <OrgCards orgs={orgs} setSelectedOrg={setSelectedOrg} orgBGColour={orgBGColour} orgTextColour={orgTextColour} />
      </>
    )
  }
}

const OrgCards = ({ orgs, setSelectedOrg, orgBGColour, orgTextColour }) => {
  return (
    <div className="cardsDashContainer">
      {
        orgs.map((org) => {
          return <OrganisationCard org={org} setSelectedOrg={setSelectedOrg} key={org._id} orgBGColour={orgBGColour} orgTextColour={orgTextColour} />
        })
      }
    </div>
  )
}

export default OrgSelection