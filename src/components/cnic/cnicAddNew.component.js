import React, {useState} from 'react';
import { connect } from 'react-redux';
import AddingCnicInfo from './addingCnicInfo.component';
import SelectEventToAddCnic from './selectEventToAddCnic.component';
import OrganisationCnicCard from './organisationCnicCard.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/pro-duotone-svg-icons';


const CnicAddNew = ({ dispatch, orgs, selectedCnicEvent }) => {
  if (!orgs) {
    return <p> <FontAwesomeIcon icon={faExclamationTriangle} className="cnicExclamationIcon" /> Please create an organisation in your dashboard to add CNIC information </p>
 }
  
  if (selectedCnicEvent) {
    return <AddingCnicInfo  />
  } else {
    //Add org stuff here
    return <SelectOrgCnic dispatch={dispatch} orgs={orgs} />
  }
}

const SelectOrgCnic = ({ orgs, dispatch }) => {
  const [selectedOrg, setSelectedOrg] = useState(null)

  if (selectedOrg) {
    return <SelectEventToAddCnic dispatch={dispatch} org={selectedOrg} setSelectedOrg={setSelectedOrg} />
  } else {
    return (
      <>
      <h4 style={{marginBottom: '32px'}}> Select the organisations which has the distributions for the CNIC's you want to add </h4>
      <div className="cardsDashContainer">
        {
          orgs.map((org) => {
            return <OrganisationCnicCard org={org} key={org._id} setSelectedOrg={setSelectedOrg} />
          })
        }
      </div>
      </>
    )
  }
}

const MapStateToProps = (state) => ({
  orgs: state.userInfo.user.createdOrganisations,
  selectedCnicEvent: state.cnicInfo.selectedCnicEvent,
})

export default connect(MapStateToProps)(CnicAddNew)