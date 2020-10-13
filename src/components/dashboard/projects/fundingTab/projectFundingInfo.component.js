import React from 'react';

const ProjectFundingInfo = ({ project, setEditing }) => {
  return (
    <div className="projectSelectedFundingContainer" onClick={() => setEditing(true)}>
      <p className="projectTitle"> Amount Requested </p>
      <p className="projectText"> PKR. {project.funding.fundingNeeded} </p>
      <p className="projectTitle"> Amount Received </p>
      <p className="projectText"> PKR. {project.funding.fundingReceived} </p>
      <p className="projectTitle"> Description </p>
      <p className="projectText"> {project.funding.fundingUsedFor} </p>
      <br />
      <p className="projectTitle"> Note: </p>
      <p className="projectText"> People will be able to donate directly to your campaign in a future update. </p>
      {/* ADD BACKERS HERE! */}
    </div>
  )
}

export default ProjectFundingInfo