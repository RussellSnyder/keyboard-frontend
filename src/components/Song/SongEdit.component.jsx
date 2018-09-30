import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { Redirect } from 'react-router-dom'

import {getAllSongData} from "../Queries/Queries"
import {Loading} from "../Loading/Loading.component"

export class SongEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toSong: false,
            loaded: false,
            showUpdatedMessage: false,
            title: "",
            tempo: "",
            keysPlayed: [],
            keysPlayedLength: [],
            keysPlayedOnset: []
        }
    }

    componentDidMount() {
        let {id} = this.props.match.params;
        getAllSongData().then(result => {
            let {title, tempo, keysPlayed, keysPlayedLength, keysPlayedOnset} = result.data.songs[id - 1]
            this.setState({
                title: title,
                tempo: tempo,
                keysPlayed: keysPlayed,
                keysPlayedLength: keysPlayedLength,
                keysPlayedOnset: keysPlayedOnset
            })
        }).then(r => this.setState({loaded: true}))
    }

    render() {
        if (this.state.toSong === true) {
            return <Redirect to={`/song/${this.props.match.params.id}`} />
        }

        const UPDATE_SONG = gql`
        mutation UpdateSong($id: ID!, $title: String!, $tempo: Float, $keysPlayed: [String], $keysPlayedLength: [Float], $keysPlayedOnset: [Float]) {
            updateSong(id: $id, title: $title, tempo: $tempo, keysPlayed: $keysPlayed, keysPlayedLength: $keysPlayedLength, keysPlayedOnset: $keysPlayedOnset) {
                id
                title
                tempo
                keysPlayed
                keysPlayedLength
                keysPlayedOnset
            }
        }
    `;
        const updatedMessage = <div className="jumbotron">
            <h3>Song updated!</h3>
        </div>


        const editForm = () => {
            let {id} = this.props.match.params;
            let {title, tempo, keysPlayed, keysPlayedLength, keysPlayedOnset} = this.state;
            return (
                <Mutation mutation={UPDATE_SONG}>
                    {(updateSong, {data}) => (
                        <form onSubmit={e => {
                            e.preventDefault();
                            console.log('submit attempt');
                            updateSong({
                                variables: {
                                    id: id,
                                    title: title,
                                    tempo: tempo,
                                    keysPlayed: keysPlayed,
                                    keysPlayedLength: keysPlayedLength,
                                    keysPlayedOnset: keysPlayedOnset
                                }
                            });
                            this.showUpdatedMessage();
                        }}>
                            {this.state.showUpdatedMessage ? updatedMessage : null}
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" className="form-control" id="title" defaultValue={title}
                                    onChange={e => this.setState({title: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Tempo</label>
                                <input type="text" className="form-control" id="tempo" defaultValue={tempo}
                                    onChange={e => this.setState({tempo: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>keys Played</label>
                                <input type="text" className="form-control" id="keysPlayed" defaultValue={keysPlayed}
                                        onChange={e => this.modifyArray('keysPlayed', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>keys Played Length</label>
                                <input type="text" className="form-control" id="keysPlayedLength"
                                       defaultValue={keysPlayedLength}
                                        onChange={e => this.modifyArray('keysPlayedLength', e.target.value)}
                                />
                            </div>
                            <button type="submit" className="col-12 mt-4 btn btn-success">Update</button>
                        </form>)}
                </Mutation>);
        }
        return (
            <div className="container py-4">

                <Link className="btn btn-primary mb-4" to={`/song/${this.props.match.params.id}`}>&#8592; Back To Song</Link>
                {this.state.loaded ? editForm() : <Loading/>}
            </div>
        )
    }

    modifyArray(state, value) {
        this.setState({
            [state]: value.split(",")
        })
    }

    showUpdatedMessage() {
        this.setState({
            showUpdatedMessage: true
        });
        setTimeout(() => {
            this.setState({
                toSong: true,
                showUpdatedMessage: false
            });

        }, 2100)
    }


}

export default SongEdit;
