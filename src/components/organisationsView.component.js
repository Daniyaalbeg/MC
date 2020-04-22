//{type, facebookURL, _id, instagramURL, twitterURL, rationEvents, supplierName, description, address, contactNumber, createdAt, updatedAt, areaOfWork, bankingDetails}
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getOrgInfo } from '../Actions/getOrgInfoActions';
import '../css/organisationsView.css';
import {Card} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import {CardColumns} from 'react-bootstrap';


const OrganisationsView = ({dispatch, loading, hasErrors, fetched, orgInfo}) => {
  
  useEffect(() => {
    if (!fetched && !loading) {
      dispatch(getOrgInfo());
    }
  });
  
	if(loading){
		return(
			<div style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column"
			}}
			>
			<p>Loading Organisations</p><br/>
			<img  src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"></img>
			</div>
		)
	}
	



	if(fetched && !loading){
		return(
			<CardColumns style={{ flex: 1, alignItems:'center'}}>{
					orgInfo.map(
					(org)=>
					<Card className="cardHover" style={{ width: '24rem'}} >
					<Card.Img src={require('../assets/Images/temp.jpg')} style={{height: '12rem' , borderBottom: '1px solid grey'}} variant="top"/>
					<Card.Body>
						<Card.Title>{org.supplierName}</Card.Title>
						<Card.Text>
							{org.address}
						</Card.Text>
						<Button variant="primary">Contact</Button>
						<Button variant="primary" style={{margin: "0.2em"}} href={org.facebookURL}><FontAwesomeIcon icon={faFacebookSquare} /></Button>
						<Button variant="primary" style={{margin: "0.2em"}} href={org.twitterURL}><FontAwesomeIcon icon={faTwitter} /> </Button>
						<Button variant="primary" style={{margin: "0.2em"}} href={org.InstagramURL}><FontAwesomeIcon icon={faInstagram} /></Button>
					</Card.Body>
				</Card>
					)
			}</CardColumns>
		)
	}
	
  return (
    <p>Something has gone wrong please contact support!</p>
  )
}



const MapStateToProps = (state) => ({
  loading: state.orgInfo.loading,
  hasErrors: state.orgInfo.hasErrors,
  fetched: state.orgInfo.fetched,
  orgInfo: state.orgInfo.orgInfo
})

export default connect(MapStateToProps)(OrganisationsView);