import Image from 'next/image';

export default function Station({ st }) {
  return (
    <div style={st.owner.length ? { backgroundColor: '#ff9999' } : { backgroundColor: '#80ff80' }} className='border-solid border-2 border-stone-400 rounded-lg'>
      <div className='center'>
        <Image className='rounded-lg' width={200} height={200} src={"/box.png"} alt='box' />
      </div>
      <div className='grid grid-rows-5 gap-4 p-10'>
        <label className='center'>{st.id}</label>
        <input className='text-center border-solid border-2 border-stone-400 rounded-lg w-full px-2' placeholder='Setup Name' type='text'  />
        <input className='text-center border-solid border-2 border-stone-400 rounded-lg w-full px-2' placeholder='Owner' type='text' />
        <input className='text-center border-solid border-2 border-stone-400 rounded-lg w-full px-2' placeholder='IP' type='text' />
        <input className='text-center border-solid border-2 border-stone-400 rounded-lg w-full px-2' placeholder='Location' type='text' />
        <input className='border-solid border-2 text-center border-stone-400 rounded-lg w-full px-2' type='Submit' defaultValue='Update' />
      </div>
    </div>
  );
}
