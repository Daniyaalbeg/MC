import React from 'react';

import CreateComment from './createComment.component';

import { formatDate } from '../../../utilities/dateUtilities.component';

const ProjectCommentsPanel = ({ project }) => {
  return (
    <div className="mainProjectCommentsContainer">
      {
        project.comments.map((comment) => {
          return <ProjectComment key={comment._id} comment={comment} />
        })
      }
    <CreateComment project={project} />
    </div>
  )
}

const ProjectComment = ({ comment }) => {
  return (
    <div className="projectComment">
      <p className="projectCommentContent"> {comment.content} </p>
      <p className="projectCommentData"> Posted by {comment.createdByName} at {formatDate(new Date(comment.createdAt), true, '/')} </p>
    </div>
  )
}

export default ProjectCommentsPanel