import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/pro-solid-svg-icons';
import { faCircleNotch } from '@fortawesome/pro-duotone-svg-icons'

const LoadingSpinner = ({ style }) => {
  return (
    <div className="loading-spinner">
      <FontAwesomeIcon icon={faCircleNotch} spin size="3x" style={style} />
    </div>
  )
}

export default LoadingSpinner