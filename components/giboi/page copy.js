"use client"
import Station from './components/Station';
import { useState } from 'react';

export default function Home() {
  const stations_empty = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
    { id: 16 },
    { id: 17 },
    { id: 18 },
    { id: 19 },
    { id: 20 },
  ].map((item) => ({
    ...item,
    name: '',
    owner: '',
    ip: '',
    location: '',
  }));

  const [stations, setStations] = useState(stations_empty);

  const updateStation = (updatedStation) => {
    // Find the index of the updated station in the stations array
    const index = stations.findIndex((station) => station.id === updatedStation.id);
    if (index !== -1) {
      // Update the stations array with the new data
      const updatedStations = [...stations];
      updatedStations[index] = updatedStation;
      setStations(updatedStations);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <h1 className='text-3xl'>RF Integrations-Lab Mapping</h1>
      <div className="grid grid-cols-4 gap-4 ">
        {stations.map((d, i) => {
          return <Station key={i} st={d} updateStation={updateStation} />;
        })}
      </div>
    </main>
  );
}
