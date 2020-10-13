import React from 'react';

import ProgressCircle from '../../sharedComponents/progressCircle.component';
import { calculateSupplyPercent, calculateFundingPercent } from '../../utilities/projectUtils.component';

const CallToActionProgressViews = ({ project }) => {
  return (
    <div className="callToActionProgressCircles">
    {project.funding &&
      <CallToActionProgress name="Funding" percent={calculateFundingPercent(project)} colour="#4BB250" />
    }
    {project.volunteers &&
      <CallToActionProgress name="Volunteers" percent={89} colour="#d6542d" />
    }
    {project.supplies &&
      <CallToActionProgress name="Supplies" percent={calculateSupplyPercent(project)} colour="#1589C9" />
    }
    </div>
  )
}

const CallToActionProgress = ({ name, percent, colour }) => {
  return (
    <div className="callToActionProgressContainer">
      <ProgressCircle
        size={50}
        progress={percent === 0 ? 1 : percent}
        strokeWidth={12}
        circleStrokeBg={"whitesmoke"}
        circleStroke={colour}
        initalOffset={119}
        displayPercentLabel={true}
      />
      <h5> {name} </h5>
    </div>
  )
}

export default CallToActionProgressViews