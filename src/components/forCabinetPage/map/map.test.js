import React from 'react';
import ReactDOM from 'react-dom';
import UniversityMap from './index.tsx';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UniversityMap />, div);
});
