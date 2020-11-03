import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/pro-solid-svg-icons';
import { faCircleNotch } from '@fortawesome/pro-duotone-svg-icons'

const LoadingSpinner = ({ style, size="3x" }) => {
  return (
    <div className="loading-spinner" style={style}>
      <FontAwesomeIcon icon={faCircleNotch} spin size={size} />
    </div>
  )
}

export default LoadingSpinner