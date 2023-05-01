import { addMemberToClub, getUserList } from '@/services/clubs';
import {
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Stack,
    Text,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { useQuery } from 'react-query';

export default function AddMemberModal({
    isOpen,
    onClose,
    memberRefetch,
}: {
    isOpen: boolean;
    onClose: () => void;
    memberRefetch: () => void;
}) {
    const [searchString, setSearchString] = useState('');
    const { data } = useQuery('userListForAddMembers', getUserList, { enabled: isOpen });

    const searchData = useMemo(() => {
        if (!searchString) return data?.payload;
        return data?.payload?.filter((user) =>
            user.name.toLowerCase().includes(searchString.toLowerCase()),
        );
    }, [data, searchString]);

    const addMember = (id: string) => {
        addMemberToClub(id)
            .then(() => {
                memberRefetch();
                onClose();
            })
            .catch((err) => console.log(err));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='3xl'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <BiSearch color='gray.300' />
                        </InputLeftElement>
                        <Input
                            placeholder='Search...'
                            onChange={(e) => setSearchString(e.target.value)}
                        />
                    </InputGroup>
                </ModalHeader>
                <ModalBody>
                    <Stack>
                        {searchData?.map((u, id) => (
                            <HStack key={id} _hover={{ bgColor: 'gray.100' }} p='2' spacing={4}>
                                <Text>{u.name}</Text>
                                <Text color='gray.500'>{u.email}</Text>
                                <Spacer />
                                <IconButton
                                    variant='solid'
                                    icon={<AiOutlinePlus />}
                                    aria-label='add-user'
                                    onClick={() => addMember(u._id)}
                                    color='white'
                                />
                            </HStack>
                        ))}
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
