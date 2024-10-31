import MapMarker from "./MapMarker";


type Props = {
    draggable: boolean,
    lat: number,
    lng: number,
    setLat: (lat: number) => void,
    setLng: (lng: number) => void
}

export default function MapModal({ draggable, lat, lng, setLat, setLng, onClose }: Props & { onClose: () => void }) {

    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <button 
                    onClick={onClose} 
                    className="mb-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Close
                </button>
                <div className = "h-[50vh]">
                <MapMarker draggable={draggable} lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
                </div>
            </div>
        </div>
    );
}