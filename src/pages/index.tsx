import { Text } from '@chakra-ui/react';
import { NextPageWithLayout } from './_app';
import Layout from '../components/layout';
import { GetServerSideProps } from 'next';

const Home: NextPageWithLayout = () => {
    return (
        <Text fontWeight='600' fontSize='2xl'>
            Hello World
        </Text>
    );
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
    return {
        props: {
            user,
        },
    };
};

Home.getLayout = (page) => {
    return <Layout>{page}</Layout>;
};

export default Home;
