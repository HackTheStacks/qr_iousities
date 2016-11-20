import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import styles from './styles.scss';
import axios from 'axios';

class Artifact extends Component {
    render() {
      const {itemId} = this.props;
        return (
            <div className={styles.row}>
                <Link to={{ pathname: `/edit/${itemId}`}}><div className={styles.Title}>{this.props.title}</div></Link>
                <div className={styles.shortUrl}>{this.props.shortUrl}</div>
                <div className={styles.url}>{this.props.longUrl}</div>
            </div>
        );
    }
}

Artifact.propTypes = {
    id: PropTypes.number.isRequired,
    itemId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    descriptor: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    longUrl: PropTypes.string.isRequired,
};

export default Artifact;
