import Layout from '@/components/layout';
import Loader from '@/components/loader';
import PostCard from '@/components/post';
import { getClubInfo } from '@/services/clubs';
import { getClubPostsById } from '@/services/post';
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
import { useRouter } from 'next/router';
import { BsPeopleFill } from 'react-icons/bs';
import { IoDocumentText } from 'react-icons/io5';
import { useQuery } from 'react-query';
import { NextPageWithLayout } from '../../_app';

const Club: NextPageWithLayout = () => {
    const toast = useToast();
    const router = useRouter();
    const { clubId } = router.query;

    const { data: profile, isLoading } = useQuery(
        'getClubInfo',
        () => getClubInfo(clubId as string),
        {
            staleTime: Infinity,
            enabled: typeof clubId !== 'undefined',
        },
    );

    const { data: posts, refetch } = useQuery(
        ['getClubPostsById', clubId],
        () => getClubPostsById(clubId as string),
        { enabled: typeof clubId !== 'undefined' },
    );

    if (isLoading) {
        return <Loader size='lg' />;
    }

    return (
        <Box mt='12'>
            <Grid templateColumns='repeat(6, 1fr)' gap={4}>
                <Card as={GridItem} colSpan={4}>
                    <CardBody>
                        <HStack spacing={6}>
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
                        </HStack>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <HStack color='gray.400' fontSize='lg' fontWeight='500' lineHeight='xs'>
                            <BsPeopleFill />
                            <Text>Members</Text>
                        </HStack>
                        <Text fontWeight='semibold' color='gray.700' fontSize='3xl' ms='6' mt='4'>
                            {profile?.payload?.members.length}
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
                            {posts?.payload?.length}
                        </Text>
                    </CardBody>
                </Card>
            </Grid>
            <Stack spacing={2} mt='10'>
                {posts?.payload?.map((post, i) => (
                    <PostCard key={i} post={post} refetch={refetch} toast={toast} />
                ))}
            </Stack>
        </Box>
    );
};

Club.getLayout = (page) => {
    return <Layout>{page}</Layout>;
};

export default Club;
