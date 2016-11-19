
import React from 'react';
// import styles from './styles.scss';

function create() {

  handleOnSubmit = (artifactUrl) => {
    axios.post('/get_artifact', {
      longUrl: artifactUrl
    })
      .then((data) => {
          console.log(data);
      });
  };

  return (
    <section>
      <h1> Search </h1>
      <input type="text" className="searchBar" onSubmit={(artifactUrl) => this.handleOnSubmit} />
    </section>
  );
}

export default create;
