import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getOrgInfo } from '../Actions/getOrgInfoActions';

const OrganisationsView = ({dispatch, loading, hasErrors, fetched, orgInfo}) => {
  
  useEffect(() => {
    if (!fetched && !loading) {
      dispatch(getOrgInfo());
    }
  });

  return (
    <p> hello world </p>
  )
}

const MapStateToProps = (state) => ({
  loading: state.orgInfo.loading,
  hasErrors: state.orgInfo.hasErrors,
  fetched: state.orgInfo.fetched,
  orgInfo: state.orgInfo.orgInfo
})

export default connect(MapStateToProps)(OrganisationsView);