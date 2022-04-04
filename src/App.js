import logo from './logo.svg';
import './App.css';

import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import React, { useRef, useEffect, useState } from 'react';
import BasicMenu from "./components/menu";
import SaveRoute from "./components/Route";
import DrawRoute from "./scenes/DrawRoute";
import SavedRoute from "./components/SavedRoutes"
import CompareRoutes from "./components/RouteCompare"
import CompareDrawRoute from "./scenes/CompareRoutes";
import SavedRoutesView from "./scenes/ViewSaved";

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2F2aW5jbGFya2UwIiwiYSI6ImNsMHlibm9mZDBnZm8zaXBqMHcxajJ0em4ifQ.HHRfRI_7Ix71cYVlR52hfA'


function App() {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-122.62);
    const [lat, setLat] = useState(49.64);
    const [zoom, setZoom] = useState(7);
    const [stateSelected, setSelection] = useState(0);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    });



    return (
      <div>
          <div ref={mapContainer} className="map-container" />
          {stateSelected === 0 && <BasicMenu setSelection={setSelection} />}
          {stateSelected === 1 && <DrawRoute setSelection={setSelection} map={map}/> }
          {stateSelected === 2 && <CompareDrawRoute setSelection={setSelection} map={map}/> }
          {stateSelected === 3 && <SavedRoutesView setSelection={setSelection} map={map}/> }
      </div>
    );
}


















export default App;
