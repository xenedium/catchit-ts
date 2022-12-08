import { useState } from 'react';
import { createStyles, Container, Avatar, UnstyledButton, Group, Text, Menu, Image } from '@mantine/core';
import { Logout, Settings, ShoppingCart, ShoppingCartOff, ChevronDown, Heart, Plus } from 'tabler-icons-react';
import CatchItLogo from '../../Assets/Images/CatchItLogo.jpeg';
import { useNavigate, Link } from 'react-router-dom';
import type { HeaderTabsProps } from '../../@types';

const useStyles = createStyles((theme) => ({
    header: {
        paddingTop: theme.spacing.sm,
        backgroundColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 7 : 3],
    },

    mainSection: {
        paddingBottom: theme.spacing.sm,
    },

    userMenu: {
        [theme.fn.smallerThan('xs')]: {
            // display: 'none',
        },
    },

    user: {
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',
        backgroundColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 8 : 1],

        '&:hover': {
            backgroundColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 9 : 0],
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    userActive: {
        backgroundColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 9 : 0],
    },

    tabs: {
        [theme.fn.smallerThan('sm')]: {
            // display: 'none',
        },
    },

    tabsList: {
        borderBottom: '0 !important',
    },

    tabControl: {
        fontWeight: 500,
        height: 38,
        color: `${theme.white} !important`,

        '&:hover': {
            backgroundColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 7 : 5],
        },
    },

    tabControlActive: {
        color: `${theme.colorScheme === 'dark' ? theme.white : theme.black} !important`,
        borderColor: `${theme.colors[theme.primaryColor][6]} !important`,
    },
    link: {
        textDecoration: 'none',
    },
    text: {
        lineHeight: 1,
        color: theme.colorScheme === 'dark' ? 'white' : 'black'
    }
}));

const HandleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
};

export function HeaderTabsColored({ user }: HeaderTabsProps) {
    const navigate = useNavigate();
    const { classes, cx, theme } = useStyles();
    const [userMenuOpened, setUserMenuOpened] = useState(false);


    return (
        <div className={classes.header}>
            <Container className={classes.mainSection}>
                <Group position="apart">
                    <Image
                        src={CatchItLogo}
                        alt="CatchIt Logo"
                        width={100}
                        onClick={() => navigate('/')}
                        style={{ cursor: 'pointer' }}
                    />
                    <Menu
                        width={260}
                        transition="pop-top-right"
                        onClose={() => setUserMenuOpened(false)}
                        onOpen={() => setUserMenuOpened(true)}
                    >
                        <Menu.Target>
                            <UnstyledButton
                                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                            >
                                <Group spacing={7}>
                                    <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                                    <Text weight={500} size="sm" className={classes.text} mr={3}>
                                        {user.name}
                                    </Text>
                                    <ChevronDown size={12} color={theme.colorScheme === 'dark' ? 'white' : 'black'} />
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Link to='/add-article' className={classes.link}>
                                <Menu.Item icon={<Plus size={14} />}> Add article </Menu.Item>
                            </Link>
                            <Link to='/my-favorites' className={classes.link}>
                                <Menu.Item icon={<Heart size={14} />}> Favorites </Menu.Item>
                            </Link>
                            <Link to='/my-articles?sold=false' className={classes.link}>
                                <Menu.Item icon={<ShoppingCart size={14} />}>My Listed Articles</Menu.Item>
                            </Link>
                            <Link to='/my-articles?sold=true' className={classes.link}>
                                <Menu.Item icon={<ShoppingCartOff size={14} />}>My Sold Articles</Menu.Item>
                            </Link>
                            <Menu.Label>Settings</Menu.Label>
                            <Link to='/account' className={classes.link}>
                                <Menu.Item icon={<Settings size={14} />}>Account settings</Menu.Item>
                            </Link>
                            {
                                user.name === 'Sign In' ?
                                    <Link to='/login' className={classes.link}>
                                        <Menu.Item icon={<Logout size={14} />} >Sign In</Menu.Item>
                                    </Link> :
                                    <Menu.Item icon={<Logout size={14} />} onClick={() => HandleLogout()}>Log Out</Menu.Item>
                            }
                        </Menu.Dropdown>

                    </Menu>
                </Group>
            </Container>
        </div>
    );
}
