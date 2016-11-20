import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import styles from './styles.scss';
import axios from 'axios';
import config from '../../config';

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class Stats extends Component {

    constructor(props) {
      super(props);
      this.state = {
        data: []
      }
    }
    componentDidMount() {
            axios
            .get(`${config.apiUrl}/stats/${this.props.params.id}`)
            .then(resp => {
                this.setState({data: this.formatData(resp.data) });
            });
    }

    formatData(data) {
        return data.map(d => ({
          hour: `${d.x}`,
          visitors: d.y
        }));
    }

    render() {
        return (
            <LineChart width={600} height={300} data={this.state.data}
                margin={{top: 30, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="hour"/>
                <YAxis dataKey="visitors"/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="visitors" stroke="#8884d8" activeDot={{r: 8}}/>
                </LineChart>
        )
    }
}

export default Stats;
