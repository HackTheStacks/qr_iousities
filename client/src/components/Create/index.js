
import React from 'react';
import axios from 'axios';
import config from '../../config';
import styles from './styles.scss';

const FORMATS_BY_TYPE = {
    BHL: {
        regex: new RegExp('http://www.biodiversitylibrary.org/page'),
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
      artifactUrl: 'something',
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
      longUrl: this.state.artifactUrl
    })
    .then((data) => {
      console.log(data);
      this.setState({
          artifact: data,
          status: 'success'
      })
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

    render() {
        let message;
        switch(this.state.status) {
          case 'error': message = this.getErrorMessage(); break;
          case 'success': message = this.getSuccessMessage(); break;
          default: message = this.getInstructionMessage(); break;
        }

      return (
        <section>
          <h1>Create</h1>
          {message}
          <form onSubmit={this.handleOnSubmit}>
              <div className={styles.searchInputContainer}>
                <select onChange={this.handleClickDropdown} value={this.state.type}>
                  <option value="BHL">BHL</option>
                </select>
                <input type="text" value={this.state.artifactUrl} onChange={this.handleOnChange} className={styles.searchInput} />
                <input type="submit" value="Save" className={styles.searchButton}/>
              </div>
          </form>
          {this.state.artifact ? this.handleResults : null}
        </section>
    );
  }
}
export default Create;
