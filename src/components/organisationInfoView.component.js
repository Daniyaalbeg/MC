import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Card, Badge, Button, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { BankingDetails, EasyPaisaDetails, JazzCashDetails, SocialMediaIcons, WhichLogo } from './loginAccountComponents/supplierInfoView.component';
import { getOrgInfo } from '../Actions/getOrgInfoActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/pro-solid-svg-icons'
import imagePlaceholder from '../assets/Images/temp.jpg'


import '../css/organistaionInfoView.css'

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
      <Card className="orgInfoCard">
        <Card.Body>
          <Button className="backButtonOrgView" onClick={() => {
            props.history.goBack()
          }}>
            Back 
          </Button>
          <Card.Img className="orgInfoImage" variant="top" src={org.supplierImageURL !== undefined ? org.supplierImageURL : imagePlaceholder} alt=""/>
          <hr />
          <Card.Title> {org.supplierName} </Card.Title>
          <Card.Subtitle> {org.type} </Card.Subtitle>
          <hr />
          <h6 className="text-muted smallHeader"> Description </h6>
          <Card.Text> {org.description} </Card.Text>
          <hr />
          <h6 className="text-muted"> Type of Work </h6>
          <div>
            {org.areaOfWork.map((area) => {
              return (
                <Badge pill variant="primary" className="pillBadge" key={area}>
                  {area}
                </Badge>
              )
            })}
          </div>
          <hr />
          <h6 className="text-muted"> Address </h6>
          <Card.Text> {org.address} </Card.Text>
          <Card.Text>  </Card.Text>
          <hr />
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
          <hr />
          <h6 className="text-muted"> Point of Contact </h6>
          <Card.Text> {org.contactName} </Card.Text>
          <Card.Text> {org.contactNumber} </Card.Text>
          <hr />
          <h6 className="text-muted"> Other Contact Info </h6>
          <Card.Text> {org.contactInfo} </Card.Text>
          <hr />
          {org.supplierWebsite !== "" && (
          <Fragment>
          <h6 className="text-muted"> Website </h6>
          <a href={org.supplierWebsite} key={org.supplierWebsite} target="_blank" rel="noopener noreferrer" className="icon"> <FontAwesomeIcon icon={faGlobe}/></a>
          </Fragment>
        )
        }
        <SocialMediaIcons supplier={org} />
        <WhichLogo icon={org.facebookURL} />
        <WhichLogo icon={org.twitterURL} />
        <WhichLogo icon={org.instagramURL} />
        </Card.Body>
      </Card>
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