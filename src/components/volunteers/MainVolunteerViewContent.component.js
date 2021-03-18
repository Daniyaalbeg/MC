import React, { useEffect } from "react";
import { connect } from "react-redux";

import VolunteerCard from "./mainVolunteerCard.component";
import LoadingSpinner from "../utilities/loadingSpinner.component";

import { getVolunteers } from "../../Actions/volunteerActions";
import { filterAndSearchProject } from "../utilities/filterAndSearch";

const MainVolunteerViewContent = ({
  props,
  dispatch,
  volunteers,
  loading,
  hasErrors,
  fetched,
}) => {
  useEffect(() => {
    dispatch(getVolunteers());
  }, []);

  function clickVolunteer(id) {
    props.history.push(`/volunteers/${id}`);
  }

  if (fetched && !loading && volunteers.length === 0) {
    return (
      <p
        style={{
          width: "100%",
          height: "400px",
          margin: "auto",
          textAlign: "center",
        }}
      >
        {" "}
        No Volunteers Yet{" "}
      </p>
    );
  }

  if (fetched && !loading) {
    return (
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 pb-8 px-4 sm:px-2">
        {volunteers.map((volunteer, index) => {
          return (
            <VolunteerCard
              key={index}
              volunteer={volunteer}
              onClick={clickVolunteer}
            />
          );
        })}
      </div>
    );
  }

  if (hasErrors) {
    return <p> An error occurred</p>;
  }

  return <LoadingSpinner />;
};

const MapStateToProps = (state, ownProps) => ({
  loading: state.volunteerInfo.mainVolunteers.loading,
  hasErrors: state.volunteerInfo.mainVolunteers.hasErrors,
  fetched: state.volunteerInfo.mainVolunteers.fetched,
  volunteers: state.volunteerInfo.mainVolunteers.volunteers, //filterAndSearchProject(state.projectInfo.mainProject.projects, state.projectInfo.mainProject.filterTerms, state.projectInfo.mainProject.searchTerm),
  props: ownProps.props,
});

export default connect(MapStateToProps)(MainVolunteerViewContent);
