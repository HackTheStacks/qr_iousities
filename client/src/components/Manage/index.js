
import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import config from '../../config';
// import styles from './styles.scss';

class Manage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artifactUrl: 'something',
      artifact: null,
      type: ''
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

    axios.post(`${config.apiUrl}/get_artifact`, {
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


  handleResults() {
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
            <div>Please input the artifact you would like to find as a url.</div>
            <select onChange={this.handleClickDropdown} value={this.state.type}>
              <option value="BHL">BHL</option>
            </select>
            <input type="text" value={this.state.artifactUrl} onChange={this.handleOnChange} className="searchBar" />
            <input type="submit" value="Search"/>
          </form>
          {this.state.artifact ? this.handleResults : null}
        </section>
    );
  }
}
export default Manage;
