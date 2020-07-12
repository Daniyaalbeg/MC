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
import { faHouseReturn } from '@fortawesome/pro-solid-svg-icons';


export const WhatCategories = ({ group }) => {
  return (
    <>
    {group.groupType.map((type) => {
      return (
        <>
        <div key={type} className="groupIconContainer">
          {iconForType(type)}
          <p className="hoverOn"> {iconForText(type)} </p>
        </div>
        </>
      )
    })}
    </>
  )
}

const iconForText = (type) => {
  switch(type) {
    case "animalWelfare":
      return "Animal Welfare"
    case "artsAndCulture":
      return "Arts and Culture"
    case "communityDevelopment":
      return "Community Development"
    case "disability":
      return "Disability"
    case "disaster":
      return "Disaster"
    case "education":
      return "Education"
    case "primary":
      return "Primary Education"
    case "secondary":
      return "Secondary Education"
    case "higher":
      return "Higher Education"
    case "energy":
      return "Energy"
    case "environment":
      return "Environment"
    case "forest":
      return "Forest"
    case "water":
      return "Water"
    case "equality":
      return "Equality"
    case "food":
      return "Food"
    case "agriculture":
      return "Agriculture"
    case "livestock":
      return "Livestock"
    case "fisheries":
      return "Fisheries"
    case "gender":
      return "Gender"
    case "health":
      return "Health"
    case "motherAndChildHealth":
      return "Mother and Child Health"
    case "humanRights":
      return "Human Rights"
    case "infrastructure":
      return "Infrastructure"
    case "it":
      return "IT"
    case "justice":
      return "Justice"
    case "livelihood":
      return "Livelihood"
    case "peace":
      return "Peace"
    case "povertyAlleviation":
      return "Poverty Alleviation"
    case "recycling": 
      return "Recycling"
    case "sanitation":
      return "Sanitation"
    case "sports":
      return "Sports"
    case "terrorism":
      return "Terrorism"
    case "waste":
      return "Waste"
    default:
      return ""
  }
}

const iconForType = (type) => {
  switch(type) {
    case "animalWelfare":
      return <img className="growIcon" src={AnimalWelfare} alt="Animal Welfare Icon" />
    case "artsAndCulture":
      return <img className="growIcon" src={ArtandCulture} alt="Arts and Culture Icon" />
    case "communityDevelopment":
      return <img className="growIcon" src={Community} alt="Community Development Icon" />
    case "disability":
      return <img className="growIcon" src={Disability} alt="Disability Icon" />
    case "disaster":
      return <img className="growIcon" src={Disaster} alt="Disaster Icon" />
    case "education":
      return <img className="growIcon" src={Education} alt="Education Icon" />
    case "primary":
      return <img className="growIcon" src={PrimaryEdu} alt="Primary Education Icon" />
    case "secondary":
      return <img className="growIcon" src={SecondaryEdu} alt="Secondary Education Icon" />
    case "higher":
      return <img className="growIcon" src={HigherEdu} alt="Higher Education Icon" />
    case "energy":
      return <img className="growIcon" src={Energy} alt="Energy Icon" />
    case "environment":
      return <img className="growIcon" src={Enviroment} alt="Environment Icon" />
    case "forest":
      return <img className="growIcon" src={Forest} alt="Forest Icon" />
    case "water":
      return <img className="growIcon" src={Water} alt="Water Icon" />
    case "equality":
      return <img className="growIcon" src={Equality} alt="Equality Icon" />
    case "food":
      return <img className="growIcon" src={Food} alt="Food Icon" />
    case "agriculture":
      return <img className="growIcon" src={Agriculture} alt="Agriculture Icon" />
    case "livestock":
      return <img className="growIcon" src={Livestock} alt="Food Icon" />
    case "fisheries":
      return <img className="growIcon" src={Fisheries} alt="Fisheries Icon" />
    case "gender":
      return <img className="growIcon" src={Gender} alt="Gender Icon" />
    case "health":
      return <img className="growIcon" src={Health} alt="Health Icon" />
    case "motherAndChildHealth":
      return <img className="growIcon" src={Motherhood} alt="Mother and Child Health Icon" />
    case "humanRights":
      return <img className="growIcon" src={HumanRights} alt="Human Rights Icon" />
    case "infrastructure":
      return <img className="growIcon" src={Infrastructure} alt="Infrastructure Icon" />
    case "it":
      return <img className="growIcon" src={IT} alt="IT Icon" />
    case "justice":
      return <img className="growIcon" src={Justice} alt="Justice Icon" />
    case "livelihood":
      return <img className="growIcon" src={Livelihood} alt="Livelihood Icon" />
    case "peace":
      return <img className="growIcon" src={Peace} alt="Peace Icon" />
    case "povertyAlleviation":
      return <img className="growIcon" src={Livelihood} alt="Poverty Alleviation Icon" />
    case "recycling": 
      return <img className="growIcon" src={Recycling} alt="Recycling Icon" />
    case "sanitation":
      return <img className="growIcon" src={Sanitation} alt="Sanitation Icon" />
    case "sports":
      return <img className="growIcon" src={Sports} alt="Sports Icon" />
    case "terrorism":
      return <img className="growIcon" src={Terrorism} alt="Terrorism Icon" />
    case "waste":
      return <img className="growIcon" src={Waste} alt="Waste Icon" />
    // case "other":
    //   return <img src={Oth} alt="Other Icon" />
    default:
      return null
  }
}

export default WhatCategories