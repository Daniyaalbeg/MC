import React from 'react';

import Money from '../../assets/svg/coin.svg';
import PPE from '../../assets/svg/mask.svg';
import Clothes from '../../assets/svg/shirt.svg';
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
import PovertyAlleviation from '../../assets/icons/PovertyAlleviation.svg'
import PrimaryEdu from '../../assets/icons/PrimaryEdu.svg'
import Recycling from '../../assets/icons/Recycling.svg'
import Religion from '../../assets/icons/Candle.svg'
import Sanitation from '../../assets/icons/Sanitation.svg'
import SecondaryEdu from '../../assets/icons/SecondaryEdu.svg'
import Sports from '../../assets/icons/Sports.svg'
import Terrorism from '../../assets/icons/Terrorism.svg'
import Covid from '../../assets/icons/Virus.svg'
import Waste from '../../assets/icons/Waste.svg'
import Water from '../../assets/icons/Water.svg'
import Youth from '../../assets/icons/Youth.svg'
import { faHouseReturn } from '@fortawesome/pro-solid-svg-icons';

export const listOfIcons = [
  "animalWelfare",
  "artsAndCulture",
  "clothing",
  "communityDevelopment",
  "disability",
  "disaster",
  "education",
  "primary",
  "secondary",
  "higher",
  "energy",
  "environment",
  "forest",
  "water",
  "equality",
  "food",
  "agriculture",
  "livestock",
  "fisheries",
  "gender",
  "health",
  "motherAndChildHealth",
  "humanRights",
  "infrastructure",
  "it",
  "justice",
  "livelihood",
  "money",
  "peace",
  "ppe",
  "povertyAlleviation",
  "recycling",
  "religion",
  "sanitation",
  "sports",
  "terrorism",
  "covid",
  "waste",
  "youth"
]

export const getSpecificIcon = () => {

}

export const WhatCategoriesHomeView = () => {
  return (
    <>
    {listOfIcons.map((icon) => {
      return (
        <div key={icon} className="iconContainer iconLarge">
          {getIcon(icon, "iconImage growIcon")}
          <p className="hoverOn"> {iconForText(icon)} </p>
        </div>
      )
    })}
    </>
  )
}

export const PrimaryCategory = ({ category }) => {
  return (
    <div className="iconContainer">
      {getIcon(category, "iconImage growIcon")}
      <p className="hoverOn"> {iconForText(category)} </p>
    </div>
  )
}

export const WhatCategories = ({ types }) => {
  return (
    <>
    {types.map((type) => {
      return (
        <div key={type} className="iconContainer">
          {getIcon(type, "iconImage growIcon")}
          <p className="hoverOn"> {iconForText(type)} </p>
        </div>
      )
    })}
    </>
  )
}

export const iconForText = (type) => {
  switch(type) {
    case "animalWelfare":
      return "Animal Welfare"
    case "artsAndCulture":
      return "Arts and Culture"
    case "clothing":
      return "Clothing"
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
    case "money":
      return "Money"
    case "peace":
      return "Peace"
    case "ppe":
      return "Protection Equipment"
    case "povertyAlleviation":
      return "Poverty Alleviation"
    case "recycling": 
      return "Recycling"
    case "religion": 
      return "Religion"
    case "sanitation":
      return "Sanitation"
    case "sports":
      return "Sports"
    case "terrorism":
      return "Terrorism"
    case "covid":
      return "Covid"
    case "waste":
      return "Waste"
    case "youth":
      return "Youth"
    default:
      return ""
  }
}

export const getIcon = (type, classNames) => {
  return <img className={classNames} src={getIconSource(type)} alt={`${iconForText(type)} Icon`} />
}

export const getIconSource = (type) => {
  switch(type) {
    case "animalWelfare":
      return AnimalWelfare
    case "artsAndCulture":
      return ArtandCulture
    case "clothing":
      return Clothes
    case "communityDevelopment":
      return Community
    case "disability":
      return Disability
    case "disaster":
      return Disaster
    case "education":
      return Education
    case "primary":
      return PrimaryEdu
    case "secondary":
      return SecondaryEdu
    case "higher":
      return HigherEdu
    case "energy":
      return Energy
    case "environment":
      return Enviroment
    case "forest":
      return Forest
    case "water":
      return Water
    case "equality":
      return Equality
    case "food":
      return Food
    case "agriculture":
      return Agriculture
    case "livestock":
      return Livestock
    case "fisheries":
      return Fisheries
    case "gender":
      return Gender
    case "health":
      return Health
    case "motherAndChildHealth":
      return Motherhood
    case "humanRights":
      return HumanRights
    case "infrastructure":
      return Infrastructure
    case "it":
      return IT
    case "justice":
      return Justice
    case "livelihood":
      return Livelihood
    case "money":
      return Money
    case "peace":
      return Peace
    case "ppe":
      return PPE
    case "povertyAlleviation":
      return PovertyAlleviation
    case "recycling": 
      return Recycling
    case "religion":
      return Religion
    case "sanitation":
      return Sanitation
    case "sports":
      return Sports
    case "terrorism":
      return Terrorism
    case "covid":
      return Covid
    case "waste":
      return Waste
    case "youth":
      return Youth
    // case "other":
    //   return <img src={Oth} alt="Other Icon" />
    default:
      return null
  }
}

export default WhatCategories