import {
    Box,
    Button,
    Card,
    Center,
    Divider,
    FormControl,
    FormErrorMessage,
    Input,
    Text,
    Link,
    useToast,
    HStack,
} from '@chakra-ui/react';
import { NextPageWithLayout } from './_app';
import { useRouter } from 'next/router';
import { logout, register } from '@/services/auth';
import { GetServerSideProps } from 'next';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { ApiResponseError, CreateUserDto, Role } from '@/types';
import { isAxiosError } from 'axios';
import NextLink from 'next/link';

const Register: NextPageWithLayout = () => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const router = useRouter();
    const toast = useToast();

    const onSubmit = async (values: CreateUserDto, actions: FormikHelpers<CreateUserDto>) => {
        try {
            await register(values);
            toast({
                title: 'Account created successfully',
                description: 'Login to conitnue',
                duration: 9000,
                isClosable: true,
                status: 'success',
            });
            await logout();
            router.push('/login');
        } catch (err) {
            if (isAxiosError<ApiResponseError>(err)) {
                toast({
                    title: err.response?.data.message,
                    isClosable: true,
                    status: 'error',
                    duration: 9000,
                });
            }
        }
        actions.setSubmitting(false);
    };

    return (
        <Box w='md' mx='auto' mt='16'>
            <Card px='4' py='4'>
                <Formik
                    initialValues={{ name: '', email: '', password: '', role: Role.USER }}
                    onSubmit={onSubmit}
                >
                    {(props) => (
                        <Form>
                            <Field
                                name='name'
                                validate={(value: string) => {
                                    if (!value) return 'Name is required';
                                }}
                            >
                                {({ form, field }: FieldProps) => (
                                    <HStack
                                        as={FormControl}
                                        mt={4}
                                        justifyContent='space-between'
                                        isInvalid={form.errors.name && form.touched.name}
                                    >
                                        <Text flexBasis='25%'>Name</Text>
                                        <Box flexBasis='75%'>
                                            <Input placeholder='Name' {...field} />
                                            <FormErrorMessage>
                                                {form.errors.name as string}
                                            </FormErrorMessage>
                                        </Box>
                                    </HStack>
                                )}
                            </Field>
                            <Field
                                name='email'
                                validate={(value: string) => {
                                    if (!value) return 'Email is required';
                                    if (!value.toLowerCase().match(re)) return 'Invalid email';
                                }}
                            >
                                {({ form, field }: FieldProps) => (
                                    <HStack
                                        mt={4}
                                        justifyContent='space-between'
                                        as={FormControl}
                                        isInvalid={form.errors.email && form.touched.email}
                                    >
                                        <Text flexBasis='25%'>Email</Text>
                                        <Box flexBasis='75%'>
                                            <Input {...field} placeholder='Email' type='email' />
                                            <FormErrorMessage>
                                                {form.errors.email as string}
                                            </FormErrorMessage>
                                        </Box>
                                    </HStack>
                                )}
                            </Field>

                            <Field
                                name='password'
                                validate={(value: string) => {
                                    if (!value) return 'Password is required';
                                    if (value.length < 6)
                                        return 'Password must be 6 characters long';
                                }}
                            >
                                {({ form, field }: FieldProps) => (
                                    <HStack
                                        my={4}
                                        justifyContent='space-between'
                                        as={FormControl}
                                        isInvalid={form.errors.password && form.touched.password}
                                    >
                                        <Text flexBasis='25%'>Password</Text>
                                        <Box flexBasis='75%'>
                                            <Input placeholder='Password' {...field} />
                                            <FormErrorMessage>
                                                {form.errors.password as string}
                                            </FormErrorMessage>
                                        </Box>
                                    </HStack>
                                )}
                            </Field>
                            <Button
                                w='full'
                                py='6'
                                variant='solid'
                                colorScheme='green'
                                type='submit'
                                isLoading={props.isSubmitting}
                            >
                                Create Account
                            </Button>
                        </Form>
                    )}
                </Formik>
                <Divider color='gray.300' my='4' />
                <Center color='gray.500'>
                    Already a member
                    <NextLink href='/login' passHref legacyBehavior>
                        <Link
                            ms='1'
                            fontWeight='semibold'
                            color='gray.600'
                            _hover={{ color: 'pink.500', textDecoration: 'underline' }}
                        >
                            Login
                        </Link>
                    </NextLink>
                </Center>
            </Card>
        </Box>
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

export default Register;
