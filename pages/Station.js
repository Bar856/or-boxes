import Image from 'next/image';
import { useState } from 'react';

export default function Station({ station, setStations }) {
  const { id, name, owner, ip, location } = station;

  const [setupName, setSetupName] = useState(name);
  const [setupOwner, setSetupOwner] = useState(owner);
  const [setupIp, setSetupIp] = useState(ip);
  const [setupLocation, setSetupLocation] = useState(location);

  const handleUpdate = () => {
    const updatedStation = {
      ...station,
      name: setupName,
      owner: setupOwner,
      ip: setupIp,
      location: setupLocation,
    };
    console.log(updatedStation)
    // Send the updated data to the API
    fetch('/api/updateStation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStation),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message); // You can handle the success message here if needed
        // Update the local state in the Station component
        setStations((prevStations) =>
          prevStations.map((s) => (s.id === updatedStation.id ? updatedStation : s))
        );
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  return (
    <div style={owner.length ? { backgroundColor: '#ff9999' } : { backgroundColor: '#80ff80' }} className='border-solid border-2 border-stone-400 rounded-lg'>
      <div className='center'>
        <Image className='rounded-lg' width={200} height={200} src={"/box.png"} alt='box' />
      </div>
      <div className='grid grid-rows-5 gap-4 p-10'>
        <label className='center'>{id}</label>
        <input
          className='text-center border-solid border-2 border-stone-400 rounded-lg w-full px-2'
          placeholder='Setup Name'
          type='text'
          value={setupName}
          onChange={(e) => setSetupName(e.target.value)}
        />
        <input
          className='text-center border-solid border-2 border-stone-400 rounded-lg w-full px-2'
          placeholder='Owner'
          type='text'
          value={setupOwner}
          onChange={(e) => setSetupOwner(e.target.value)}
        />
        <input
          className='text-center border-solid border-2 border-stone-400 rounded-lg w-full px-2'
          placeholder='IP'
          type='text'
          value={setupIp}
          onChange={(e) => setSetupIp(e.target.value)}
        />
        <input
          className='text-center border-solid border-2 border-stone-400 rounded-lg w-full px-2'
          placeholder='Location'
          type='text'
          value={setupLocation}
          onChange={(e) => setSetupLocation(e.target.value)}
        />
        <input
          className='border-solid border-2 text-center border-stone-400 rounded-lg w-full px-2'
          type='Submit'
          defaultValue='Update'
          onClick={handleUpdate}
        />
      </div>
    </div>
  );
}
