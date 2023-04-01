
import { FC, useEffect, useRef } from 'react';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/useMap';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import { City } from '../../types/offers';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  points: {
    latitude: number;
    longitude: number;
    id: number;
  }[];
  selectedCardId: number | undefined;
}

const Map:FC<MapProps> = ({city, points, selectedCardId}) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = new Icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [23, 36],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = new Icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [23, 36],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      points.forEach((point) => {

        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });

        marker
          .setIcon(
            selectedCardId !== undefined && point.id === selectedCardId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }

    return () => {
      map?.eachLayer((layer) => {
        if (layer.getPane()?.classList.contains('leaflet-marker-pane')) {
          layer.remove();
        }
      });
    };
  }, [map, points]);

  return (
    <section className='cities__map map' ref={mapRef}></section>
  );
};

export default Map;
