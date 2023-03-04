import Layout from '@/components/layout';
import { createUser, getAllUsers } from '@/services/user';
import { ApiError, CreateUserDto, Role, User } from '@/types';
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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Select,
    FormControl,
    FormErrorMessage,
    CreateToastFnReturn,
    ButtonGroup,
    Tooltip,
} from '@chakra-ui/react';
import { RiArrowDropDownLine, RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlinePlus } from 'react-icons/ai';
import { TiEdit } from 'react-icons/ti';
import { BiSearch } from 'react-icons/bi';
import { deleteUser } from '@/services/admin';
import { Dispatch, SetStateAction, useState } from 'react';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';

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

const AddUserModal = ({
    isOpen,
    onClose,
    toast,
}: {
    isOpen: boolean;
    onClose: () => void;
    toast: CreateToastFnReturn;
}) => {
    const addUser = (values: CreateUserDto, actions: FormikHelpers<CreateUserDto>) => {
        createUser(values)
            .then(() => {
                toast({
                    title: 'User Created',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
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
        <Modal isOpen={isOpen} onClose={onClose} size='lg'>
            <Formik
                initialValues={{ email: '', name: '', password: '', role: 'user' }}
                onSubmit={addUser}
            >
                {(props) => (
                    <Form>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Add User</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb='6'>
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
                                                <Input
                                                    {...field}
                                                    placeholder='Email'
                                                    type='email'
                                                />
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
                                            mt={4}
                                            justifyContent='space-between'
                                            as={FormControl}
                                            isInvalid={
                                                form.errors.password && form.touched.password
                                            }
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
                                <Field name='role'>
                                    {({ form, field }: FieldProps) => (
                                        <HStack
                                            mt={4}
                                            justifyContent='space-between'
                                            as={FormControl}
                                            isInvalid={form.errors.role && form.touched.role}
                                        >
                                            <Text flexBasis='25%'>Role</Text>
                                            <Box flexBasis='75%'>
                                                <Select {...field}>
                                                    <option value='user'>User</option>
                                                    <option value='admin'>Admin</option>
                                                </Select>
                                                <FormErrorMessage>
                                                    {form.errors.role as string}
                                                </FormErrorMessage>
                                            </Box>
                                        </HStack>
                                    )}
                                </Field>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    colorScheme='green'
                                    variant='solid'
                                    isLoading={props.isSubmitting}
                                    width='full'
                                    type='submit'
                                >
                                    Add
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

const Users: NextPageWithLayout<{ users: User[] }> = ({ users }) => {
    const toast = useToast();
    const [isDeleting, setIsDeleting] = useState(false);
    const [_, setSearchString] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
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
            <AddUserModal isOpen={isOpen} onClose={onClose} toast={toast} />
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
