import React, { Component } from 'react';
import Tone from 'tone';

import {PianoKey} from "../PianoKey/PianoKey.component";
import {translateDownKeysOnKeyboard, getInitialKeyboardNoteStateObjects} from "./Keyboard.helper";
import {convertMilliSecondsToBeatFraction, convertBeatFractionToMilliSeconds} from "../Utils/Utils"

const SOUND_FILE_LOCATION = "http://localhost:3000/grand-piano-mp3-sounds/";

const KEYBOARD_INPUT_OPTIONS = [
    { value: 'keyboard', label: 'Keyboard' },
    { value: 'mouse', label: 'Mouse (Click Piano Keys)' }
];

// Helps with clipping to add a slight delay
const DELAY_START = 0;
// Helps with clipping to add a slight delay
const ENDING_BUFFER = 0.25;

export class Keyboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pianoReady: false,
            playerPianoMode: false,
            playbackDataLoaded: false,
            playerPianoPlay: false,
            recordingMode: false,
            inputType: KEYBOARD_INPUT_OPTIONS[0],
            keyStates: getInitialKeyboardNoteStateObjects()
        }

        this.keysPlayed = [];
        this.keysPlayedLength = [];
        this.keysPlayedOnset = [];
        this.tempo = 120;

        this.piano = null;
        this.transport = null
    };

    keyboardDownInput = (e) => {
        if (this.props.noKeyboardInput === true) return
        let note = translateDownKeysOnKeyboard(e)
        let keyStates = {...this.state.keyStates, [note]: {'on': true}};
        this.setState({ keyStates })
    };

    keyboardUpInput = (e) => {
        if (this.props.noKeyboardInput === true) return
        let note = translateDownKeysOnKeyboard(e)
        let keyStates = {...this.state.keyStates, [note]: {'on': false}};
        this.setState({ keyStates })
    };

    handleKeyboardInputChange = (selectedOption) => {
        this.setState({ inputType: selectedOption });
    };

    loadPiano() {
        if (this.piano) return
        this.piano = new Tone.Sampler({
            'C4' : 'C4.mp3',
            'Db4' : 'Db4.mp3',
            'D4' : 'D4.mp3',
            'Eb4' : 'Eb4.mp3',
            'E4' : 'E4.mp3',
            'F4' : 'F4.mp3',
            'Gb4' : 'Gb4.mp3',
            'G4' : 'G4.mp3',
            'Ab4' : 'Ab4.mp3',
            'A4' : 'A4.mp3',
            'Bb4' : 'Bb4.mp3',
            'B4' : 'B4.mp3',
            'C5' : 'C5.mp3',
            'Db5' : 'Db5.mp3',
            'D5' : 'D5.mp3',
            'Eb5' : 'Eb5.mp3',
            'E5' : 'E5.mp3',
            'F5' : 'F5.mp3',
            'Gb5' : 'Gb5.mp3',
            'G5' : 'G5.mp3',
            'Ab5' : 'Ab5.mp3',
            'A5' : 'A5.mp3',
            'Bb5' : 'Bb5.mp3',
            'B5' : 'B5.mp3',
        }, {
            'onload': () => this.onSamplesLoaded(),
            'release' : 0.6,
            'baseUrl' : SOUND_FILE_LOCATION
        }).toMaster();
    }
    componentWillUnmount() {
        // Keyboard will initially be bound
        window.removeEventListener('keydown', this.keyboardDownInput);
        window.removeEventListener('keyup', this.keyboardUpInput);
        this.piano.dispose()
    }

    componentDidMount() {
        // Tone.JS and Jest bug :'-(
        if (this.props.disableTone) return;

        this.transport = Tone.Transport;

        if (this.props.recordingMode) {
            this.setState({
                recordingMode: this.props.recordingMode
            })
        }

        // Keyboard will initially be bound
        window.addEventListener('keydown', this.keyboardDownInput);
        window.addEventListener('keyup', this.keyboardUpInput);

        this.loadPiano()
    }

    onSamplesLoaded() {
        this.setState({
            pianoReady: true
        })
        // this.playSequence(this.props.playerPianoData)
    }

    loadSongData(playerPianoData) {
        let {keysPlayed, keysPlayedLength, keysPlayedOnset, tempo} = playerPianoData;

        this.keysPlayed = keysPlayed;
        this.keysPlayedLength = keysPlayedLength;
        this.keysPlayedOnset = keysPlayedOnset;
        this.tempo = tempo;

        this.setState({ playbackDataLoaded: true })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let {playerPianoMode, playerPianoPlay, playerPianoData} = this.props;
        if (playerPianoData && !this.state.playbackDataLoaded) {
            // console.log({playerPianoData})
            this.loadSongData(playerPianoData)
        }
        // if (this.tempo && this.tempo !== playerPianoData.tempo) {
        //     this.tempo = playerPianoData.tempo;
        // }

        if (playerPianoMode && (!prevProps.playerPianoPlay && playerPianoPlay)) {
            console.log("enter player piano mode");
            this.setState({playerPianoMode : true})
            this.playSequence()
        }
        if (prevProps.playerPianoPlay && !this.props.playerPianoPlay) {
            console.log("exit player piano mode");
            this.setState({playerPianoMode : false})
            this.stopSequence()
        }
        // if (this.state.inputType && prevState.inputType && prevState.inputType.value !== this.state.inputType.value) {
        if(this.state.inputType && this.state.inputType.value != 'keyboard') {
            window.removeEventListener('keydown', this.keyboardDownInput);
            window.removeEventListener('keyup', this.keyboardUpInput);
        } else if (this.state.inputType && this.state.inputType.value == 'keyboard') {
            window.addEventListener('keydown', this.keyboardDownInput);
            window.addEventListener('keyup', this.keyboardUpInput);

        }
    }

    render() {
        let containerClassName = `${this.state.pianoReady ? "ready" : "not-ready"} 
        ${this.state.playbackCalled ? "player-piano-mode " : ""} py-4`;

        return (
            <div className={containerClassName} id="Keyboard">
                <svg className="piano" height="230" width="1000"
                >
                    <PianoKey
                        on={this.state.keyStates["C4"].on}
                        points="200,10 230,10 230,100 245,100 245,220 200,220 200,10" className="white c c4"
                        midiNote="60" noteName="C4"
                        playNoteHandler={(noteName) => this.playNote(noteName)}
                        stopNoteHandler={(noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["D4"].on}
                        points="245,100 260,100 260,10 275,10 275,100 290,100 290,220 245,220 245,100" className="white d"
                        midiNote="62" noteName="D4"
                        playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["E4"].on}
                        points="305,10 335,10 335,220 290,220 290,100 305,100 305,10" className="white e"

                        midiNote="64" noteName="E4"
                        playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["F4"].on}
                        points="335,10 365,10 365,100 380,100 380,220 335,220 335,10" className="white f"
                        midiNote="65" noteName="F4"
                        playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["G4"].on}
                        points="380,100 395,100 395,10 410,10 410,100 425,100 425,220 380,220 380,100" className="white g"
                        midiNote="67" noteName="G4"
                        playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["A4"].on}
                        points="425,100 440,100 440,10 455,10 455,100 470,100 470,220 425,220 425,100" className="white a"
                        midiNote="69" noteName="A4"
                        playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["B4"].on}
                        points="470,100 485,100 485,10 515,10 515,220 470,220 470,100" className="white b"
                        midiNote="71" noteName="B4"
                        playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["C5"].on}
                        points="515,10 545,10 545,100 560,100 560,220 515,220 515,10" className="white c"
                        midiNote="72" noteName="C5"
                        playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["D5"].on}
                        points="560,100 575,100 575,10 590,10 590,100 605,100 605,220 560,220" className="white d"
                        midiNote="74" noteName="D5"
                        playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["E5"].on}
                        points="605,100 620,100 620,10 650,10 650,220 605,220 605,100" className="white e"
                        midiNote="76" noteName="E5"
                        playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["F5"].on}
                        points="650,10 680,10 680,100 695,100 695,220 650,220 650,10" className="white f"
                        midiNote="77" noteName="F5"
                        playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["G5"].on}
                        points="695,100 710,100 710,10 725,10 725,100 740,100 740,220 695,220 695,100" className="white g"
                        midiNote="79" noteName="G5"
                        playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["A5"].on}
                        points="740,100 755,100 755,10 770,10 770,100 785,100 785,220 740,220 740,100" className="white a"
                        midiNote="81" noteName="A5"
                        playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["B5"].on}
                        points="785,100 800,100 800,10 830,10 830,220 785,220 785,100" className="white b"
                        midiNote="83" noteName="B5"
                        playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["Db4"].on}
                        points="230,10 260,10 260,100 230,100 230,10" className="black db"
                        midiNote="73" noteName="Db4"
                            playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["Eb4"].on}
                        points="275,10 305,10 305,100 275,100 275,10" className="black eb"
                        midiNote="75" noteName="Eb4"
                        playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["Gb4"].on}
                        points="365,10 395,10 395,100 365,100 365,10" className="black gb"
                        midiNote="78" noteName="Gb4"
                        playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["Ab4"].on}
                        points="410,10 440,10 440,100 410,100 410,10" className="black ab"
                        midiNote="80" noteName="Ab4"
                        playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["Bb4"].on}
                        points="455,10 485,10 485,100 455,100 455,10" className="black bb"
                        midiNote="50" noteName="Bb4"
                        playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["Db5"].on}
                        points="545,10 575,10 575,100 545,100 545,10" className="black db"
                        midiNote="73" noteName="Db5"
                        playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["Eb5"].on}
                        points="590,10 620,10 620,100 590,100 590,10" className="black eb"
                        midiNote="75" noteName="Eb5"
                        playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["Gb5"].on}
                        points="680,10 710,10 710,100 680,100 680,10" className="black gb"
                        midiNote="78" noteName="Gb5"
                        playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["Ab5"].on}
                        points="725,10 755,10 755,100 725,100 725,10" className="black ab"
                        midiNote="80" noteName="Ab5"
                        playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                    <PianoKey
                        on={this.state.keyStates["Bb5"].on}
                        points="770,10 800,10 800,100 770,100 770,10" className="black bb"
                        midiNote="82" noteName="Bb5"
                        playNoteHandler={noteName => this.playNote(noteName)}
                        stopNoteHandler={noteName => this.stopNote(noteName)}
                    />
                </svg>

                <div className="mt-2 row input-selector">
                    <div className="col-md-8">
                        Input Options:
                        {KEYBOARD_INPUT_OPTIONS.map((option, i) => {
                            return <button key={i} className="btn btn-primary btn-sm m-2 d-inline-block " onClick={() => this.handleKeyboardInputChange(option)}>{option.label}</button>
                        })}
                    </div>
                    <div className="col-md-4">
                        Currently selected: {this.state.inputType && this.state.inputType.label ? this.state.inputType.label : ''}
                    </div>
                </div>
            </div>
        )
    }

    stopNote(noteName, onlyGui = false) {

        let modifiedNoteStates = {...this.state.keyStates, [noteName]: {'on': false}};
        this.setState({
            keyStates: modifiedNoteStates
        })

        if (!onlyGui) {
            this.piano.triggerRelease(noteName);
        }

        if (this.state.recordingMode) {
            this.props.triggerOnNoteOnOff(noteName, 'off')
        }
    }
    playNote(noteName, onlyGui = false) {
        let modifiedNoteStates = {...this.state.keyStates, [noteName]: {'on': true}};
        this.setState({
            keyStates: modifiedNoteStates
        })

        if (!onlyGui) {
            this.piano.triggerAttack(noteName);
        }

        if (this.state.recordingMode) {
            this.props.triggerOnNoteOnOff(noteName, 'on')
        }
    }

    playSequence() {
        this.transport.bpm.value = this.tempo;
        this.piano.sync();

        let lastOnset = this.keysPlayedOnset[this.keysPlayedOnset.length - 1]
        let lastNoteLength = this.keysPlayedLength[this.keysPlayedLength.length - 1];
        let lastNoteEndingTime = lastOnset + lastNoteLength + ENDING_BUFFER;

        // generate the composition
        this.keysPlayed.forEach((note, i) => {
            // Notes on
            this.transport.scheduleOnce (() => {
                this.playNote(note)
                // this.triggerSynthNote(note, this.keysPlayedLength[i])
            },  this.keysPlayedOnset[i] + DELAY_START)
            // Notes off
            this.transport.scheduleOnce (() => {
                this.stopNote(note)
            }, this.keysPlayedOnset[i] + this.keysPlayedLength[i])
        })


        this.transport.scheduleOnce (() => {
            this.endOfSongReached()
        }, (lastNoteEndingTime))
        // })
        // setTimeout(() => {
        //     this.setState({keyStates: getInitialKeyboardNoteStateObjects()})
        // }, convertBeatFractionToMilliSeconds(lastNoteEndingTime, this.tempo))


        this.transport.start();
    }
    endOfSongReached() {
        this.stopSequence();
    }

    stopSequence() {
        this.transport.stop();
        this.setState({keyStates: getInitialKeyboardNoteStateObjects()})
        this.piano.releaseAll(0);
        this.props.doneHandler();
    }
}

export default Keyboard;
