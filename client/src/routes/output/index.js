import React, { Component } from 'react';
import sentimo from 'api/sentimo';
import Graph from './Graph';


export default class Output extends Component {
    state = {
        data: {},
    }

    render() {
        return (
            <main>
                <Graph data={this.state.data} />       
            </main>
        )
    }

    componentDidMount() {
        sentimo.on('update', data => {
            this.setState({ data });
        });
    }
}
