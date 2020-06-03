import React from 'react';
//css in general

const Address = (props) => {
  const { address } = props
  if (!address) {
    return <p> Not added </p>
  } else {
    return (
      <div className="addressContainer">
        <div className="addressTop">
          <div>
            <h6 className="text-muted"> Address Line 1 </h6>
            <p> {address.addressLine1} </p>
          </div>
          <div>
            <h6 className="text-muted"> Address Line 2 </h6>
            <p> {address.addressLine2} </p>
          </div>
          <div>
            <h6 className="text-muted"> City </h6>
            <p> {address.city} </p>
          </div>
        </div>
        <div className="addressBottom">
          <div>
            <h6 className="text-muted"> Region </h6>
            <p> {address.region} </p>
        </div>
        <div>
          <h6 className="text-muted"> Post Code / Zip Code </h6>
          <p> {address.postCode} </p>
        </div>
        <div>
          <h6 className="text-muted"> Country </h6>
          <p> {address.country} </p>
        </div>
        </div>
      </div>
    )
  }
}

export default Address;