import { Layout } from '../Components/Others/Layout';
import { createStyles, Image, Container, Title, Button, Group, Text, List, ThemeIcon, Space, Anchor, Kbd } from '@mantine/core';
import { Check } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import HomeScreenImage from '../Assets/Svgs/image-homescreen.svg';

const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing.xl * 4,
        paddingBottom: theme.spacing.xl * 4,
    },

    content: {
        maxWidth: 480,
        marginRight: theme.spacing.xl * 3,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            marginRight: 0,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 44,
        lineHeight: 1.2,
        fontWeight: 900,

        [theme.fn.smallerThan('xs')]: {
            fontSize: 28,
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            flex: 1,
        },
    },

    image: {
        flex: 1,

        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    highlight: {
        position: 'relative',
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
                : theme.colors[theme.primaryColor][0],
        borderRadius: theme.radius.sm,
        padding: '4px 12px',
    },
}));


export default function HomePage() {
    const { classes } = useStyles();
    return (
        <Layout>
            <Container>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            A <span className={classes.highlight}>Express</span> & React <br /> School Project
                        </Title>
                        <Text color="dimmed" mt="md">
                            An open source Express React school project.
                            It is an e-commerce website that lets users create, edit and delete their own articles
                            and also discover other users products.
                        </Text>

                        <List
                            mt={30}
                            spacing="sm"
                            size="sm"
                            icon={
                                <ThemeIcon size={20} radius="xl">
                                    <Check size={12} />
                                </ThemeIcon>
                            }
                        >
                            <List.Item>
                                <b>TypeScript based</b> - both the frontend and the backend are written in TypeScript to prevent runtime errors
                            </List.Item>
                            <List.Item>
                                <b>Fully responsive </b> - All pages are fully responsive and work on any device or mobile
                            </List.Item>
                            <List.Item>
                                <b>Supports image upload</b> - all uploaded images are stored in an AWS S3 storage server
                            </List.Item>
                            <List.Item>
                                <b>Rest API </b> - All api calls are made through a REST API at /api/
                            </List.Item>
                            <List.Item>
                                <b>Supports SignIn and SignUp </b> - Fully supports user login and registration,{' '}
                                <Anchor style={{ fontSize: 14 }} href="https://jwt.io/">using Json Web Tokens</Anchor>
                            </List.Item>
                            <List.Item>
                                <b>MongoDb </b> - All data are stored in a MongoDb database <Space />( User passwords are hashed and salted )
                            </List.Item>
                            <List.Item>
                                <b>CRUD </b> - All CRUD operations are implemented in the backend
                            </List.Item>
                            <List.Item>
                                <b>DarkMode </b> - Toggle the DarkMode by using the hotkey <Kbd>Ctrl</Kbd><span style={{ margin: '0 5px' }}>+</span><Kbd>J</Kbd>
                            </List.Item>
                        </List>

                        <Group mt={30}>
                            <Button radius="xl" size="md" className={classes.control}
                                component={Link}
                                to={Cookies.get('catchit-token') ? '/articles' : '/register'}
                            >
                                Get started
                            </Button>
                            <Button radius="xl" size="md" className={classes.control}
                                component={Link}
                                to="/articles"
                            >
                                View Articles
                            </Button>

                            <Button<'a'> component="a" href="https://github.com/xenedium/catchit-ts" variant="default" radius="xl" size="md" className={classes.control}>
                                Source code
                            </Button>

                        </Group>
                    </div>
                    <Image src={HomeScreenImage} className={classes.image} />
                </div>
            </Container>
        </Layout>
    );
}


