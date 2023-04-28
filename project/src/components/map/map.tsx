
import { FC, useEffect, useRef } from 'react';
import {Icon, Marker} from 'leaflet';
import { Offer } from '../../types/offers';
import useMap from '../../hooks/use-map';
import { useAppSelector } from '../../hooks';
import { getCityData } from '../../utils/get-city-data';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import 'leaflet/dist/leaflet.css';
import { getSelectedCity } from '../../store/filter/selectors';

type MapProps = {
  offers: Offer[] | undefined;
  selectedOffer: Offer | undefined;
}

const Map:FC<MapProps> = ({offers, selectedOffer}) => {
  const mapRef = useRef(null);
  const selectedCity = useAppSelector(getSelectedCity);
  const city = getCityData(offers, selectedCity);
  const map = useMap(mapRef, city);


  useEffect(() => {
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

    if (map && offers) {
      offers.forEach((offer) => {

        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            selectedOffer !== undefined && offer.id === selectedOffer.id
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
  }, [map, offers, selectedOffer]);

  return (
    <section style={{ height: '100%', width: '100%' }} ref={mapRef} data-testid='map-block'></section>
  );
};

export default Map;
