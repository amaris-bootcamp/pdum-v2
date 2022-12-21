import React from "react";
import {MapContainer, Marker, Polyline, Popup, TileLayer} from "react-leaflet";
import {useSelector} from "react-redux";

const WorldMap = () => {
    const {name: departure, gps: depGps} = useSelector(state => state.airport.departure)
    const {name: arrival, gps: arrGps} = useSelector(state => state.airport.arrival)

    return (<MapContainer center={depGps.length > 0 ? depGps : [50, 0]} zoom={3}
                          scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {depGps.length > 0 && <Marker position={depGps}>
                <Popup>{departure}</Popup>
            </Marker>}
            {arrGps.length > 0 && <Marker position={arrGps}>
                <Popup>{arrival}</Popup>
            </Marker>}
            {(depGps.length > 0 && arrGps.length > 0) &&
                <Polyline positions={[depGps, arrGps]} pathOptions={{color: 'red'}}/>}
        </MapContainer>

    )
}

export default WorldMap
