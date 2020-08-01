import React from 'react';

const BankingDetails = ({ bankingDetails }) => {
  const bankInfo = bankingDetails;
  if (bankInfo.bankName != null) {
    return (
      <>
      <p className="supplierTitle"> Banking Info </p>
      <div className="bankingInfoContainer">
        <div className="bankingTopLeft">
          <p className="supplierTitleSmall"> Bank name </p>
          {bankInfo.bankName ? <p> {bankInfo.bankName} </p> : "Not Added" }
        </div>
        <div className="bankingTop">
          <p className="supplierTitleSmall"> Bank branch </p>
          {bankInfo.bankBranch ? <p> {bankInfo.bankBranch} </p> : "Not Added" }
        </div>
        <div className="bankingTopRight">
          <p className="supplierTitleSmall"> Account title </p>
          {bankInfo.accountTitle ? <p> {bankInfo.accountTitle} </p> : "Not Added" }
        </div>
        <div className="bankingBottomLeft">
          <p className="supplierTitleSmall"> Account number </p>
          {bankInfo.accountNumber ? <p> {bankInfo.accountNumber} </p> : "Not Added" }
        </div>
        <div className="bankingBottom">
          <p className="supplierTitleSmall"> IBAN </p>
          {bankInfo.IBAN ? <p> {bankInfo.IBAN} </p> : "Not Added" }
        </div>
        <div className="bankingBottomRight">
          <p className="supplierTitleSmall"> Swift </p>
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