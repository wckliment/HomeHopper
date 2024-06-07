import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Added useSelector
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Spots from './components/Spots/Spots';
import SpotDetail from './components/SpotDetail/SpotDetail';
import * as sessionActions from './store/session';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Header isLoaded={isLoaded} sessionUser={sessionUser} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Spots />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetail />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
