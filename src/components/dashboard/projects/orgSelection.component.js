import React, { useState } from 'react'

import OrganisationCard from '../organisations/organisationCard.component';

const OrgSelection = ({ orgsIdList, orgsDict, children, orgBGColour, orgTextColour }) => {
  const [selectedOrgID, setSelectedOrgID] = useState(null)

  if (selectedOrgID) {
    return React.cloneElement(children, { selectedOrgID: selectedOrgID, setSelectedOrgID: setSelectedOrgID, orgsDict: orgsDict })
  } else {
    return (
      <>
        <h2 className="eventHeadingSelect"> Select an Organisation to add Projects to </h2>
        <OrgCards orgsIdList={orgsIdList} orgsDict={orgsDict} setSelectedOrgID={setSelectedOrgID} orgBGColour={orgBGColour} orgTextColour={orgTextColour} />
      </>
    )
  }
}

const OrgCards = ({ orgsIdList, orgsDict, setSelectedOrgID, orgBGColour, orgTextColour }) => {
  return (
    <div className="cardsDashContainer">
      {
        orgsIdList.map((orgID) => {
          return <OrganisationCard org={orgsDict[orgID]} setSelectedOrg={() => setSelectedOrgID(orgID)} key={orgID} orgBGColour={orgBGColour} orgTextColour={orgTextColour} />
        })
      }
    </div>
  )
}

export default OrgSelection