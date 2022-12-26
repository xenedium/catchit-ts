import { Layout } from '../Components/Others/Layout';
import { Container, Image, Title, LoadingOverlay, SimpleGrid, UnstyledButton, Card, Badge, Group, Text, Avatar, createStyles } from '@mantine/core';
import { NothingFoundType } from '../@types/props';
import { NothingFound } from '../Components/Others/NothingFound';
import { Link } from 'react-router-dom';
import { useMyArticles } from '../Hooks/useMyArticles';
import { Carousel } from '@mantine/carousel';
import { ArticleDto } from '../@types';

const useStyles = createStyles((theme) => ({
    footer: {
        padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
        marginTop: theme.spacing.md,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    },
}));


export default function MyArticles() {
    const { classes } = useStyles();
    const { articles, isLoading, sold } = useMyArticles();

    return (
        <Layout>
            <LoadingOverlay visible={isLoading} />
            {
                articles.length === 0 && !isLoading ? <NothingFound type={NothingFoundType.NoArticles} /> :
                    <Container mt={20}>
                        <Title mb={40}>My {sold ? 'Sold' : 'Listed'} articles: </Title>
                        <SimpleGrid
                            cols={3}
                            breakpoints={[{ maxWidth: 600, cols: 1 }, { maxWidth: 1000, cols: 2 }]}
                        >
                            {
                                articles.map((article: ArticleDto) =>
                                    <UnstyledButton key={article._id} maw={400}>
                                        <Card withBorder shadow='md' radius='md' p='lg'>
                                            <Card.Section>
                                                <Carousel w={300} slideGap="md" withIndicators loop>
                                                    {
                                                        article.images.map((image, index) => (
                                                            <Carousel.Slide key={index}>
                                                                <Image
                                                                    height={300}
                                                                    width={300}
                                                                    src={image}
                                                                    alt={article.title}
                                                                />
                                                            </Carousel.Slide>
                                                        ))
                                                    }
                                                </Carousel>
                                            </Card.Section>
                                            <Link to={`/article/${article._id}`} style={{ textDecoration: 'none' }}>
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
                                            </Link>
                                        </Card>
                                    </UnstyledButton>
                                )
                            }
                        </SimpleGrid>
                    </Container>
            }
        </Layout>
    );
}
