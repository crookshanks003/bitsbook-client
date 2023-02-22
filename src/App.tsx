import '@fontsource/playfair-display';
import '@fontsource/inter/100.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

const theme = extendTheme({
    styles: {
        global: {
            body: {
                backgroundColor: 'blackAlpha.50',
            },
            a: {
                color: 'teal.500',
                _hover: {
                    textDecoration: 'underline',
                    color: 'pink.500',
                },
            },
        },
    },
    fonts: {
        heading: 'Playfair Display',
        body: 'Inter, sans-serif',
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
