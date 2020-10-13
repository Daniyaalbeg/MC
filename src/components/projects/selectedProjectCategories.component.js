import React from 'react'

import { WhatCategories, PrimaryCategory } from '../iconController/iconCategories.component';

const SelectedProjectCategories = ({ project }) => {
  if (!project.primaryCategory || !project.secondaryCategories) return null
  return (
    <>
      <div className="primaryCategory">
        <PrimaryCategory category={project.primaryCategory} />
      </div>
      <WhatCategories types={project.secondaryCategories} />
    </>
  )
}

export default SelectedProjectCategories