import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {getAllSongData} from "../Queries/Queries"
import {Keyboard} from "../Keyboard/Keyboard.component"
import {Loading} from "../Loading/Loading.component"

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSongs: false,
            songs: []
        }
    }

    componentDidMount() {
        getAllSongData().then(result => {
            this.setState({
                songs: result.data.songs
            })
        })
    }

    render() {
        const displaySongData = !this.state.showSongs ? null :
            this.state.songs.length > 0
                ?
                <table className="table" id="song-container">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Tempo</th>
                        <th scope="col">Keys Played</th>
                        <th scope="col">Keys Played Length</th>
                        <th scope="col">Keys Played Onsets</th>
                        <th scope="col">Link</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(this.state.songs.map(({ id, title, tempo, keysPlayed, keysPlayedLength, keysPlayedOnset }) => (
                        <tr key={id}>
                            <th scope="row">{id}</th>
                            <td>{title}</td>
                            <td>{tempo}</td>
                            <td>{keysPlayed.join(", ")}</td>
                            <td>{keysPlayedLength.join(", ")}</td>
                            <td>{keysPlayedOnset.join(", ")}</td>
                            <td><Link to={`song/${id}`}>To Song</Link> &#8599;</td>
                        </tr>
                    )))}
                    </tbody>
                </table>
                : <Loading/>;


        return (
            <div className="container py-4">
                <h2 className="text-center mb-4">Keyboard ♪♫♬ Challenge</h2>
                <Keyboard
                    disableTone={this.props.disableTone}
                />
                <h3 className="my-4 text-center">Current Songs</h3>
                <button type="button" onClick={() => this.toggleState('showSongs')} className="btn btn-info my-4 mx-auto d-block col-2">{this.state.showSongs ? "Hide Songs" : "Show Songs"}</button>
                {this.state.showSongs ? displaySongData : null}
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
