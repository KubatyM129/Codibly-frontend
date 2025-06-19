import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const LocationMarker = ({ onSelect }) => {
    const [position, setPosition] = useState(null);

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            onSelect(e.latlng);
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
};

const LocationPickerModal = ({ show, onClose, onLocationSelect }) => {
    const [selected, setSelected] = useState(null);

    if (!show) return null;

    const handleConfirm = () => {
        if (selected) {
            onLocationSelect(selected);
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Pick a Location</h2>
                <MapContainer
                    center={[51.505, -0.09]}
                    zoom={4}
                    style={{ width: '40vw', height: '40vw'}}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker onSelect={setSelected} />
                </MapContainer>
                <div style={{ marginTop: 16, textAlign: 'right' }}>
                    <button onClick={onClose} style={{ marginRight: 8 }}>Cancel</button>
                    <button onClick={handleConfirm} disabled={!selected}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default LocationPickerModal;