import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import styles from './styles.scss';
import axios from 'axios';
import config from '../../config';
import { AreaChart } from 'react-d3';

class Stats extends Component {

    componentWillMount() {
       axios
            .get(`${config.apiUrl}/stats/${this.props.params.id}`)
            .then(resp => {
              this.setState({data: this.formatData(resp)});
            });
    }

    formatData(data) {
    }

    render() {
        const options = {
            x: 0,
            y: 0,
            heigth: 400,
            width: 500
        };

        return (
            <AreaChart
              data={this.state.data}
              width="100%"
              height={300}
              viewBoxObject={options}
              xAxisTickInterval={{unit: 'hour', interval: 2}}
              title="Area Chart"
                />
        );
    }
}

export default Stats;
