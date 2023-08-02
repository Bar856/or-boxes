import Station from './Station';
import { useEffect, useState } from 'react';
export default function Home({ initialStations }) {
  const [stations, setStations] = useState(initialStations);

  useEffect(() => {
    // Fetch data from the server-side endpoint
    fetch('/api/stations')
      .then((response) => response.json())
      .then((data) => setStations(data));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <h1 className='text-3xl'>RF Integrations-Lab Mapping</h1>
      <div className="grid grid-cols-4 gap-4 ">
        {stations
          .slice()
          .sort((a, b) => parseInt(a.id) - parseInt(b.id))
          .map((station) => (
          <Station key={station.id} station={station} setStations={setStations} />
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch the initial data from the server-side endpoint to populate the page
    const response = await fetch('/api/stations');
    if (!response.ok) {
      throw new Error('Failed to fetch data from the server');
    }
    const initialStations = await response.json();

    return { props: { initialStations } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { initialStations: [] } };
  }
}
