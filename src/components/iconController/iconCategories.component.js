import React from 'react';

import Food from '../../assets/svg/sack.svg'
import Agriculture from '../../assets/icons/Agriculture.svg'
import AnimalWelfare from '../../assets/icons/AnimalWelfare.svg'
import ArtandCulture from '../../assets/icons/ArtandCulture.svg'
import Community from '../../assets/icons/Community.svg'
import Disability from '../../assets/icons/Disability.svg'
import Disaster from '../../assets/icons/Disaster.svg'
import Education from '../../assets/icons/Education.svg'
import Energy from '../../assets/icons/Energy.svg'
import Enviroment from '../../assets/icons/Enviroment.svg'
import Equality from '../../assets/icons/Equality.svg'
import Fisheries from '../../assets/icons/Fisheries.svg'
import Forest from '../../assets/icons/Forest.svg'
import Gender from '../../assets/icons/Gender.svg'
import Health from '../../assets/icons/Health.svg'
import HigherEdu from '../../assets/icons/HigherEdu.svg'
import HumanRights from '../../assets/icons/HumanRights.svg'
import Infrastructure from '../../assets/icons/Infrastructure.svg'
import IT from '../../assets/icons/IT.svg'
import Justice from '../../assets/icons/Justice.svg'
import Livelihood from '../../assets/icons/Livelihood.svg'
import Livestock from '../../assets/icons/Livestock.svg'
import Motherhood from '../../assets/icons/Motherhood.svg'
import Peace from '../../assets/icons/Peace.svg'
import PrimaryEdu from '../../assets/icons/PrimaryEdu.svg'
import Recycling from '../../assets/icons/Recycling.svg'
import Sanitation from '../../assets/icons/Sanitation.svg'
import SecondaryEdu from '../../assets/icons/SecondaryEdu.svg'
import Sports from '../../assets/icons/Sports.svg'
import Terrorism from '../../assets/icons/Terrorism.svg'
import Waste from '../../assets/icons/Waste.svg'
import Water from '../../assets/icons/Water.svg'


export const WhatCategories = ({ group }) => {
  return (
    <>
    {group.groupType.map((type) => {
      return (
        <>
        <div key={type} className="groupIconContainer growIcon">
          {iconForType(type)}
        </div>
        </>
      )
    })}
    </>
  )
}

const iconForType = (type) => {
  switch(type) {
    case "animalWelfare":
      return <img src={AnimalWelfare} alt="Animal Welfare Icon" />
    case "artsAndCulture":
      return <img src={ArtandCulture} alt="Arts and Culture Icon" />
    case "communityDevelopment":
      return <img src={Community} alt="Community Development Icon" />
    case "disability":
      return <img src={Disability} alt="Disability Icon" />
    case "disaster":
      return <img src={Disaster} alt="Disaster Icon" />
    case "education":
      return <img src={Education} alt="Education Icon" />
    case "primary":
      return <img src={PrimaryEdu} alt="Primary Education Icon" />
    case "secondary":
      return <img src={SecondaryEdu} alt="Secondary Education Icon" />
    case "higher":
      return <img src={HigherEdu} alt="Higher Education Icon" />
    case "energy":
      return <img src={Energy} alt="Energy Icon" />
    case "environment":
      return <img src={Enviroment} alt="Environment Icon" />
    case "forest":
      return <img src={Forest} alt="Forest Icon" />
    case "water":
      return <img src={Water} alt="Water Icon" />
    case "equality":
      return <img src={Equality} alt="Equality Icon" />
    case "food":
      return <img src={Food} alt="Food Icon" />
    case "agriculture":
      return <img src={Agriculture} alt="Agriculture Icon" />
    case "livestock":
      return <img src={Livestock} alt="Food Icon" />
    case "fisheries":
      return <img src={Fisheries} alt="Fisheries Icon" />
    case "gender":
      return <img src={Gender} alt="Gender Icon" />
    case "health":
      return <img src={Health} alt="Health Icon" />
    case "motherAndChildHealth":
      return <img src={Motherhood} alt="Mother and Child Health Icon" />
    case "humanRights":
      return <img src={HumanRights} alt="Human Rights Icon" />
    case "infrastructure":
      return <img src={Infrastructure} alt="Infrastructure Icon" />
    case "it":
      return <img src={IT} alt="IT Icon" />
    case "justice":
      return <img src={Justice} alt="Justice Icon" />
    case "livelihood":
      return <img src={Livelihood} alt="Livelihood Icon" />
    case "peace":
      return <img src={Peace} alt="Peace Icon" />
    case "povertyAlleviation":
      return <img src={Livelihood} alt="Poverty Alleviation Icon" />
    case "recycling": 
      return <img src={Recycling} alt="Recycling Icon" />
    case "sanitation":
      return <img src={Sanitation} alt="Sanitation Icon" />
    case "sports":
      return <img src={Sports} alt="Sports Icon" />
    case "terrorism":
      return <img src={Terrorism} alt="Terrorism Icon" />
    case "waste":
      return <img src={Waste} alt="Waste Icon" />
    // case "other":
    //   return <img src={Oth} alt="Other Icon" />
    default:
      return null
  }
}

export default WhatCategories