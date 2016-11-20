import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import styles from './styles.scss';
import axios from 'axios';

class Artifact extends Component {
    render() {
        return (
            <div className={styles.row}>
                <Link to={`/edit/1`}><div className={styles.name}>{this.props.name}</div></Link>
                <div className={styles.qrcode}>{this.props.qrcode}</div>
                <div className={styles.shortUrl}>{this.props.shortUrl}</div>
                <div className={styles.url}>{this.props.url}</div>
                <div className={styles.delete} onClick={this.props.onDelete}>×</div>
            </div>
        );
    }
}

Artifact.propTypes = {
    id: PropTypes.number.isRequired,
    itemId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    descriptor: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Artifact;
