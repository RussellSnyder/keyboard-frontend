import React from 'react'
import renderer from 'react-test-renderer'
import { withRouter } from 'react-router'

import {Nav} from "./Nav.component";

it('renders without crashing', () => {
    const wrappedNav = withRouter(<Nav />)
    expect(renderer.create(<wrappedNav/>)).toBeDefined()
});

