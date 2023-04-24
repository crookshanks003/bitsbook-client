import Layout from '@/components/layout';
import Post from '@/components/post';
import { Role } from '@/types';
import { Heading } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from '../_app';

const Club: NextPageWithLayout = () => {
    return (
        <>
            <Heading>Hello World</Heading>
            <Post />
        </>
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
