import React from 'react';
import renderer from 'react-test-renderer'

import App from './App';

// TODO after other components are fixed
it('renders without crashing', () => {
  expect(renderer.create(<App disableTone={true} />)).toBeDefined();

  // expect(renderer.create(<App/>)).toBeDefined()
});
