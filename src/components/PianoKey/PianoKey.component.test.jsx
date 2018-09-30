import React from 'react'
import renderer from 'react-test-renderer'

import {PianoKey} from "./PianoKey.component";
import { mount } from 'enzyme';

const stopNoteHandler = () => 'stop';
const playNoteHandler = () => 'play';

const component = renderer.create(<PianoKey
    stopNoteHandler={() => stopNoteHandler()}
    playNoteHandler={() => playNoteHandler()}
/>);

it('isRendered', () => {
    expect(component).toBeDefined();
});

it('Changes className when state active changes', () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    tree.props.onMouseDown();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    tree.props.onMouseUp();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

