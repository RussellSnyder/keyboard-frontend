import React from 'react'
import renderer from 'react-test-renderer'

import {Home} from "./Home.component";

it('renders without crashing', () => {
    expect(renderer.create(<Home disableTone/>)).toBeDefined()
});

