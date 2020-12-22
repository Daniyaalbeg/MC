import React from 'react'

import imagePlaceholder from '../../../../assets/Images/temp.jpg';

const OrgLogo = ({ org }) => {
  return (
    <div className=" orgCard orgCardB">
      <p className="orgTitle"> Logo </p>
      <img src={org.imageURL ? org.imageURL : imagePlaceholder} alt=""/>
    </div>
  )
}

export default OrgLogo
