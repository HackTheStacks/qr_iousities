
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
      itemId: '',
      artifactUrl: null,
      type: 'BHL',
      status: null
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnArticleURLChange = this.handleOnArticleURLChange.bind(this);
    this.handleOnItemIdChange = this.handleOnItemIdChange.bind(this);
  }

  handleOnArticleURLChange(event) {
    this.setState({
      artifactUrl: event.target.value
    });
  }

  handleOnItemIdChange(event) {
    this.setState({
      itemId: event.target.value
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

    axios.post(`${config.apiUrl}/create_artifact`, {
      itemId: this.state.itemId,
      longUrl: this.state.artifactUrl
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
    return <div className={styles.instructions}>Please input the item id of the artifact you would like to generate a QR code for.</div>;
  }

  handleResults() {
    return (
      <div>{this.state.itemId}</div>
    );
  }

  getQRCode() {
    axios.get(`${config.apiUrl}/get_qrimg/${this.state.itemId}`)
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
            <div className={styles.meta}>
                <Link to="/">Return to home</Link>
            </div>
          <h1>Create</h1>
          {message}
          <form onSubmit={this.handleOnSubmit}>
              <div className={styles.searchInputContainer}>
                  <input type="text" placeholder="Item ID" value={this.state.itemId} onChange={this.handleOnItemIdChange} className={styles.searchInput} />
                  <input type="text" placeholder="URL" value={this.state.artifactUrl} onChange={this.handleOnArticleURLChange} className={styles.searchInput} />
                  <input type="submit" value="Save" className={styles.searchButton}/>
              </div>
          </form>
          {qrCode}
        </section>
    );
  }
}
export default Create;
