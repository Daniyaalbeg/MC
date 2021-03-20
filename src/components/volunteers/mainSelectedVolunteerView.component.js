import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import LoadingSpinner from "../utilities/loadingSpinner.component";
import VolunteerImage from "./volunteerImage.component";
import VolunteerPersonalIconInfo from "./volunteerPersonalIconInfo.component";
import VolunteerIconInfo from "./volunteerIconInfo.component";
import GenderComponent from "./volunteerGender.component";
import VolunteerPillsList from "./volunteerPillsList.component";
import { getVolunteer } from "../../Actions/volunteerActions";
import { WhatCategories } from "../iconController/iconCategories.component";

const MainSelectedVolunteerView = ({
  dispatch,
  selectedVolunteer,
  props,
  loading,
  hasErrors,
  fetched,
}) => {
  const { id } = useParams();
  const volunteer = selectedVolunteer;

  useEffect(() => {
    dispatch(getVolunteer(id));
  }, []);

  if (loading || !volunteer) {
    return <LoadingSpinner />;
  }

  function clickProject(id) {
    props.history.push(`/projects/${id}`);
  }

  if (hasErrors) return <p> Error Occurred </p>;
  if (fetched && volunteer !== null) {
    return (
      <div className="bg-gray-100 h-auto px-16 py-8">
        <div className="grid grid-cols-3 grid-flow-row gap-4">
          <div className="flex flex-row col-span-3 px-8 py-12 shadow-solid bg-white rounded-xl select-none">
            <div className="w-min">
              <VolunteerImage size="large" />
            </div>
            <div className="flex-grow p-4 text-gray-700">
              <h1 className="font-bold">
                {volunteer.firstName} {volunteer.lastName}{" "}
                <GenderComponent gender={volunteer.gender} color="black" />
              </h1>
              <VolunteerPersonalIconInfo volunteer={volunteer} />
            </div>
          </div>

          <div className="col-span-3 px-8 py-4 bg-white rounded-xl shadow-solid">
            <h3 className="font-bold"> About </h3>
            <p className="m-0"> {volunteer.about} </p>
            <VolunteerIconInfo volunteer={volunteer} />
          </div>

          <div className="col-span-3 px-8 py-4 bg-white rounded-xl shadow-solid select-none">
            <h3 className="font-bold"> Skills </h3>
            <VolunteerPillsList items={volunteer.skills} />
            <h3 className="mt-4 font-bold"> Interests </h3>
            <div className="flex flex-row">
              <WhatCategories types={volunteer.interests} />
            </div>
            <h3 className="mt-4 font-bold"> Languages </h3>
            <VolunteerPillsList items={volunteer.languages} />
          </div>
          {volunteer.volunteering && volunteer.volunteering.length !== 0 && (
            <div className="col-span-3 px-8 py-4 bg-white rounded-xl shadow-solid">
              <h3 className="font-bold"> Volunteered For </h3>
              <div className="flex flex-row flex-wrap gap-4">
                {volunteer.volunteering.map((p) => {
                  return (
                    <ProjectMiniCard
                      key={p._id}
                      project={p}
                      onClick={clickProject}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <LoadingSpinner />;
};

const ProjectMiniCard = ({ project, onClick }) => {
  let image = null;
  if (project.images) {
    image = project.images[0];
  } else image = <p> no image... </p>;

  function clicked() {
    onClick(project._id);
  }

  return (
    <div
      onClick={clicked}
      className="group h-60 w-48 relative overflow-hidden rounded-2xl shadow hover:shadow-lg transition transform duration-500 ease-in-out hover:scale-105 cursor-pointer"
    >
      <h5 className="absolute text-white font-bold bottom-4 left-4 z-20 transition transform duration-500 group-hover:-translate-y-1 group-hover:scale-105">
        {project.name}
      </h5>
      <div className="absolute top-0 left-0 h-60 w-48 bg-gradient-to-t from-black via-transparent opacity-50 z-10"></div>
      <img
        className="h-60 w-48 object-cover transition transform duration-500 scale-105 group-hover:scale-100 group-hover:-translate-y-2"
        src={image}
      />
    </div>
  );
};

const MapStateToProps = (state, ownProps) => ({
  loading: state.volunteerInfo.mainVolunteers.loading,
  hasErrors: state.volunteerInfo.mainVolunteers.hasErrors,
  fetched: state.volunteerInfo.mainVolunteers.fetched,
  selectedVolunteer: state.volunteerInfo.mainVolunteers.selectedVolunteer,
  props: ownProps,
});

export default connect(MapStateToProps)(MainSelectedVolunteerView);
