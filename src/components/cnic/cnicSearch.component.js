import React, { useRef } from 'react';
import { connect } from 'react-redux';

import CnicSearchResult from './cnicSearchResult.component';
import { getCnic } from '../../Actions/cnicActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/pro-light-svg-icons'

const searchCnicChange = (dispatch, searchInputRef) => {
  if (searchInputRef.current.value !== "") {
    dispatch(getCnic(searchInputRef.current.value))
  }
}

const CnicSearch = ({ dispatch, getLoading, getFetched, getHasError, getHasErrorMessage, cnicInfo }) => {
  const searchInputRef = useRef();

  return (
    <>
    <form onSubmit={
      (e) => { e.preventDefault()
      searchCnicChange(dispatch, searchInputRef)
    }}>
      <div className="searchCnicContainer">
        <div className="searchCnicBox">
          <FontAwesomeIcon icon={faSearch} className="cnicSearchIcon"  spin={getLoading}/>
          <input ref={searchInputRef} type="text" placeholder="CNIC number" className="cnicSearchInput" />
        </div>
        <button className="standardButton cnicSearchButton" > Search </button>
      </div>
    </form>
    <CnicSearchResult getHasError={getHasError} getHasErrorMessage={getHasErrorMessage} cnicInfo={cnicInfo} />
    </>
  )
}

const MapStateToProps = (state) => ({
  getLoading: state.cnicInfo.getLoading,
  getFetched: state.cnicInfo.getFetched,
  getHasError: state.cnicInfo.getHasError,
  getHasErrorMessage: state.cnicInfo.getHasErrorMessage,
  cnicInfo: state.cnicInfo.cnicInfo
})

export default connect(MapStateToProps)(CnicSearch)