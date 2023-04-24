import { Text } from '@chakra-ui/react';
import { NextPageWithLayout } from './_app';
import Layout from '../components/layout';
import { GetServerSideProps } from 'next';
import { Role } from '@/types';

const Home: NextPageWithLayout = () => {
    return (
        <Text fontWeight='600' fontSize='2xl'>
            Hello World
        </Text>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = context.req.cookies.token;
    const role = context.req.cookies.role;

    if (!user || !role) {
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
                destination: '/club',
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
