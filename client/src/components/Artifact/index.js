import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import styles from './styles.scss';
import axios from 'axios';

class Artifact extends Component {
    render() {
        return (
            <div className={styles.row}>
                <Link to={`/edit/${this.props.id}`}><div className={styles.Title}>{this.props.Title}</div></Link>
                <div className={styles.shortUrl}>{this.props.ShortUrl}</div>
                <div className={styles.url}>{this.props.url}</div>
            </div>
        );
    }
}

Artifact.propTypes = {
    id: PropTypes.number.isRequired,
    itemId: PropTypes.string,
    Title: PropTypes.string.isRequired,
    descriptor: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export default Artifact;
