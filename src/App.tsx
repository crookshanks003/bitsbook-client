import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

const theme = extendTheme({
    fonts: {
        heading: 'Merriweather',
        body: 'Inter',
    },
});

function App() {
    return (
        <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
        </ChakraProvider>
    );
}

export default App;
