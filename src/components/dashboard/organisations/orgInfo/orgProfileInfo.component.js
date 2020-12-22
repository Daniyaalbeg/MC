import React from 'react'

import CheckOldOrNewAddress from '../../../sharedComponents/address.component';
import { WhatCategories } from '../../../iconController/iconCategories.component'


const OrgProfileInfo = ({ org }) => {
  return (
    <div className=" orgCard orgCardA">
      <p className="orgTitle"> Name </p>
      <p className="orgText"> {org.name} </p>
      <p className="orgTitle"> Description </p>
      <p className="orgText"> {org.description} </p>
      <p className="orgTitle"> Address </p>
      <CheckOldOrNewAddress address={org.address} />

      <p className="orgTitle"> Point of Contact </p>
      <p className="orgText"> {org.contactName} </p>

      <p className="orgTitle"> Contact Number </p>
      <p className="orgText"> {org.contactNumber} </p>

      {org.contactInfo &&
        <>
        <p className="orgTitle"> Other Info </p>
        <p className="orgText"> {org.contactInfo} </p>
        </>
      }

      <p className="orgTitle"> Type of Work </p>
      <div className="orgInfoIcons">
        <WhatCategories types={org.areaOfWork} />
      </div>

    </div>
  )
}

export default OrgProfileInfo
