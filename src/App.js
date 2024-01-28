import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

const App = () => {
  const [mapLayers, setMapLayers] = useState('osm');
  const [geojsonData, setGeojsonData] = useState(null);

  const handleLayerChange = (event) => {
    setMapLayers(event.target.value);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setGeojsonData(JSON.parse(e.target.result));
      };
      reader.readAsText(file);
    }
  };

  const GeocodeSearch = () => {
    const map = useMap();

    const handleGeocode = () => {
      const address = document.getElementById('searchInput').value;
      if (address) {
        // Use a geocoding service (e.g., OpenCage, Mapbox, etc.) to get coordinates
        // and then update the map view
      }
    };

    return (
      <div className="search-bar">
        <input type="text" id="searchInput" placeholder="Search address" />
        <button onClick={handleGeocode}>Search</button>
      </div>
    );
  };

  return (
    <div className="app">
      <MapContainer center={[0, 0]} zoom={2} style={{ height: '800px' }}>
        <TileLayer
          url={
            mapLayers === 'satellite'
              ? 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'
              : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          }
          attribution={
            mapLayers === 'satellite'
              ? '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>'
              : '© OpenStreetMap contributors'
          }
        />
        {geojsonData && <GeoJSON data={geojsonData} />}
        <GeocodeSearch />
      </MapContainer>

      <div className="controls">
        <label>
          <input
            type="radio"
            name="layer"
            value="satellite"
            checked={mapLayers === 'satellite'}
            onChange={handleLayerChange}
          />
          Satellite
        </label>
        <label>
          <input
            type="radio"
            name="layer"
            value="osm"
            checked={mapLayers === 'osm'}
            onChange={handleLayerChange}
          />
          OSM
        </label>

        <div className="upload-form">
          <label htmlFor="fileInput">Upload Spatial Data:</label>
          <input type="file" id="fileInput" accept=".geojson, .kml, .shp" onChange={handleFileUpload} />
        </div>
      </div>
    </div>
  );
};

export default App;
