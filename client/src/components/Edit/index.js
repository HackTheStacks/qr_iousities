
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import config from '../../config';
// import styles from './styles.scss';

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artifactUrl: 'something',
      isArtifactUrlChanged: false
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    this.setState({
      artifactUrl: event.target.value
    });
  }

  handleOnSubmit(event) {
    event.preventDefault();

    axios.post(`${config.apiUrl}/update_artifact`, {
      longUrl: this.state.artifactUrl
    })
    .then((data) => {
      console.log(data);
      this.setState({
        artifact: data
      })
    })
    .catch((err) => {
      console.log(err);
    })
  };


  handleResult() {
    console.log('results');
    return (
      <div>{this.state.artifactUrl}</div>
    );
  }

    render() {
      return (
        <section>
          <Link to="/"><button>Return to home</button></Link>
          <h1>Search</h1>
          <form onSubmit={this.handleOnSubmit}>
            <div>Please input the url that you would update the QR code to:</div>
            <input type="text" value={this.state.artifactUrl} onChange={this.handleOnChange} className="searchBar" />
            <input type="submit" value="Update"/>
          </form>
          {this.state.isArtifactUrlChanged ? this.handleResult : null}
        </section>
    );
  }
}

Edit.defaultProps = {
  id: null
};

Edit.propTypes = {
  id: PropTypes.string
};

export default Edit;
