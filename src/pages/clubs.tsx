import ClubTable from '@/components/clubTable';
import Layout from '@/components/layout';
import { getPopulatedUserProfile } from '@/services/user';
import { Box, Card, CardBody } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { NextPageWithLayout } from './_app';

const Clubs: NextPageWithLayout = () => {
    const { data: profile } = useQuery(['userPopulatedProfile'], () => getPopulatedUserProfile(), {
        staleTime: 1000 * 5,
    });

    return (
        <Box mt='12'>
            <Card w='60%' mx='auto'>
                <CardBody>
                    <ClubTable user={profile?.payload} />
                </CardBody>
            </Card>
        </Box>
    );
};

Clubs.getLayout = (page) => {
    return <Layout>{page}</Layout>;
};

export default Clubs;
