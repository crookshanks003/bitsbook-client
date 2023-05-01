import { Box, Button, Text } from '@chakra-ui/react';
import { NextPageWithLayout } from './_app';
import NextLink from 'next/link';

const Custom404: NextPageWithLayout = () => {
    return (
        <Box w='80%' mx='auto'>
            <Box mt='8'>
                <Text fontSize='6xl' fontWeight='bold' color='pink.500'>
                    404
                </Text>
                <Text fontSize='3xl' fontWeight='600' lineHeight='10'>
                    Oops!
                    <br /> Page Not Found
                </Text>
                <Text mt='5' fontSize='lg' color='blackAlpha.600'>
                    Looks you took the Road Not Taken! <br /> We suggest you go back home
                </Text>
                <Button as={NextLink} href='/' px='8' py='6' fontSize='sm' mt='6'>
                    Back to Home
                </Button>
            </Box>
        </Box>
    );
};

export default Custom404;
