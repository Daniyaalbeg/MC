import React from 'react';

import { filterCategoryType } from '../../Actions/filterSearchMapAction';
import { selectedProjectMarker } from '../../Actions/mapSelectActions';
import { categoryOptionValues } from './categoryOptionValues';
import { getIcon } from '../iconController/iconCategories.component'

export const FilterProjectCategory = ({ dispatch, filterCategory, showModal }) => {
  return (
    <div className="projectMapFilterContainer">
      {
        categoryOptionValues.map((option) => {
          return (
            <div key={option.value} className={"projectMapFilter" + (filterCategory === option.value ? " active": "")} onClick={() => {
              if (filterCategory === option.value) {
                dispatch(filterCategoryType("all"))  
              } else {
                dispatch(filterCategoryType(option.value))
                dispatch(selectedProjectMarker(null))
                showModal()
              }
            }}>
              {getIcon(option.value, "")}
              <p> {option.name} </p>
            </div>
          )
        })
      }
    </div>
  )
}

export const FilterAreaOfWork = (props) => {
  return (
    <select onChange={props.onChange}>
      <option key="all" value="all"> All </option>
      {
        categoryOptionValues.map((option) => {
          return <option key={option.value} value={option.value}> {option.name} </option>
        })
      }
    </select>
  )
}

export const FilterOrgType = (props) => {
  return (
    <select onChange={props.onChange} value={props.value}>
      <option value="all"> All </option>
      <option value="Armed Forces">Armed Forces</option>
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
    <select onChange={props.onChange} value={props.value}>
      <option value="all"> All </option>
      <option value ="food">Food</option>
      <option value="ppe">PPE</option>
      <option value="money">Money</option>
      <option value="clothes">Clothes</option>
      <option value="other">Other</option>
    </select>
  )
}