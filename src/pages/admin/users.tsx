import Layout from '@/components/layout';
import { createUser, getAllUsers } from '@/services/user';
import { CreateUserDto, Role, User } from '@/types';
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
    IconButton,
    Tag,
    useToast,
    InputGroup,
    InputLeftElement,
    Input,
    HStack,
    Spacer,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    Radio,
    RadioGroup,
    Stack,
    Text,
    useDisclosure,
    ButtonGroup,
    Tooltip,
} from '@chakra-ui/react';
import { RiArrowDropDownLine, RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlinePlus } from 'react-icons/ai';
import { TiEdit } from 'react-icons/ti';
import { BiSearch } from 'react-icons/bi';
import { deleteUser } from '@/services/admin';
import { Dispatch, SetStateAction, useState } from 'react';
import { AddUserModal } from '@/components/admin/addUserModal';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { FormikHelpers } from 'formik';

const SortBy = ({
    sortBy,
    setSortBy,
}: {
    sortBy: string;
    setSortBy: Dispatch<SetStateAction<string>>;
}) => {
    const sortedByValues: Record<string, string> = {
        name: 'Name',
        createdAt: 'Created At',
        email: 'Email',
        role: 'Role',
    };
    return (
        <Popover isLazy lazyBehavior='keepMounted' placement='bottom-start'>
            <PopoverTrigger>
                <Button
                    variant='outline'
                    colorScheme='gray'
                    rightIcon=<RiArrowDropDownLine />
                    color='gray.700'
                    fontWeight='600'
                >
                    <Text as='span' color='gray.500' me='1' fontWeight='400'>
                        Sort By :
                    </Text>
                    {sortedByValues[sortBy]}
                </Button>
            </PopoverTrigger>

            <PopoverContent style={{ margin: 0 }}>
                <PopoverBody>
                    <RadioGroup value={sortBy} onChange={(newOption) => setSortBy(newOption)}>
                        <Stack direction='column'>
                            {Object.keys(sortedByValues).map((k, i) => (
                                <Radio value={k} key={i}>
                                    {sortedByValues[k]}
                                </Radio>
                            ))}
                        </Stack>
                    </RadioGroup>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

const Users: NextPageWithLayout = () => {
    const toast = useToast();
    const [isDeleting, setIsDeleting] = useState(false);
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
        setIsDeleting(true);
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
        setIsDeleting(false);
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

                onClose();
                refetch().catch();
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
                    <SortBy sortBy={sortBy} setSortBy={setSortBy} />

                    <Spacer />
                    <Button
                        colorScheme='green'
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
                                        <Tag
                                            colorScheme={user.role === Role.USER ? 'green' : 'pink'}
                                        >
                                            {user.role}
                                        </Tag>
                                    </Td>
                                    <Td>
                                        {new Date(user.createdAt).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </Td>
                                    <Td isNumeric>
                                        <ButtonGroup>
                                            <Tooltip hasArrow label='Edit User'>
                                                <IconButton
                                                    aria-label='Edit User'
                                                    variant='ghost'
                                                    color='gray.500'
                                                    _hover={{
                                                        color: 'blue.500',
                                                    }}
                                                    fontSize='xl'
                                                    isLoading={isDeleting}
                                                    icon={<TiEdit />}
                                                    onClick={() => console.log('edit')}
                                                />
                                            </Tooltip>
                                            <Tooltip hasArrow label='Delete User'>
                                                <IconButton
                                                    aria-label='Delete User'
                                                    variant='ghost'
                                                    color='gray.500'
                                                    _hover={{
                                                        color: 'red.600',
                                                    }}
                                                    fontSize='xl'
                                                    isLoading={isDeleting}
                                                    icon={<RiDeleteBin6Line />}
                                                    onClick={() => onDeleteUser(user._id)}
                                                />
                                            </Tooltip>
                                        </ButtonGroup>
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
