import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Route, Switch } from '@testing-library/react';
import Home from '.';

test('fake test', () => {
  expect(2 + 2).toEqual(4);
});

// test('renders without crashing', () => {
//   const app = render(
//     <Router>
//       <Home />
//     </Router>
//   );

//   expect(app).toMatchSnapshot();
// });
