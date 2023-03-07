import Logo from '@/components/logo';
import {
    Box,
    Button,
    Card,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    Input,
    Link,
    Spacer,
    Text,
    useToast,
} from '@chakra-ui/react';
import { NextPageWithLayout } from './_app';
import { useRouter } from 'next/router';
import { login } from '@/services/auth';
import { GetServerSideProps } from 'next';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { ApiResponseError, UserLoginDto } from '@/types';
import { isAxiosError } from 'axios';

const Login: NextPageWithLayout = () => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const router = useRouter();
    const toast = useToast();

    const onSubmit = (values: UserLoginDto, actions: FormikHelpers<UserLoginDto>) => {
        actions.setSubmitting(true);
        login(values)
            .then((res) => {
                router.push('/');
                localStorage.setItem('role', res.data.role);
            })
            .catch((err) => {
                if (isAxiosError<ApiResponseError>(err)) {
                    toast({
                        title: err.response?.data.message,
                        isClosable: true,
                        status: 'error',
                        duration: 9000,
                    });
                }
                console.log(err);
            });
        actions.setSubmitting(false);
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
                <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit}>
                    {(props) => (
                        <Form>
                            <Field
                                name='email'
                                validate={(value: string) => {
                                    if (!value) return 'Email cannot be empty';
                                    if (!value.toLowerCase().match(re)) return 'Invalid email';
                                }}
                            >
                                {({ form, field }: FieldProps<any, UserLoginDto>) => (
                                    <FormControl
                                        isInvalid={
                                            (form.errors.email && form.touched.email) as boolean
                                        }
                                    >
                                        <Input
                                            placeholder='Email'
                                            p='6'
                                            borderColor='gray.300'
                                            rounded='full'
                                            {...field}
                                        />
                                        <FormErrorMessage ms='5'>
                                            {form.errors.email as string}
                                        </FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field
                                name='password'
                                validate={(value: string) => {
                                    if (!value) return 'Password cannot be empty';
                                }}
                            >
                                {({ form, field }: FieldProps<any, UserLoginDto>) => (
                                    <FormControl
                                        isInvalid={
                                            (form.errors.password &&
                                                form.touched.password) as boolean
                                        }
                                        my='4'
                                    >
                                        <Input
                                            placeholder='Password'
                                            p='6'
                                            borderColor='gray.300'
                                            rounded='full'
                                            type='password'
                                            {...field}
                                        />
                                        <FormErrorMessage ms='5'>
                                            {form.errors.password as string}
                                        </FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Button
                                w='full'
                                py='6'
                                _hover={{ color: 'white', bgColor: 'pink.600' }}
                                type='submit'
                                isLoading={props.isSubmitting}
                            >
                                Log In
                            </Button>
                        </Form>
                    )}
                </Formik>
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
    const token = context.req.cookies.token;

    if (token) {
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
