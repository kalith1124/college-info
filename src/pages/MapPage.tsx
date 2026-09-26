import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { Navigation, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchColleges } from '@/lib/api';
import type { College } from '@/lib/types';
import { getDirectionsUrl, getInitials } from '@/lib/utils';
import { Skeleton } from '@/components/Skeleton';

L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

const CENTER: [number, number] = [8.98, 77.39];

function RecenterButton({ colleges }: { colleges: College[] }) {
  const map = useMap();
  return (
    <button
      onClick={() => {
        if (colleges.length === 1) {
          map.setView([colleges[0].latitude!, colleges[0].longitude!], 14);
        } else {
          const group = L.featureGroup(
            colleges.filter((c) => c.latitude && c.longitude).map((c) => L.marker([c.latitude!, c.longitude!]))
          );
          if (group.getLayers().length > 0) {
            map.fitBounds(group.getBounds().pad(0.1));
          }
        }
      }}
      className="absolute top-3 right-3 z-[1000] bg-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      Fit All
    </button>
  );
}

export default function MapPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetchColleges()
      .then(setColleges)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const validColleges = colleges.filter((c) => c.latitude && c.longitude);

  return (
    <div className="container-app py-6 pb-20 lg:pb-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-700 mb-1">College Map</h1>
        <p className="text-gray-500 text-sm">Find colleges on the map and get directions</p>
      </div>

      {loading ? (
        <Skeleton className="h-[500px]" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 relative">
            <div className="rounded-xl overflow-hidden shadow-card h-[500px] lg:h-[600px]">
              <MapContainer center={CENTER} zoom={11} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                {validColleges.map((college) => (
                  <Marker
                    key={college.id}
                    position={[college.latitude!, college.longitude!]}
                    eventHandlers={{ click: () => setSelected(college.id) }}
                  >
                    <Popup>
                      <div className="p-1 min-w-[200px]">
                        <div className="font-semibold text-gray-800 mb-1">{college.name}</div>
                        <div className="text-xs text-gray-500 mb-1">{college.college_type}</div>
                        <div className="text-xs text-gray-600 flex items-center gap-1 mb-2">
                          <MapPin className="w-3 h-3" /> {college.area || college.district}
                        </div>
                        {college.rating > 0 && (
                          <div className="flex items-center gap-1 text-xs mb-2">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">{college.rating.toFixed(1)}</span>
                            <span className="text-gray-400">({college.review_count})</span>
                          </div>
                        )}
                        <div className="flex gap-2 mt-2">
                          <Link
                            to={'/colleges/' + college.slug}
                            className="text-xs bg-primary-600 text-white px-2 py-1 rounded"
                          >
                            View Details
                          </Link>
                          <a
                            href={getDirectionsUrl(college.latitude, college.longitude, college.address)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-secondary-500 text-white px-2 py-1 rounded flex items-center gap-1"
                          >
                            <Navigation className="w-3 h-3" /> Directions
                          </a>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
                <RecenterButton colleges={validColleges} />
              </MapContainer>
            </div>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            <h3 className="font-semibold text-gray-700 mb-2 text-sm">
              {validColleges.length} colleges on map
            </h3>
            {validColleges.map((college) => (
              <button
                key={college.id}
                onClick={() => setSelected(college.id)}
                className={
                  'w-full text-left card p-3 transition-all ' +
                  (selected === college.id ? 'ring-2 ring-primary-400' : 'hover:shadow-card-hover')
                }
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary-600">{getInitials(college.name)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 text-sm truncate">{college.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                      <MapPin className="w-3 h-3" /> {college.area || college.district}
                    </div>
                    {college.rating > 0 && (
                      <div className="flex items-center gap-1 text-xs mt-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{college.rating.toFixed(1)}</span>
                        <span className="text-gray-400">({college.review_count})</span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
