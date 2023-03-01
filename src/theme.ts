import { Inter, Playfair_Display } from 'next/font/google';
import { ComponentStyleConfig, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const inter = Inter({ subsets: ['latin'] });
const playfairDisplay = Playfair_Display({ subsets: ['latin'] });

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
            heading: playfairDisplay.style.fontFamily,
            body: `${inter.style.fontFamily}, sans-serif`,
        },
        components: {
            Button: DefaultButton,
        },
    },
    withDefaultColorScheme({ colorScheme: 'pink' }),
);
