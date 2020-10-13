import React from 'react';
import { Helmet } from 'react-helmet';

import MainProjectViewContent from './mainProjectViewContent.component';
import ProjectFilterSearchBar from './filterSearchBar/projectFilterSearchBar.component';

const MainProjectView = (props) => {
  return (
    <>
    <Helmet>
      <html lang="en" />
      <meta name="description" content="A list of projects happening all over Pakistan" />
    </Helmet>
    <div className="mainProjectsViewContainer">
      <div className="headingContainer">
        <h1 className="heading"> Projects </h1>
      </div>
      <ProjectFilterSearchBar />
      <MainProjectViewContent props={props} />
    </div>
    </>
  )
}

export default MainProjectView