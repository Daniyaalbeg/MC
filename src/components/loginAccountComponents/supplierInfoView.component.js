import React, { Fragment} from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import '../../css/supplierInfoView.css';

const BankingDetails = (props) => {
  const bankInfo = props.bankingDetails;
  if (bankInfo.bankName != null) {
    return (
      <Container className="bankingInfo">
        <Row>
          <Col className="bI">
            <h6 className="text-muted"> Bank name </h6>
            <p> {bankInfo.bankName} </p>
          </Col>
          <Col className="bI">
            <h6 className="text-muted"> Bank branch </h6>
            <p> {bankInfo.bankBranch} </p>
          </Col>
        </Row>
        <Row>
          <Col className="bI">
            <h6 className="text-muted"> Account title </h6>
            <p> {bankInfo.accountTitle} </p>
          </Col>
          <Col className="bI">
            <h6 className="text-muted"> Account number </h6>
            <p> {bankInfo.accountNumber} </p>
          </Col>
        </Row>
        <Row>
          <Col className="bI">
            <h6 className="text-muted"> IBAN </h6>
            <p> {bankInfo.IBAN} </p>
          </Col>
          <Col className="bI">
            <h6 className="text-muted"> Swift </h6>
            <p> {bankInfo.swiftCode} </p>
          </Col>
        </Row>
      </Container>
    )
  } else {
    return null;
  }
}

const EasyPaisaDetails = (props) => {
  if (props.easyPaisa != null) {
    return (
      <Fragment>
        <h6 className="text-muted"> Easypaisa </h6>
        <p> {props.easyPaisa} </p>
      </Fragment>
    )
  } else {
    return null;
  }
}

const JazzCashDetails = (props) => {
  if (props.jazzCash != null) {
    return (
      <Fragment>
        <h6 className="text-muted"> Jazzcash </h6>
        <p> {props.jazzCash} </p>
      </Fragment>
    )
  } else {
    return null;
  }
}

const SupplierInfoView = (props) => {
  return (
    <div>
      <br />
      <h6 className="text-muted"> {props.supplier.type} name </h6>
      <p> {props.supplier.supplierName} </p>
      <hr />
      <BankingDetails bankingDetails={props.supplier.bankingDetails} />
      <EasyPaisaDetails easyPaisa={props.supplier.bankingDetails.easyPaisa} />
      <JazzCashDetails jazzCash={props.supplier.bankingDetails.jazzCash} />
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
      <h6 className="text-muted"> Other Info </h6>
      <p> {props.supplier.contactInfo} </p>
      <hr />
      <h6 className="text-muted"> Website </h6>
      <p> {props.supplier.supplierWebsite} </p>
      <SocialMediaIcons supplier={props.supplier} />
    </div>
  )
}

const SocialMediaIcons = (props) => {
  const socialMediaIcons = [props.supplier.facebookURL, props.supplier.twitterURL, props.supplier.instagramURL]
  const renderedSocialMediaIcons = socialMediaIcons.map((socialIcon) => {
    if (socialIcon != null) {
      return <a href={socialIcon} target="_blank" key={socialIcon}> Social icon </a>
    }
  })
  return renderedSocialMediaIcons;
}

export default SupplierInfoView