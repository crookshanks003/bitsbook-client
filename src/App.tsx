import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { theme } from './theme';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <RouterProvider router={createBrowserRouter([])} />
        </ChakraProvider>
    );
}

export default App;
