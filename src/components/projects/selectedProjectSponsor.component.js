import React from "react";
import { Link, useHistory } from "react-router-dom";
import imagePlaceholder from "../../assets/Images/temp.jpg";

const SelectedProjectSponsors = ({ project }) => {
  const history = useHistory();
  if (!project.sponsors || project.sponsors.length === 0) return null;

  return (
    <div className="mainSelectedProjectsViewSponsors mainSelectedProjectCards">
      <h3> Sponsors </h3>
      <div className="selectedProjectSponsorCardContainer">
        {project.sponsors.map((sponsor) => {
          return (
            <div
              key={sponsor._id}
              className="selectedProjectSponsorCard grow"
              onClick={() =>
                history.push(`/organisations/${sponsor.sponsorID}`)
              }
            >
              <img
                src={sponsor.imageURL ? sponsor.imageURL : imagePlaceholder}
              />
              <h5> {sponsor.name} </h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectedProjectSponsors;
