import { Flex, ResponsiveValue, Spinner } from '@chakra-ui/react';

export default function Loader({ size }: { size: ResponsiveValue<string> }) {
    return (
        <Flex justifyContent='center' mt='16'>
            <Spinner size={size} color='pink.500' />
        </Flex>
    );
}
