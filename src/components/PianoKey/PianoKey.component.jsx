import React, { Component } from 'react';

const ATTACK_TIME = 20;

export class PianoKey extends Component {

    constructor(props) {
        super(props);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.on && !this.props.on) {
            this.handleMouseUp()
        }
        if (!prevProps.on && this.props.on) {
            this.handleMouseDown()
        }
    }


    componentDidMount() {
    }

    handleMouseDown() {
        let {noteName} = this.props;
        this.props.playNoteHandler(noteName)
    }

    handleMouseUp() {
        let {noteName} = this.props;
        this.props.stopNoteHandler(noteName)
    }

    render() {
        let {points, className, noteName} = this.props;
        return (
            <polygon
                id={noteName}
                points={points}
                className={className + (this.props.on ? " playing":"")}
                onMouseDown={ this.handleMouseDown }
                onMouseUp={ this.handleMouseUp }
                onMouseOut={ this.handleMouseUp }
            />
        )
    }
}

export default PianoKey;
