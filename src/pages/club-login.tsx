import {
    Button,
    Card,
    Divider,
    FormControl,
    FormErrorMessage,
    Heading,
    Input,
    Link,
    Text,
    useToast,
} from '@chakra-ui/react';
import { NextPageWithLayout } from './_app';
import { useRouter } from 'next/router';
import { clubLogin } from '@/services/auth';
import { GetServerSideProps } from 'next';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { ApiResponseError, ClubLoginDto } from '@/types';
import { isAxiosError } from 'axios';
import NextLink from 'next/link';

const ClubLogin: NextPageWithLayout = () => {
    const router = useRouter();
    const toast = useToast();

    const onSubmit = (values: ClubLoginDto, actions: FormikHelpers<ClubLoginDto>) => {
        actions.setSubmitting(true);
        clubLogin(values)
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
        <>
            <Heading textAlign='center' mb='4' fontSize='3xl' mt='12'>
                Club Login
            </Heading>
            <Card px='4' py='4' w='sm' mx='auto' mt='4'>
                <Formik initialValues={{ userName: '', password: '' }} onSubmit={onSubmit}>
                    {(props) => (
                        <Form>
                            <Field
                                name='userName'
                                validate={(value: string) => {
                                    if (!value) return 'Username cannot be empty';
                                }}
                            >
                                {({ form, field }: FieldProps<any, ClubLoginDto>) => (
                                    <FormControl
                                        isInvalid={
                                            (form.errors.userName &&
                                                form.touched.userName) as boolean
                                        }
                                    >
                                        <Input
                                            placeholder='Username'
                                            p='6'
                                            borderColor='gray.300'
                                            rounded='full'
                                            {...field}
                                        />
                                        <FormErrorMessage ms='5'>
                                            {form.errors.userName as string}
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
                                {({ form, field }: FieldProps<any, ClubLoginDto>) => (
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
                                variant='solid'
                                borderRadius='full'
                                colorScheme='green'
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
                        color='gray.500'
                        _hover={{ textDecoration: 'underline', color: 'pink.500' }}
                    >
                        Forgot Password
                    </Text>
                </Link>
                <Divider color='gray.300' my='4' />
                <Text
                    textAlign='center'
                    color='gray.500'
                    _hover={{ color: 'pink.500', textDecoration: 'underline' }}
                >
                    <NextLink href='/login'>User Login</NextLink>
                </Text>
            </Card>
        </>
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

export default ClubLogin;
