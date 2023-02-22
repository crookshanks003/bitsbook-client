import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';

export const router = createBrowserRouter([
    {
        path: '/auth',
        element: (
            <Layout>
                <Outlet />
            </Layout>
        ),
        children: [{ path: 'login', element: <Login /> }],
    },
    {
        path: '/',
        element: (
            <Layout>
                <Home />
            </Layout>
        ),
    },
]);
