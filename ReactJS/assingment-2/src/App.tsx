import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeScreen } from './screens/HomeScreen';
import { AboutScreen } from './screens/AboutScreen';
import { NavBar } from './components/NavBar';
import { JokeScreen } from './screens/JokeScreen';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.chucknorris.io',
});

interface AppProps {}

export const App: FC<AppProps> = ({}) => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' Component={HomeScreen} />
        <Route path='/about' Component={AboutScreen} />
        <Route path='/joke/:query' Component={JokeScreen} />
      </Routes>
    </BrowserRouter>
  );
};
