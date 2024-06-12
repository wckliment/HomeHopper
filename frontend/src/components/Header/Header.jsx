import { Link, NavLink } from 'react-router-dom';
import ProfileButton from '../Navigation/ProfileButton';
import './Header.css';

const Header = ({ isLoaded, sessionUser }) => {
  return (
    <header className="header">
      <Link to="/">
        <img src="/logo.png" alt="HomeHopper Logo" className="logo" />
      </Link>
      <nav className="nav">
        <ul className="navigation">
          {sessionUser && (
            <li>
              <NavLink to="/spots/new">Create a New Spot</NavLink>
            </li>
          )}
          {isLoaded && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
