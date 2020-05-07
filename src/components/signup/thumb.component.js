import React from 'react';


class Thumb extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      thumb: undefined,
      file: undefined
    };

    console.log("a")
    if (!props.file) { return; }
    if (props.file instanceof String || typeof props.file === "string") {
      this.state = { thumb: props.file}
    }  else {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.state = { loading: false, thumb: reader.result };
      };

      reader.readAsDataURL(props.file);
    }
  }


  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) { return; }
    if (nextProps.file instanceof String || typeof nextProps.file === "string") {
      this.setState({ thumb: nextProps.file})
    }  else {
      this.setState({ loading: true }, () => {
        let reader = new FileReader();
  
        reader.onloadend = () => {
          this.setState({ loading: false, thumb: reader.result });
        };
  
        reader.readAsDataURL(nextProps.file);
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { file } = this.props;
    const { loading, thumb } = this.state;
    if (file === null) { return true}
    if (loading) { return true }
    if (file.name === nextProps.file.name) {
      return false
    }
  }

  render() {
    const { file } = this.props;
    const { loading, thumb } = this.state;

    if (!file) { return null; }

    if (loading) { return <p>loading...</p>; }

    return (<img src={thumb}
      alt={file.name}
      className="img-thumbnail mt-2"
      height={200}
      width={200} />);
  }
}

export default Thumb