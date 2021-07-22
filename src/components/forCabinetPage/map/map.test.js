import React from 'react';
import { render, screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Marker } from 'react-leaflet';
import InstitutionsOfEducationMap from './index';
import L from 'leaflet';

window.scrollTo = jest.fn();

describe('Test InstitutionsOfEducationMap component', () => {
  test('render map with no markers', () => {
    const data = [{}];

    render(<InstitutionsOfEducationMap data={data} />);

    expect(document.getElementById('mapComponent')).not.toContainHTML(
      `${(<Marker />)}`
    );
  });

  test('render map with one marker', () => {
    const data = [
      {
        id: 'ae6172ab-138e-4a5d-9f9d-4f579623daee',
        name: 'Рівненський державний гуманітарний університет',
        site: 'http://www.rshu.edu.ua/',
        lat: 50.62373,
        lon: 26.260765,
      },
    ];
    const marker = (
      <Marker
        position={[data.lat, data.lon]}
        icon={L.icon({
          iconUrl: require('./icon/marker.svg'),
          iconSize: [45, 45],
        })}
      />
    );
    render(<InstitutionsOfEducationMap data={data} />);

    expect(document.getElementById('mapComponent')).toContainHTML(`${marker}`);
  });

  test('render map with more that one marker', () => {
    const data = [
      {
        id: '62f54bfa-9e75-419c-9933-0d07cba2ec32',
        name: 'Національний університет водного господарства та природокористування',
        site: 'https://nuwm.edu.ua/',
        lat: 50.61798,
        lon: 26.258654,
      },
      {
        id: 'ae6172ab-138e-4a5d-9f9d-4f579623daee',
        name: 'Рівненський державний гуманітарний університет',
        site: 'http://www.rshu.edu.ua/',
        lat: 50.62373,
        lon: 26.260765,
      },
    ];
    render(<InstitutionsOfEducationMap data={data} />);

    for (const element of data) {
      const marker = (
        <Marker
          position={[element.lat, element.lon]}
          icon={L.icon({
            iconUrl: require('./icon/marker.svg'),
            iconSize: [45, 45],
          })}
        />
      );
      expect(document.getElementById('mapComponent')).toContainHTML(
        `${marker}`
      );
    }
  });

  test('check the popup content of the marker', async () => {
    const data = [
      {
        id: '62f54bfa-9e75-419c-9933-0d07cba2ec32',
        name: 'Національний університет водного господарства та природокористування',
        site: 'https://nuwm.edu.ua/',
        lat: 50.61798,
        lon: 26.258654,
      },
    ];

    render(<InstitutionsOfEducationMap data={data} />);

    await wait(() => {
      userEvent.click(document.querySelector('.leaflet-marker-icon'));
    });

    expect(
      screen.getByText(
        'Національний університет водного господарства та природокористування'
      )
    ).toBeInTheDocument();
    expect(
      document.querySelector('[href="https://nuwm.edu.ua/"]')
    ).toBeInTheDocument();
  });
});
