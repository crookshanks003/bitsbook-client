import { DeleteButtonWithAlert, SortByInput } from '@/components/admin';
import { AddClubModal } from '@/components/admin/addClubModal';
import Layout from '@/components/layout';
import { createClub, deleteClub } from '@/services/admin';
import { getAllClubs } from '@/services/clubs';
import { Club, CreateClubDto } from '@/types';
import {
    Box,
    Table,
    TableContainer,
    Tbody,
    Td,
    Thead,
    Tr,
    Text,
    HStack,
    useDisclosure,
    InputGroup,
    InputLeftElement,
    Input,
    Spacer,
    Button,
    Spinner,
    useToast,
} from '@chakra-ui/react';
import { FormikHelpers } from 'formik';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { NextPageWithLayout } from '../_app';

const Clubs: NextPageWithLayout = () => {
    const { data, isLoading, refetch } = useQuery('allClubs', () => getAllClubs(), {
        staleTime: 30 * 1000,
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const sortByKeys = {
        createdAt: 'Created At',
        userName: 'Username',
        name: 'Name',
        members: 'Members',
    };
    const [sortBy, setSortBy] = useState<keyof typeof sortByKeys>('createdAt');
    const [_, setSearchString] = useState('');
    const toast = useToast();

    const compareFn = (a: Club, b: Club) => {
        switch (sortBy) {
            case 'userName':
            case 'name':
                return a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase());
            case 'members':
                return a.members.length - b.members.length;
            default:
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
    };

    const handleModalFormSubmit = (
        values: CreateClubDto,
        actions: FormikHelpers<CreateClubDto>,
    ) => {
        createClub(values)
            .then(() => {
                toast({
                    title: 'Club Created',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });

                refetch().catch();
                onClose();
            })
            .catch((err) => {
                toast({
                    title: err.status !== 500 ? 'Failed to create club' : err.message,
                    description: err.response?.data.message || 'Failed to create club',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            });

        actions.setSubmitting(false);
    };

    const handleDeleteClub = (id: string) => {
        deleteClub(id)
            .then(() => {
                toast({
                    title: 'Club Deleted',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                refetch().catch();
            })
            .catch((err) => {
                toast({
                    title: err.message,
                    description: err.response?.data.message || 'Could not delete club',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    if (isLoading) {
        return <Spinner size='md' mt='10' mx='auto' />;
    }
    if (!data) {
        return <Text color='red.500'>Something went wrong</Text>;
    }

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
                    <SortByInput sortBy={sortBy} setSortBy={setSortBy} sortByKeys={sortByKeys} />

                    <Spacer />
                    <Button
                        variant='solid'
                        leftIcon={<AiOutlinePlus />}
                        fontSize='md'
                        onClick={onOpen}
                    >
                        Add Club
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
                                <Td>Username</Td>
                                <Td>Members</Td>
                                <Td>Created</Td>
                                <Td isNumeric></Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.payload?.sort(compareFn).map((club, i) => (
                                <Tr key={i}>
                                    <Td>{club.name}</Td>
                                    <Td>{club.userName}</Td>
                                    <Td>{club.members.length}</Td>
                                    <Td>
                                        {new Date(club.createdAt).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </Td>
                                    <Td isNumeric>
                                        <DeleteButtonWithAlert
                                            onDelete={() => handleDeleteClub(club._id)}
                                            title='Delete Club'
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            <AddClubModal isOpen={isOpen} onClose={onClose} handleSubmit={handleModalFormSubmit} />
        </>
    );
};

Clubs.getLayout = (page) => {
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
        'allClubs',
        () => {
            return getAllClubs(user);
        },
        { staleTime: 30 * 1000 },
    );
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default Clubs;
