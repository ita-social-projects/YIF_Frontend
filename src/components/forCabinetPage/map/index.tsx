import React, { Fragment, useEffect, useState } from 'react';
import style from './map.module.scss';
import Spinner from '../../../components/common/spinner';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

L.Icon.Default.imagePath = '/assets/icons/';

const GetIcon = () => {
  return L.icon({
    iconUrl: require('./icon/marker.svg'),
    iconSize: [45, 45],
  });
};

const UniversityMap = (props: any) => {
  const universitiesDB = props.data || [];
  const [isFetching, setFetching] = useState(true);
  const [zoom, setZoom] = useState(0);
  const [centerLat, setCenterLat] = useState(0);
  const [centerLon, setCenterLon] = useState(0);

  useEffect(() => {
    if (universitiesDB[0].lat) {
      setFetching(false);
      setZoom(universitiesDB.length > 1 ? 8 : 12);
      setCenterLat(
        universitiesDB.length > 1 ? 50.42590474025277 : universitiesDB[0].lat
      );
      setCenterLon(
        universitiesDB.length > 1 ? 27.957419925020235 : universitiesDB[0].lon
      );
    }
  }, [universitiesDB]);

  const styleURL: string = `https://api.mapbox.com/styles/v1/youritfuture/cklig66bm1iis17oth9p6vklg/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_KEY}`;

  const universitiesList = universitiesDB.map((elem: any) => {
    const { id, name, site, lat, lon } = elem;
    return (
      <Marker position={[lat, lon]} icon={GetIcon()} key={id}>
        <Popup>
          <div id="markerPopup" className={style.popUpContent}>
            <h4 className={style.popUpTitle}>{name}</h4>
            <a className={style.popUpLink} href={site} target="_blank">
              Сайт
            </a>
          </div>
        </Popup>
      </Marker>
    );
  });

  return (
    <Fragment>
      {isFetching ? (
        <div className={style.spinnerContainer}>
          <Spinner />
        </div>
      ) : (
        <MapContainer
          id="mapComponent"
          className={style.mapContainer}
          zoom={zoom}
          center={[centerLat, centerLon]}
        >
          <TileLayer url={styleURL} />
          {universitiesList}
        </MapContainer>
      )}
    </Fragment>
  );
};

export default UniversityMap;
