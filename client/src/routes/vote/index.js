import React, { Component } from 'react';
import ColourPrompt from './ColourPrompt';
import { socket } from 'api/sentimo';

export default class Vote extends Component {
    state = {
        value: 0,
        colour: null
    }

    render() {
        if (this.state.colour) {
            return (
                <>
                    <h3>Choose a value</h3>
                    <input
                      type="range"
                      min="-1000"
                      max="1000"
                      value={this.state.value}
                      onChange={this.sendValue} />
                </>
            )
        }
        return <ColourPrompt selectColour={this.selectColour} />
    }

    selectColour = colour => {
        this.setState({ colour })
    }

    sendValue = event => {
        this.setState({
            value: event.target.value
        }, () => {
            const { value, colour } = this.state;
            const data = { value, colour };
            socket.send('userUpdated', data);
        });
    }
}
