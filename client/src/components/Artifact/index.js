
import React, {Component, PropTypes} from 'react';
import styles from './styles.scss';
import axios from 'axios';

class Artifact extends Component {
    render() {
        return (
            <div>
                <div className={styles.id}>{this.props.id}</div>
                <div className={styles.itemId}>{this.props.itemId}</div>
                <div className={styles.name}>{this.props.name}</div>
                <div className={styles.descriptor}>{this.props.descriptor}</div>
                <div className={styles.shortUrl}>{this.props.shortUrl}</div>
                <div className={styles.longUrl}>{this.props.longUrl}</div>
                <div className={styles.onDelete}>{this.props.onDelete}</div>
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
    longUrl: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};


export default Artifact;
