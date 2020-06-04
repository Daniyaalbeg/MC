import React, { Fragment} from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../css/supplierInfoView.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faSitemap } from '@fortawesome/pro-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/pro-duotone-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import imagePlaceholder from '../../assets/Images/temp.jpg';

export const BankingDetails = (props) => {
  const bankInfo = props.bankingDetails;
  if (bankInfo.bankName != null) {
    return (
      <>
      <p className="supplierTitle"> Banking Info </p>
      <Container className="bankingInfo">
        <Row>
          <Col className="bI">
            <p className="supplierTitleSmall"> Bank name </p>
            {bankInfo.bankName ? <p> {bankInfo.bankName} </p> : "Not Added" }
          </Col>
          <Col className="bI">
            <p className="supplierTitleSmall"> Bank branch </p>
            {bankInfo.bankBranch ? <p> {bankInfo.bankBranch} </p> : "Not Added" }
          </Col>
        </Row>
        <Row>
          <Col className="bI">
            <p className="supplierTitleSmall"> Account title </p>
            {bankInfo.accountTitle ? <p> {bankInfo.accountTitle} </p> : "Not Added" }
          </Col>
          <Col className="bI">
            <p className="supplierTitleSmall"> Account number </p>
            {bankInfo.accountNumber ? <p> {bankInfo.accountNumber} </p> : "Not Added" }
          </Col>
        </Row>
        <Row>
          <Col className="bI">
            <p className="supplierTitleSmall"> IBAN </p>
            {bankInfo.IBAN ? <p> {bankInfo.IBAN} </p> : "Not Added" }
          </Col>
          <Col className="bI">
            <p className="supplierTitleSmall"> Swift </p>
            {bankInfo.swiftCode ? <p> {bankInfo.swiftCode} </p> : "Not Added" }
          </Col>
        </Row>
      </Container>
      </>
    )
  } else {
    return null;
  }
}

export const EasyPaisaDetails = (props) => {
  if (props.easyPaisa != null) {
    return (
      <Fragment>
        <p className="supplierTitleSmall"> Easypaisa </p>
        <p> {props.easyPaisa} </p>
        {props.easyPaisa ? <p> {props.easyPaisa} </p> : "Not Added" }
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
        <p className="supplierTitleSmall"> Jazzcash </p>
        <p> {props.jazzCash} </p>
        {props.jazzCash ? <p> {props.jazzCash} </p> : "Not Added" }
      </Fragment>
    )
  } else {
    return null;
  }
}

const SupplierInfoView = (props) => {
  if (!props.supplier) {
    return (
      <div className="emptyDBContainer">
        <p> <FontAwesomeIcon icon={faExclamationTriangle} className="cnicExclamationIcon" /> You have not created an organisation yet. </p>
         <Link to="signupOrg"><button className="standardButton lightBlueColour"> <FontAwesomeIcon icon={faPlus} style={{marginRight: "0.3em"}} /> Create Organisation </button></Link>
      </div>
    )
  }

  return (
    <div className="supplierInfoContainer">
      <div className="supplierInfoHeader">
        <FontAwesomeIcon icon={faSitemap} />
        <p> Organisation </p>
      </div>
      <div className="supplierInfoContent">
        <p className="supplierTitle"> Name </p>
        <p> {props.supplier.supplierName} </p>

        <p className="supplierTitle"> Logo </p>
        <div className="imageContainer">
          <img src={props.supplier.supplierImageURL ? props.supplier.supplierImageURL : imagePlaceholder} className="supplierImage" alt=""/>
        </div>

        <BankingDetails bankingDetails={props.supplier.bankingDetails} />
        <EasyPaisaDetails easyPaisa={props.supplier.bankingDetails.easyPaisa} />
        <JazzCashDetails jazzCash={props.supplier.bankingDetails.jazzCash} />

        <p className="supplierTitle"> Description </p>
        <p> {props.supplier.description} </p>

        <p className="supplierTitle"> Address </p>
        <p> {props.supplier.address} </p>

        <p className="supplierTitle"> Point of Contact </p>
        <p> {props.supplier.contactName} </p>

        <p className="supplierTitle"> Contact Number </p>
        <p> {props.supplier.contactNumber} </p>

        <p className="supplierTitle"> Other Info </p>
        <p> {props.supplier.contactInfo} </p>

        {props.supplierWebsite !== "" && (
          <Fragment>
          <p className="supplierTitle"> Website </p>
          <a href={props.supplier.supplierWebsite} key={props.supplier.supplierWebsite} target="_blank" rel="noopener noreferrer" className="iconSpecific websiteIcon"> <FontAwesomeIcon icon={faGlobe}/></a>
          </Fragment>
        )
        }
        <SocialMediaIcons supplier={props.supplier} />
        <WhichLogo icon={props.supplier.facebookURL} />
        <WhichLogo icon={props.supplier.twitterURL} />
        <WhichLogo icon={props.supplier.instagramURL} />
      </div>
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
        <p className="supplierTitle"> Social media </p>
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
    return <a href={props.icon}  target="_blank" rel="noopener noreferrer" className="iconSpecific websiteIcon"> <FontAwesomeIcon icon={faFacebook}/></a>
  } else if (props.icon.includes('twitter')) {
    return <a href={props.icon}  target="_blank" rel="noopener noreferrer" className="iconSpecific websiteIcon"> <FontAwesomeIcon icon={faTwitter} href={props.icon} /> </a>
  } else if (props.icon.includes('instagram')) {
    return <a href={props.icon}  target="_blank" rel="noopener noreferrer" className="iconSpecific websiteIcon">< FontAwesomeIcon icon={faInstagram} href={props.icon} /> </a>
  } else {
    return <a href={props.icon}  target="_blank" rel="noopener noreferrer" className="iconSpecific websiteIcon">< FontAwesomeIcon icon={faGlobe} href={props.icon} /> </a>
  }
}

export default SupplierInfoView