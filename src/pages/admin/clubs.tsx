import Layout from '@/components/layout';
import { Heading } from '@chakra-ui/react';
import { NextPageWithLayout } from '../_app';

const Clubs: NextPageWithLayout = () => {
    return <Heading>Clubs</Heading>;
};

Clubs.getLayout = (page) => {
    return <Layout>{page}</Layout>;
};

export default Clubs;
