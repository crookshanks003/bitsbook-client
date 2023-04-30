import { markInterested, markUnInterested } from '@/services/post';
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
} from '@chakra-ui/react';
import ReactHtmlParser from 'html-react-parser';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

export default function PostCard({
    post,
    refetch,
    toast,
}: {
    post: Post;
    refetch: any;
    toast: (op: UseToastOptions) => ToastId;
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

    return (
        <Card overflow={'hidden'}>
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
                        {post.visibility === Visibility.PRIVATE && <span>{post.visibility}</span>}
                    </Text>
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
                <Text color={'gray.700'} fontWeight={600} letterSpacing={1.1} fontSize='sm' mr='4'>
                    {post.interested.length}
                </Text>
            </CardFooter>
        </Card>
    );
}
