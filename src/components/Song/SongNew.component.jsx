import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import _ from 'lodash'
import Tone from 'tone'

import {convertBeatFractionToMilliSeconds, convertMilliSecondsToBeatFraction} from '../Utils/Utils'
import {translateDownKeysOnKeyboard, getInitialKeyboardNoteStateObjects} from "../Keyboard/Keyboard.helper";
// import {getAllSongData} from "./Queries"
// import {Loading} from "./Loading.component"

import SongInformationDisplay from "./SongInformationDisplay"

import {Keyboard} from "../Keyboard/Keyboard.component"
import Slider from 'react-slider-simple';

const MAX_TEMPO = 500;
const MIN_TEMPO = 30;

const ADD_SONG = gql`
        mutation AddSong($title: String!, $tempo: Float, $keysPlayed: [String], $keysPlayedLength: [Float], $keysPlayedOnset: [Float]) {
            addSong(title: $title, tempo: $tempo, keysPlayed: $keysPlayed, keysPlayedLength: $keysPlayedLength, keysPlayedOnset: $keysPlayedOnset) {
                title
                tempo
                keysPlayed
                keysPlayedLength
                keysPlayedOnset
            }
        }
    `;

export class SongNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updatingSongInfo: false,
            manuelEdit: false,
            showAddedMessage: false,
            playingBackRecording: false,

            title: "New Song",
            tempo: 120,

            tempoBeat: false,
            tempoBeatCount: 0,

            keysPlayed: [],
            keysPlayedLength: [],
            keysPlayedOnset: [],

            recording: false,
            playerPianoMode: false,
        }

        this.recordedKeyIndex = 0;
        this.recordedKeysData = {};

        this.elapsedRecordingTime = 0;
        this.recordingTimeTrackerID = 0;
        this.tempoRountineID = 0;

        this.metronome = null;
        this.form = React.createRef();
    }

    componentDidMount() {
        this.metronome = new Tone.Synth({
            volume: -7,
            oscillator : {
                type : 'fmsquare',
                modulationType : 'sawtooth',
                modulationIndex : 7,
                harmonicity: 8.4
            },
            envelope : {
                attack : 0.001,
                decay : 0.1,
                sustain: 0.1,
                release: 0.1
            }
        }).toMaster()
        this.metronome.volume.value = -40;
    }

    render() {
        let {title, tempo, keysPlayed, keysPlayedLength, keysPlayedOnset} = this.state;
        const addedMessage = <div className="jumbotron">
            <h3>Song added!</h3>
        </div>

        const manuelEditForm = (
            <Mutation mutation={ADD_SONG}>
                {(addSong, {data}) => (
                    <form ref={this.form}
                        onSubmit={e => {
                        e.preventDefault();
                        console.log('submit attempt');
                        addSong({
                            variables: {
                                title: title,
                                tempo: tempo,
                                keysPlayed: keysPlayed,
                                keysPlayedLength: keysPlayedLength,
                                keysPlayedOnset: keysPlayedOnset
                            }
                        });
                        this.showAddedMessage();
                        this.setState({
                            title: "New Song",
                            tempo: 120,
                            keysPlayed: [],
                            keysPlayedLength: [],
                            keysPlayedOnset: [],
                            manuelEdit: false
                        })
                    }}>

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
                            <input type="text" className="form-control" id="keysPlayedLength"
                                   value={keysPlayedLength.join(",")}
                                   onChange={e => this.modifyArray('keysPlayedLength', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>keys Played Onset</label>
                            <input type="text" className="form-control" id="keysPlayedLength"
                                   value={keysPlayedOnset.join(",")}
                                   onChange={e => this.modifyArray('keysPlayedOnset', e.target.value)}
                            />
                        </div>
                        <button className="btn btn-success col-12" type="submit">Save</button>
                    </form>
                )}
            </Mutation>)

        return (
            <div className="container py-4">
                <Link className="btn btn-primary mb-4" to={`/`}>&#8592; Back To Home</Link>
                {this.state.showAddedMessage ? addedMessage : null}
                <div className="row">
                    {!this.state.manuelEdit
                        ? <button onClick={() => this.toggleState('manuelEdit')}
                            className="col-1 mr-2 h-25 btn btn-warning my-2">&#9999; Edit</button>
                        : <button onClick={() => this.toggleState('manuelEdit')}
                            className="col-3 mr-2 h-25 btn btn-default my-2">&uarr; Collapse</button>
                    }
                    <div className={`col-10 offset-1 song-info-container ${this.state.updatingSongInfo ? 'updating' : ''}`}>
                        {!this.state.manuelEdit ? SongInformationDisplay(this.state) : null}
                    </div>
                </div>
                {this.state.manuelEdit ? manuelEditForm : null}

                <div className="row">
                    <div className="col-md-6 p-2 my-4" style={{background: '#eee'}}>
                        <p className="text-center">Tempo: {this.state.tempo} BPM
                            <span className="float-right mr-4">{this.tempoVisualization(this.state.tempoBeat)}</span>
                        </p>
                        <Slider
                            className="slider"
                            value={Math.round(this.state.tempo / MAX_TEMPO * 100)}
                            onChange={(percent) => this.updateTempo(percent)}
                            thumbColor="rgb(219, 112, 147)"
                            shadowColor="rgb(255, 255, 255)"
                            sliderPathColor="rgb(200, 200, 200)"
                        />
                    </div>
                    <div className="col-md-6 text-center">
                        <button className={`mt-4 mr-4 btn ${this.state.recording ? " recording btn-warning" : "btn-danger"}`}
                                onClick={() => this.beginRecording()}>
                            {this.state.recording ? "Recording" :
                                this.state.recordedData ? "Re-record" : "Record"}
                        </button>
                        {!this.state.recording
                            ? null
                            : <button className={`mt-4 ml-4 btn btn-danger`}
                              onClick={() => this.stopRecording()}>
                                STOP
                            </button>}
                        {!this.state.playingBackRecording
                            ? null
                            : <button className={`mt-4 ml-4 btn btn-danger`}
                                      onClick={() => this.stopPlayback()}>
                            Stop Playback
                        </button>
                        }
                        {!this.state.recordedData
                            ? null
                            : <button className={`mt-4 ml-4 btn btn-success`}
                                      onClick={() => this.playPlayback()}>
                            Play Track
                        </button>
                        }
                    </div>
                </div>

                <Keyboard
                    noKeyboardInput={this.state.manuelEdit}
                    doneHandler={() => this.stopRecording()}
                    recordingMode={!this.state.playingBackRecording && !this.state.playbackCalled}
                    triggerOnNoteOnOff={(note, state) => this.updateSongData(note, state)}
                    playerPianoMode={this.state.playbackCalled}
                    playerPianoData={{
                        keysPlayed:this.state.keysPlayed,
                        keysPlayedLength:this.state.keysPlayedLength,
                        keysPlayedOnset:this.state.keysPlayedOnset,
                        tempo: this.state.tempo
                    }}
                    playerPianoPlay={this.state.playingBackRecording} />

            </div>
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevState.tempoBeat && this.state.tempoBeat) {
            this.metronome.triggerAttackRelease("C6", 0.1)
        }
    }

    stopPlayback() {
         this.setState({
             playingBackRecording: false,
             playerPianoMode: false
         })
    }

    playPlayback() {
        this.recordedKeyIndex = 0;
        this.recordedKeysData = {};

        this.setState({
             playingBackRecording: true,
            playerPianoMode: true

        })
    }

     updateTime() {
         this.recordingTimeTrackerID = window.requestAnimationFrame(()=> this.updateTime())
         this.elapsedRecordingTime = Tone.now().toFixed(3) - this.recordingStartTime
         // console.log(this.elapsedRecordingTime);
    }

    resetMusicalState() {
        this.recordedKeyIndex = 0;
        this.recordedKeysData = {};

        this.setState({
            keysPlayed: [],
            keysPlayedLength: [],
            keysPlayedOnset: [],
        })
    }

    beginRecording() {
        if (this.state.keysPlayed.length > 0) {
            this.resetMusicalState()
        }
        this.recordingStartTime = Tone.now().toFixed(3);
        this.recordingTimeTrackerID = window.requestAnimationFrame(()=> this.updateTime())
        this.setState({
            recording: true,
            playerPianoMode: false
        })
        this.runBeatTracker();
    }

    stopRecording() {
        this.setState({
            recording: false,
            tempoBeatCount: 0
        })
        window.clearInterval(this.tempoRountineID );
        window.cancelAnimationFrame(this.recordingTimeTrackerID)

        if (Object.keys(this.recordedKeysData).length > 1) {
            this.formatAndBindRecordedDataToState()
        }
    }

    formatAndBindRecordedDataToState() {
        this.setState({
            updatingSongInfo: true
        });

        let keysPlayed = [];
        let keysPlayedLength = [];
        let keysPlayedOnset = [];
        Object.values(this.recordedKeysData).forEach((keyData) => {
            let {noteName, noteLength, noteOnset} = keyData
            keysPlayed.push(noteName);
            keysPlayedLength.push(Math.floor(noteLength * 1000) / 1000 );
            keysPlayedOnset.push(Math.floor(noteOnset * 1000) / 1000 );
        })

        this.setState({
            keysPlayed: keysPlayed,
            keysPlayedLength: keysPlayedLength,
            keysPlayedOnset: keysPlayedOnset
        }, () => {
            this.setState({
                recordedData: true,
                updatingSongInfo: false
            })
        })
    }
    runBeatTracker() {
        const BEAT_LENGTH = 50;
        let tempoRoutine = () => {
            return window.setInterval(() => {
                this.setState({
                    tempoBeat: true,
                    tempoBeatCount: this.state.tempoBeatCount + 1
                })
                setTimeout(() => {
                    this.setState({
                        tempoBeat: false
                    })
                }, BEAT_LENGTH)
            }, convertBeatFractionToMilliSeconds(0.25, this.state.tempo))
        }
        this.tempoRountineID = tempoRoutine();
    }

    tempoVisualization() {
        let on = this.state.tempoBeat;
        let style = {
            background: on ? 'red' : 'transparent',
            border: '1px solid black',
            borderSize: on ? 3 : 1,
            height: 20,
            width: 20,
            display: 'block'
        }
        return (
            <span className="tempo-visualizer" style={style}/>
        )
    }
    updateTempo(percentage) {
        let scaledPercent = percentage * 0.01;
        let boundedTempo = Math.max(MIN_TEMPO, scaledPercent * MAX_TEMPO)
        let roundedTempo = Math.round(boundedTempo);
        // let value = Math.max(MAX_TEMPO)
        this.setState({
            tempo: roundedTempo
        })
    }

    updateSongData(noteName, onOff) {
        if (!this.state.recording || this.state.playbackCalled) return

        if (onOff === 'on') {
            this.recordedKeysData[this.recordedKeyIndex] = {
                noteName: noteName,
                noteLength: null,
                noteOnset: convertMilliSecondsToBeatFraction((parseFloat(this.elapsedRecordingTime * 1000)), this.state.tempo)
            }
            this.recordedKeyIndex++;
        } else {
            // console.log("off: ", this.recordedKeysData);
            let indexOfNoteObjectToUpdate = Object.values(this.recordedKeysData).findIndex((noteObject) => {
                return (noteObject.noteLength === null) && (noteObject.noteName === noteName);
            })
            if (indexOfNoteObjectToUpdate < 0) return
            let noteLength = convertMilliSecondsToBeatFraction(this.elapsedRecordingTime * 1000, this.state.tempo) - this.recordedKeysData[indexOfNoteObjectToUpdate].noteOnset;
            // console.log("length: ", noteLength);
            this.recordedKeysData[indexOfNoteObjectToUpdate].noteLength = noteLength
        }

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

    toggleState(stateToToggle) {
        this.setState({
            [stateToToggle]: !this.state[stateToToggle]
        })
    }

    modifyArray(state, value) {
        this.setState({
            [state]: value.split(",")
        })
    }

}

export default SongNew;
