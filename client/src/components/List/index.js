
import React from 'react';
import styles from './styles.scss';
import Artifact from '../Artifact';
import axios from 'axios';
import config from '../../config';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artifacts: [{
                TableId: 1,
                ItemId: 'uhhh',
                Name: 'hi',
                Descriptor: 'adsfasdfasdf',
                ShortUrl: 'QWErasdf3',
                LongUrl: 'http://nytimes.com'
            }]
        };
    }
    componentWillMount() {
        /*axios
            .get(`${config.apiUrl}/???`)
            .then(resp => {
                this.setState({artifacts: resp});
            });
        */
    }

    onDelete(id) {
        axios
            .delete(`${config.apiUrl}/???/${id}`)
            .then(resp => {
                //TODO remove state
            });
    }

    render() {
        const artifacts = this.state.artifacts.map(a => {
            return <Artifact key={a.TableID} itemId={a.ItemID}
                name={a.Name} descriptor={a.Descriptor}
                shortUrl={a.ShortUrl}
                url={a.LongUrl}
                onDelete={id => this.onDelete(a.TableID)}
                />
        });

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.name}>Name</div>
                    <div className={styles.qrcode}>QR Code</div>
                    <div className={styles.url}>URL</div>
                    <div className={styles.shortUrl}>Short URL</div>
                    <div className={styles.delete}>Delete</div>
                </div>
                {artifacts}
            </div>
        );
    }
}

export default List;
