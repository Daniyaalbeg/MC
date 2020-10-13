import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import ProjectCard from './projectCard/mainProjectCard.component';
import LoadingSpinner from '../utilities/loadingSpinner.component';

import { getProjects } from '../../Actions/projectActions'
import { filterAndSearchProject } from '../utilities/filterAndSearch'

const MainProjectViewContent = ({ props, dispatch, projects, loading, hasErrors, fetched }) => {
  useEffect(() => {
    dispatch(getProjects())
  }, [])

  if (fetched && !loading && projects.length === 0) {
    return <p style={{
      width: "100%",
      height: "400px",
      margin: "auto",
      textAlign: "center"
    }}> No Projects Yet </p>
  }

  if (fetched && !loading) {
    return (
      <div className="mainProjectCardsViewContainer">
        {
          projects.map((project, index) => {
            return <ProjectCard key={index} project={project} onClick={() => {
              props.history.push(`/projects/${project._id}`)
            }} />
          })
        }
      </div>
    )
  }

  return <LoadingSpinner  />
}

const MapStateToProps = (state, ownProps) => ({
  loading: state.projectInfo.mainProject.loading,
  hasErrors: state.projectInfo.mainProject.hasErrors,
  fetched: state.projectInfo.mainProject.fetched,
  projects: filterAndSearchProject(state.projectInfo.mainProject.projects, state.projectInfo.mainProject.filterTerms, state.projectInfo.mainProject.searchTerm),
  props: ownProps.props
})

export default connect(MapStateToProps)(MainProjectViewContent)