import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Card, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import MoneyNumberDetails from '../sharedComponents/numberMoneyDetails.component';
import WhichLogo from '../sharedComponents/whichLogo.component';
import SocialMediaIcons from '../sharedComponents/socialMediaIcons.component';
import BankingDetails from '../sharedComponents/bankingDetails.component';
import { getOrgInfo } from '../../Actions/getOrgInfoActions';
import { WhatCategories } from '../iconController/iconCategories.component';
import CheckOldOrNewAddress from '../sharedComponents/address.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/pro-solid-svg-icons';
import imagePlaceholder from '../../assets/Images/temp.jpg';


const OrganisationsInfoView = ({ dispatch, hasErrors, loading, orgs, fetched, props }) => {
  const { id } = useParams();
  const [org, setOrg] = useState(null);  

  useEffect(() => {
    if (!fetched && !loading) {
      dispatch(getOrgInfo());
    }
    if (fetched) {
      const chosenOrg = orgs.find((filteredOrg) => {
        return (id === filteredOrg._id)
      })
      setOrg(chosenOrg)
    }
  }, [fetched])

  if (hasErrors) {
    return (
      <p> Error </p>
    )
  }

	if (!org || loading) {
    return (
      <div className="orgInfoLoading">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      </div>
    )
  } else {
    return (
      <div className="orgInfoCardContainer">
      <Card className="orgInfoCard">
        <Card.Body>
          <button  className="backButtonOrgView standardButton" onClick={() => {
            props.history.goBack()
          }}>
            Back 
          </button>
          <Card.Img className="orgInfoImage" variant="top" src={org.imageURL ? org.imageURL : imagePlaceholder} alt=""/>
          <br />
          <br />
          <Card.Title> {org.name} </Card.Title>
          <Card.Subtitle> {org.type} </Card.Subtitle>
          <br />
          <h6 className="text-muted smallHeader"> Description </h6>
          <Card.Text> {org.description} </Card.Text>
          <br />
          <h6 className="text-muted"> Type of Work </h6>
          <div className="orgInfoIcons">
          <WhatCategories types={org.areaOfWork} />
          </div>
          <br />
          <h6 className="text-muted"> Address </h6>
          <CheckOldOrNewAddress address={org.address} />
          <br />
          <h6 className="text-muted"> Donation Info </h6>
          <BankingDetails bankingDetails={org.bankingDetails}  />
          <br />
          <MoneyNumberDetails name="EasyPaisa" number={org.bankingDetails.easyPaisa} />
          <br />
          <MoneyNumberDetails name="JazzCash" number={org.bankingDetails.jazzCash} />
          <br />
          <br />
          <h6 className="text-muted"> Point of Contact </h6>
          <Card.Text> {org.contactName} </Card.Text>
          <Card.Text> {org.contactNumber} </Card.Text>
          <br />
         {org.contactInfo &&
            <>
            <h6 className="text-muted"> Other Contact Info </h6>
            <Card.Text> {org.contactInfo} </Card.Text>
            </>
         }
          <br />
          {
            org.websiteURL && (
              <>
                <h6 className="text-muted"> Website </h6>
                <a href={org.websiteURL} key={org.websiteURL} target="_blank" rel="noopener noreferrer" className="icon"> <FontAwesomeIcon icon={faGlobe}/></a>
              </>
            )
          }
        <SocialMediaIcons org={org} />
        <div className="orgSocialMediaContainer">
          <WhichLogo icon={org.facebookURL} />
          <WhichLogo icon={org.twitterURL} />
          <WhichLogo icon={org.instagramURL} />
        </div>
        </Card.Body>
      </Card>
      </div>
    )
  }
}

const MapStateToProps = (state, ownProps) => ({
  loading: state.orgInfo.loading,
  orgs: state.orgInfo.orgInfo,
  fetched: state.orgInfo.fetched,
  hasErrors: state.orgInfo.hasErrors,
  props: ownProps
})

export default connect(MapStateToProps)(OrganisationsInfoView);