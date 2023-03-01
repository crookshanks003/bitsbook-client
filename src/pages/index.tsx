import { Text } from '@chakra-ui/react';
import { NextPageWithLayout } from './_app';
import Layout from '../components/layout';

const Home: NextPageWithLayout = () => {
    return (
        <Text fontWeight='600' fontSize='2xl'>
            Hello World
        </Text>
    );
};

Home.getLayout = (page) => {
    return <Layout>{page}</Layout>;
};

export default Home;
