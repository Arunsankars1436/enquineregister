import React, { useState } from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Search from './component/Search/index';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { get } from 'lodash';
import 'leaflet/dist/leaflet.css';
const intialPosition = [51.505, -0.09];

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function App() {
  const [position, selectPosition] = useState(intialPosition);
  const [isResult, setResult] = useState(null);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} xl={6} sm={6} md={6} lg={6}>
        <Search
          selectPosition={selectPosition}
          position={position}
          isResult={isResult}
          setResult={setResult}
          />
      </Grid>
      <Grid item xs={6} xl={6} sm={6} md={6} lg={6} style={{
            overflow: "hidden",
            height: "100vh"
      }}>
        <Map center={position} zoom={13} style={{
          height: "100vh"
        }}>
          <TileLayer
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {get(isResult, 'length') ? isResult.map((each) => {
            const c_pos = [get(each, 'location.lat'), get(each, 'location.long')];
            if (get(position, '[0]') === get(each, 'location.lat') && get(position, '[1]') === get(each, 'location.long')) {
              return (
                <Marker position={c_pos}>
                  <Popup>{get(each, 'location.city')}</Popup>
                </Marker>
              );
            }
            return (
              <Marker position={c_pos}>
                <Popup>{get(each, 'location.city')}</Popup>
              </Marker>
            )
          }) : (
            <Marker position={position}>
              <Popup>No locations Found</Popup>
            </Marker>
          )}
        <Marker position={position}>
        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
        </Marker>
        <Marker position={[55.505, -0.09]}>
        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
        </Marker>
      </Map>
      </Grid>
    </Grid>
  );
}

export default App;
