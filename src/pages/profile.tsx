import ClubTable from '@/components/clubTable';
import Layout from '@/components/layout';
import { getPopulatedUserProfile } from '@/services/user';
import { Role } from '@/types';
import { Avatar, Box, Card, CardBody, Heading, HStack, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { NextPageWithLayout } from './_app';

const Profile: NextPageWithLayout = () => {
    const { data: profile } = useQuery(['userPopulatedProfile'], () => getPopulatedUserProfile(), {
        staleTime: 1000 * 5,
    });

    return (
        <HStack mt='8' alignItems='start' spacing={4}>
            <Card w='2xl'>
                <CardBody as={HStack} spacing='8'>
                    <Avatar
                        size='xl'
                        name={profile?.payload?.name}
                        bgColor='pink.500'
                        color='white'
                    />
                    <Box>
                        <Heading size='lg' color='gray.700'>
                            {profile?.payload?.name}
                        </Heading>
                        <Text fontWeight={600} fontSize='sm' color='gray.500' mt='2px'>
                            {profile?.payload?.email}
                        </Text>
                        <Text color='gray.500' fontSize='sm'>
                            Joined on{' '}
                            {new Date(profile?.payload?.createdAt || Date.now()).toLocaleDateString(
                                'en-IN',
                                {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                },
                            )}
                        </Text>
                    </Box>
                </CardBody>
            </Card>
            <Card w='50%'>
                <CardBody>
                    <Heading fontSize='xl' mb='4'>
                        Clubs
                    </Heading>
                    <ClubTable user={profile?.payload} />
                </CardBody>
            </Card>
        </HStack>
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
    await queryClient.prefetchQuery(
        ['userPopulatedProfile'],
        () => getPopulatedUserProfile(token),
        { staleTime: 1000 * 5 },
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};
export default Profile;
