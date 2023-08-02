import { FC } from 'react';
import { HelloWorld } from './components/HelloWorld';
import { Greeting } from './components/Greeting';
import { Weather } from './components/Weather';

interface AppProps {}

export const App: FC<AppProps> = ({}) => {
  return (
    <div className='app'>
      <h1>Assigment 1</h1>

      <div className='app__question'>
        <h2>Question 1</h2>
        <p>A component that displays hello world on screen.</p>
        <HelloWorld />
      </div>

      <div className='app__question'>
        <h2>Question 2</h2>
        <p>
          A stateful component that allows a user to enter their name and
          displays a personalized greeting.
        </p>
        <Greeting />
      </div>

      <div className='app__question'>
        <h2>Question 3</h2>
        <p>
          A stateful component that displays the current weather in a bangalore.
        </p>
        <Weather />
      </div>
    </div>
  );
};
