import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

   console.log('Navigation: sessionUser', sessionUser); // Debugging log

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
      </li>
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
  );
}

export default Navigation;
