import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrgInfo } from '../../Actions/getOrgInfoActions';
import { Card, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter } from '@fortawesome/pro-light-svg-icons';
import { filterAndSearchOrg } from '../utilities/filterAndSearch';
import { filterTypeOrg, filterProjectOrg, searchOrg} from '../../Actions/filterSearchOrgAction';
import { FilterAreaOfWork, FilterOrgType } from '../utilities/filterOptions'
import createStarRing from '../utilities/starRing'

import imagePlaceholder from '../../assets/Images/temp.jpg'
import '../../css/organisationsView.css';

const OrganisationsView = ({ dispatch, loading, hasErrors, fetched, orgInfo }) => {
	const onSearchChange = (event) => {
    dispatch(searchOrg(event.target.value))
  }

  const onFilterChangeType = (event) => {
    dispatch(filterTypeOrg(event.target.value))
	}
	
	const onFilterChangeProject = (event) => {
    dispatch(filterProjectOrg(event.target.value))
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
			<div className="organisationViewContainer">
			<div className="headingContainer">
				<h1 className="heading"> Organisations </h1>
			</div>
			<br />
			<div className="bars">

			<form className="searchBarContainer1">
        <FontAwesomeIcon icon={faSearch} className="searchIcon1"/>
        <input type='text' className="searchBar1" onChange={onSearchChange}/>
        <FontAwesomeIcon icon={faFilter} className="filterIcon1"/>
        <div className="filterSelect1" style={{marginRight: "10px"}}>
					<FilterOrgType onChange={onFilterChangeType} />
        </div>
				<FontAwesomeIcon icon={faFilter} className="filterIcon1"/>
        <div className="filterSelect1">
					<FilterAreaOfWork onChange={onFilterChangeProject} />
        </div>
      </form>
			</div>
			<OrgCards orgs={orgInfo} dispatch={dispatch} />
			</div>
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
							<Link to={'/organisations/' + org._id} className="orgViewLink" key={org._id}>
							<Card className="cardOrg grow" key={org._id}>
								<div className="starContainer">
									{/* {createStarRing(Math.random() > 0.4, Math.random() > 0.4, Math.random() > 0.4, Math.random() > 0.4, Math.random() > 0.4, Math.random() > 0.4)} */}
									{createStarRing(org.verifiedStepA, org.verifiedStepB, org.verifiedStepC, org.verifiedStepD, org.verifiedStepE, (org.verifiedStepA && org.verifiedStepB && org.verifiedStepC && org.verifiedStepD && org.verifiedStepE))}
								</div>
								<Card.Img className="cardImage" variant="top" src={org.supplierImageURL ? org.supplierImageURL : imagePlaceholder} alt=""/>
								<Card.Body>
									<p className="headerText"> {org.supplierName} </p>
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
	orgInfo: filterAndSearchOrg(state.orgInfo.orgInfo, state.orgInfo.filterType, state.orgInfo.filterProject, state.orgInfo.search)
})

export default connect(MapStateToProps)(OrganisationsView);