import React, { useState } from 'react'

import ChangeMapModeButton from './changeMapModeButton.component';
import { searchEvents } from '../../Actions/filterSearchMapAction';
import { toggleMapModal } from '../../Actions/mapSelectActions';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/pro-solid-svg-icons'
import { faTh } from '@fortawesome/pro-duotone-svg-icons';

const MapListControl = ({ dispatch, setShowModal }) => {
  const [typingTimeout, setTypingTimeout] = useState(0)

  const onSearchChange = (event) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const text = event.target.value
    setTypingTimeout(setTimeout(() => {
      dispatch(searchEvents(text))
    }, 1000))
  }

  return (
    <form className="searchBarContainer" onSubmit={(e) => { e.preventDefault() }}>
      <div className="searchBar">
        <FontAwesomeIcon icon={faSearch} className="searchIcon" size="1x"/>
        <input type='text' onChange={onSearchChange} className="textInputMap"/>
        <button onClick={() => dispatch(toggleMapModal())} className="mapSettingsButton"> <FontAwesomeIcon icon={faTh} /> Categories </button>
      </div>
      <ChangeMapModeButton />
    </form>
  )
}

export default MapListControl