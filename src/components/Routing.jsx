/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { useSelector } from 'react-redux'

L.Marker.prototype.options.icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

export default function Routing() {
    const data = useSelector(state=>state.user.modalData.shop)
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints: [...data.map((shop)=>{return L.latLng(shop.lat,shop.lon)})],
            routeWhileDragging: true
        }).addTo(map);

        return () => map.removeControl(routingControl);
    }, [map]);

    return null;
}