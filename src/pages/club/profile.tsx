import Layout from '@/components/layout';
import PostCard from '@/components/post';
import { getClubProfile, getDashboardData } from '@/services/clubs';
import { getClubPosts } from '@/services/post';
import { Role } from '@/types';
import {
    Avatar,
    Box,
    Card,
    CardBody,
    Grid,
    GridItem,
    Heading,
    HStack,
    Stack,
    Text,
    useToast,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { NextPageWithLayout } from '../_app';
import { AiFillStar } from 'react-icons/ai';
import { BsPeopleFill } from 'react-icons/bs';
import { IoDocumentText } from 'react-icons/io5';
import MemberTable from '@/components/club/memberTable';

const ClubProfile: NextPageWithLayout = () => {
    const toast = useToast();

    const { data: profile } = useQuery('getClubProfile', () => getClubProfile(), {
        staleTime: Infinity,
    });
    const { data: posts, refetch } = useQuery('getClubPosts', getClubPosts);
    const { data } = useQuery('getDashboardData', getDashboardData);

    return (
        <Box mt='10'>
            <Grid templateColumns='repeat(7, 1fr)' gap={4}>
                <Card as={GridItem} colSpan={4}>
                    <CardBody as={HStack} spacing={6}>
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
                                {profile?.payload?.userName}
                            </Text>
                            <Box mt='4' color='gray.600'>
                                {profile?.payload?.description}
                            </Box>
                        </Box>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <HStack color='gray.400' fontSize='lg' fontWeight='500' lineHeight='xs'>
                            <AiFillStar />
                            <Text>Interactions</Text>
                        </HStack>
                        <Text fontWeight='semibold' color='gray.700' fontSize='3xl' ms='6' mt='4'>
                            {data?.payload?.interactions}
                        </Text>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <HStack color='gray.400' fontSize='lg' fontWeight='500' lineHeight='xs'>
                            <BsPeopleFill />
                            <Text>Members</Text>
                        </HStack>
                        <Text fontWeight='semibold' color='gray.700' fontSize='3xl' ms='6' mt='4'>
                            {data?.payload?.members}
                        </Text>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <HStack color='gray.400' fontSize='lg' fontWeight='500' lineHeight='xs'>
                            <IoDocumentText />
                            <Text>Posts</Text>
                        </HStack>
                        <Text fontWeight='semibold' color='gray.700' fontSize='3xl' ms='6' mt='4'>
                            {data?.payload?.posts}
                        </Text>
                    </CardBody>
                </Card>
            </Grid>
            <HStack mt='8' alignItems='start' spacing={4}>
                <Card w='50%'>
                    <CardBody>
                        <MemberTable />
                    </CardBody>
                </Card>
                <Box overflow='auto' height='80vh' rounded='4' flexBasis='50%'>
                    <Stack mx='auto' spacing={3}>
                        {posts?.payload?.map((post, i) => (
                            <PostCard
                                key={i}
                                post={post}
                                refetch={refetch}
                                toast={toast}
                                deleteButton
                            />
                        ))}
                    </Stack>
                </Box>
            </HStack>
        </Box>
    );
};

ClubProfile.getLayout = (page) => {
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

    if (role !== Role.CLUB) {
        return {
            redirect: {
                destination: '/profile',
                permanent: false,
            },
        };
    }

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery('getClubProfile', () => getClubProfile(token), {
        staleTime: Infinity,
    });

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};
export default ClubProfile;
