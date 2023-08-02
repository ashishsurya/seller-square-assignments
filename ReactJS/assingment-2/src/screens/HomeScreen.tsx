import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const HomeScreen = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  return (
    <div className='home'>
      <form onSubmit={() => navigate(`/joke/${query}`)}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type='text'
          placeholder='Search for some random chuck norris joke'
        />
      </form>
    </div>
  );
};
