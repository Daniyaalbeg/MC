import React from 'react'

import { categoryOptionValues } from '../utilities/categoryOptionValues'

const CategoryOptions = () => {
  return categoryOptionValues.map((option) => {
    return <option key={option.value} value={option.value}> {option.name}  </option>
  })
}

export default CategoryOptions