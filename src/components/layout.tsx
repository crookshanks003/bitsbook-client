import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Navbar from './navbar';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Navbar />
            <Box width={['98%', '90%', '80%']} mx='auto'>
                {children}
            </Box>
        </>
    );
}
