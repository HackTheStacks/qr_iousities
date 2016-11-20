
import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import styles from './styles.scss';

function App({ children }) {
  return (
    <div className={styles.content}>
      {children}
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
