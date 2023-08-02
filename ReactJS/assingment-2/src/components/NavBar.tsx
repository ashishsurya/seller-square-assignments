import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <div className='navbar'>
      <h1>Assingment 2</h1>

      <div className='navbar__links'>
        <Link to={'/'}>Home</Link>
        <Link to={"/about"}>About</Link>
      </div>
    </div>
  );
};
