import React from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-solid-svg-icons'

import { changeSearchProject } from '../../../Actions/filterMainProjectActions'

const ProjectSearchBar = ({ dispatch, searchTerm }) => {

  const onSearchChange = (event) => {
    dispatch(changeSearchProject(event.target.value))
  }

  return (
    <div className="searchBarProjectContainer">
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        onChange={onSearchChange}
      />
    </div>
  )
}

const MapStateToProps = (state) => ({
  searchTerm: state.projectInfo.mainProject.searchTerm
})

export default connect(MapStateToProps)(ProjectSearchBar)

