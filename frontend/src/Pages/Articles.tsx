import { Layout } from '../Components/Others/Layout';
import {
    createStyles,
    TextInput,
    Select,
    Container,
    AppShell,
    UnstyledButton,
    Card,
    Group,
    Image, Title,
    Text,
    Avatar,
    Badge,
    ScrollArea,
    SimpleGrid,
    MediaQuery,
    Button,
    LoadingOverlay
} from '@mantine/core';
import { Search, X } from 'tabler-icons-react';
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
    const {
        isLoading,
        search,
        selectedCity,
        selectedCategory,
        setSearch,
        setSelectedCity,
        setSelectedCategory,
        articles,
        categories,
        HandleSearch,
        HandleLoadMore,
        hasNextPage
    } = useArticles();

    return (
        <Layout hideFooter>
            <LoadingOverlay visible={isLoading} />
            <AppShell
                navbar={
                    <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
                        <Container className={classes.sidebar}>
                            <TextInput
                                icon={<Search size={18} />}
                                radius="xl"
                                size="md"
                                placeholder="Search by name"
                                rightSectionWidth={42}
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                            />

                            <Select
                                label="City"
                                placeholder="City"
                                data={Object.values(City).map(city => { return { value: city, label: city }; })}
                                value={selectedCity}
                                onChange={(city: string) => {
                                    setSelectedCity(city);
                                }}
                                mt='md'
                            />

                            <Select
                                label="Category"
                                placeholder="Category"
                                data={categories.map(category => { return { value: category._id, label: category.name }; })}
                                value={selectedCategory}
                                onChange={(cat: string) => {
                                    setSelectedCategory(cat);
                                }}
                                mt='md'
                            />
                            <Button
                                fullWidth
                                variant="outline"
                                color="teal"
                                mt='xl'
                                onClick={HandleSearch}
                                leftIcon={<Search size={18} />}
                            >
                                Search
                            </Button>
                            <Button
                                fullWidth
                                variant='outline'
                                color='red'
                                mt='xl'
                                onClick={() => document.location.reload()}
                                leftIcon={<X size={18} />}
                            >
                                Reset
                            </Button>
                        </Container>
                    </MediaQuery>
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
                                    <UnstyledButton key={article._id} maw={400} mah={600} mt='xl' mb='xl'>
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
                                                <Text size="sm" color="dimmed" mt='md' lineClamp={3}>
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
                        <Button
                            fullWidth
                            variant="outline"
                            color="teal"
                            mt='xl'
                            onClick={HandleLoadMore}
                            leftIcon={<Search size={18} />}
                            disabled={!hasNextPage}
                        >
                            Load More
                        </Button>
                    </Container>
                </ScrollArea>
            </AppShell>
        </Layout>
    );
}
