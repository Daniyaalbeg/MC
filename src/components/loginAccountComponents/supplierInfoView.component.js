import React from 'react';

const SupplierInfoView = (props) => {
  return (
    <div>
      <br />
      <h6 className="text-muted"> {props.supplier.type} name </h6>
      <p> {props.supplier.supplierName} </p>
      <hr />
      <h6 className="text-muted"> Banking Details </h6>
      <p> {props.supplier.description} </p>
      <hr />
      <h6 className="text-muted"> Description </h6>
      <p> {props.supplier.description} </p>
      <hr />
      <h6 className="text-muted"> Address </h6>
      <p> {props.supplier.address} </p>
      <hr />
      <h6 className="text-muted"> Contact Number </h6>
      <p> {props.supplier.contactNumber} </p>
      <hr />
      <h6 className="text-muted"> Other Contact Info </h6>
      <p> {props.supplier.contactInfo} </p>
      <hr />
      <h6 className="text-muted"> Website </h6>
      <p> {props.supplier.supplierWebsite} </p>
    </div>
  )
}

export default SupplierInfoView