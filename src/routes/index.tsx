import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';

export const router = createBrowserRouter([
    {
        path: '/auth',
        element: (
            <>
                <Outlet />
            </>
        ),
        children: [{ path: 'login', element: <Login /> }],
    },
    { path: '/', element: <Home /> },
]);
