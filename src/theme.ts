import '@fontsource/playfair-display';
import '@fontsource/inter/100.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';

import { ComponentStyleConfig, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const DefaultButton: ComponentStyleConfig = {
    baseStyle: {
        rounded: 'full',
        bgColor: 'pink.500',
    },
    variants: {
        outline: {
            borderColor: 'pink.500',
            color: 'pink.500',
            _hover: {
                bgColor: 'pink.500',
                color: 'white',
            },
        },
        solid: {
            _hover: {
                bgColor: 'pink.400',
            },
        },
    },
};

export const theme = extendTheme(
    {
        styles: {
            global: {
                body: {
                    backgroundColor: 'blackAlpha.50',
                },
                a: {
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
        components: {
            Button: DefaultButton,
        },
    },
    withDefaultColorScheme({ colorScheme: 'pink' }),
);
