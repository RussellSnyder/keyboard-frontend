import React, { Component } from 'react';
import { Link } from "react-router-dom";

import {getAllSongData} from "../Queries/Queries"
import {Keyboard} from "../Keyboard/Keyboard.component"
import {SongEdit} from "./SongEdit.component"

export class Song extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editSong: false,
            songData: null,
            playbackCalled: false,
            playing: false,
            recording: false
        }
    }

    componentDidMount() {
        let {id} = this.props.match.params;
        getAllSongData().then(result => {
            let songData = result.data.songs[id - 1];
            this.setState({ songData })
        })
    }

    render() {
        let {id} = this.props.match.params;

        const Loading = (<div className="loading">
            Geting the song....
        </div>)

        const DisplaySongData = (data) => {
            let {title, tempo, keysPlayed, keysPlayedLength, keysPlayedOnset} = data
            return (
                <div className="song">
                    <h2>{title}</h2>
                    <ul className="list-group">
                        <li className="list-group-item"><strong>Tempo:</strong> {tempo} BPM</li>
                        <li className="list-group-item"><strong>Keys Played:</strong> {keysPlayed.join(", ")}</li>
                        <li className="list-group-item"><strong>Keys Played Durations:</strong> {keysPlayedLength.join(", ")}</li>
                        <li className="list-group-item"><strong>Keys Played Onset Times:</strong> {keysPlayedOnset.join(", ")}</li>
                    </ul>
                </div>
            )
        }

        return (
            <div className="container py-4">
                <Link className="btn btn-primary mb-4" to="/">&#8592; Back To Songs</Link>

                <div className="row my-4">
                    {this.state.editSong ? null :
                    <Link className="col-1 mr-2 h-25 btn btn-warning my-2" to={`/song/${id}/edit/`}>&#9999; Edit</Link>}
                    {this.state.editSong ? <SongEdit /> :
                        this.state.songData ? DisplaySongData(this.state.songData) : Loading}
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

                </div>
                <div className="row">
                    <Keyboard
                        noKeyboardInput={this.state.editSong}
                        disableTone={this.props.disableTone}
                        doneHandler={() => this.songComplete()}
                        playerPianoMode={this.state.playing}
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
        if (!this.state.playbackCalled) {
            this.setState({
                playbackCalled: true
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
                playing: false,
                playbackCalled: false
            })
        }
    }
}

export default Song;
