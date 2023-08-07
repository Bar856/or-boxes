import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function StationComp({ station, setStations }) {
  const { id = '', name = '', owner = '', ip = '', location = '' , lpPort = '', user = ''} = station || {};

  const [setupName, setSetupName] = useState(name);
  const [setupOwner, setSetupOwner] = useState(owner);
  const [setupIp, setSetupIp] = useState(ip);
  const [setupLocation, setSetupLocation] = useState(location);
  const [setupLpPort, setSetupLpPort] = useState(1);
  const [setupUser, setSetupUser] = useState(user);
  const clearFields = () => {
    const updatedStation = {
      ...station,
      name: setupName,
      owner: "",
      ip: setupIp,
      location: setupLocation,
      lpPort: setupLpPort,
      user: setupUser,
    };
    
    fetch('/api/updateStation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStation),
    })
      .then((response) => response.json())
      .then((data) => {
        setStations((prevStations) =>
          prevStations.map((s) => (s.id === updatedStation.id ? updatedStation : s))
        );
      })
      .catch((error) => {
        alert('Error updating data:', error);
      });
    
  };
  useEffect(() => {
    setSetupName(station.name);
    setSetupOwner(station.owner);
    setSetupIp(station.ip);
    setSetupLocation(station.location);
    setSetupLpPort(lpPort !== '' ? parseInt(lpPort, 10) : 1); 
    setSetupUser(station.user);

  }, [station]);

  const handleUpdate = () => {
    const updatedStation = {
      ...station,
      name: setupName,
      owner: setupOwner,
      ip: setupIp,
      location: setupLocation,
      lpPort: setupLpPort,
      user: setupUser,
    };
    
    fetch('/api/updateStation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStation),
    })
      .then((response) => response.json())
      .then((data) => {
        setStations((prevStations) =>
          prevStations.map((s) => (s.id === updatedStation.id ? updatedStation : s))
        );
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };
  
  return (
    <div style={owner.length ? { backgroundColor: '#ff9999' } : { backgroundColor: '#80ff80' }} className='station move-station border-solid border-2 border-stone-400 rounded-lg'>
      <div className='center'>
        <Image className='rounded-lg' width={200} height={200} src={"/box.png"} alt='box' />
      </div>
      <form className=' grid-rows-5 gap-4 p-2'
      onSubmit={(e) => {
        e.preventDefault();
        handleUpdate();
      }}
    >
        <input
          className='hover:bg-slate-300 text-center border-solid border-2 border-stone-400 rounded-lg w-full mb-2'
          placeholder='Setup Name'
          type='text'
          value={setupName}
          onChange={(e) => setSetupName(e.target.value)}
        />
        <input
          className='hover:bg-slate-300 text-center border-solid border-2 border-stone-400 rounded-lg w-full mb-2'
          placeholder='User'
          type='text'
          value={setupUser}
          onChange={(e) => setSetupUser(e.target.value)}
        />
        <div className='flex items-center'>
          <input
            className='hover:bg-slate-300 rounded-lg w-full mb-2'
            type="range"
            min={1}
            max={4}
            value={setupLpPort}
            onChange={(e) => setSetupLpPort(parseInt(e.target.value, 10))}
            step={1}
          />
          <p className='ml-2 mb-2'>{setupLpPort}</p>
        </div>
        <input
          className='hover:bg-slate-300 text-center border-solid border-2 border-stone-400 rounded-lg w-full mb-2'
          placeholder='IP'
          type='text'
          value={setupIp}
          onChange={(e) => setSetupIp(e.target.value)}
        />
        <input
          className='hover:bg-slate-300 text-center border-solid border-2 border-stone-400 rounded-lg w-full mb-2'
          placeholder='Location'
          type='text'
          value={setupLocation}
          onChange={(e) => setSetupLocation(e.target.value)}
        />
        <input
          className='hover:bg-slate-300 text-center border-solid border-2 border-stone-400 rounded-lg w-full mb-2'
          placeholder='Owner'
          type='text'
          value={setupOwner}
          onChange={(e) => setSetupOwner(e.target.value)}
        />  
        <input
            className='cursor-pointer hover:bg-slate-100 border-solid border-2 text-center border-stone-400 rounded-lg w-full mb-2'
            type='button'
            defaultValue='Clear Owner'
            onClick={clearFields}
          />
        <input
          hidden={true}
          className='cursor-pointer hover:bg-slate-300 border-solid border-2 text-center border-stone-400 rounded-lg w-full mb-2'
          type='submit'
          defaultValue='Update'
        />
      </form>
    </div>
  );
}
