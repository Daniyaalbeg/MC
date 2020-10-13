import React from 'react';

import { categoryOptionValues } from '../utilities/categoryOptionValues'

export const CategoryBadgeOptionsForm = ({ setFieldValue, secondaryCategories }) => {
  const selectedCategories = [...secondaryCategories]

  return (
    <div className="categoryBadgeContainer">
      {
        categoryOptionValues.map((option) => {
          return <CategoryBadgeOption key={option.value} isSelected={isBadgeSelected(option.value, secondaryCategories)} name={option.name} onClick={() => {
            addOrRemoveCategory(selectedCategories, option.value)
            setFieldValue('secondaryCategories', selectedCategories)
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