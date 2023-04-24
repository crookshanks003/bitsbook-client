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
    Spacer,
} from '@chakra-ui/react';
import { MdOutlineClose, MdMenu } from 'react-icons/md';
import Logo from './logo';
import NextLink from 'next/link';
import { useQuery } from 'react-query';
import { getNavbarProfile } from '@/services/auth';
import { logout } from '@/services/auth';
import { useRouter } from 'next/router';
import { Role } from '@/types';

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

export default function Navbar({ role }: { role: Role }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const links =
        role === Role.USER
            ? [
                  { name: 'Home', href: '/' },
                  { name: 'Clubs', href: '/clubs' },
                  { name: 'Notices', href: '/notices' },
                  { name: 'History', href: '/history' },
              ]
            : [
                  { name: 'Home', href: '/' },
                  { name: 'Members', href: '/club/members' },
                  { name: 'Notices', href: '/club/notices' },
                  { name: 'Create', href: '/club/create' },
              ];

    const { data, remove } = useQuery('getProfile', () => getNavbarProfile(), {
        staleTime: Infinity,
    });
    const router = useRouter();

    const logOut = () => {
        logout()
            .then(() => {
                remove();
                router.replace('/login');
            })
            .catch();
    };

    return (
        <Box bg='white' borderBottom='1px' borderColor='blackAlpha.300'>
            <HStack py='3' width={['98%', '90%', '80%']} mx='auto'>
                <IconButton
                    colorScheme='gray'
                    variant='solid'
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
                <Spacer />
                <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                    {links.map((link) => (
                        <NavLink key={link.name} href={link.href}>
                            {link.name}
                        </NavLink>
                    ))}
                </HStack>
                <Spacer />
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
                            <Avatar
                                size='sm'
                                name={data?.payload?.name}
                                background='pink.500'
                                color='white'
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuItem as={NextLink} href='/profile'>
                                Profile
                            </MenuItem>
                            {data?.payload?.role === Role.ADMIN && (
                                <MenuItem as={NextLink} href='/admin'>
                                    Admin
                                </MenuItem>
                            )}
                            <MenuDivider />
                            <MenuItem onClick={logOut}>Log out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>

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
