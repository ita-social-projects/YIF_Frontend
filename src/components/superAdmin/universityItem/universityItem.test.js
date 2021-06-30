import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UniversityItem from '.';

const univer = {
  id: '1',
  abbreviation: 'НАВС',
  name: 'Академія внутрішніх військ МВС України',
  isBlocked: false,
};

describe('UniversityItem', () => {
  test('render corectly', () => {
    const { id, abbreviation, name, isBlocked } = univer;
    render(
      <Router>
        <UniversityItem
          abbreviation={abbreviation}
          fullName={name}
          isBlocked={isBlocked}
          IoEid={id}
          handleBlocking={()=>{}}
          handleEditing={()=>{}}
        />
      </Router>
    );
    expect(
      screen.getByText('Академія внутрішніх військ МВС України')
    ).toBeInTheDocument();
  });
});
