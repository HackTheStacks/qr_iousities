
import React from 'react';
import {browserHistory, Link} from 'react-router';
import axios from 'axios';
import config from '../../config';
import routes from '../../routes';
import styles from './styles.scss';

class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      longUrl: '',
      artifact: null,
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.displayArtifact = this.displayArtifact.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePrint = this.handlePrint.bind(this);
  }

  componentWillMount() {
    console.log("component mounting");
    axios.post(`${config.apiUrl}/get_artifact`, {
      itemId: this.props.params.itemId
    })
    .then((data) => {
      console.log('data received', data);
      this.setState({
        artifact: data
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  displayArtifact() {
    const {
      id,
      itemId,
      title,
      descriptor,
      shortUrl,
      longUrl
    } = this.state.artifact.data

    return (
      <div>
        <h4>{title}</h4>
        <div>{descriptor}</div>
      </div>
    )
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

  handleDelete(event) {
    event.preventDefault();

    axios.post(`${config.apiUrl}/delete_artifact`, {
      itemId: this.props.params.itemId
    })
    .then((data) => {
      console.log('deleted');
      browserHistory.push('/');
    })
    .catch((err) => {
      console.log(err);
      return(
        <div>Sorry, an error occured. Your item was not deleted</div>
      )
    })
  }

  handlePrint() {
    event.preventDefault();
    console.log('print?');
  }

  render() {
    return (
      <section>
        <div className={styles.meta}>
          <Link to="/">Return to home</Link>
        </div>
        <h1>Manage</h1>
        {this.state.artifact ? this.displayArtifact() : null}
        <form onSubmit={this.handleOnSubmit}>
          <div>Please input the new url the QA code that item: {this.props.params.itemId} will redirect to</div>
          <br />
          <div className={styles.searchInputContainer}>
            <input className={styles.searchInput} type="text" value={this.state.LongUrl} onChange={this.handleOnChange} />
            <input className={styles.searchButton} type="submit" value="Update" />
          </div>
        </form>
        <br />
        <div className={styles.optionsInputContainer}>
          <form onSubmit={this.handlePrint}>
            <input className={styles.printButton} type="submit" value="Print this QR code" />
          </form>
          <form onSubmit={this.handleDelete}>
            <input className={styles.deleteButton} type="submit" value="Delete this QR code" />
          </form>
        </div>
      </section>
  )}
}
export default Create;
