
import React from 'react';
import axios from 'axios';
// import styles from './styles.scss';

class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artifactUrl: 'something',
      artifact: null
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

    axios.post('/get_artifact', {
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
          <h1>Search</h1>
          <form onSubmit={this.handleOnSubmit}>
            <div>Please input the artifact you would like to find as a url.</div>
            <input type="text" value={this.state.artifactUrl} onChange={this.handleOnChange} className="searchBar" />
            <input type="submit" value="Search"/>
          </form>
          {this.state.artifact ? this.handleResults : null}
        </section>
    );
  }
}
export default Create;
