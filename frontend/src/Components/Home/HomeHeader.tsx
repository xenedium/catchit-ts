import React, { useState } from 'react';
import {
    createStyles,
    Container,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    Image
} from '@mantine/core';
import {
    Logout,
    Settings,
    ShoppingCart,
    ShoppingCartOff,
    ChevronDown,
    Heart,
    Plus,
} from 'tabler-icons-react';
import CatchItLogo from '../../Assets/Images/CatchItLogo.jpeg';

import { NavigateFunction, useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    header: {
        paddingTop: theme.spacing.sm,
        backgroundColor: theme.colors.dark[6],
        borderBottom: `1px solid ${theme.colors.dark[6]}`,
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
        color: theme.white,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 7 : 5],
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    userActive: {
        backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 7 : 5],
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
}));

interface HeaderTabsProps {
    user: { name: string; image: string };
}

const HandleLogout = (navigate?: NavigateFunction) => {
    if (navigate) {
        navigate('/login');
        return;
    }

    localStorage.removeItem('token');
    window.location.reload();
};


const HandleAccountSettings = (navigate: NavigateFunction) => navigate('/account/');
const HandleMyAvailableArticles = (navigate: NavigateFunction) => navigate('/my-articles/?sold=false');
const HandleMySoldArticles = (navigate: NavigateFunction) => navigate('/my-articles/?sold=true');
const HandleMyFavorites = (navigate: NavigateFunction) => navigate('/my-favorites');
const HandleAddArticle = (navigate: NavigateFunction) => navigate('/add-article');

export function HeaderTabsColored({ user }: HeaderTabsProps) {
    const navigate = useNavigate();
    const { classes, theme, cx } = useStyles();
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
                                    <Text weight={500} size="sm" sx={{ lineHeight: 1, color: theme.white }} mr={3}>
                                        {user.name}
                                    </Text>
                                    <ChevronDown size={12} />
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item icon={<Plus size={14} />} onClick={() => HandleAddArticle(navigate)} > Add article </Menu.Item>
                            <Menu.Item icon={<Heart size={14} />} onClick={() => HandleMyFavorites(navigate)} > Favorites </Menu.Item>

                            <Menu.Item icon={<ShoppingCart size={14} />} onClick={() => HandleMyAvailableArticles(navigate)} >My Listed Articles</Menu.Item>
                            <Menu.Item icon={<ShoppingCartOff size={14} />} onClick={() => HandleMySoldArticles(navigate)}>My Sold Articles</Menu.Item>

                            <Menu.Label>Settings</Menu.Label>
                            <Menu.Item icon={<Settings size={14} />} onClick={() => HandleAccountSettings(navigate)} >Account settings</Menu.Item>
                            <Menu.Item icon={<Logout size={14} />} onClick={() => {
                                user.name === 'Sign In' ? HandleLogout(navigate) : HandleLogout();
                            }}>{user.name === 'Sign In' ? 'Sign In' : 'Log Out'}</Menu.Item>
                        </Menu.Dropdown>

                    </Menu>
                </Group>
            </Container>
        </div>
    );
}
