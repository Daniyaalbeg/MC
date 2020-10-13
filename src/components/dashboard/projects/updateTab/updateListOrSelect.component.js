import React, { useState } from 'react'

import SelectedUpdate from './selectedUpdate.component';
import UpdateList from './updateList.component';

const UpdateListOrSelect = ({ project, addUpdateModal, setAddUpdateFaqModal }) => {
  const [selectedUpdate, setSelectedUpdate] = useState(null)

  if (selectedUpdate) {
    return <SelectedUpdate update={selectedUpdate} setSelectedUpdate={setSelectedUpdate} />
  } else {
    return <UpdateList project={project} addUpdateModal={addUpdateModal} setAddUpdateFaqModal={setAddUpdateFaqModal} setSelectedUpdate={setSelectedUpdate} />
  }
}

export default UpdateListOrSelect