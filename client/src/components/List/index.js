
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
                Id: 1,
                ItemId: 'uhhh',
                Title: 'hi',
                Descriptor: 'adsfasdfasdf',
                ShortUrl: 'QWErasdf3',
                LongUrl: 'http://nytimes.com'
            }]
        };
    }

    componentWillMount() {
        axios
            .get(`${config.apiUrl}/get_all_artifacts`)
            .then(resp => {
              console.log(resp);
              this.setState({artifacts: resp.data});
            });
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
                key={a.Id}
                id={a.Id}
                itemId={a.ItemID}
                Title={a.Title}
                descriptor={a.Descriptor}
                shortUrl={a.ShortUrl}
                url={a.LongUrl}
              />
            )
        });
      }

        return (
            <div className={styles.container}>
                <div className={styles.meta}>
                  <Link className={styles.button} to="/create">Create a new QA code</Link>
                </div>
                <div className={styles.header}>
                    <div className={styles.name}>Name</div>
                    <div className={styles.url}>URL</div>
                    <div className={styles.shortUrl}>Short URL</div>
                </div>
                {artifacts}
            </div>
        );
    }
}

export default List;
