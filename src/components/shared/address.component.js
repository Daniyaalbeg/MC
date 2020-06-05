import React from 'react';
//css in general


const CheckOldOrNewAddress = ({ address }) => {
  if (typeof address === "string") {
    return address
  } else {
    return <Address address={address} />
  }
}


const Address = ({ address }) => {
  if (!address) {
    return <p> Not added </p>
  } else {
    return (
      <div className="addressContainer">
          <div className="addressTopLeft">
            <p className="addressTitle"> Address Line 1 </p>
            {address.addressLine1 ? <p> {address.addressLine1} </p> : "Not Added"}
          </div>
          <div className="addressTop">
            <p className="addressTitle"> City </p>
            {address.city ? <p> {address.city} </p> : "Not Added"}
          </div>
          <div className="addressTopRight">
            <p className="addressTitle"> Region </p>
            {address.region ? <p> {address.region} </p> : "Not Added" }
          </div>
          <div className="addressBottomLeft">
            <p className="addressTitle"> Post Code / Zip Code </p>
            {address.postCode ? <p> {address.postCode} </p> : "Not Added" }
          </div>
          <div className="addressBottom">
            <p className="addressTitle"> Country </p>
            {address.country ? <p> {address.country} </p> : "Not Added"}
          </div>
      </div>
    )
  }
}

export default CheckOldOrNewAddress;