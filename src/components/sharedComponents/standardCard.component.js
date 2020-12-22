import React from 'react'
import imagePlaceholder from '../../assets/Images/temp.jpg';

const StandardCard = ({ image, name, orgTextColour }) => {
  return (
    <>
      {image ? <img draggable={false} src={image} alt="" /> : <img draggable={false} src={imagePlaceholder} alt="" /> }
      <p className={orgTextColour}> {name} </p>
    </>
  )
}

export default StandardCard