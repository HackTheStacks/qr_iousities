
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import config from '../../config';
import styles from './styles.scss';

const FORMATS_BY_TYPE = {
    BHL: {
        regex: new RegExp('https://www.biodiversitylibrary.org/item'),
        examples: [
            'https://www.biodiversitylibrary.org/item/16800',
            'https://www.biodiversitylibrary.org/item/16800#page/5/mode/1up'
        ]
    }
};

class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artifactUrl: '',
      artifact: null,
      type: 'BHL',
      status: null
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleClickDropdown = this.handleClickDropdown.bind(this);
  }

  handleOnChange(event) {
    this.setState({
      artifactUrl: event.target.value
    });
  }

  handleClickDropdown(event) {
    this.setState({
      type: event.target.value
    })
  }

  handleOnSubmit(event) {
    event.preventDefault();
      const format = FORMATS_BY_TYPE[this.state.type];
      this.setState({status: null});

      if(!format.regex.test(this.state.artifactUrl)) {
          this.setState({status: 'error'});
          return;
      }


    axios.post(`${config.apiUrl}/get_artifact`, {
      longUrl: this.state.artifactUrl,
      type: this.state.artifactUrl
    })
    .then((resp) => {
      this.setState({
          artifact: resp.data,
          status: 'success'
      });
      this.getQRCode();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getSuccessMessage() {
    return (
        <div className={styles.success}>
            Saved!
        </div>
    );
  }

  getErrorMessage() {
      const exampleUrls = FORMATS_BY_TYPE[this.state.type].examples.map((url, i) => {
          return <li key={i} className={styles.errorItem}>{url}</li>
      });

    return (
      <div className={styles.error}>
        <div className={styles.errorMessage}>URLs must be in the following formats:</div>
        {exampleUrls}
      </div>
    );
  }

  getInstructionMessage() {
    return <div className={styles.instructions}>Please input the artifact you would like to find as a url.</div>;
  }

  handleResults() {
    return (
      <div>{this.state.artifactUrl}</div>
    );
  }

  getQRCode() {
      console.info(this.state.artifact);
    console.info(`${config.apiUrl}/get_qrimg/${this.state.artifact.ShortUrl}`);
    axios.get(`${config.apiUrl}/get_qrimg/${this.state.artifact.ShortUrl}`)
    .then((resp) => {
      this.setState({
          qrCode: resp.data,
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

    render() {
        const placeholder = `e.g. ${FORMATS_BY_TYPE[this.state.type].examples[0]}`;
        const qrCode = this.state.qrCode ? <img className={styles.qrcode} src={this.state.qrCode}/> : null;
        let message;
        switch(this.state.status) {
          case 'error': message = this.getErrorMessage(); break;
          case 'success': message = this.getSuccessMessage(); break;
          default: message = this.getInstructionMessage(); break;
        }

      return (
        <section>
          <Link to="/"><button>Return to home</button></Link>
          <h1>Create</h1>
          {message}
          <form onSubmit={this.handleOnSubmit}>
              <div className={styles.searchInputContainer}>
                <select onChange={this.handleClickDropdown} value={this.state.type}>
                  <option value="BHL">BHL</option>
                </select>
                <input type="text" placeholder={placeholder} value={this.state.artifactUrl} onChange={this.handleOnChange} className={styles.searchInput} />
                <input type="submit" value="Save" className={styles.searchButton}/>
              </div>
          </form>
          {qrCode}
        </section>
    );
  }
}
export default Create;
