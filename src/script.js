import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

const MapComponent = () => {
  useEffect(() => {
    // Set the access token before using any Mapbox GL functionality
    mapboxgl.accessToken = 'pk.eyJ1IjoibmVldjAzIiwiYSI6ImNsajV1eDJpbTBjc2Uza2w0bThwYjRodTIifQ.u3IxZ2ohVmrXScJli9TNjQ';

    const successLocation = (position) => {
      setupMap([position.coords.longitude, position.coords.latitude]);
    };

    const errorLocation = () => {
      setupMap([-2.24, 53.48]);
    };

    const setupMap = (center) => {
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: center,
        zoom: 15
      });

      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav);

      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken
      });

      map.addControl(directions, "top-left");
    };

    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true
    });

    // Clean up the map when the component is unmounted
    return () => {
      mapboxgl.accessToken = null;
    };
  }, []); // Empty dependency array to run the effect only once on component mount

  return <div id="map" style={{ height: '100vh' }}></div>;
};

export default MapComponent;
