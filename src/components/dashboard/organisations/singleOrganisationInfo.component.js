import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/pro-duotone-svg-icons';
import { faGlobe } from '@fortawesome/pro-solid-svg-icons';

import CheckOldOrNewAddress from '../../sharedComponents/address.component';
import MoneyNumberDetails from '../../sharedComponents/numberMoneyDetails.component';
import BankingDetails from '../../sharedComponents/bankingDetails.component';
import SocialMediaIcons from '../../sharedComponents/socialMediaIcons.component';
import WhichLogo from '../../sharedComponents/whichLogo.component';

import imagePlaceholder from '../../../assets/Images/temp.jpg';


const SingleOrganisationInfo = ({ org, setSelectedOrg }) => {
  return (
    <>
      <Link to={"/updateOrg/" + org._id} className="supplierEditButton">
        <button className="standardButtonWithoutColour editIconVersion mcYellowBG mcBlack">
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </Link>

      <button className="standardButtonWithoutColour mcYellowBG mcBlack" onClick={() => setSelectedOrg(null)}> <FontAwesomeIcon icon={faChevronCircleLeft} style={{textAlign: 'left', marginRight: "0.3em"}}/> Back </button>
      <br />
      <br />

      <p className="supplierTitle"> Name </p>
      <p> {org.name} </p>

      <p className="supplierTitle"> Logo </p>
      <div className="imageContainer">
        <img src={org.imageURL ? org.imageURL : imagePlaceholder} className="supplierImage" alt=""/>
      </div>

      <BankingDetails bankingDetails={org.bankingDetails} />
      <MoneyNumberDetails name="EasyPaisa" number={org.bankingDetails.easyPaisa} />
      <MoneyNumberDetails name="JazzCash" number={org.bankingDetails.jazzCash} />
      {/* <EasyPaisaDetails easyPaisa={org.bankingDetails.easyPaisa} />
      <JazzCashDetails jazzCash={org.bankingDetails.jazzCash} /> */}

      <p className="supplierTitle"> Description </p>
      <p> {org.description} </p>

      <p className="supplierTitle"> Address </p>
      <CheckOldOrNewAddress address={org.address} />

      <p className="supplierTitle"> Point of Contact </p>
      <p> {org.contactName} </p>

      <p className="supplierTitle"> Contact Number </p>
      <p> {org.contactNumber} </p>

      <p className="supplierTitle"> Other Info </p>
      <p> {org.contactInfo} </p>

      {org.websiteURL && (
        <>
        <p className="supplierTitle"> Website </p>
        <a href={org.websiteURL} key={org.websiteURL} target="_blank" rel="noopener noreferrer" className="iconSpecific websiteIcon"> <FontAwesomeIcon icon={faGlobe}/></a>
        </>
      )
      }
      <SocialMediaIcons org={org} />
      <WhichLogo icon={org.facebookURL} />
      <WhichLogo icon={org.twitterURL} />
      <WhichLogo icon={org.instagramURL} />
    </>
  )
}

export default SingleOrganisationInfo