import Layout from '@/components/layout';
import PostCard from '@/components/post';
import { getInterestedPosts } from '@/services/post';
import { Stack, useToast } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { NextPageWithLayout } from './_app';

const Interested: NextPageWithLayout = () => {
    const toast = useToast();
    const { data, refetch } = useQuery('interstedPosts', getInterestedPosts);

    return (
        <Stack w='50%' mx='auto' spacing={2} mt='16'>
            {data?.payload?.map((post, i) => (
                <PostCard key={i} post={post} refetch={refetch} toast={toast} />
            ))}
        </Stack>
    );
};

Interested.getLayout = (page) => {
    return <Layout>{page}</Layout>;
};

export default Interested;
