import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    TableContainer,
    Box,
    InputGroup,
    InputLeftElement,
    Input,
} from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import { useMemo, useState } from 'react';
import { PopulatedUser } from '@/types';
import NextLink from 'next/link';

export default function ClubTable({ user }: { user?: PopulatedUser }) {
    const [searchString, setSearchString] = useState('');
    const clubs = user?.clubs;

    const searchData = useMemo(() => {
        if (!searchString || !clubs) return clubs;
        return clubs.filter((user) =>
            user.clubId.name.toLowerCase().includes(searchString.toLowerCase()),
        );
    }, [clubs, searchString]);

    return (
        <Box mx='auto'>
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <BiSearch color='gray.300' />
                </InputLeftElement>
                <Input placeholder='Search...' onChange={(e) => setSearchString(e.target.value)} />
            </InputGroup>

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
                        </Tr>
                    </Thead>
                    <Tbody>
                        {searchData?.map((club, i) => (
                            <Tr key={i}>
                                <Td>
                                    <NextLink href={`/club/info/${club.clubId._id}`}>
                                        {club.clubId.name}
                                    </NextLink>
                                </Td>
                                <Td>{club.role}</Td>
                                <Td>
                                    {new Date(club.createdAt || Date.now()).toLocaleDateString(
                                        'en-IN',
                                        {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        },
                                    )}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
}
