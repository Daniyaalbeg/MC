import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';

import CnicUploadOptions from './cnicUploadOptions.component';
import { selectCnicEvent } from '../../Actions/cnicActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'

const AddingCnicInfo = ({ dispatch, selectedCnicEvent, uploadLoading, uploadSuccess, uploadHasErrors, uploadErrorIDs }) => {
  return (
    <>
      <Row className="headingCNIC">
        <h4> Choose how to add CNIC information </h4>
        <button className="standardButton" disabled={uploadLoading} onClick={() => dispatch(selectCnicEvent(null))}> <FontAwesomeIcon icon={faChevronCircleLeft} style={{textAlign: 'left', marginRight: "0.3em"}}/> Back </button>
      </Row>
      <div className="cnicAddContainer">
        <CnicUploadOptions dispatch={dispatch} selectedEvent={selectedCnicEvent} uploadLoading={uploadLoading} uploadSuccess={uploadSuccess} uploadHasErrors={uploadHasErrors} uploadErrorIDs={uploadErrorIDs}/>
      </div>
    </>
  )
}

const MapStateToProps = (state) => ({
  selectedCnicEvent: state.cnicInfo.selectedCnicEvent,
  uploadLoading: state.cnicInfo.uploadLoading,
  uploadSuccess: state.cnicInfo.uploadSuccess,
  uploadHasErrors: state.cnicInfo.uploadHasErrors,
  uploadErrorIDs: state.cnicInfo.uploadErrorIDs,
})

export default connect(MapStateToProps)(AddingCnicInfo);