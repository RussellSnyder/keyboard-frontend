import React, { Component } from 'react';
import Tone from 'tone';

import {PianoKey} from "./PianoKey.component";

const SOUND_FILE_LOCATION = "http://localhost:3000/grand-piano-mp3-sounds/";


export class Keyboard extends Component {
    constructor() {
        super();
        this.state = {
            pianoReady: false,
            notesPlaying: [],
        }
        this.piano = null;
    }

    loadPiano() {
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
            'release' : 1,
            'baseUrl' : SOUND_FILE_LOCATION
        }).toMaster();
    }
    componentDidMount() {
        this.loadPiano()
    }

    onSamplesLoaded() {
        this.setState({
            pianoReady: true
        })
        // this.playSequence(this.props.playerPianoData)
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.playerPianoMode && (!prevProps.playerPianoPlay && this.props.playerPianoPlay)) {
            this.playSequence()
        }
        if (this.props.playerPianoMode && (prevProps.playerPianoPlay && !this.props.playerPianoPlay)) {
            this.stopSequence()
        }
    }

    render() {
        return (
            <div className={this.state.pianoReady ? "ready" : "not-ready"} id="Keyboard">
                <svg className="piano" height="230" width="1000">
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("C4") > -1}
                        points="200,10 230,10 230,100 245,100 245,220 200,220 200,10" className="white c"
                        midiNote="60" noteName="C4"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("D4") > -1}
                        points="245,100 260,100 260,10 275,10 275,100 290,100 290,220 245,220 245,100" className="white d"
                        midiNote="62" noteName="D4"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("E4") > -1}
                        points="305,10 335,10 335,220 290,220 290,100 305,100 305,10" className="white e"

                        midiNote="64" noteName="E4"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("F4") > -1}
                        points="335,10 365,10 365,100 380,100 380,220 335,220 335,10" className="white f"
                        midiNote="65" noteName="F4"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("G4") > -1}
                        points="380,100 395,100 395,10 410,10 410,100 425,100 425,220 380,220 380,100" className="white g"
                        midiNote="67" noteName="G4"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("A4") > -1}
                        points="425,100 440,100 440,10 455,10 455,100 470,100 470,220 425,220 425,100" className="white a"
                        midiNote="69" noteName="A4"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("B4") > -1}
                        points="470,100 485,100 485,10 515,10 515,220 470,220 470,100" className="white b"
                        midiNote="71" noteName="B4"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("C5") > -1}
                        points="515,10 545,10 545,100 560,100 560,220 515,220 515,10" className="white c"
                        midiNote="72" noteName="C5"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("D5") > -1}
                        points="560,100 575,100 575,10 590,10 590,100 605,100 605,220 560,220" className="white d"
                        midiNote="74" noteName="D5"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("E5") > -1}
                        points="605,100 620,100 620,10 650,10 650,220 605,220 605,100" className="white e"
                        midiNote="76" noteName="E5"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("F5") > -1}
                        points="650,10 680,10 680,100 695,100 695,220 650,220 650,10" className="white f"
                        midiNote="77" noteName="F5"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("G5") > -1}
                        points="695,100 710,100 710,10 725,10 725,100 740,100 740,220 695,220 695,100" className="white g"
                        midiNote="79" noteName="G5"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("A5") > -1}
                        points="740,100 755,100 755,10 770,10 770,100 785,100 785,220 740,220 740,100" className="white a"
                        midiNote="81" noteName="A5"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("B5") > -1}
                        points="785,100 800,100 800,10 830,10 830,220 785,220 785,100" className="white b"
                        midiNote="83" noteName="B5"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("Db4") > -1}
                        points="230,10 260,10 260,100 230,100 230,10" className="black db"
                        midiNote="73" noteName="Db4"
                            playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("Eb4") > -1}
                        points="275,10 305,10 305,100 275,100 275,10" className="black eb"
                        midiNote="75" noteName="Eb4"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("Gb4") > -1}
                        points="365,10 395,10 395,100 365,100 365,10" className="black gb"
                        midiNote="78" noteName="Gb4"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("Ab4") > -1}
                        points="410,10 440,10 440,100 410,100 410,10" className="black ab"
                        midiNote="80" noteName="Ab4"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("Bb4") > -1}
                        points="455,10 485,10 485,100 455,100 455,10" className="black bb"
                        midiNote="50" noteName="Bb4"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("Db5") > -1}
                        points="545,10 575,10 575,100 545,100 545,10" className="black db"
                        midiNote="73" noteName="Db5"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("Eb5") > -1}
                        points="590,10 620,10 620,100 590,100 590,10" className="black eb"
                        midiNote="75" noteName="Eb5"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("Gb5") > -1}
                        points="680,10 710,10 710,100 680,100 680,10" className="black gb"
                        midiNote="78" noteName="Gb5"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("Ab5") > -1}
                        points="725,10 755,10 755,100 725,100 725,10" className="black ab"
                        midiNote="80" noteName="Ab5"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                    <PianoKey
                        depressed={this.state.notesPlaying.length > 0 && this.state.notesPlaying.indexOf("Bb5") > -1}
                        points="770,10 800,10 800,100 770,100 770,10" className="black bb"
                        midiNote="82" noteName="Bb5"
                        playNoteHandler={(midiNote, noteName) => this.playNote(noteName)}
                        stopNoteHandler={(midiNote, noteName) => this.stopNote(noteName)}
                    />
                </svg>
            </div>
        )
    }

    stopNote(noteName) {
        this.piano.triggerRelease(noteName);
        let keyindex = this.state.notesPlaying.length > 0 ? this.state.notesPlaying.indexOf(noteName) : -1;
        if (keyindex > -1) {
            let newState = this.state.notesPlaying.splice(keyindex, 1);
            this.setState({
                notesPlaying: newState
            })
        }

    }
    playNote(noteName) {
        this.piano.triggerAttack(noteName);
        let newNotesPlayingState = this.state.notesPlaying.length > 0 ? this.state.notesPlaying.push(noteName) : [noteName];
        this.setState({
            notesPlaying: newNotesPlayingState
        })
    }

    triggerSynthNote(note, length) {
        this.piano.triggerAttackRelease(note, length)
        this.triggerNoteGUIAttackRelease(note, length)
    }


    triggerNoteGUIAttackRelease(note, length) {
        let currentNotesPlaying = this.state.notesPlaying.slice(0);
        currentNotesPlaying.push(note)
        this.setState({
            notesPlaying: currentNotesPlaying
        })

        setTimeout(() => {
            let indexOfNote =  this.state.notesPlaying.indexOf(note);
            if (indexOfNote < 0) return
            this.setState({
                notesPlaying: this.state.notesPlaying.splice(indexOfNote, 1)
            })
        }, length);
    }

    playSequence() {
        let {keysPlayed, keysPlayedLength, tempo} = this.props.playerPianoData;

        Tone.Transport.bpm.value = tempo;
        let timeAccum = 0;

        // generate the composition
        keysPlayed.forEach((note, i) => {
            Tone.Transport.scheduleOnce (() => this.triggerSynthNote(note, keysPlayedLength[i]), timeAccum)
            timeAccum += Tone.Time(keysPlayedLength[i]);
        })

        Tone.Transport.start();
        Tone.Transport.scheduleOnce (() => this.endOfSongReached(), timeAccum);
    }

    endOfSongReached() {
        this.props.doneHandler();
        Tone.Transport.stop();
        this.setState({
            notesPlaying: []
        })
    }

    stopSequence() {
        this.props.doneHandler();
        Tone.Transport.stop();
        this.setState({
            notesPlaying: []
        })
    }
}

export default Keyboard;
