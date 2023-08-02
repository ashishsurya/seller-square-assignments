import { FC, useState } from 'react';

interface GreetingProps {}

export const Greeting: FC<GreetingProps> = ({}) => {
  const [name, setName] = useState('');
  return (
    <div className='greeting'>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Enter your name'
      />
      {name && <h3>👋 Welcome, {name}</h3>}
    </div>
  );
};
