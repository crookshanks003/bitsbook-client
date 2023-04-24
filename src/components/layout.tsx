import { Role } from '@/types';
import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Navbar from './navbar';

export default function Layout({ role, children }: { role?: Role; children: ReactNode }) {
    return (
        <>
            <Navbar role={role ? role : Role.USER} />
            <Box width={['96%', '90%', '80%']} mx='auto'>
                {children}
            </Box>
        </>
    );
}
