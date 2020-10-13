import React, { useState } from 'react';

import GenericModal from '../../sharedComponents/genericModal.component';
import FilterModalProjectView from './filterModalProjectView.component';
import ProjectSearchBar from './searchBarProjectView.component';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFilter } from '@fortawesome/pro-solid-svg-icons'

const ProjectFilterSearchBar = ({  }) => {
  const [openedFilterModal, setOpenFilterModal] = useState(false)

  return (
    <div className="filterSearchBarStandard">
      <ProjectSearchBar />
      <button className="standardButtonWithoutColour mcLighterBG" onClick={() => setOpenFilterModal(true)} style={{marginLeft: '8px'}} >
        {/* <FontAwesomeIcon icon={faFilter} size="1x" style={{marginRight: '8px'}} /> */}
        Filter
      </button>
      {openedFilterModal &&
        <GenericModal showModal={setOpenFilterModal}>
          <FilterModalProjectView showModal={setOpenFilterModal} />
        </GenericModal>
      }
    </div>
  )
}


export default ProjectFilterSearchBar