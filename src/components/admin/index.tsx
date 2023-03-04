import { Role, User } from '@/types';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    Radio,
    RadioGroup,
    Stack,
    Text,
    useDisclosure,
    Tooltip,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
    IconButton,
    Tag,
    TagLabel,
    TagRightIcon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Input,
    FormControl,
    ModalFooter,
    HStack,
    Box,
    Select,
} from '@chakra-ui/react';
import { Dispatch, MouseEventHandler, SetStateAction, useRef, useState } from 'react';
import { RiArrowDropDownLine, RiDeleteBin6Line } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

export const SortByInput = ({
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

export const DeleteButtonWithAlert = ({
    onDeleteUser,
}: {
    onDeleteUser: MouseEventHandler<HTMLButtonElement>;
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isDeleting, setIsDeleting] = useState(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
    return (
        <>
            <Tooltip hasArrow label='Delete User'>
                <IconButton
                    aria-label='Delete User'
                    variant='ghost'
                    color='gray.500'
                    colorScheme='red'
                    _hover={{
                        color: 'red.600',
                    }}
                    fontSize='xl'
                    onClick={onOpen}
                    icon={<RiDeleteBin6Line />}
                />
            </Tooltip>
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete User
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can&apos;t undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button
                                ref={cancelRef}
                                onClick={onClose}
                                variant='solid'
                                colorScheme='gray'
                            >
                                Cancel
                            </Button>
                            <Button
                                colorScheme='red'
                                onClick={(e) => {
                                    setIsDeleting(true);
                                    onDeleteUser(e);
                                    setIsDeleting(false);
                                    onClose();
                                }}
                                ml='3'
                                variant='solid'
                                isLoading={isDeleting}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export const RoleTagWithEditModal = ({
    user,
    onEditRole,
}: {
    user: User;
    onEditRole: (id: string, role: string) => void;
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [role, setRole] = useState(user.role as string);

    return (
        <>
            <Tooltip hasArrow label='Edit Role' placement='right'>
                <Tag
                    colorScheme={user.role === Role.USER ? 'green' : 'pink'}
                    _hover={{ textDecoration: 'underline' }}
                    cursor='pointer'
                    onClick={onOpen}
                >
                    <TagLabel>{user.role}</TagLabel>
                    <TagRightIcon as={TiEdit} />
                </Tag>
            </Tooltip>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setRole(user.role as string);
                    onClose();
                }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update User Role</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <HStack mt={4} justifyContent='space-between' as={FormControl}>
                            <Text flexBasis='25%'>Name</Text>
                            <Input value={user.name} disabled flexBasis='75%' />
                        </HStack>
                        <HStack mt={4} justifyContent='space-between' as={FormControl}>
                            <Text flexBasis='25%'>Role</Text>
                            <Box flexBasis='75%'>
                                <Select
                                    onChange={(e) => {
                                        setRole(e.target.value);
                                    }}
                                    value={role}
                                >
                                    <option value='user'>User</option>
                                    <option value='admin'>Admin</option>
                                </Select>
                            </Box>
                        </HStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='green'
                            variant='solid'
                            onClick={() => {
                                if (role !== user.role) {
                                    onEditRole(user._id, role);
                                }
                                onClose();
                            }}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
