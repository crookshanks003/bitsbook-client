import { Box, Button, Text } from '@chakra-ui/react';
import { NextPageWithLayout } from './_app';
import NextLink from 'next/link';

const Custom500: NextPageWithLayout = () => {
    return (
        <Box w='80%' mx='auto'>
            <Box mt='8'>
                <Text fontSize='6xl' fontWeight='bold' color='pink.500'>
                    500
                </Text>
                <Text fontSize='3xl' fontWeight='600' lineHeight='10'>
                    Oops!
                    <br /> Something went wrong
                </Text>
                <Text mt='5' fontSize='lg' color='blackAlpha.600'>
                    Click the button below to go back to the homepage
                </Text>
                <Button as={NextLink} href='/' px='8' py='6' fontSize='sm' mt='6'>
                    Back to Home
                </Button>
            </Box>
        </Box>
    );
};

export default Custom500;
