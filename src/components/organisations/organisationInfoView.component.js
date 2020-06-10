import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Card, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { BankingDetails, EasyPaisaDetails, JazzCashDetails, SocialMediaIcons, WhichLogo } from '../dashboard/supplierInfoView.component';
import { getOrgInfo } from '../../Actions/getOrgInfoActions';
import CheckOldOrNewAddress from '../shared/address.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/pro-solid-svg-icons'
import imagePlaceholder from '../../assets/Images/temp.jpg'

import '../../css/organisationInfoView.css'

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
  }, [fetched, loading, org, dispatch, orgs, id])

	if (org === null || org === undefined ) {
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
          <Card.Img className="orgInfoImage" variant="top" src={org.supplierImageURL ? org.supplierImageURL : imagePlaceholder} alt=""/>
          <br />
          <br />
          <Card.Title> {org.supplierName} </Card.Title>
          <Card.Subtitle> {org.type} </Card.Subtitle>
          <br />
          <h6 className="text-muted smallHeader"> Description </h6>
          <Card.Text> {org.description} </Card.Text>
          <br />
          <h6 className="text-muted"> Type of Work </h6>
          <div>
            {org.areaOfWork.map((area) => {
              return (
                <p className="pillBadge" key={area}>
                  {area}
                </p>
              )
            })}
          </div>
          <br />
          <h6 className="text-muted"> Address </h6>
          <CheckOldOrNewAddress address={org.address} />
          <br />
          <h6 className="text-muted"> Donation Info </h6>
          {org.bankingDetails.accountNumber !== "" &&
            <BankingDetails bankingDetails={org.bankingDetails}/>
          }
          {org.bankingDetails.easyPaisa !== "" &&
            <EasyPaisaDetails easyPaisa={org.bankingDetails.easyPaisa} />
          }
          {org.bankingDetails.jazzCash !== "" &&
            <JazzCashDetails jazzCash={org.bankingDetails.jazzCash}/>
          }
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
          {org.supplierWebsite !== "" && (
          <Fragment>
          <h6 className="text-muted"> Website </h6>
          <a bref={org.supplierWebsite} key={org.supplierWebsite} target="_blank" rel="noopener noreferrer" className="icon"> <FontAwesomeIcon icon={faGlobe}/></a>
          </Fragment>
        )
        }
        <SocialMediaIcons supplier={org} />
        <WhichLogo icon={org.facebookURL} />
        <WhichLogo icon={org.twitterURL} />
        <WhichLogo icon={org.instagramURL} />
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