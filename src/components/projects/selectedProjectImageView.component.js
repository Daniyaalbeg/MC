import React from 'react';

import ImageCarousel from '../sharedComponents/imageCarousel.component';

const SelectedProjectImageView = ({ project }) => {
  return <ImageCarousel images={project.images} height="100%" width="100%" backgroundColour="white" />
}

export default SelectedProjectImageView