import React from 'react';

import { categoryOptionValues } from '../utilities/categoryOptionValues'

export const SelectBadgeOptionsForm = ({ setFieldValue, options, baseOptions, fieldName }) => {
  const selectedOptions = [...options]

  return (
    <div className="categoryBadgeContainer">
      {
        baseOptions.map((option) => {
          return <CategoryBadgeOption key={option} isSelected={isBadgeSelected(option, options)} name={option} onClick={() => {
            addOrRemoveCategory(selectedOptions, option)
            setFieldValue(fieldName, selectedOptions)
          }} />
        })
      }
    </div>
  )
}

export const CategoryBadgeOptionsForm = ({ setFieldValue, options, fieldName }) => {
  const selectedOptions = [...options]

  return (
    <div className="categoryBadgeContainer">
      {
        categoryOptionValues.map((option) => {
          return <CategoryBadgeOption key={option.value} isSelected={isBadgeSelected(option.value, options)} name={option.name} onClick={() => {
            addOrRemoveCategory(selectedOptions, option.value)
            setFieldValue(fieldName, selectedOptions)
          }} />
        })
      }
    </div>
  )
}

export const CategoryBadgeOptionsModal = ({ categories, onChangeFilter }) => {
  const selectedCategories = [...categories]

  return (
    <div className="categoryBadgeContainer">
      {
        categoryOptionValues.map((option) => {
          return <CategoryBadgeOption key={option.value} isSelected={isBadgeSelected(option.value, categories)} name={option.name} onClick={() => {
            addOrRemoveCategory(selectedCategories, option.value)
            onChangeFilter(selectedCategories)
          }} />
        })
      }
    </div>
  )
}

const isBadgeSelected = (value, secondaryCategories) => {
  for (let i = 0; i < secondaryCategories.length; i++) {
    if (value === secondaryCategories[i]) {
      return true
    }
  }
  return false
}

const addOrRemoveCategory = (selectedCategories, value) => {
  let removed = false
  for (let i = 0; i < selectedCategories.length; i++) {
    if (selectedCategories[i] === value) {
      selectedCategories.splice(i, 1)
      removed = true
    }
  }
  if (!removed) {
    selectedCategories.push(value)
  }
}

const CategoryBadgeOption = ({ name, onClick, isSelected }) => {
  return <span onClick={onClick} className={isSelected ? "active" : null}> {name} </span>
}