import React, { Suspense } from 'react';
import { Carousel } from 'react-bootstrap';
import '../../css/rationInfoView.css'
import RationItemInfoMap from './rationitemInfoMap.component.js';

const RationItemInfo = (props) => {
  const ration = props.ration;
  // const MapViewLazy = React.lazy(() => import('./rationitemInfoMap.component.js'))
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
      {/* <hr />
      <h6 className="text-muted"> Location </h6>
      <Suspense fallback={<div> Loading... </div>}>
        <MapViewLazy ration={ration} />
      </Suspense> */}
      {/* <RationItemInfoMap ration={ration} /> */}
    </div>
  )
}

export default RationItemInfo;