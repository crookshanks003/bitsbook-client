import { ReactNode } from 'react';
import {
    Box,
    Flex,
    Avatar,
    Link,
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
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { MdOutlineClose, MdMenu } from 'react-icons/md';
import { Logo } from './Logo';

const NavLink = ({ children, href, active }: { children: ReactNode; href: string; active: boolean }) => (
    <Link
        as={ReactRouterLink}
        to={href}
        px={2}
        py={1}
        fontWeight='500'
        fontSize='md'
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            color: 'pink.500',
        }}
        _active={{
            color: 'pink.500',
        }}
        color={active ? 'green.500' : 'gray.500'}
    >
        {children}
    </Link>
);

export const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const links = [
        { name: 'Home', href: '/home' },
        { name: 'Add', href: '/add-book' },
        { name: 'Search', href: '/search' },
        { name: 'History', href: '/history' },
    ];

    const data = { name: 'Pritesh', role: 'ADMIN' };

    const logOut = () => {
        console.log('Logged Out');
    };

    return (
        <Box bg='white' borderBottom='1px' borderColor='blackAlpha.300'>
            <Flex py='3' alignItems={'center'} justifyContent={'space-between'} width={['98%', '90%', '80%']} mx='auto'>
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
                        <NavLink key={link.name} href={link.href} active={link.href === location.pathname}>
                            {link.name}
                        </NavLink>
                    ))}
                </HStack>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            as={Button}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                            background='gray.700'
                            minW={0}
                        >
                            <Avatar size='sm' src={undefined} name={data.name} background='pink.500' color='white' />
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => console.log('go to profile')}>Profile</MenuItem>
                            {data.role == 'ADMIN' && (
                                <MenuItem onClick={() => console.log('go to admin')}>Admin</MenuItem>
                            )}
                            <MenuDivider />
                            <MenuItem onClick={logOut}>Log out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>

            {isOpen ? (
                <Box pb={4} display={{ md: 'none' }} px='6'>
                    <Stack as={'nav'} spacing={3}>
                        {links.map((link) => (
                            <NavLink key={link.name} href={link.href} active={link.href === location.pathname}>
                                {link.name}
                            </NavLink>
                        ))}
                    </Stack>
                </Box>
            ) : null}
        </Box>
    );
};
