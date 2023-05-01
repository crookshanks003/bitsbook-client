import axios from 'axios';
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
    Text,
    useDisclosure,
    IconButton,
} from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { useMemo, useState } from 'react';
import { DeleteButtonWithAlert } from '@/components/admin';
import { useQuery } from 'react-query';
import { getClubMembers, removeMemberFromClub } from '@/services/clubs';
import AddMemberModal from './addMemberModal';

export default function MemberTable() {
    const toast = useToast();
    const [searchString, setSearchString] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { data, error, refetch } = useQuery('clubMembers', getClubMembers, {
        staleTime: 30 * 1000,
    });
    const searchData = useMemo(() => {
        if (!searchString || !data) return data?.payload;
        return data?.payload?.filter((user) =>
            user.userId.name.toLowerCase().includes(searchString.toLowerCase()),
        );
    }, [data, searchString]);
    if (error) {
        return (
            <Text color='red' mt='10' size='xl'>
                Something went wrong
            </Text>
        );
    }

    const onDeleteUser = (id: string) => {
        removeMemberFromClub(id)
            .then(() => {
                toast({
                    title: 'User Removed',
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

    return (
        <Box mx='auto'>
            <HStack spacing='3' fontSize='1'>
                <InputGroup maxW='60%'>
                    <InputLeftElement pointerEvents='none'>
                        <BiSearch color='gray.300' />
                    </InputLeftElement>
                    <Input
                        placeholder='Search...'
                        onChange={(e) => setSearchString(e.target.value)}
                    />
                </InputGroup>

                <Spacer />
                <IconButton
                    variant='solid'
                    icon={<AiOutlinePlus />}
                    aria-label='add-user'
                    onClick={onOpen}
                    color='white'
                />
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
                            <Td>Role</Td>
                            <Td>Joined</Td>
                            <Td isNumeric></Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {searchData?.map((user, i) => (
                            <Tr key={i}>
                                <Td>{user.userId.name}</Td>
                                <Td>{user.role}</Td>
                                <Td>
                                    {new Date(user.createdAt || Date.now()).toLocaleDateString(
                                        'en-IN',
                                        {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        },
                                    )}
                                </Td>
                                <Td isNumeric>
                                    <DeleteButtonWithAlert
                                        onDelete={() => onDeleteUser(user.userId._id)}
                                        title='Remove Member'
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <AddMemberModal isOpen={isOpen} onClose={onClose} memberRefetch={refetch} />
        </Box>
    );
}
