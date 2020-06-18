import React from 'react';

import '../../css/generalErrors.css';

class GeneralError extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.log(info)
    console.log(error)
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="generalErrorContainer">
          <h1> An error occurred, please try refreshing the page or email info@ministryofchange.org </h1>
        </div>
      )
    }
    return this.props.children;
  }
}

export default GeneralError