import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import UniversityMap from './index.tsx';
import { render, fireEvent, screen } from '@testing-library/react';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UniversityMap />, div);
});
