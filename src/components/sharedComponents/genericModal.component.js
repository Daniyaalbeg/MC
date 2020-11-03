import React from 'react';
import { createPortal } from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/pro-solid-svg-icons'

const GenericModal = ({ showModal, children }) => {
  return (
    <div className="genericModalBG" onClick={() => showModal(false)}>
      <div className="genericModal" onClick={(e) => e.stopPropagation()}>
        <FontAwesomeIcon icon={faTimesCircle} size="2x" className="modalCloseButton" onClick={() => showModal(false)} />
        {children}
      </div>
    </div>
  )
}

export const GenericModalNew = ({ scheme="light", showModal, children }) => {
  return (
    <div className="genericModalBGRoot" onClick={() => showModal()}>
      <div className="genericModalRoot" style={{
        backgroundColor: (scheme==="light" ? "#FFFFFF" : "#2b353a"),
        color: (scheme==="light" ? "#040404" : "whitesmoke")
      }} onClick={(e) => e.stopPropagation()}>
        <FontAwesomeIcon icon={faTimesCircle} size="2x" className={"modalCloseButton" + (scheme==="light" ? " modalCloseButtonLight" : " modalCloseButtonDark")} onClick={() => showModal(false)} />
        {children}
      </div>
    </div>
  )
}

const modalRoot = document.getElementById('modal-root');

export class GenericModalPortal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return createPortal(
      this.props.children,
      this.el
    );
  }
}

export default GenericModal