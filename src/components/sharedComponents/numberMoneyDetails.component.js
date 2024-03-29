import React from 'react';

export const MoneyNumberDetails = ({ name, number }) => {
  if (name !== null) {
    return (
      <>
        <p className="smallTitle"> {name} </p>
        {number ? <p> {number} </p> : "Not Added" }
      </>
    )
  } else {
    return null;
  }
}

export default MoneyNumberDetails