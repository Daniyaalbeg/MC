import React from 'react';

const ProjectFaqPanel = ({ project }) => {
  if (!project.faqs || project.faqs.length === 0) {
    return <p className="mainProjectEmpty"> This project does not have any FAQ's yet. </p>
  }

  return (
    <div className="mainProjectFaqPanelContainer">
      {
        project.faqs.map((faq) => {
          return (
            <div key={faq._id} className="projectFaq">
              <p className="mainProjectTitle"> {faq.question} </p>
              <p className="mainProjectText"> {faq.answer} </p>
            </div>
          )
        })
      }
    </div>
  )
}

export default ProjectFaqPanel