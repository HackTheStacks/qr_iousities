import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import styles from './styles.scss';
import axios from 'axios';

class Artifact extends Component {
    render() {
      const {ItemId} = this.props;
        return (
            <div className={styles.row}>
                <Link to={{ pathname: `/edit/${ItemId}`}}><div className={styles.Title}>{this.props.Title}</div></Link>
                <div className={styles.shortUrl}>{this.props.ShortUrl}</div>
                <div className={styles.url}>{this.props.longUrl}</div>
            </div>
        );
    }
}

Artifact.propTypes = {
    Id: PropTypes.number.isRequired,
    ItemId: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Descriptor: PropTypes.string.isRequired,
    ShortUrl: PropTypes.string.isRequired,
    LongUrl: PropTypes.string.isRequired,
};

export default Artifact;
