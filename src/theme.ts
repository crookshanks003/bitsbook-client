import { Inter, Merriweather } from 'next/font/google';
import { ComponentStyleConfig, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const inter = Inter({ subsets: ['latin'] });
const mw = Merriweather({ subsets: ['latin'], weight: ['400', '700'] });

const DefaultButton: ComponentStyleConfig = {
    variants: {
        dafaultOutline: {
            borderColor: 'pink.500',
            color: 'pink.500',
            _hover: {
                bgColor: 'pink.500',
                color: 'white',
            },
        },
        default: {
            rounded: 'full',
            bgColor: 'pink.500',
            color: 'white',
            fontWeight: '600',
            _hover: {
                bgColor: 'pink.400',
            },
        },
    },
    defaultProps: {
        variant: 'default',
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
                    color: 'blue.400',
                    _hover: { textDecoration: 'underline' },
                },
            },
        },
        fonts: {
            heading: mw.style.fontFamily,
            body: `${inter.style.fontFamily}, sans-serif`,
        },
        components: {
            Button: DefaultButton,
        },
    },
    withDefaultColorScheme({ colorScheme: 'pink' }),
);
