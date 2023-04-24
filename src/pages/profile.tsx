import Layout from '@/components/layout';
import { getPopulatedUserProfile } from '@/services/auth';
import { Role } from '@/types';
import { Avatar, Box, Card, CardBody, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { NextPageWithLayout } from './_app';

const Profile: NextPageWithLayout = () => {
    const { data } = useQuery('getPopulatedProfile', () => getPopulatedUserProfile(), {
        staleTime: Infinity,
    });

    return (
        <Box>
            <Card mt='10' maxW='md' p={8} mx='auto' textAlign='center'>
                <Avatar
                    mx='auto'
                    size='lg'
                    name={data?.payload?.name}
                    bgColor='pink.500'
                    color='white'
                />
                <Heading size='md' mt={8} color='gray.700'>
                    {data?.payload?.name}
                </Heading>
                <Text mt='2'>{data?.payload?.email}</Text>
                <Text>{data?.payload?.clubs.length}</Text>
            </Card>
            <Box mt='8' w='80%' mx='auto'>
                <SimpleGrid spacing={5} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    <Card textAlign='center'>
                        <CardBody>
                            <Text fontWeight='semibold' color='gray.700' fontSize='lg'>
                                Name
                            </Text>
                            <Text color='gray.400' fontSize='md' fontWeight='500' lineHeight='xs'>
                                Something less important
                            </Text>
                        </CardBody>
                    </Card>
                </SimpleGrid>
            </Box>
        </Box>
    );
};

Profile.getLayout = (page) => {
    return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.req.cookies.token;
    const role = context.req.cookies.role;

    if (!token || !role) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    if (role === Role.CLUB) {
        return {
            redirect: {
                destination: '/club/profile',
                permanent: false,
            },
        };
    }

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery('getPopulatedProfile', () => getPopulatedUserProfile(token), {
        staleTime: Infinity,
    });

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};
export default Profile;
