import React, { useState } from 'react'

import SelectedUpdate from './selectedUpdate.component';
import UpdateList from './updateList.component';

const UpdateListOrSelect = ({ project, addUpdateModal, setAddUpdateModal, updatesDict }) => {
  const [selectedUpdate, setSelectedUpdate] = useState(null)

  if (selectedUpdate) {
    return <SelectedUpdate update={updatesDict[selectedUpdate]} setSelectedUpdate={setSelectedUpdate} />
  } else {
    return <UpdateList project={project} updatesDict={updatesDict} addUpdateModal={addUpdateModal} setAddUpdateModal={setAddUpdateModal} setSelectedUpdate={setSelectedUpdate} />
  }
}

export default UpdateListOrSelect