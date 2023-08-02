import { useParams } from 'react-router-dom';
import { api } from '../App';
import { useCallback, useEffect, useState } from 'react';

export const JokeScreen = () => {
  const { query } = useParams();
  const [jokes, setJokes] = useState(null);
  const [loading, setLoading] = useState(false);

  const getJokes = useCallback(async (query: string) => {
    setLoading(true);
    await api
      .get(`/jokes/search?query=${query}`)
      .then((res) => {
        setJokes(res.data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getJokes(query!);
  }, [getJokes, query]);

  return (
    <div className='joke__screen'>
      <h1>Joke Screen</h1>
      {loading ? (
        <p>Loading...</p>
      ) : jokes ? (
        <div className='jokes'>
          {jokes.map((joke) => (
            <p key={joke.id}>{joke.value}</p>
          ))}
        </div>
      ) : (
        <p>No jokes sorrry......</p>
      )}
    </div>
  );
};
