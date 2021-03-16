import React, { Fragment, useEffect, useState } from 'react';
import style from './map.module.scss';
import L, { LeafletMouseEvent } from 'leaflet';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';

L.Icon.Default.imagePath = '/assets/icons/';

const GetIcon = () => {
  return L.icon({
    iconUrl: require('./icon/marker.svg'),
    iconSize: [45, 45],
  });
};

const UniversityMap = (props: any) => {
  const [position, setPosition] = useState<[number, number]>([0, 0]);

  const settingLat = (value: any) => {
    props.settingLat(value);
  };

  const settingLng = (value: any) => {
    props.settingLng(value);
  };

  const styleURL: string = `https://api.mapbox.com/styles/v1/youritfuture/cklig66bm1iis17oth9p6vklg/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_KEY}`;

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e: LeafletMouseEvent) {
        const lng: number = e.latlng.lng;
        const lat: number = e.latlng.lat;
        setPosition([lat, lng]);
        settingLat(lat);
        settingLng(lng);
      },
    });
    return <Marker position={position} icon={GetIcon()}></Marker>;
  };

  return (
    <Fragment>
      <MapContainer
        id='mapComponent'
        className={style.mapContainer}
        zoom={6}
        center={[49, 32]}
      >
        <TileLayer url={styleURL} />
        <LocationMarker />
      </MapContainer>
    </Fragment>
  );
};

export default UniversityMap;
