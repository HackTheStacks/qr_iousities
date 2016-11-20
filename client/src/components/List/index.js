
import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';

import styles from './styles.scss';

import Artifact from '../Artifact';

import config from '../../config';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artifacts: [{
                id: 1,
                itemId: 'uhhh',
                title: 'hi',
                descriptor: 'adsfasdfasdf',
                shortUrl: 'QWErasdf3',
                longUrl: 'http://nytimes.com'
            }]
        };
    }

    componentWillMount() {
        axios
            .get(`${config.apiUrl}/get_all_artifacts`)
            .then(resp => {
              this.setState({artifacts: resp.data});
            })
            .catch((err) => {
              console.log(err);
            })
    }

    onDelete(id) {
        axios
            .delete(`${config.apiUrl}/???`)
            .then(resp => {
                //TODO remove state
            });
    }

    render() {
      let artifacts = ''
      if (this.state.artifacts) {
        artifacts = this.state.artifacts.map(a => {
            return (
              <Artifact
                key={a.id}
                id={a.id}
                itemId={a.itemId}
                title={a.title}
                descriptor={a.descriptor}
                shortUrl={a.shortUrl}
                longUrl={a.longUrl}
              />
            )
        });
      }

        return (
            <div className={styles.container}>
                <div className={styles.meta}>
                  <Link className={styles.button} to="/create">Create a new QR code</Link>
                </div>
                <div className={styles.header}>
                    <div className={styles.name}>Name</div>
                    <div className={styles.url}>URL</div>
                    <div className={styles.shortUrl}>Short URL</div>
                    <div className={styles.stats}>Stats</div>
                </div>
                {artifacts}
            </div>
        );
    }
}

export default List;
