import { Box, Button, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useRouteError } from 'react-router-dom';

const errorMessages: { [key: number]: ReactNode } = {
    404: (
        <>
            <Text fontSize='3xl' fontWeight='600' lineHeight='10'>
                Oops!
                <br /> Page Not Found
            </Text>
            <Text mt='5' fontSize='lg' color='blackAlpha.600'>
                Looks you took the Road Not Taken! <br /> We suggest you go back home
            </Text>
            <Button px='8' py='6' fontSize='sm' mt='8'>
                Back to Home
            </Button>
        </>
    ),
};

export function ErrorPage() {
    const err: any = useRouteError();
    const status: number = err.status;

    return (
        <Box mt='8'>
            <Text fontSize='6xl' fontWeight='bold' color='pink.500'>
                {status}
            </Text>
            {errorMessages[status]}
        </Box>
    );
}
