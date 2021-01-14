import React, { Fragment, Component } from 'react';
import style from './maps.module.scss';
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
      title: 'НУВГП',
      lat: 50.61806340017246,
      lng: 26.258849617252494,
    },
    {
      id: 2,
      title: 'РДГУ',
      lat: 50.62391948899365,
      lng: 26.260761871037438,
    },
    {
      id: 3,
      title: 'МЕГУ',
      lat: 50.60980990710955,
      lng: 26.28854389842137,
    },
    {
      id: 4,
      title: 'НУОА',
      lat: 50.32950770194359,
      lng: 26.512455481119186,
    },
  ];

  const styleURL: string =
    'https://api.mapbox.com/styles/v1/larysashashuk/ckjwvqmbv0evv17peb192amng/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibGFyeXNhc2hhc2h1ayIsImEiOiJja2pvOTR3OGUwYjZwMnJsMW01d3d0anF0In0.tKauPUafm3tudsOO3YgwFQ';

  const universitiesList = universitiesDB.map((elem) => {
    const { id, title, lat, lng } = elem;
    return (
      <Marker position={[lat, lng]} icon={GetIcon()} key={id}>
        <Popup>{title}</Popup>
      </Marker>
    );
  });

  return (
    <Fragment>
      <MapContainer
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
