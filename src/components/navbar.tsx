import { ReactNode } from 'react';
import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    HStack,
    IconButton,
    Stack,
    MenuDivider,
    Link,
    Spinner,
} from '@chakra-ui/react';
import { MdOutlineClose, MdMenu } from 'react-icons/md';
import Logo from './logo';
import NextLink from 'next/link';
import { useQuery } from 'react-query';
import { getRole } from '@/services/user';

const NavLink = ({ children, href }: { children: ReactNode; href: string }) => (
    <NextLink href={href} passHref legacyBehavior>
        <Link
            px={2}
            py={1}
            fontWeight='500'
            fontSize='md'
            rounded={'md'}
            color='gray.500'
            _hover={{
                textDecoration: 'none',
                color: 'pink.500',
            }}
            _active={{
                color: 'pink.500',
            }}
        >
            {children}
        </Link>
    </NextLink>
);

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const links = [
        { name: 'Home', href: '/' },
        { name: 'Clubs', href: '/clubs' },
        { name: 'Notices', href: '/notices' },
        { name: 'History', href: '/history' },
    ];

    const { data, isLoading } = useQuery('getRole', getRole, { retry: 1 });
    const user = { name: 'Pritesh', role: 'ADMIN' };

    const logOut = () => {
        console.log('Logged Out');
    };

    return (
        <Box bg='white' borderBottom='1px' borderColor='blackAlpha.300'>
            <Flex
                py='3'
                alignItems={'center'}
                justifyContent={'space-between'}
                width={['98%', '90%', '80%']}
                mx='auto'
            >
                <IconButton
                    colorScheme='gray'
                    size={'sm'}
                    p='auto'
                    icon={isOpen ? <MdOutlineClose /> : <MdMenu />}
                    aria-label={'Open Menu'}
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                />

                <Link href='/'>
                    <Logo width='130' />
                </Link>
                <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                    {links.map((link) => (
                        <NavLink key={link.name} href={link.href}>
                            {link.name}
                        </NavLink>
                    ))}
                </HStack>
                <Flex alignItems={'center'}>
                    {!isLoading ? (
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                background='gray.700'
                                minW={0}
                            >
                                <Avatar
                                    size='sm'
                                    src={undefined}
                                    name={user.name}
                                    background='pink.500'
                                    color='white'
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => console.log('go to profile')}>
                                    Profile
                                </MenuItem>
                                {data?.data === 'admin' && (
                                    <MenuItem as={NextLink} href='/admin'>
                                        Admin
                                    </MenuItem>
                                )}
                                <MenuDivider />
                                <MenuItem onClick={logOut}>Log out</MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <Spinner size='xs' />
                    )}
                </Flex>
            </Flex>

            {isOpen ? (
                <Box pb={4} display={{ md: 'none' }} px='6'>
                    <Stack as={'nav'} spacing={3}>
                        {links.map((link) => (
                            <NavLink key={link.name} href={link.href}>
                                {link.name}
                            </NavLink>
                        ))}
                    </Stack>
                </Box>
            ) : null}
        </Box>
    );
}
