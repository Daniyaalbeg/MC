import React from 'react'

import userImage from '../../assets/Images/user.png'
import { faUser } from '@fortawesome/pro-solid-svg-icons';
import { FontAwsomeIcon } from '@fortawesome/react-fontawesome';

const UserImagePlaceholder = ({ image, style, parent="user-image" }) => {
  const usedImage = image ? image : userImage
  return <img src={usedImage} style={style} />
}

export default UserImagePlaceholder