import { deletePost, getPostLikes, markInterested, markUnInterested } from '@/services/post';
import { Post, Visibility } from '@/types/post';
import {
    Stack,
    Text,
    Heading,
    HStack,
    Button,
    Avatar,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Spacer,
    UseToastOptions,
    ToastId,
    useDisclosure,
    Modal,
    ModalContent,
    ModalBody,
    ModalHeader,
    ModalOverlay,
    ModalCloseButton,
} from '@chakra-ui/react';
import ReactHtmlParser from 'html-react-parser';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { DeleteButtonWithAlert } from './admin';

export default function PostCard({
    post,
    refetch,
    toast,
    deleteButton = false,
}: {
    post: Post;
    refetch: any;
    toast: (op: UseToastOptions) => ToastId;
    deleteButton?: boolean;
}) {
    const onClick = async () => {
        try {
            post.liked ? await markUnInterested(post._id) : await markInterested(post._id);
            refetch();
        } catch (error) {
            toast({
                title: 'Something went wrong',
                duration: 5000,
                status: 'error',
            });
        }
    };

    const onDelete = async () => {
        deletePost(post._id)
            .then(() => refetch())
            .catch(() =>
                toast({
                    title: 'Failed to delete post',
                    duration: 5000,
                    status: 'error',
                }),
            );
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data } = useQuery(['postLikes', post._id], () => getPostLikes(post._id), {
        enabled: isOpen,
    });

    return (
        <>
            <Card>
                <CardHeader>
                    <Stack direction={'row'} spacing={4} align={'center'}>
                        <Avatar name={post.author.name.split(' ')[0]} size='sm' />
                        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                            <Text fontWeight={600}>{post.author.name}</Text>
                            <Text color={'gray.500'}>
                                {new Date(post.createdAt).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                })}
                            </Text>
                        </Stack>
                        <Spacer />
                        <Text
                            color='green.500'
                            textTransform={'uppercase'}
                            fontWeight={800}
                            fontSize={'xs'}
                            letterSpacing={1.1}
                        >
                            {post.visibility === Visibility.PRIVATE && (
                                <span>{post.visibility}</span>
                            )}
                        </Text>
                        {deleteButton && (
                            <DeleteButtonWithAlert title='Delete Post' onDelete={onDelete} />
                        )}
                    </Stack>
                </CardHeader>
                <CardBody>
                    <Stack>
                        <HStack>
                            <Heading color='gray.700' fontSize={'lg'} letterSpacing='wide'>
                                {post.title}
                            </Heading>
                        </HStack>
                    </Stack>

                    <Text mt='6'>{ReactHtmlParser(post.content)}</Text>
                </CardBody>

                <CardFooter justify='space-between' alignItems='center'>
                    <Button
                        variant='ghost'
                        onClick={onClick}
                        color={post.liked ? 'pink.500' : 'gray.500'}
                        fontWeight={post.liked ? '500' : '400'}
                        leftIcon={!post.liked ? <AiOutlineStar /> : <AiFillStar />}
                    >
                        Interested
                    </Button>
                    <HStack spacing={3} mr='4'>
                        <AiFillStar />
                        <Text
                            color={'gray.700'}
                            fontWeight={500}
                            fontSize='sm'
                            cursor={deleteButton ? 'pointer' : 'none'}
                            textDecoration={deleteButton ? 'underline' : 'none'}
                            onClick={() => (post.interested.length > 0 ? onOpen() : null)}
                        >
                            {post.interested.length}
                        </Text>
                    </HStack>
                </CardFooter>
            </Card>
            {deleteButton && (
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            Interested{' '}
                            <span style={{ color: 'gray', marginLeft: '4px' }}>
                                {data?.payload?.interested.length}
                            </span>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack>
                                {data?.payload?.interested.map((u, id) => (
                                    <Text key={id}>{u.name}</Text>
                                ))}
                            </Stack>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </>
    );
}
