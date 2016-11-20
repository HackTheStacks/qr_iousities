
import React from 'react';
import styles from './styles.scss';
import Artifact from '../Artifact';
import axios from 'axios';
import config from '../../config';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artifacts: []
        };
    }
    componentWillMount() {
        axios
            .get(`${config.apiUrl}/???`)
            .then(resp => {
                this.setState({artifacts: resp});
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
        const artifacts = this.state.artifacts.map(a => {
            return <Artifact id={a.TableID} itemId={a.ItemID}
                name={a.Name} descriptor={a.Descriptor}
                shortUrl={a.ShortUrl}
                url={a.LongUrl}
                onDelete={id => this.onDelete(a.TableID)}
                />
        });

        return (
            <div>{artifacts}</div>
        );
    }
}

export default List;
