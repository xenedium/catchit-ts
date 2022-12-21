/* eslint-disable no-unused-vars */
import { Layout } from '../Components/Others/Layout';
import { createStyles, TextInput, ActionIcon, Select, Container, AppShell, UnstyledButton, Card, Group, Image, Title, Text, Avatar, Badge, ScrollArea, SimpleGrid } from '@mantine/core';
import { Search, ArrowRight } from 'tabler-icons-react';
import { useArticles } from '../Hooks/useArticles';
import { ArticleDto, City } from '../@types';
import { Link } from 'react-router-dom';
import { Carousel } from '@mantine/carousel';

const useStyles = createStyles((theme) => ({
    sidebar: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    },
    footer: {
        padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
        marginTop: theme.spacing.md,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    },
}));


export default function Articles() {
    const { classes } = useStyles();
    const { search, setSearch, city, setCity, categories, setCategories, selectedCategory, setSelectedCategory, isLoading, setIsLoading, articles, setArticles, HandleSearchByName, HandleSearchByCity, HandleSearchByCategory } = useArticles();

    return (
        <Layout>
            <AppShell
                navbar={
                    <Container className={classes.sidebar}>
                        <TextInput
                            icon={<Search size={18} />}
                            radius="xl"
                            size="md"
                            rightSection={
                                <ActionIcon size={32} radius="xl" color={'blue'} variant="filled">
                                    <ArrowRight size={18} />
                                </ActionIcon>
                            }
                            placeholder="Search by name"
                            rightSectionWidth={42}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') HandleSearchByName();
                            }}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />

                        <Select
                            label="City"
                            placeholder="City"
                            data={Object.values(City).map(city => { return { value: city, label: city }; })}
                            value={city}
                            onChange={(city: string) => {
                                setCity(city);
                                HandleSearchByCity(city);
                            }}
                            style={{ marginTop: 10 }}
                        />

                        <Select
                            label="Category"
                            placeholder="Category"
                            data={categories.map(category => { return { value: category._id, label: category.name }; })}
                            value={selectedCategory}
                            onChange={(cat: string) => {
                                setSelectedCategory(cat);
                                HandleSearchByCategory(cat);
                            }}
                            style={{ marginTop: 10 }}
                        />
                    </Container>
                }
            >
                <ScrollArea style={{ height: window.innerHeight - 150 }}>
                    <Container size={'xl'} style={{ width: '100%' }} >
                        <SimpleGrid
                            cols={3}
                            spacing="lg"
                            breakpoints={[{ maxWidth: 600, cols: 1 }, { maxWidth: 1000, cols: 2 }]}
                        >
                            {
                                articles.map((article: ArticleDto) =>
                                    <UnstyledButton key={article._id} maw={400}>
                                        <Card withBorder shadow='md' radius='md' p='lg'>
                                            <Card.Section>
                                                <Carousel slideSize="100%" height={'100%'} slideGap="md" loop withIndicators>
                                                    {
                                                        article.images.map((image, index) => (
                                                            <Carousel.Slide key={index}>
                                                                <Image
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
                </ScrollArea>
            </AppShell>
        </Layout>
    );
}
