
import React, { PropTypes } from 'react';
import styles from './styles.scss';

function App({ children }) {
    return (
        <div>
            <div className={styles.header}>
                <div className={styles.content}>
                    <div className={styles.logo}></div>
                    QRiousities
                </div>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}

App.propTypes = {
    children: PropTypes.node,
};

export default App;
