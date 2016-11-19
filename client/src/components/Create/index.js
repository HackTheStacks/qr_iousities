
import React from 'react';
// import styles from './styles.scss';

function create() {

  handleOnSubmit = () => {
    return;
  };

  return (
    <section>
      <h1> Search </h1>
      <input type="text" className="searchBar" onSubmit={this.handleOnSubmit} />
    </section>
  );
}

export default create;
