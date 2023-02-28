import { createBrowserRouter, Outlet, RouteObject } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ErrorPage } from '../pages/Error';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';

const routes: RouteObject[] = [
    {
        path: '/auth',
        element: (
            <Layout>
                <Outlet />
            </Layout>
        ),
        children: [{ path: 'login', element: <Login /> }],
        errorElement: (
            <Layout>
                <ErrorPage />
            </Layout>
        ),
    },
    {
        path: '/',
        element: (
            <Layout>
                <Home />
            </Layout>
        ),
        children: [
            {
                path: '/home',
                element: (
                    <Layout>
                        <Home />
                    </Layout>
                ),
            },
        ],
        errorElement: (
            <Layout>
                <ErrorPage />
            </Layout>
        ),
    },
];

export const router = createBrowserRouter(routes);
