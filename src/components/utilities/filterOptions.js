import React from 'react';

export const FilterAreaOfWork = (props) => {
  return (
    <select onChange={props.onChange}>
            <option value="all"> All </option>
            <option value ="animalWelfare"> Animal Welfare </option>
            <option value ="artsAndCulture"> Arts and Culture </option>
            <option value ="communityDevelopment"> Community Development </option>
            <option value ="disability"> Disability </option>
            <option value ="disaster"> Disaster </option>
            <option value ="education"> Education </option>
            <option value ="primary"> - Primary </option>
            <option value ="secondary"> - Secondary </option>
            <option value ="higher"> - Higher </option>
            <option value ="energy"> Energy </option>
            <option value ="environment"> Environment </option>
            <option value ="forest"> - Forest </option>
            <option value ="water"> - Water </option>
            <option value ="equality"> Equality </option>
            <option value ="food"> Food </option>
            <option value ="agriculture"> - Agriculture </option>
            <option value ="fisheries"> - Fisheries </option>
            <option value ="gender"> gender </option>
            <option value ="womenEmpowerment"> - Women Empowerment </option>
            <option value ="health"> Health </option>
            <option value ="motherAndChildHealth"> - Mother and Child Health </option>
            <option value ="elderlyHealth"> - Elderly Health </option>
            <option value ="humanRights"> Human Rights </option>
            <option value ="infrastructure"> Infrastructure </option>
            <option value ="it"> IT </option>
            <option value ="justice"> Justice </option>
            <option value ="livelihood"> Livelihood </option>
            <option value ="peace"> Peace </option>
            <option value ="povertyAlleviation"> Poverty Alleviation </option>
            <option value ="recycling"> Recycling </option>
            <option value ="sanitation"> Sanitation </option>
            <option value ="sports"> Sports </option>
            <option value ="terrorism"> Terrorism </option>
            <option value ="waste"> Waste </option>
            <option value ="other"> Other </option>
          </select>
  )
}

export const FilterOrgType = (props) => {
  return (
    <select onChange={props.onChange}>
            <option value="all"> All </option>
            <option value ="Armed Forces">Armed Forces</option>
            <option value="Community">Community</option>
            <option value="Corporate">Corporate</option>
            <option value="Civil Society">Civil Society</option>
            <option value="Government">Government</option>
            <option value="Individual">Individual</option>
            <option value="NGO">NGO</option>
          </select>
  )
}

export const FilterRationType = (props) => {
  return (
    <select onChange={props.onChange}>
      <option value="all"> All </option>
      <option value ="food">Food</option>
      <option value="ppe">PPE</option>
      <option value="money">Money</option>
      <option value="clothes">Clothes</option>
    </select>
  )
}