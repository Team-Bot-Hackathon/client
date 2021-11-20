import { MapContainer, TileLayer } from "react-leaflet";
import "./styles.css";
import "leaflet/dist/leaflet.css";

import Routing from "./Routing";

export default function Mapcomponent() {
  const position = [51.505, -0.09];

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100vh" }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Routing />
    </MapContainer>
  );
}
