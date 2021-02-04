import React, { Fragment } from 'react';
import style from './map.module.scss';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

L.Icon.Default.imagePath = '/assets/icons/';

const GetIcon = () => {
  return L.icon({
    iconUrl: require('./icon/marker.svg'),
    iconSize: [45, 45],
  });
};

const UniversityMap = () => {
  const zoom: number = 9;

  const universitiesDB = [
    {
      id: 1,
      title:
        'Національний університет водного господарства та природокористування',
      link: 'https://nuwm.edu.ua/',
      lat: 50.61806340017246,
      lng: 26.258849617252494,
    },
    {
      id: 2,
      title: 'Рівненський державний гуманітарний університет',
      link: 'https://www.rshu.edu.ua/',
      lat: 50.62391948899365,
      lng: 26.260761871037438,
    },
    {
      id: 3,
      title: 'Міжнародний економіко - гуманітарний університет',
      link: 'https://www.megu.edu.ua/uk/',
      lat: 50.60980990710955,
      lng: 26.28854389842137,
    },
    {
      id: 4,
      title: 'Національний університет "Острозька академія',
      link: 'https://www.oa.edu.ua/',
      lat: 50.32950770194359,
      lng: 26.512455481119186,
    },
  ];

  const styleURL: string =
    'https://api.mapbox.com/styles/v1/youritfuture/ckkqtwz6r246m17p2r13tk6g8/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieW91cml0ZnV0dXJlIiwiYSI6ImNra3F0djk4djBwd2cyb3A4d2ZqN3VvejQifQ.r3PFeuvd1goZcNvbZ0WDBg';

  const universitiesList = universitiesDB.map((elem) => {
    const { id, title, link, lat, lng } = elem;
    return (
      <Marker position={[lat, lng]} icon={GetIcon()} key={id}>
        <Popup>
          <div id='markerPopup' className={style.popUpContent}>
            <h4 className={style.popUpTitle}>{title}</h4>
            <a className={style.popUpLink} href={link} target='_blank'>
              Сайт
            </a>
          </div>
        </Popup>
      </Marker>
    );
  });

  return (
    <Fragment>
      <MapContainer
        id='mapComponent'
        className={style.mapContainer}
        zoom={zoom}
        center={[50.505455275104225, 26.33024401561073]}
      >
        <TileLayer url={styleURL} />
        {universitiesList}
      </MapContainer>
    </Fragment>
  );
};

export default UniversityMap;
