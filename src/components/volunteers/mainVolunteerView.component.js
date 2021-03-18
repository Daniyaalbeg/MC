import React from "react";
import { Helmet } from "react-helmet";

import MainVolunteerViewContent from "./MainVolunteerViewContent.component";
// import ProjectFilterSearchBar from './filterSearchBar/projectFilterSearchBar.component';

const MainVolunteerView = (props) => {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta
          name="description"
          content="A list of volunteers from all over Pakistan"
        />
      </Helmet>
      <div className="h-full">
        <div className="headingContainer">
          <h1 className="heading"> Volunteers </h1>
        </div>
        {/* <VolunteerFilterSearchBar /> */}
        <MainVolunteerViewContent props={props} />
      </div>
    </>
  );
};

export default MainVolunteerView;
