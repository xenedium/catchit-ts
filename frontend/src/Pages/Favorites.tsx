import { useEffect, useState } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { Layout } from '../Components/Others/Layout';
import { Badge, Card, Container, Group, Image, LoadingOverlay, SimpleGrid, Title, UnstyledButton, Text, createStyles, Avatar } from '@mantine/core';
import { NothingFoundType } from '../@types/props';
import { NothingFound } from '../Components/Others/NothingFound';
import { ArticleDto, ServerJsonResponse } from '../@types';
import axios from 'axios';
import { Link } from 'react-router-dom';

// “We’re all living in each other’s paranoia.”
// — Elliot Alderson, Mr. Robot, Mr. Robot Season 1: eps1.7_wh1ter0se.m4v

const useStyles = createStyles((theme) => ({
    footer: {
        padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
        marginTop: theme.spacing.md,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    },
}));

export default function Favorites() {
    const { classes } = useStyles();
    const [favorites] = useLocalStorage<string[]>({
        key: 'favorites',
        defaultValue: []
    });

    const [articles, setArticles] = useState<ArticleDto[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        Promise.all(favorites.map(id => axios.get<ServerJsonResponse>(`/api/article/${id}`)))
            .then(responses => {
                const articles = responses.map(response => response.data.doc);
                setArticles(articles);
                setIsLoading(false);
            });
    }, [favorites]);

    return (
        <Layout>
            { /* XOR operation */}
            <LoadingOverlay visible={isLoading !== (articles.length === 0)} />
            {
                articles.length === 0 ? <NothingFound type={NothingFoundType.NoFavorites} /> :
                    <Container mt={20}>
                        <Title mb={40}>My favorite articles: </Title>
                        <SimpleGrid
                            cols={3}
                            breakpoints={[{ maxWidth: 600, cols: 1 }, { maxWidth: 1000, cols: 2 }]}
                        >
                            {
                                articles.map(article =>
                                    <UnstyledButton key={article._id} maw={400}>
                                        <Link to={`/article/${article._id}`} style={{ textDecoration: 'none' }}>
                                            <Card withBorder shadow='md' radius='md' p='lg'>
                                                <Card.Section>
                                                    <Image
                                                        src={article.images[0]}
                                                        alt={article.title}
                                                        width={300}
                                                        height={300}
                                                    />
                                                </Card.Section>
                                                <Group position="apart" mt='lg'>
                                                    <Title lineClamp={1} order={4}>{article.title}</Title>
                                                    <Badge color={'pink'}>{article.price} MAD</Badge>
                                                </Group>
                                                <Text size="sm" color="dimmed" mt='md'>
                                                    {article.description}
                                                </Text>
                                                <Card.Section className={classes.footer}>
                                                    <Group mt='xs'>
                                                        <Avatar src={article.seller.image} radius='sm' />
                                                        <div>
                                                            <Text size="xs" color="dimmed">
                                                                {article.seller.firstName} {article.seller.lastName}
                                                            </Text>
                                                            <Text size="xs" color="dimmed">
                                                                {article.seller.email}
                                                            </Text>
                                                        </div>
                                                    </Group>
                                                </Card.Section>
                                            </Card>
                                        </Link>
                                    </UnstyledButton>
                                )
                            }
                        </SimpleGrid>
                    </Container>
            }
        </Layout>
    );
}
