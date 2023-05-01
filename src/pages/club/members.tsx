import MemberTable from '@/components/club/memberTable';
import Layout from '@/components/layout';
import { Box, Card, CardBody } from '@chakra-ui/react';
import { NextPageWithLayout } from '../_app';

const Members: NextPageWithLayout = () => {
    return (
        <Box mt='12' w='80%' mx='auto'>
            <Card>
                <CardBody>
                    <MemberTable />
                </CardBody>
            </Card>
        </Box>
    );
};

Members.getLayout = (page) => {
    return <Layout>{page}</Layout>;
};

export default Members;
