import { Link } from 'react-router-dom';
import ProfileButton from '../Navigation/ProfileButton';
import './Header.css';

const Header = ({ isLoaded, sessionUser }) => {
  return (
    <header className="header">
      <Link to="/">
        <img src="/logo.png" alt="HomeHopper Logo" className="logo" />
      </Link>
      <nav className="nav">
        {isLoaded && <ProfileButton user={sessionUser} />}
      </nav>
    </header>
  );
};

export default Header;
