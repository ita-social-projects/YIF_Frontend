import React, { useEffect, useState } from 'react';
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

const InstitutionsOfEducationMap = (props: any) => {
  const institutionsOfEducationDB = props.data;
  const [zoom, setZoom] = useState(6);
  const [centerLat, setCenterLat] = useState(49);
  const [centerLon, setCenterLon] = useState(30);

  useEffect(() => {
    if (institutionsOfEducationDB[0].lat) {
      setZoom(institutionsOfEducationDB.length > 1 ? 8 : 12);
      setCenterLat(
        institutionsOfEducationDB.length > 1
          ? 50.42590474025277
          : institutionsOfEducationDB[0].lat
      );
      setCenterLon(
        institutionsOfEducationDB.length > 1
          ? 27.957419925020235
          : institutionsOfEducationDB[0].lon
      );
    }
  }, [institutionsOfEducationDB]);

  const styleURL: string = `https://api.mapbox.com/styles/v1/youritfuture/cklig66bm1iis17oth9p6vklg/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_KEY}`;

  let institutionsOfEducationList;

  if (institutionsOfEducationDB[0].lat) {
    institutionsOfEducationList = institutionsOfEducationDB.map((elem: any) => {
      const { id, name, site, lat, lon } = elem;
      return (
        <Marker position={[lat, lon]} icon={GetIcon()} key={id}>
          <Popup>
            <div id='markerPopup' className={style.popUpContent}>
              <h4 className={style.popUpTitle}>{name}</h4>
              <a
                className={style.popUpLink}
                href={site}
                target='_blank'
                rel='noopener noreferrer'
              >
                Сайт
              </a>
            </div>
          </Popup>
        </Marker>
      );
    });
  }

  return (
    <MapContainer
      data-testid='mapComponent'
      id='mapComponent'
      className={style.mapContainer}
      zoom={zoom}
      center={[centerLat, centerLon]}
    >
      <TileLayer url={styleURL} />
      {institutionsOfEducationList}
    </MapContainer>
  );
};

export default InstitutionsOfEducationMap;
