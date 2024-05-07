import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import icon from 'leaflet/dist/images/marker-icon.png';
import blackIcon from './black-icon.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: icon,
    iconUrl: icon,
    shadowUrl: iconShadow
});

const MapComponent = () => {
    const mapRef = useRef(null);
    const [driverLocation, setDriverLocation] = useState(null);
    const [etaToNextStop, setEtaToNextStop] = useState(null);
    const [distanceToNextStop, setDistanceToNextStop] = useState(null);
    const [nextStop, setNextStop] = useState(null);
    const averageSpeed = 30; // Assuming an average speed of 30 km/h
    
    const markers = [
        { position: [-1.939826787816454, 30.0445426438232], label: 'Nyabugogo' },
        { position: [-1.9355377074007851, 30.060163829002217], label: 'Stop A' },
        { position: [-1.9358808342336546, 30.08024820994666], label: 'Stop B' },
        { position: [-1.9489196023037583, 30.092607828989397], label: 'Stop C' },
        { position: [-1.9592132952818164, 30.106684061788073], label: 'Stop D' },
        { position: [-1.9487480402200394, 30.126596781356923], label: 'Stop E' },
        { position: [-1.9365670876910166, 30.13020167024439], label: 'Kimironko' }
    ];

    useEffect(() => {
        if (!mapRef.current) return;

        const map = L.map(mapRef.current, {
            zoomControl: false // Disable default zoom control
        }).setView([-1.939826787816454, 30.0445426438232], 12);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const driverMarker = L.marker([-1.939826787816454, 30.0445426438232], {
            icon: L.icon({
                iconUrl: blackIcon,
                shadowUrl: iconShadow,
                iconSize: [28, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            })
        }).addTo(map);

        markers.forEach(marker => {
            L.marker(marker.position).addTo(map)
                .bindPopup(marker.label)
                .openPopup();
        });

        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const R = 6371; // Radius of the Earth in km
            const dLat = (lat2 - lat1) * (Math.PI / 180);
            const dLon = (lon2 - lon1) * (Math.PI / 180);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c; // Distance in km
            return distance;
        };

        const calculateETA = (distance) => {
            const time = distance / averageSpeed; // Time in hours
            const minutes = Math.round(time * 60); // Convert hours to minutes
            return minutes;
        };

        const updateDriverLocation = () => {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setDriverLocation([latitude, longitude]);
                    driverMarker.setLatLng([latitude, longitude]);
                    const nextStopIndex = 1; // Assuming the next stop is index 1 in the markers array
                    const nextStopPosition = markers[nextStopIndex].position;
                    const distanceToNextStop = calculateDistance(latitude, longitude, nextStopPosition[0], nextStopPosition[1]);
                    const etaToNextStop = calculateETA(distanceToNextStop);
                    setDistanceToNextStop(distanceToNextStop);
                    setEtaToNextStop(etaToNextStop);
                    setNextStop(markers[nextStopIndex].label);
                },
                error => {
                    console.error('Error getting current position:', error);
                }
            );
        };

        const intervalId = setInterval(updateDriverLocation, 5000);

        return () => {
            clearInterval(intervalId);
            map.remove();
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (mapRef.current) {
                if (mapRef.current._leafletMap) {
                    mapRef.current._leafletMap.invalidateSize();
                }
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div >
            <div>
                <p>
                    <b>Nyabugogo - Kimironko</b>  
                </p>
                {nextStop && (
                    <p>
                        Next Stop: {nextStop}
                    </p>
                )}
                {etaToNextStop !== null && (
                    <p>
                        Minutes: {etaToNextStop} minutes
                    </p>
                )}
                {distanceToNextStop !== null && (
                    <p>
                        Distance: {distanceToNextStop.toFixed(2)} km
                    </p>
                )}
            </div>
            <div ref={mapRef} style={{ width: '100%', height: '65vh' }} />
        </div>
    );
};

export default MapComponent;
