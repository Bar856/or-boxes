import Station from './Station.js';
import Head from 'next/head';
import { useDataRefresh } from './useDataRefresh.js';
import { useEffect, useState } from 'react';
import Image from 'next/image.js';
export default function Home({ initialStations }) {
  const [stations, setStations] = useState(initialStations);
  const [orderBy, setOrderBy] = useState('id'); // Default order by ID
  const [loading, setLoading] = useState(true); // State to track if data is being fetched

  const RefreshInterval = 1000; // Refresh interval in milliseconds (10 seconds)


  // useEffect(() => {
  //   // Fetch data from the server-side endpoint
  //   fetch('/api/stations')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setStations(data);
  //       setLoading(false); // Set loading to false once data is fetched
  //     });
  // }, []);
  const fetchData = () => {
    fetch('/api/stations')
      .then((response) => response.json())
      .then((data) => {
        setStations(data);
        setLoading(false); // Set loading to false once data is fetched
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
    // First, check if the owner field is empty for both stations
    const bothEmpty = !a.owner.trim() && !b.owner.trim();
    if (bothEmpty) {
      // If both owner fields are empty, keep the original order
      return 0;
    } else if (!a.owner.trim()) {
      // If only the owner field of station 'a' is empty, place 'a' after 'b'
      return 1;
    } else if (!b.owner.trim()) {
      // If only the owner field of station 'b' is empty, place 'a' before 'b'
      return -1;
    } else {
      // If both owner fields are non-empty, sort alphabetically by owner name
      return a.owner.localeCompare(b.owner);
    }
  })
  .sort((a, b) => {
    // Sort by ID if orderBy is set to 'id'
    if (orderBy === 'id') {
      return parseInt(a.id) - parseInt(b.id);
    }
    return 0;
  });
  
  useDataRefresh(fetchData);

  // Function to calculate the number of non-empty cells
  const getNonEmptyCellCount = () => {
    const nonEmptyCells = stations.filter((station) => station.owner.trim() !== '');
    return nonEmptyCells.length;
  };

  // Function to get the total number of cells
  const getTotalCellCount = () => {
    return stations.length;
  };
  // Calculate the number of non-empty cells and total cells
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
        {/* Add other meta tags as needed */}
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
        {orderedStations.map((station) => (
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
