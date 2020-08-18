import React from 'react';

import AddSupplyForm from './addSupplyForm.component';

const AddSupplyModal = ({ project, setAddSupplyModal, dispatch }) => {
  return (
    <div className="projectAddSupplyModalBG" onClick={() => setAddSupplyModal(false)}>
      <div className="projectAddSupplyModal" onClick={(e) => e.stopPropagation()}>
        <AddSupplyForm project={project} dispatch={dispatch} setAddSupplyModal={setAddSupplyModal} />
      </div>
    </div>
  )
}

export default AddSupplyModal