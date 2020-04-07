import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getUserInfo } from '../../Actions/userInfoActions';


const AccountView = ({dispatch, loading, username, email, supplier, approved, createdAt, hasErrors, error}) => {
  
  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch])

  const renderInfo = () => {
    if (loading) return(<h1> Loading Info...</h1>);
    if (hasErrors) return (<h1> Error occured, cannot get user info. Please accept our humblest apologies</h1>);
    return (
    <h2> Welcome {username}</h2>
    )
  }


  return (
    <section>
      {renderInfo()}
    </section>
  )
}

const MapStateToProps = state => ({
  loading: state.userInfo.loading,
  username: state.userInfo.username,
  email: state.userInfo.email,
  supplier: state.userInfo.supplier,
  approved: state.userInfo.approved,
  createdAt: state.userInfo.createdAt,
  hasErrors: state.userInfo.hasErrors,
  error: state.userInfo.error
})

export default connect(MapStateToProps)(AccountView);