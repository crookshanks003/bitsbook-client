import Layout from '@/components/layout';
import { getAllUsers } from '@/services/user';
import { createUser, editUserRole } from '@/services/admin';
import { CreateUserDto, User } from '@/types';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from '../_app';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    TableContainer,
    Box,
    useToast,
    InputGroup,
    InputLeftElement,
    Input,
    HStack,
    Spacer,
    Button,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { deleteUser } from '@/services/admin';
import { useState } from 'react';
import { AddUserModal } from '@/components/admin/addUserModal';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { FormikHelpers } from 'formik';
import { DeleteButtonWithAlert, RoleTagWithEditModal, SortByInput } from '@/components/admin';

const Users: NextPageWithLayout = () => {
    const toast = useToast();
    const [_, setSearchString] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { data, error, refetch } = useQuery('allUsers', () => getAllUsers(), {
        staleTime: 30 * 1000,
    });
    if (error || !data) {
        return <Text>Something went wrong</Text>;
    }

    const compareFn = (a: User, b: User) => {
        switch (sortBy) {
            case 'email':
            case 'name':
            case 'role':
                return a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase());
            default:
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
    };

    const onDeleteUser = (id: string) => {
        deleteUser(id)
            .then(() => {
                toast({
                    title: 'User Deleted',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                refetch().catch();
            })
            .catch((err) => {
                if (axios.isAxiosError(err)) {
                    toast({
                        title: err.message,
                        description: err.response?.data.message || 'Could not delete user',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                }
            });
    };

    const onEditRole = (userId: string, role: string) => {
        editUserRole({ userId, role })
            .then(() => {
                toast({
                    title: 'Updated Role',
                    status: 'success',
                    isClosable: true,
                    duration: 5000,
                });
                refetch().catch((err) => console.log(err));
            })
            .catch(() => {
                toast({
                    title: 'Failed to update role',
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                });
            });
    };

    const handleModalFormSubmit = (
        values: CreateUserDto,
        actions: FormikHelpers<CreateUserDto>,
    ) => {
        createUser(values)
            .then(() => {
                toast({
                    title: 'User Created',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });

                refetch().catch();
                onClose();
            })
            .catch((err) => {
                if (axios.isAxiosError(err)) {
                    toast({
                        title: err.status !== 500 ? 'Failed to create user' : err.message,
                        description: err.response?.data.message || 'Failed to create user',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                }
            });

        actions.setSubmitting(false);
    };

    return (
        <>
            <Box mt='16' mx='auto'>
                <HStack spacing='3' fontSize='1'>
                    <InputGroup maxW='25%'>
                        <InputLeftElement pointerEvents='none'>
                            <BiSearch color='gray.300' />
                        </InputLeftElement>
                        <Input
                            placeholder='Search...'
                            onChange={(e) => setSearchString(e.target.value)}
                        />
                    </InputGroup>
                    <SortByInput sortBy={sortBy} setSortBy={setSortBy} />

                    <Spacer />
                    <Button
                        variant='solid'
                        leftIcon={<AiOutlinePlus />}
                        fontSize='md'
                        onClick={onOpen}
                    >
                        Add User
                    </Button>
                </HStack>

                <TableContainer
                    border='1px solid'
                    borderColor='blackAlpha.200'
                    borderRadius='lg'
                    borderBottom='none'
                    mt='4'
                >
                    <Table variant='simple' colorScheme='blackAlpha'>
                        <Thead>
                            <Tr fontWeight='600'>
                                <Td>Name</Td>
                                <Td>Email</Td>
                                <Td>Role</Td>
                                <Td>Joined</Td>
                                <Td isNumeric></Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.payload?.sort(compareFn).map((user, i) => (
                                <Tr key={i}>
                                    <Td>{user.name}</Td>
                                    <Td>{user.email}</Td>
                                    <Td>
                                        <RoleTagWithEditModal
                                            user={user}
                                            onEditRole={onEditRole}
                                            key={i}
                                        />
                                    </Td>
                                    <Td>
                                        {new Date(user.createdAt).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </Td>
                                    <Td isNumeric>
                                        <DeleteButtonWithAlert
                                            onDeleteUser={() => onDeleteUser(user._id)}
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            <AddUserModal isOpen={isOpen} onClose={onClose} handleSubmit={handleModalFormSubmit} />
        </>
    );
};

Users.getLayout = (page) => {
    return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = context.req.cookies.token;

    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
    if (user !== 'admin') {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(
        'allUsers',
        () => {
            return getAllUsers(user);
        },
        { staleTime: 30 * 1000 },
    );
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default Users;
