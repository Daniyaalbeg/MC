import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import { publishingProject } from '../../../Actions/projectActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/pro-solid-svg-icons';
import GenericModal from '../../sharedComponents/genericModal.component';

const PublishButton = ({ project, loading, success, hasErrors }) => {
  const dispatch = useDispatch()
  const [errorModal, setErrorModal] = useState(false)

  if (!project.published && !success) {
    return (
      <>
      <button className="publishButton standardButtonWithoutColour mcGreenBG" onClick={() => {
        if ((project.supplies && project.supplies.length > 0) || project.funding || project.volunteer) {
          dispatch(publishingProject(project._id))
        } else {
          setErrorModal(true)
        }
      }}>

      {loading ?
      <Spinner animation="border" size="sm" /> 
      :
      <span><FontAwesomeIcon icon={faUpload} style={{textAlign: 'left', marginRight: "0.3em"}}/> Publish </span>
      }

      </button>
      {errorModal &&
        <GenericModal showModal={setErrorModal}>
          <p> Please fill atleast one of the following before publishing: </p>
          <div className="publishButtonListItems">
            <p> Funding </p>
            <p> Volunteer </p>
            <p> Supplies </p>
          </div>
        </GenericModal>
      }
      </>
    )
  } else if (success || (project.published && !project.approved)) {
    return (
      <div className="publishButton standardButtonWithoutColour mcGreenBG">
        <p style={{
          marginBottom: '0',
          color: 'whitesmoke'
        }}> Pending Approval </p>
      </div>
    )
  } else {
    return (
      <div className="publishButton standardButtonWithoutColour mcGreenBG">
        <p style={{
          marginBottom: '0',
          color: 'whitesmoke'
        }}> Published </p>
      </div>
    )
  }



}

const MapStateToProps = (state) => ({
  loading: state.projectInfo.createProject.loading,
  success: state.projectInfo.createProject.success,
  hasErrors: state.projectInfo.createProject.hasErrors
})

export default connect(MapStateToProps)(PublishButton)