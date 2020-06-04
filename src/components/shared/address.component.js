import React from 'react';
//css in general

const Address = (props) => {
  const { address } = props
  if (!address) {
    return <p> Not added </p>
  } else {
    return (
      <div className="addressContainer">
          <div className="addressTopLeft">
            <h6 className="text-muted"> Address Line 1 </h6>
            {address.addressLine1 ? <p> {address.addressLine1} </p> : "Not Added"}
          </div>
          <div className="addressTop">
            <h6 className="text-muted"> City </h6>
            {address.city ? <p> {address.city} </p> : "Not Added"}
          </div>
          <div className="addressTopRight">
            <h6 className="text-muted"> Region </h6>
            {address.region ? <p> {address.region} </p> : "Not Added" }
          </div>
          <div className="addressBottomLeft">
            <h6 className="text-muted"> Post Code / Zip Code </h6>
            {address.postCode ? <p> {address.postCode} </p> : "Not Added" }
          </div>
          <div className="addressBottom">
            <h6 className="text-muted"> Country </h6>
            {address.country ? <p> {address.country} </p> : "Not Added"}
          </div>
      </div>
    )
  }
}

export default Address;