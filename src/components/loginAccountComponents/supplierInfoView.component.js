import React, { Fragment} from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import '../../css/supplierInfoView.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/pro-solid-svg-icons'

export const BankingDetails = (props) => {
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

export const EasyPaisaDetails = (props) => {
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

export const JazzCashDetails = (props) => {
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
      <h6 className="text-muted"> {props.supplier.type} logo </h6>
      <div className="imageContainer">
        <img src={props.supplier.supplierImageURL} className="supplerImage" alt=""/>
      </div>
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
      <h6 className="text-muted"> Point of Contact </h6>
      <p> {props.supplier.contactName} </p>
      <hr />
      <h6 className="text-muted"> Contact Number </h6>
      <p> {props.supplier.contactNumber} </p>
      <hr />
      <h6 className="text-muted"> Other Info </h6>
      <p> {props.supplier.contactInfo} </p>
      <hr />
      {props.supplierWebsite !== "" && (
        <Fragment>
        <h6 className="text-muted"> Website </h6>
        <a href={props.supplier.supplierWebsite} key={props.supplier.supplierWebsite} target="_blank" rel="noopener noreferrer" className="icon"> <FontAwesomeIcon icon={faGlobe}/></a>
        </Fragment>
      )
      }
      <SocialMediaIcons supplier={props.supplier} />
      <WhichLogo icon={props.supplier.facebookURL} />
      <WhichLogo icon={props.supplier.twitterURL} />
      <WhichLogo icon={props.supplier.instagramURL} />
    </div>
  )
}

export const SocialMediaIcons = (props) => {
  const socialMediaIcons = [props.supplier.facebookURL, props.supplier.twitterURL, props.supplier.instagramURL]
  let anyIcons = false
  socialMediaIcons.forEach((socialIcon) => {
    if (socialIcon !== "") {
      anyIcons = true
    }
  });
  if (anyIcons) {
    return (
      <Fragment>
        <hr />
        <h6 className="text-muted"> Social media </h6>
      </Fragment>
    );
  } else {
    return null
  };
}

export const WhichLogo = (props) => {
  if (props.icon === "" || props.icon === undefined) {
    return null
  }
  if (props.icon.includes("facebook")) {
    return <a href={props.icon}  target="_blank" rel="noopener noreferrer" className="icon"> <FontAwesomeIcon icon={faFacebook}/></a>
  } else if (props.icon.includes('twitter')) {
    return <a href={props.icon}  target="_blank" rel="noopener noreferrer" className="icon"> <FontAwesomeIcon icon={faTwitter} href={props.icon} /> </a>
  } else if (props.icon.includes('instagram')) {
    return <a href={props.icon}  target="_blank" rel="noopener noreferrer" className="icon">< FontAwesomeIcon icon={faInstagram} href={props.icon} /> </a>
  } else {
    return <a href={props.icon}  target="_blank" rel="noopener noreferrer" className="icon">< FontAwesomeIcon icon={faGlobe} href={props.icon} /> </a>
  }
}

export default SupplierInfoView