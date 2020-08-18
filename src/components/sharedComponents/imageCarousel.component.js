import React from 'react';
import { Carousel } from 'react-bootstrap';

const ImageCarousel = ({ images }) => {
  if (!images) {
    return (
      <p> No images </p>
    )
  } else {
    return (
        <Carousel>
          {
            images.map((image) => {
              return (
                <Carousel.Item key={image}>
                  <img className="projectCarouselImage" src={image} alt="User uploaded content" />
                </Carousel.Item>
              )
            })
          }
        </Carousel>
    )
  }
}

export default ImageCarousel