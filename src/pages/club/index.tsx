import Layout from '@/components/layout';
import PostCard from '@/components/post';
import { getClubFeed } from '@/services/post';
import { Role } from '@/types';
import { Stack, useToast } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import { NextPageWithLayout } from '../_app';

const Club: NextPageWithLayout = () => {
    const toast = useToast();
    const { data, refetch } = useQuery('clubFeedPosts', getClubFeed);

    return (
        <Stack w='50%' mx='auto' spacing={2} mt='12'>
            {data?.payload?.map((post, i) => (
                <PostCard key={i} post={post} refetch={refetch} toast={toast} />
            ))}
        </Stack>
    );
};

Club.getLayout = (page) => {
    return <Layout role={Role.CLUB}>{page}</Layout>;
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
    const role = context.req.cookies.role;
    if (!role || role !== Role.CLUB) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    return {
        props: {
            user,
        },
    };
};
export default Club;
