import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import ProgressCircle from './progressCircle.component';

const ProjectCardDashProgressInfo = ({ empty, title, colour, percent }) => {
  if (empty) {
    return (
      <>
      <FontAwesomeIcon className="projectCardAddIcon" icon={faPlus} size="1x" style={{ color: colour, borderColor: colour }} />
      <p className="projectCardSmallTitle"> Add {title} </p>
      </>
    )
  } else {
    return (
      <>
      <ProgressCircle
          size={80}
          progress={percent}
          strokeWidth={16}
          circleStrokeBg={"whitesmoke"}
          circleStroke={colour}
          initalOffset={200}
      />
      <p className="projectText"> {title} </p>
      </>
    )
  }
}

export default ProjectCardDashProgressInfo