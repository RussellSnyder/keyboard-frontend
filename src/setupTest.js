import 'jest-enzyme';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// configure your adapter
configure({ adapter: new Adapter() });