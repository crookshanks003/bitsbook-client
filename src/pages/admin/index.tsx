import Layout from '@/components/layout';
import { Box, Card, Center, Heading, SimpleGrid, Tooltip } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from '../_app';
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineLocalActivity } from 'react-icons/md';
import { HiOutlineDocumentText } from 'react-icons/hi';
import NextLink from 'next/link';
import { getRole } from '@/services/auth';
import { Role } from '@/types';
import { QueryClient } from 'react-query';

const Admin: NextPageWithLayout = () => {
    return (
        <Box pt='8'>
            <SimpleGrid spacing={5} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                <Tooltip hasArrow label='View and Edit Users'>
                    <Card
                        as={NextLink}
                        href='/admin/users'
                        p='5'
                        textAlign='center'
                        borderRadius='2xl'
                        _hover={{ color: 'pink.500', cursor: 'pointer' }}
                    >
                        <Center>
                            <AiOutlineUser size='3rem' fontWeight='thin' />
                        </Center>
                        <Heading size='md' fontWeight='bold' mt='5'>
                            Users
                        </Heading>
                    </Card>
                </Tooltip>
                <Tooltip hasArrow label='View and Edit Clubs'>
                    <Card
                        as={NextLink}
                        href='/admin/clubs'
                        p='5'
                        textAlign='center'
                        borderRadius='2xl'
                        _hover={{ color: 'pink.500', cursor: 'pointer' }}
                    >
                        <Center>
                            <MdOutlineLocalActivity size='3rem' />
                        </Center>
                        <Heading size='md' mt='5'>
                            Clubs
                        </Heading>
                    </Card>
                </Tooltip>
                <Tooltip hasArrow label='View and Edit Posts'>
                    <Card
                        as={NextLink}
                        href='/admin/posts'
                        p='5'
                        textAlign='center'
                        borderRadius='2xl'
                        _hover={{ color: 'pink.500', cursor: 'pointer' }}
                    >
                        <Center>
                            <HiOutlineDocumentText size='3rem' />
                        </Center>
                        <Heading size='md' mt='5'>
                            Posts
                        </Heading>
                    </Card>
                </Tooltip>
            </SimpleGrid>
        </Box>
    );
};

Admin.getLayout = (page) => {
    return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.req.cookies.token;

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    const queryClient = new QueryClient();
    try {
        const role = await queryClient.fetchQuery('getRole', () => getRole(token), {
            staleTime: Infinity,
        });
        if (role !== Role.ADMIN) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }
    } catch (err) {
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

export default Admin;
