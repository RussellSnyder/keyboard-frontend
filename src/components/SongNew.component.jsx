import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

// import {getSongData} from "./Queries"
// import {Loading} from "./Loading.component"

export class SongNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddedMessage: false,
            title: "",
            tempo: "",
            keysPlayed: [],
            keysPlayedLength: []
        }
    }

render() {

    const ADD_SONG = gql`
        mutation AddSong($title: String!, $tempo: String!, $keysPlayed: [String], $keysPlayedLength: [String]) {
            addSong(title: $title, tempo: $tempo, keysPlayed: $keysPlayed, keysPlayedLength: $keysPlayedLength) {
                title
                tempo
                keysPlayed
                keysPlayedLength
            }
        }
    `;

        let {title, tempo, keysPlayed, keysPlayedLength} = this.state;
        const addedMessage = <div className="jumbotron">
            <h3>Song added!</h3>
        </div>
        return (
            <Mutation mutation={ADD_SONG}>
                {(addSong, { data }) => (
                <form onSubmit={e => {
                    e.preventDefault();
                    console.log('submit attempt');
                    addSong({ variables: { title: title, tempo: tempo, keysPlayed: keysPlayed, keysPlayedLength: keysPlayedLength } });
                    this.showAddedMessage();
                    this.setState({
                        title: "",
                        tempo: "",
                        keysPlayed: [],
                        keysPlayedLength: []
                    })
                }}>
                    {this.state.showAddedMessage ? addedMessage : <h2>Add New Song</h2>}
                    <Link className="btn btn-primary mb-4" to={`/`}>&#8592; Back To Home</Link>

                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" id="title" value={title}
                        onChange={e => this.setState({title: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Tempo</label>
                        <input type="number" className="form-control" id="tempo" value={tempo}
                        onChange={e => this.setState({tempo: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>keys Played</label>
                        <input type="text" className="form-control" id="keysPlayed" value={keysPlayed.join(",")}
                        onChange={e => this.modifyArray('keysPlayed', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>keys Played Length</label>
                        <input type="text" className="form-control" id="keysPlayedLength" value={keysPlayedLength.join(",")}
                        onChange={e => this.modifyArray('keysPlayedLength', e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success col-12" type="submit">Submit</button>
                </form>
                )}
            </Mutation>)
    }
    modifyArray(state, value) {
        this.setState({
            [state]: value.split(",")
        })
    }

    showAddedMessage() {
        this.setState({
            showAddedMessage: true
        });
        setTimeout(() => {
            this.setState({
                showAddedMessage: false
            });
        }, 2500)
    }
}

export default SongNew;
