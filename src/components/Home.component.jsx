import React, { Component } from 'react';

import {getAllSongs} from "./Queries"
import {Keyboard} from "./Keyboard.component"

export class Home extends Component {
    constructor() {
        super();
        this.state = {
            showSongs: false
        }
    }
    render() {
        return (
            <div className="container py-4">
                <h2 className="text-center mb-4">FlowKey ♪♫♬ Challenge</h2>
                <Keyboard/>
                <h3>Current Songs</h3>
                <a onClick={() => this.toggleState('showSongs')} className="btn btn-success">{this.state.showSongs ? "Hide Songs" : "Show Songs"}</a>
                {this.state.showSongs ? getAllSongs() : null}
            </div>
            )
    }
    toggleState(stateToToggle) {
        this.setState({
            [stateToToggle]: !this.state[stateToToggle]
        })
    }
}

export default Home;
