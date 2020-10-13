import React, { useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretCircleLeft, faCaretCircleRight } from "@fortawesome/pro-duotone-svg-icons";

const ImageCarousel = ({ images, height = "auto", width = "auto", backgroundColour = "whitesmoke" }) => {
  const [currentImage, setCurrentImage] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  if (images.length === 1) {
    return (
      <div className="imageCarouselContainer" style={{height: height, width: width, backgroundColor: backgroundColour}}>
        <img src={images[0]} alt="Dynamic content" />
    </div>
    )
  }

  return (
    <div className="imageCarouselContainer" style={{height: height, width: width, backgroundColor: backgroundColour}}>
      {/* <img src={images[currentImage]} alt="Carousel of images" /> */}
      {
        images.map((image, index) => {
          return <img key={index} src={image} alt="Dynamic content" style={{ opacity: index === currentImage ? "1" : "0"}} />
        })
      }
      <button className="imageCarouselButton imageCarouselNextButton" onClick={() => {
        if (currentImage === images.length-1) {
          setCurrentImage(0)
        } else { setCurrentImage(currentImage+1) }
      }}> <FontAwesomeIcon icon={faCaretCircleLeft} size="2x" /> </button>
      <button className="imageCarouselButton imageCarouselPreviousButton" onClick={() => {
        if (currentImage === 0) {
          setCurrentImage(images.length-1)
        } else { setCurrentImage(currentImage-1) }
      }}> <FontAwesomeIcon icon={faCaretCircleRight} size="2x" /> </button>
    </div>
  )
}

export default ImageCarousel