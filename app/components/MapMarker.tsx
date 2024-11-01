import dynamic from 'next/dynamic';

const MapMarkerComponent = dynamic(() => import('./MapMarkerComponent'), {
    ssr: false
});

type Props = {
    draggable: boolean,
    lat: number,
    lng: number,
    setLat: (lat: number) => void,
    setLng: (lng: number) => void
}

export default function MapMarker(props: Props) {
    return <MapMarkerComponent {...props} />;
}