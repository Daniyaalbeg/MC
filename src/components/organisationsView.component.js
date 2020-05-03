import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrgInfo } from '../Actions/getOrgInfoActions';
import { Card, Spinner, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/pro-solid-svg-icons'
import { faSearch, faFilter } from '@fortawesome/pro-light-svg-icons';
import { filterAndSearchOrg } from '../components/homeView/filterAndSearch';
import { filterOrgEvents, searchOrgEvents} from '../Actions/filterSearchOrgAction';

import imagePlaceholder from '../assets/Images/temp.jpg'
import '../css/organisationsView.css';

const OrganisationsView = ({ dispatch, loading, hasErrors, fetched, orgInfo }) => {
	const onSearchChange = (event) => {
    dispatch(searchOrgEvents(event.target.value))
  }

  const onFilterChange = (event) => {
    dispatch(filterOrgEvents(event.target.value))
  }

  useEffect(() => {
    if (!fetched && !loading) {
      dispatch(getOrgInfo());
    }
  });
  
	if (loading) {
		return (
			<div className="spinnerThing">
				<Spinner animation="border" role="status">
					<span className="sr-only">Loading...</span>
				</Spinner>
			</div>
		)
	}

	if(fetched && !loading){
		return (
			<Fragment>
			<div className="headingContainer">
				<h1 className="heading"> Organisations </h1>
			</div>
			<hr className="titleLine"/>
			<div className="bars">

			<form className="searchBarContainer1">
        <FontAwesomeIcon icon={faSearch} className="searchIcon1"/>
        <input type='text' className="searchBar1" onChange={onSearchChange}/>
        <FontAwesomeIcon icon={faFilter} className="filterIcon1"/>
        <div className="filterSelect1">
          <select onChange={onFilterChange}>
            <option value="all"> all </option>
            <option value ="Armed Forces">Armed Forces</option>
            <option value="Community">Community</option>
            <option value="Corporate">Corporate</option>
            <option value="Civil Society">Civil Society</option>
            <option value="Government">Government</option>
            <option value="Individual">Individual</option>
            <option value="NGO">NGO</option>
          </select>
        </div>
      </form>
			</div>
			<OrgCards orgs={orgInfo} dispatch={dispatch} />
			</Fragment>
		)
	}
	
  return (
    <div className="spinnerThing">
			<Spinner animation="border" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>
		</div>
  )
}

const OrgCards = (props) => {
	return (
		<div className="biggerCardContainer">
				<div className="cardContainer">
					{props.orgs.map((org) => {
						return (
							<Link to={'/organisations/' + org._id} className="orgViewLink">
							<Card className="cardOrg grow" key={org._id}>
								<Card.Img className="cardImage" variant="top" src={org.supplierImageURL !== undefined ? org.supplierImageURL : imagePlaceholder} alt=""/>
								<Card.Body>
									<Card.Title className="headerText"> {org.supplierName} </Card.Title>
								</Card.Body>
								<Card.Footer className="footerText">
									<small className="text-muted"> {org.type} </small>
								</Card.Footer>
							</Card>
							</Link>
						)
					})}
				</div>
			</div>
	)
}


const MapStateToProps = (state) => ({
  loading: state.orgInfo.loading,
  hasErrors: state.orgInfo.hasErrors,
	fetched: state.orgInfo.fetched,
	orgInfo: filterAndSearchOrg(state.orgInfo.orgInfo, state.orgInfo.filter, state.orgInfo.search)
})

export default connect(MapStateToProps)(OrganisationsView);