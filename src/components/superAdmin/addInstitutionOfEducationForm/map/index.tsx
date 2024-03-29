import React, { useState } from 'react';
import styles from './map.module.scss';
import L, { LeafletMouseEvent } from 'leaflet';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';

L.Icon.Default.imagePath = '/assets/icons/';

const GetIcon = () => {
  return L.icon({
    iconUrl: require('./icon/marker.svg'),
    iconSize: [45, 45],
  });
};

const InstitutionOfEducationMap = (props: any) => {
  const current = props.currentPosition || [0, 0];
  const [position, setPosition] = useState<[number, number]>(current);

  const setFieldValue = (name: string, value: number) => {
    props.setFieldValue(name, value);
  };

  const styleURL: string = `https://api.mapbox.com/styles/v1/youritfuture/cklig66bm1iis17oth9p6vklg/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_KEY}`;

  const LocationMarker = () => {
    useMapEvents({
      click(e: LeafletMouseEvent) {
        const lng: number = e.latlng.lng;
        const lat: number = e.latlng.lat;
        setPosition([lat, lng]);
        if (props.setFieldValue) {
          setFieldValue('lat', lat);
          setFieldValue('lon', lng);
        }
      },
    });
    return <Marker position={position} icon={GetIcon()}></Marker>;
  };

  return (
    <MapContainer
      id='mapComponent'
      key={props.errors.lat}
      className={`${styles.mapContainer} ${
        props.errors.lat ? styles.errorInField_borderAround : ''
      }`}
      zoom={6}
      center={[49, 32]}
    >
      <TileLayer url={styleURL} />
      <LocationMarker />
    </MapContainer>
  );
};

export default InstitutionOfEducationMap;
