import Layout from '@/components/layout';
import { Heading } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from './_app';

const Admin: NextPageWithLayout<{ user: any }> = ({ user }) => {
    return <Heading>{user}</Heading>;
};

Admin.getLayout = (page) => {
    return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = context.req.cookies.token;
    console.log(context.req.cookies);

    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
    if (user !== 'admin') {
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

export default Admin;
