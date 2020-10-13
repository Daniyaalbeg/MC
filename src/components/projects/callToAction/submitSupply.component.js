import React, { useState } from 'react';

import ProjectSupplyItem from '../projectTabPanels/projectSupplyItem.component';
import ContributeSelectedSupply from './contributeSelectedSupply.component';

const SubmitSupply = ({ project, setSubmitted }) => {
  const [selectedSupply, setSelectedSupply] = useState(null)

  if (selectedSupply) {
    return <ContributeSelectedSupply project={project} supply={selectedSupply} setSelectedSupply={setSelectedSupply} setSubmitted={setSubmitted} />
  }

  return (
      <div className="callToActionSubmitSupplyContainer">
        <p className="mainProjectTitle"> Select which supply to contribute </p>
        {
          project.supplies.map((supply) => {
            return <ProjectSupplyItem key={supply._id} supply={supply} onClick={() => setSelectedSupply(supply)} />
          })
        }
    </div>
  )
}

export default SubmitSupply