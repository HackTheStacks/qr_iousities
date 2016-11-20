
import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import config from '../../config';
// import styles from './styles.scss';

class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      longUrl: '',
      artifact: null,
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentWillMount() {
    axios.post(`${config.apiUrl}/get_artifact`, {
      itemId: this.props.params.itemId
    })
    .then((data) => {
      this.setState({
        artifact: data
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleOnChange(event) {
    this.setState({
      longUrl: event.target.value
    });
  }

  handleOnSubmit(event) {
    event.preventDefault();
    axios.post(`${config.apiUrl}/update_artifact`, {
      itemId: this.props.params.itemId,
      longUrl: this.state.longUrl
    })
    .then((data) => {
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
      <div>{this.state.artifact}</div>
    );
  }

    render() {
      return (
        <section>
          <Link to="/"><button>Return to home</button></Link>
          <h1>Search</h1>
          <form onSubmit={this.handleOnSubmit}>
            <div>Please input the new url the QA code that item: {this.props.params.itemId} will redirect to</div>
            <input type="text" value={this.state.LongUrl} onChange={this.handleOnChange} className="searchBar" />
            <input type="submit" value="Search"/>
          </form>
          {this.state.artifact ? this.handleResults : null}
        </section>
    );
  }
}
export default Create;
