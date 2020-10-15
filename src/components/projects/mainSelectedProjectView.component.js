import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import LoadingSpinner from '../utilities/loadingSpinner.component';
import SelectedProjectImageView from './selectedProjectImageView.component';
import SelectedProjectCallToAction from './callToAction/selectedProjectCallToAction.component';
import SelectedProjectInfoTabs from './selectedProjectInfoTabs.component';
import SelectedProjectCategories from './selectedProjectCategories.component'

import { getProject } from '../../Actions/projectActions';

const MainSelectedProjectView = ({ dispatch, selectedProject, props, loading, hasErrors, fetched }) => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    dispatch(getProject(id))
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  if (hasErrors) return <p> Error Occurred </p>

  if (fetched && selectedProject !== null) {
    return (
      <div className="mainSelectedProjectViewContainer">
        <div className="mainSelectedProjectView">
          <div className="mainSelectedProjectsViewTitle">
            <h1> {selectedProject.name} </h1>
            <p> {selectedProject.tagline} </p>
          </div>
          <div className="mainSelectedProjectsViewImages mainSelectedProjectCards">
            <SelectedProjectImageView project={selectedProject} />
          </div>
          <div className="mainSelectedProjectsViewCallToAction mainSelectedProjectCards">
            <SelectedProjectCallToAction project={selectedProject} setActiveTab={setActiveTab} />
          </div>
          <div className="mainSelectedProjectsViewCategories mainSelectedProjectCards">
            <SelectedProjectCategories project={selectedProject} />
          </div>
          <div className="mainSelectedProjectsViewInfo mainSelectedProjectCards">
            <SelectedProjectInfoTabs project={selectedProject} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
      </div>
    )
  }

  return <LoadingSpinner />
}


const MapStateToProps = (state, ownProps) => ({
  loading: state.projectInfo.mainProject.loading,
  hasErrors: state.projectInfo.mainProject.hasErrors,
  fetched: state.projectInfo.mainProject.fetched,
  selectedProject: state.projectInfo.mainProject.selectedProject,
  props: ownProps
})

export default connect(MapStateToProps)(MainSelectedProjectView)