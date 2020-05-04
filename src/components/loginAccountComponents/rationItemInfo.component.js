import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../../css/rationInfoView.css'
import RationItemInfoMap from './rationitemInfoMap.component.js';
import LazyLoad from 'react-lazyload'

const RationItemInfo = (props) => {
  const ration = props.ration;
  return (
    <div>
      <p> {ration.description} </p>
      <hr />
      <h6 className="text-muted"> Number of rations distributed </h6>
      <p> {ration.totalNumberOfItems} </p>
      <hr />
      <h6 className="text-muted"> Descripiton of items </h6>
      <p> {ration.itemsDescription} </p>
      <hr />
      <h6 className="text-muted"> Type of Rations </h6>
      <p> {ration.typeOfRation === "ppe" ? "Personal Protection Equipment" : ration.typeOfRation} </p>      <hr />
      {ration.images.length !== 0 &&
          <div className="imageCarouselContainer">
          <h6 className="text-muted"> Images </h6>
          <Carousel className="imageCarousel">
            {ration.images.map((image) => {
              return (
                <Carousel.Item key={image}>
                  <div className="imageContainer">
                      <img className="img" src={image} alt="" />
                  </div>
                </Carousel.Item>
              )
            })}
          </Carousel>
          </div>
        }
      <hr />
      <h6 className="text-muted"> Location </h6>
      <LazyLoad height={200}>
        <RationItemInfoMap ration={ration} />
      </LazyLoad>
    </div>
  )
}

export default RationItemInfo;