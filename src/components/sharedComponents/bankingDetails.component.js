import React from 'react';

const BankingDetails = ({ bankingDetails }) => {
  const bankInfo = bankingDetails;
  if (bankInfo.bankName != null) {
    return (
      <>
      <p className="largeTitle"> Banking Info </p>
      <div className="bankingInfoContainer">
        <div className="bankingTopLeft">
          <p className="smallTitle"> Bank name </p>
          {bankInfo.bankName ? <p> {bankInfo.bankName} </p> : "Not Added" }
        </div>
        <div className="bankingTop">
          <p className="smallTitle"> Bank branch </p>
          {bankInfo.bankBranch ? <p> {bankInfo.bankBranch} </p> : "Not Added" }
        </div>
        <div className="bankingTopRight">
          <p className="smallTitle"> Account title </p>
          {bankInfo.accountTitle ? <p> {bankInfo.accountTitle} </p> : "Not Added" }
        </div>
        <div className="bankingBottomLeft">
          <p className="smallTitle"> Account number </p>
          {bankInfo.accountNumber ? <p> {bankInfo.accountNumber} </p> : "Not Added" }
        </div>
        <div className="bankingBottom">
          <p className="smallTitle"> IBAN </p>
          {bankInfo.IBAN ? <p> {bankInfo.IBAN} </p> : "Not Added" }
        </div>
        <div className="bankingBottomRight">
          <p className="smallTitle"> Swift </p>
          {bankInfo.swiftCode ? <p> {bankInfo.swiftCode} </p> : "Not Added" }
        </div>
      </div>
      </>
    )
  } else {
    return null;
  }
}

export default BankingDetails