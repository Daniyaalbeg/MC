import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteFaq } from '../../../../Actions/projectActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/pro-duotone-svg-icons'


const FaqListItem = ({ faq, project }) => {
  const dispatch = useDispatch()
  return (
    <div className="projectDashCard projectFaqListItem">
      <div>
        <p className="projectTitle"> {faq.question} </p>
        <p className="projectText"> {faq.answer} </p>
      </div>
      <button className="standardButton squareButton redVersion" onClick={() => dispatch(deleteFaq(project, faq._id))}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  )
}

export default FaqListItem