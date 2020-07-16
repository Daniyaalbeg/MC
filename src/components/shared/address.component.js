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

  const capitalise = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  if (!address) {
    return <p> Not added </p>
  } else {
    return (
      <div className="addressContainer">
        <div className="addressTopLeft">
          <p className="addressTitle"> Line </p>
          {address.line1 ? <p> {capitalise(address.line1)} </p> : "Not Added"}
        </div>
        <div className="addressTop">
          <p className="addressTitle"> City </p>
          {address.city ? <p> {capitalise(address.city)} </p> : "Not Added"}
        </div>
        <div className="addressTopRight">
          <p className="addressTitle"> Region </p>
          {address.region ? <p> {capitalise(address.region)} </p> : "Not Added" }
        </div>
        <div className="addressBottomLeft">
          <p className="addressTitle"> Post Code / Zip Code </p>
          {address.postCode ? <p> {address.postCode} </p> : "Not Added" }
        </div>
        <div className="addressBottom">
          <p className="addressTitle"> Country </p>
          {address.country ? <p> {capitalise(address.country)} </p> : "Not Added"}
        </div>
      </div>
    )
  }
}

export default CheckOldOrNewAddress;