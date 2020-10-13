import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { creatingComment } from '../../../../Actions/projectActions';

const CreateComment = ({ dispatch, auth, project, loading, hasErrors, success }) => {
  if (auth) {
    return (
      <form onSubmit={(e) => {
        e.preventDefault()
        const comment = {
          content: document.getElementById('comment').value
        }
        document.getElementById('comment').value = null
        dispatch(creatingComment(comment, project._id))
      }}>
        <textarea required className="commentInputText" id="comment" type="text" rows="4" placeholder="Comment Here">
        </textarea>
        <button type="submit" className="standardButtonWithoutColour mcGreenBG">
          {
            loading ?
            "Posting"
            :
            "Post"
          }
        </button>
        {hasErrors &&
          <p className="redError"> An error occurred. Please try again or contact support. </p>
        }
      </form>
    )
  }

  return (
    <p className="commentMustBeLoggedIn"> You must be signed up and logged in to post a comment. <Link to='/dashboard'> Sign up </Link> </p>
  )
}

const MapStateToProps = (state, ownProps) => ({
  auth: state.auth.auth,
  loading: state.projectInfo.mainProjectCreate.loading,
  hasErrors: state.projectInfo.mainProjectCreate.hasErrors,
  success: state.projectInfo.mainProjectCreate.success,
  props: ownProps
})

export default connect(MapStateToProps)(CreateComment)