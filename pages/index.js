import Station from './Station.js';
import Head from 'next/head';
import { useDataRefresh } from '../helpers/useDataRefresh.js';
import { useEffect, useState } from 'react';
import Image from 'next/image.js';
export default function Home({ initialStations }) {
  const [stations, setStations] = useState(initialStations);
  const [orderBy, setOrderBy] = useState('id'); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true)
    fetch('/api/stations')
      .then((response) => response.json())
      .then((data) => {
        setStations(data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  useDataRefresh(fetchData);

  const handleOrderChange = (event) => {
    setOrderBy(event.target.value);
  };

  const orderedStations = stations
  .slice()
  .sort((a, b) => {
    const bothEmpty = !a.owner.trim() && !b.owner.trim();
    if (bothEmpty) {
      return 0;
    } else if (!a.owner.trim()) {
      return 1;
    } else if (!b.owner.trim()) {
      return -1;
    } else {
      return a.owner.localeCompare(b.owner);
    }
  })
  .sort((a, b) => {
    if (orderBy === 'id') {
      return parseInt(a.id) - parseInt(b.id);
    }
    return 0;
  });
  
  useDataRefresh(fetchData);

  const getNonEmptyCellCount = () => {
    const nonEmptyCells = stations.filter((station) => station.owner.trim() !== '');
    return nonEmptyCells.length;
  };

  const getTotalCellCount = () => {
    return stations.length;
  };
  const nonEmptyCellCount = getNonEmptyCellCount();
  const totalCellCount = getTotalCellCount();

 if (loading) {
  return <main className="flex min-h-screen flex-col items-center justify-between p-24  ">
          <Image src="/Spinner.gif" className='mt-48' width={200} height={200} />
        </main>
}
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24  ">
      <Head>
        <title>RF Integrations-Lab Mapping</title>
        <meta
          name="description"
          content="This is a Next.js app for managing RF Integrations-Lab Mapping."
        />
      </Head>
      <div className='grid grid-cols-6'>
          <h1 className='col-start-3 col-span-5 text-2xl p-4'>RF Integrations-Lab Mapping</h1>
          <select className='m-4 col-start-3 col-end-4 ' value={orderBy} onChange={handleOrderChange}>
            <option  value="id">Order by ID</option>
            <option value="owner">Busy Stations first</option>
          </select>
          <div className='m-4 col-start-4 col-end-5'>
            <label>Busy:</label>
            <span className='text-red-500 l'> {nonEmptyCellCount} </span>/ <span>{totalCellCount}</span>
          </div>
      </div>
      <div className="grid grid-cols-4 gap-4 ">
        {orderedStations.map((station, index) => (
          <Station
          className={index < orderedStations.findIndex((s) => s.id === station.id) ? 'moved-up' : ''}
           key={station.id} station={station} setStations={setStations} />
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  try {
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
