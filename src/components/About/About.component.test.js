import React from 'react'
import renderer from 'react-test-renderer'
import { withRouter } from 'react-router'

import {About} from "./About.component";

it('renders without crashing', () => {
    expect(renderer.create(<About/>)).toBeDefined()
});

