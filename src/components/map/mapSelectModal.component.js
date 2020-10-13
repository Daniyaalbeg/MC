import React from 'react';
import { InfoWindow } from '@react-google-maps/api';
import { useHistory } from 'react-router-dom';

import ProjectCard from '../projects/projectCard/mainProjectCard.component';

import { selectedProjectMarker } from '../../Actions/mapSelectActions';

const MapSelectModal = ({ dispatch, selectedProject }) => {
  const history = useHistory()
  
  if (selectedProject) {
    const latLng = {
      lat: selectedProject.location.coordinates[1],
      lng: selectedProject.location.coordinates[0]
    }
    return (
      <InfoWindow
        position={latLng} 
        onCloseClick={() => dispatch(selectedProjectMarker(null))}
      >
      <div className="mapInfoBox mapInfoProject">
        <ProjectCard project={selectedProject} />
        <button onClick={() => {
          history.push('/projects/'+selectedProject._id)
        }} > View Project </button>
      </div>
    </InfoWindow>
    )
  }

  return null
}

export default MapSelectModal