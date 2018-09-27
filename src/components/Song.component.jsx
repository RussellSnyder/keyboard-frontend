import React, { Component } from 'react';
import { Link } from "react-router-dom";

import {getSongData} from "./Queries"
import {Keyboard} from "./Keyboard.component"

export class Song extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songData: null,
            playerPianoMode: true,
            playing: false,
            recording: false
        }
    }

    componentDidMount() {
        let {id} = this.props.match.params;
        getSongData().then(result => {
            this.setState({
                songData: result.data.songs[id - 1]
            })
        })
    }

    render() {
        let {id} = this.props.match.params;

        const Loading = (<div className="loading">
            Geting the song....
        </div>)

        const DisplaySongData = (data) => {
            let {title, tempo, keysPlayed, keysPlayedLength} = data
            return (
                <div className="song">
                    <h2>{title}</h2>
                    <ul className="list-unstyled">
                    <li>Tempo: {tempo} BPM</li>
                    <li>keysPlayed: {keysPlayed.join(", ")}</li>
                    <li>keysPlayedLength: {keysPlayedLength.join(", ")}</li>
                    </ul>
                </div>
            )
        }

        return (
            <div className="container py-4">
                <Link className="btn btn-primary mb-4" to="/">&#8592; Back To Songs</Link>
                <Link className="float-right btn btn-warning mb-4" to={`/song/${id}/edit/`}>&#9999; Edit</Link>
                <div className="row my-4">
                    {this.state.songData ? DisplaySongData(this.state.songData) : Loading}
                </div>
                <div className="row transport-controls mb-4">
                    <div className="col-6">
                        <button className="mr-4 btn btn-success" onClick={() => this.playSong()}>
                            {this.state.playing ? "Playing" : "Play"}
                        </button>
                        <button className="btn btn-danger" onClick={() => this.stopSong()}>
                            Stop
                        </button>
                    </div>
                    <div className="col-6">
                        <button className="float-right btn btn-danger" onClick={() => this.recordSong()}>
                            {this.state.recording ? "Sorry, need to implement still :'-( " : "Record"}
                        </button>
                    </div>

                </div>
                <div className="row">
                    <Keyboard
                        doneHandler={() => this.songComplete()}
                        playerPianoMode={this.state.playerPianoMode}
                        playerPianoData={this.state.songData}
                        playerPianoPlay={this.state.playing} />
                </div>
            </div>
        )
    }

    songComplete() {
        this.stopSong()
    }
    playSong() {
        if (!this.state.playerPianoMode) {
            this.setState({
                playerPianoMode: true
            })
        }
        if (!this.state.playing) {
            this.setState({
                playing: true
            })
        }
    }
    stopSong() {
        if (this.state.playing) {
            this.setState({
                playing: false
            })
        }
    }

    recordSong() {
        if (!this.state.recording) {
            this.setState({
                recording: true
            })
        }
        setTimeout(() => {
            this.setState({
                recording: false
            })
        }, 2500)
    }
}

export default Song;
