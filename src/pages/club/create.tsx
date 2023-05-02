import Layout from '@/components/layout';
import { getNavbarProfile } from '@/services/auth';
import { createPost } from '@/services/post';
import { Role } from '@/types';
import { CreatePostDto, Visibility } from '@/types/post';
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    FormControl,
    FormErrorMessage,
    Input,
    Select,
    Spinner,
    Stack,
    Text,
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import { NextPageWithLayout } from '../_app';
import dynamic from 'next/dynamic';

const TextEditor = dynamic(() => import('@/components/club/rte'), {
    ssr: false,
    loading: () => (
        <Flex justifyContent='center'>
            <Spinner />
        </Flex>
    ),
});

const Create: NextPageWithLayout = () => {
    const toast = useToast();
    const { data: profile } = useQuery('getNavbarProfile', () => getNavbarProfile(), {
        staleTime: Infinity,
    });

    const handleSubmit = async (values: CreatePostDto, actions: FormikHelpers<CreatePostDto>) => {
        try {
            await createPost(values);
            toast({
                title: 'Post Created Successfully',
                isClosable: true,
                duration: 5000,
                status: 'success',
            });
            actions.resetForm();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast({
                    title: err.message,
                    description: err.response?.data.message || 'Could not delete user',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
        actions.setSubmitting(false);
    };

    return (
        <Card width='60%' mx='auto' mt='16'>
            <Formik
                initialValues={{ title: '', content: '', visibility: Visibility.PUBLIC }}
                onSubmit={handleSubmit}
            >
                {(props) => (
                    <Form>
                        <CardHeader>
                            <Stack direction={'row'} spacing={4} align={'center'}>
                                <Avatar
                                    name={profile?.payload?.name.split(' ')[0]}
                                    size='md'
                                    bgColor='pink.500'
                                    color='white'
                                />
                                <Stack direction={'column'} spacing={1} fontSize={'sm'}>
                                    <Text fontWeight={600}>{profile?.payload?.name}</Text>
                                    <Field
                                        name='visibility'
                                        validate={(value: string) => {
                                            if (!value) return 'Title is required';
                                        }}
                                    >
                                        {() => (
                                            <Select
                                                variant='filled'
                                                size='xs'
                                                bgColor='gray.300'
                                                fontWeight='semibold'
                                                rounded='full'
                                                defaultValue={Visibility.PUBLIC}
                                            >
                                                <option value={Visibility.PUBLIC}>Public</option>
                                                <option value={Visibility.PRIVATE}>Private</option>
                                            </Select>
                                        )}
                                    </Field>
                                </Stack>
                            </Stack>
                        </CardHeader>
                        <CardBody>
                            <Field
                                name='title'
                                validate={(value: string) => {
                                    if (!value) return 'Title is required';
                                }}
                            >
                                {({ form, field }: FieldProps) => (
                                    <FormControl
                                        isInvalid={!!form.errors.name && !!form.touched.name}
                                    >
                                        <Input placeholder='Title...' {...field} />
                                        <FormErrorMessage>
                                            {form.errors.name as string}
                                        </FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field
                                name='content'
                                validate={(value: string) => {
                                    if (!value) return 'Email is required';
                                }}
                            >
                                {({ form, field }: FieldProps) => (
                                    <FormControl mt={4}>
                                        <TextEditor
                                            onChange={(val) => form.setFieldValue('content', val)}
                                            value={field.value}
                                        />
                                    </FormControl>
                                )}
                            </Field>
                        </CardBody>
                        <CardFooter>
                            <Button
                                isLoading={props.isSubmitting}
                                type='submit'
                                w='full'
                                variant='solid'
                                isDisabled={!props.values.content || !props.values.title}
                            >
                                Create
                            </Button>
                        </CardFooter>
                    </Form>
                )}
            </Formik>
        </Card>
    );
};

Create.getLayout = (page) => {
    return <Layout role={Role.CLUB}>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.req.cookies.token;
    const role = context.req.cookies.role;

    if (!role || !token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    if (role !== Role.CLUB) {
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

export default Create;
