import React, {useState} from 'react'
import {MapContainer, TileLayer, Marker, useMapEvents} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {useSelector} from 'react-redux'

export const GoogleMapComponent = ({onSelectLocation, latlng}) => {
    const [userLocation, setUserLocation] = useState(null)
    const darkMode = useSelector(state => state.layout.skin) === 'dark'

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                onSelectLocation(e.latlng) // Update marker position with clicked coordinates
            },
        })
        return null
    }

    return (
        <div className="h-100">
            <MapContainer
                center={userLocation || [35.6892, 51.389]} // Default to Tehran if location isn't available
                zoom={7}
                style={{
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    backgroundColor: darkMode ? '#000' : '#fff',
                }}
            >
                {!darkMode && (
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                )}

                {darkMode && (
                    <TileLayer
                        url="https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://www.thunderforest.com/terms/">Thunderforest</a>'
                    />
                )}

                {/* Show marker if position is set */}
                {latlng && <Marker position={latlng} />}

                {/* Component to handle clicks */}
                <MapClickHandler />

                {userLocation && <Marker position={userLocation} />}
            </MapContainer>
        </div>
    )
}
