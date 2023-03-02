import Logo from '@/components/logo';
import {
    Box,
    Button,
    Card,
    Divider,
    Flex,
    FormControl,
    Input,
    Link,
    Spacer,
    Text,
} from '@chakra-ui/react';
import { NextPageWithLayout } from './_app';
import NextLink from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '@/services/auth';
import { GetServerSideProps } from 'next';

const Login: NextPageWithLayout = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const onSubmit = () => {
        if (!email) return;
        login(email)
            .then((res) => {
                if (res.data.error) return;
                console.log(res);
                router.push('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Flex w='50%' mx='auto' mt='28' flexDirection={['column', 'row']} alignItems='center'>
            <Box>
                <Logo width='260' />
                <Text mt='2' ms='4' fontSize='2xl' color='gray.600'>
                    Join the college conversation
                </Text>
            </Box>
            <Spacer />
            <Card px='4' py='4' w='sm'>
                <FormControl>
                    <Input
                        type='email'
                        placeholder='Email'
                        p='6'
                        borderColor='gray.300'
                        rounded='full'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <Input
                        type='password'
                        placeholder='Password'
                        my='4'
                        p='6'
                        borderColor='gray.300'
                        rounded='full'
                    />
                </FormControl>
                <Button
                    py='6'
                    as={NextLink}
                    href='/'
                    _hover={{ color: 'white', bgColor: 'pink.600' }}
                    onClick={onSubmit}
                >
                    Log In
                </Button>
                <Link>
                    <Text
                        textAlign='center'
                        mt='4'
                        fontWeight='500'
                        color='pink.500'
                        _hover={{ textDecoration: 'underline' }}
                    >
                        Forgot Password
                    </Text>
                </Link>
                <Divider color='gray.300' my='4' />
                <Text textAlign='center' color='gray.500'>
                    New Here?{' '}
                    <Link _hover={{ color: 'pink.500', textDecoration: 'underline' }}>
                        Create Account
                    </Link>
                </Text>
            </Card>
        </Flex>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = context.req.cookies.token;

    if (user) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
};

export default Login;
