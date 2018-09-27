import React, { Component } from 'react';


export class PianoKey extends Component {
    constructor() {
        super();
        this.state = {
            isKeyDepressed: false
        }
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.depressed !== this.props.depressed) {
            this.setState({
                isKeyDepressed: this.props.depressed
            })
        }
    }

    componentDidMount() {
        if (this.props.depressed) {
            this.setState({
                isKeyDepressed: this.props.depressed
            })
        }

    }
    handleMouseDown() {
        this.setState({
            isKeyDepressed: true
        })
        let {midiNote, noteName} = this.props;
        this.props.playNoteHandler(midiNote, noteName)
    }

    handleMouseUp() {
        this.setState({
            isKeyDepressed: false
        })
        let {midiNote, noteName} = this.props;
        this.props.stopNoteHandler(midiNote, noteName)
    }

    render() {
        let {points, className} = this.props;
        return (
            <polygon
                points={points} className={className + (this.state.isKeyDepressed ? " playing":"")}
                onMouseDown={ this.handleMouseDown }
                onMouseUp={ this.handleMouseUp }
            />
        )
    }
}

export default PianoKey;
