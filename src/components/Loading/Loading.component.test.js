import React from 'react'
import renderer from 'react-test-renderer'
import { withRouter } from 'react-router'

import {Loading} from "./Loading.component";

it('renders without crashing', () => {
    expect(renderer.create(<Loading/>)).toBeDefined()
});

