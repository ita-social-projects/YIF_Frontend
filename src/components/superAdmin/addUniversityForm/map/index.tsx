import React, { Fragment, useEffect, useState } from 'react';
import style from './map.module.scss';
import Spinner from '../../../../components/common/spinner';
import L, { LeafletMouseEvent } from 'leaflet';
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';

L.Icon.Default.imagePath = '/assets/icons/';

const GetIcon = () => {
  return L.icon({
    iconUrl: require('./icon/marker.svg'),
    iconSize: [45, 45],
  });
};

const UniversityMap = (props: any) => {
  const [zoom, setZoom] = useState(6);
  const [centerLat, setCenterLat] = useState(49);
  const [centerLon, setCenterLon] = useState(32);
  const [position, setPosition] = useState([0, 0]);

  const styleURL: string = `https://api.mapbox.com/styles/v1/youritfuture/cklig66bm1iis17oth9p6vklg/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_KEY}`;

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e: LeafletMouseEvent) {
        const lng: number = e.latlng.lng;
        const lat: number = e.latlng.lat;
        setPosition([lat, lng]);
      },
    });

    return position === null ? null : (
      <Marker position={[position[0], position[1]]} icon={GetIcon()}></Marker>
    );
  };

  return (
    <Fragment>
      <MapContainer
        id='mapComponent'
        className={style.mapContainer}
        zoom={zoom}
        center={[centerLat, centerLon]}
      >
        <TileLayer url={styleURL} />
        <LocationMarker />
      </MapContainer>
      {position.toString().split(',').join(', ')}
    </Fragment>
  );
};

export default UniversityMap;
