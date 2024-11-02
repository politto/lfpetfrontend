import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

type Props = {
    draggable: boolean,
    lat: number,
    lng: number,
    setLat: (lat: number) => void,
    setLng: (lng: number) => void
}



export default function MapMarkerComponent({ draggable, lat, lng, setLat, setLng }: Props) {
    const [center, setCenter] = useState({ lat:lat, lng: lng });
    const [position, setPosition] = useState(center);
    const markerRef = useRef<L.Marker>(null);

    useEffect(() => {
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
            
    }, []);

    useEffect(() => {
        console.log(center)
        setCenter({lat:lat, lng:lng})
        return () => {
            
        };
    }, []);

    

    const handleMapClick = (event: L.LeafletMouseEvent) => {
        setPosition(event.latlng);
    };

    return (
        <div className="overflow-hidden h-full">
            <MapContainer
                center={center}
                zoom={15}
                style={{ height: '80%', width: '100%' }}
            >
                <MapClickHandler handleMapClick={handleMapClick} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {position && (
                    <DraggableMarker draggable={draggable} lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
                )}
            </MapContainer>
        </div>
    );
}

function MapClickHandler({ handleMapClick }: { handleMapClick: (event: L.LeafletMouseEvent) => void }) {
    useMapEvents({
        click: handleMapClick,
    });
    return null;
}

function DraggableMarker({ draggable, lat, lng, setLat, setLng }: Props) {
    const [position, setPosition] = useState({ lat, lng });
    const markerRef = useRef<L.Marker>(null);
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    const newLatLng = marker.getLatLng()
                    setPosition(newLatLng);
                    setLat(newLatLng.lat);
                    setLng(newLatLng.lng);
                    alert(lat + " " + newLatLng.lat);
                }
            },
        }),
        [setLat, setLng]
    );

    useEffect(() => {
        setPosition({ lat, lng });
    }, [lat, lng]);

    return (
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
        >
            <Popup minWidth={90} autoClose keepInView>
                {
                    draggable? (
                        <h3 className="text-xl">Drag this pin to last known location{draggable}</h3>
                    ):(
                        //shows pet info
                        <p>those pet's last known location</p>
                    )
                }
            </Popup>
        </Marker>
    );
}