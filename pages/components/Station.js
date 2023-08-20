import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function StationComp({ station, setStations }) {
  const { id = '', name = '', owner = '', ip = '', location = '', user = ''  , port1 = '', port2 = '', port3 = '', port4 = ''} = station || {};

  const [setupName, setSetupName] = useState(name);
  const [setupOwner, setSetupOwner] = useState(owner);
  const [setupIp, setSetupIp] = useState(ip);
  const [setupLocation, setSetupLocation] = useState(location);
  const [setupUser, setSetupUser] = useState(user);

  const [setupPorts, setSetupPorts] = useState({
    port1: port1 === 'true' ? true : false,
    port2: port2 === 'true' ? true : false,
    port3: port3 === 'true' ? true : false,
    port4: port4 === 'true' ? true : false,
  });

  const clearFields = () => {
    const updatedStation = {
      ...station,
      name: setupName,
      owner: "",
      ip: setupIp,
      location: setupLocation,
      user: setupUser,
      port1: setupPorts.port1,
      port2: setupPorts.port2,
      port3: setupPorts.port3,
      port4: setupPorts.port4,
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
    setSetupUser(station.user);
    setSetupPorts({
      port1: station.port1 === 'true' ? true : false,
      port2: station.port2 === 'true' ? true : false,
      port3: station.port3 === 'true' ? true : false,
      port4: station.port4 === 'true' ? true : false,
    });
}, [station]);

  const handleUpdate = () => {
    const updatedStation = {
      ...station,
      name: setupName,
      owner: setupOwner,
      ip: setupIp,
      location: setupLocation,
      user: setupUser,
      port1: setupPorts.port1,
      port2: setupPorts.port2,
      port3: setupPorts.port3,
      port4: setupPorts.port4,
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
        <Image className='rounded-lg' width={200} height={200} src={"/1.png"} alt='box' />
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
        <p className='center mb-2'>port</p>
        <div className='grid grid-cols-4'>
          <input onChange={(e) => setSetupPorts({...setupPorts, port1: e.target.checked})} className='m-1' type='checkbox' name='1' checked={setupPorts.port1}/><label htmlFor="1">1</label>
          <input onChange={(e) => setSetupPorts({...setupPorts, port2: e.target.checked})} className='m-1'  type='checkbox' checked={setupPorts.port2} name='2'/><label htmlFor="1">2</label>
          <input onChange={(e) => setSetupPorts({...setupPorts, port3: e.target.checked})} className='m-1' type='checkbox' checked={setupPorts.port3} name='3'/><label htmlFor="1">3</label>
          <input onChange={(e) => setSetupPorts({...setupPorts, port4: e.target.checked})} className='m-1' type='checkbox' checked={setupPorts.port4} name='4'/><label htmlFor="1">4</label>
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
