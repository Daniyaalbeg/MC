import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../../Actions/authActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faSignOut } from '@fortawesome/pro-duotone-svg-icons';

const HeaderIcons = ({ dispatch }) => {  
  return (
    <div className="headerIconContainer">
      {/* <button className="headerButton">
        <div className="dbHeaderIcon dbIconBg">
          <FontAwesomeIcon icon={faBell} className="dbFaBell dbIconFont" />
        </div>
      </button> */}
      <button className="headerButton" onClick={() => { dispatch(logout()) }}>
        <div className="dbHeaderIcon dbIconBg logoutIcon">
          <FontAwesomeIcon icon={faSignOut} className="dgFaSignOut dbIconFont" />
        </div>
      </button>
    </div>
  )
}

export default connect()(HeaderIcons)