import React from 'react';
import { connect } from 'react-redux';

import { CategoryBadgeOptionsModal } from '../../sharedComponents/categoryBadgeOptions.component';

import { changeFilterProject } from '../../../Actions/filterMainProjectActions'

const FilterModalProjectView = ({ dispatch, filteredCategories }) => {
  return (
    <div>
      <p> Select Filter Categories </p>
      <CategoryBadgeOptionsModal categories={filteredCategories} onChangeFilter={(categories) => {
        dispatch(changeFilterProject(categories))
      }} />
    </div>
  )
}

const MapStateToProps = (state) => ({
  filteredCategories: state.projectInfo.mainProject.filterTerms
})

export default connect(MapStateToProps)(FilterModalProjectView)

