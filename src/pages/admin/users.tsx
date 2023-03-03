import Layout from '@/components/layout';
import { getAllUsers } from '@/services/user';
import { ApiError, Role, User } from '@/types';
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
    Spinner,
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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Select,
} from '@chakra-ui/react';
import { RiArrowDropDownLine, RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { deleteUser } from '@/services/admin';
import { Dispatch, SetStateAction, useState } from 'react';

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

            <PopoverContent maxW='lg'>
                <PopoverBody>
                    <RadioGroup value={sortBy} onChange={(newOption) => setSortBy(newOption)}>
                        <Stack direction='column'>
                            <Radio value='name'>Name</Radio>
                            <Radio value='email'>Email</Radio>
                            <Radio value='createdAt'>Created At</Radio>
                            <Radio value='role'>Role</Radio>
                        </Stack>
                    </RadioGroup>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

const AddUserModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const addUser = () => {
        console.log('Add User');
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size='lg'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb='6'>
                        <HStack mt={4} justifyContent='space-between'>
                            <Text flexBasis='25%'>Name</Text>
                            <Input flexBasis='75%' placeholder='Name' />
                        </HStack>
                        <HStack mt={4} justifyContent='space-between'>
                            <Text flexBasis='25%'>Email</Text>
                            <Input flexBasis='75%' placeholder='Email' type='email' />
                        </HStack>

                        <HStack mt={4} justifyContent='space-between'>
                            <Text flexBasis='25%'>Password</Text>
                            <Input w='sm' placeholder='Password' flexBasis='75%' />
                        </HStack>
                        <HStack mt={4} justifyContent='space-between'>
                            <Text flexBasis='25%'>Role</Text>
                            <Select flexBasis='75%'>
                                <option value='user'>User</option>
                                <option value='admin'>Amdin</option>
                            </Select>
                        </HStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='green' variant='solid' width='full' onClick={addUser}>
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

const Users: NextPageWithLayout<{ users: User[] }> = ({ users }) => {
    const toast = useToast();
    const [isDeleting, setIsDeleting] = useState(false);
    const [_, setSearchString] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                            {users.map((user, i) => (
                                <Tr key={i}>
                                    <Td>{user.name}</Td>
                                    <Td>{user.email}</Td>
                                    <Td>
                                        <Tag
                                            colorScheme={
                                                user.role === Role.USER ? 'green' : 'yellow'
                                            }
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
                                        <IconButton
                                            aria-label='Delete User'
                                            variant='ghost'
                                            color='gray.500'
                                            _hover={{
                                                color: 'red.600',
                                            }}
                                            fontSize='xl'
                                            icon={isDeleting ? <Spinner /> : <RiDeleteBin6Line />}
                                            onClick={() => onDeleteUser(user._id)}
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            <AddUserModal isOpen={isOpen} onClose={onClose} />
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

    try {
        const { data } = await getAllUsers(user);
        return {
            props: {
                users: data.payload,
            },
        };
    } catch (err: unknown) {
        if (axios.isAxiosError<ApiError>(err)) {
            console.log(err.response);
        }
        return {
            props: {
                users: [
                    {
                        _id: '123',
                        name: 'John Doe',
                        email: 'john@gmail.com',
                        role: 'user',
                        createdAt: '2021-01-01T00:00:00.000Z',
                    },
                ],
            },
        };
    }
};

export default Users;
