import React from 'react'
import imagePlaceholder from '../../assets/Images/temp.jpg';

const StandardCard = ({ image, name }) => {
  return (
    <>
      {image ? <img src={image} alt="" /> : <img src={imagePlaceholder} alt="" /> }
      <p> {name} </p>
    </>
  )
}

export default StandardCard