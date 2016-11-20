
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import config from '../../config';
// import styles from './styles.scss';

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artifactUrl: '',
      artifact: {
          Id: 1,
          ItemID: 'Something_1',
          Title: 'Artifact',
          Descriptor: 'Something something something',
          ShortUrl: 'https://here.com',
          LongUrl: 'https://nytimes.com'
      },
      isArtifactUrlChanged: false
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnUpdate = this.handleOnUpdate.bind(this);
    this.handleGetQRCode = this.handleGetQRCode.bind(this);
  }

  componentWillMount() {
    axios.post(`${config.apiUrl}/get_artifact`, {
      longUrl: this.state.artifactUrl
    })
    .then((data) => {
      this.setState({
        artifact: data
      });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleOnChange(event){
    this.setState({
      artifactUrl: event.target.value,
      isArtifactUrlChanged: true
    });
  }

  handleOnUpdate(){
    event.preventDefault();
    axios.post(`${config.apiUrl}/update_artifact`, {
      longUrl: this.state.artifactUrl
    })
    .then((data) => {
      this.handleResult(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleGetQRCode() {
    axios.post(`${config.apiUrl}/get_qrimg/${this.state.artifact.longUrl}`)
      .then((data) => {
        <div>data</div>
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handleResults(data) {
    return (
      <div>data</div>
    );
  }

    render() {
      return (
        <section>
          <Link to="/"><button>Return to home</button></Link>
          <h1>{this.state.artifact.Title}</h1>
          <div>
            URL:
            <input type="text" value={this.state.artifact.LongUrl} onChange={this.handleOnChange} />
          </div>
          {this.state.isArtifactUrlChanged ? <button onSubmit={this.handleOnUpdate}>Update</button> : null}
          <div>
            short URL: {this.state.artifact.ShortUrl}
          </div>
          <div>{this.handleGetQRCode}</div>
          <button>Delete</button>
          <button>Print</button>
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
