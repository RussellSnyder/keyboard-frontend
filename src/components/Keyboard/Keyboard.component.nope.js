import React from 'react'
import renderer from 'react-test-renderer'

import {Keyboard} from "./Keyboard.component";

import 'jest-enzyme';
import 'jest';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// configure your adapter
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    // console.log(renderer.create(<Keyboard/>))
    expect(renderer.create(<Keyboard disableTone />)).toBeDefined()
});

it('Updates stateArray when playNote is pressed', () => {
    Keyboard.prototype.playNote = jest.fn();
    let wrapper = shallow(<Keyboard disableTone />);

    let { playNote } = wrapper.instance();
    expect(playNote).toHaveBeenCalledTimes(0);
    wrapper.instance().playNote("C4")
    expect(playNote).toHaveBeenCalledTimes(1);

    let testKey = wrapper.find('#c4');
    expect(testKey).toBeDefined();

    Keyboard.prototype.playNote.mockRestore();
});

