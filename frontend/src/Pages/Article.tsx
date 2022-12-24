import { Layout } from '../Components/Others/Layout';
import { Container, Image, Title, createStyles, Text, Badge, Button, Modal, Dialog, LoadingOverlay } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { Check, Heart, Pencil, UserCircle } from 'tabler-icons-react';
import { useArticle } from '../Hooks/useArticle';
import { Carousel } from '@mantine/carousel';


const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '6rem',
        marginBottom: '10rem',
        flexDirection: 'row',
        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column'
        }
    }
}));

export default function ArticlePage() {
    const { classes } = useStyles();
    const { loading, article, isModalOpen, isDialogOpen, isArticleOwner, setIsModalOpen, setIsDialogOpen } = useArticle();
    const [favorites, setFavorites] = useLocalStorage<string[]>({
        key: 'favorites',
        defaultValue: [],
        deserialize: (value) => {
            try {
                return JSON.parse(value);
            }
            catch (e) {
                localStorage.removeItem('favorites');
                return [];
            }
        },
    });

    return (
        <Layout>
            <LoadingOverlay visible={loading} />
            {
                !loading && article &&
                <Container style={{ marginTop: 40, marginBottom: 40 }}>
                    <Container className={classes.container}>
                        <Container>
                            <Carousel slideSize="100%" height={'100%'} slideGap="md" loop withIndicators>
                                {
                                    article.images.map((image, index) => (
                                        <Carousel.Slide key={index}>
                                            <Image
                                                src={image}
                                            />
                                        </Carousel.Slide>
                                    ))
                                }
                            </Carousel>
                        </Container>
                        <Container style={{ maxWidth: 360 }}>
                            <Title order={2} >
                                {article.title}
                            </Title>
                            <Text style={{ marginTop: 20, width: 140 }} weight={600} >
                                Condition: <Badge variant='filled' color={article.condition === 'New' ? 'cyan' : 'red'} >{article.condition}</Badge>
                            </Text>
                            <Text style={{ marginTop: 10 }} weight={600} >
                                Price: <Badge variant='filled' color={'orange'} >{article.price}</Badge>
                            </Text>
                            <Text style={{ marginTop: 10 }} weight={600} >
                                Quantity: <Badge variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }} >{article.quantity}</Badge>
                            </Text>
                            <Text style={{ marginTop: 10 }} weight={600} >
                                City: <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} >{article.city}</Badge>
                            </Text>
                            <Text style={{ marginTop: 10 }} weight={600} >
                                Description:
                            </Text>
                            <Text style={{ marginTop: 10 }} weight={400} >
                                {article.description}
                            </Text>
                            <Container style={{ marginTop: 30 }} >
                                {
                                    isArticleOwner &&
                                    <Button
                                        fullWidth
                                        color={'red'}
                                        onClick={() => { }}
                                        leftIcon={<Check />}
                                    >
                                        {article.isSold ? 'Mark as available' : 'Mark as sold'}
                                    </Button>
                                }
                                {
                                    isArticleOwner &&
                                    <Button
                                        leftIcon={<Pencil />}
                                        style={{ marginTop: 10 }}
                                        fullWidth
                                        color={'red'}
                                        onClick={() => { }}
                                    >
                                        Edit article
                                    </Button>
                                }
                                <Button
                                    style={{ marginTop: 10 }}
                                    fullWidth
                                    variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
                                    onClick={() => setIsModalOpen(true)}
                                    leftIcon={<UserCircle />}
                                >
                                    Contact seller
                                </Button>
                                <Button
                                    style={{ marginTop: 10 }}
                                    fullWidth
                                    color={'red'}
                                    onClick={() => {
                                        setFavorites([...favorites, article._id]);
                                        setIsDialogOpen(true);
                                    }}
                                    leftIcon={<Heart />}
                                >
                                    Add to favorites
                                </Button>
                                <Modal
                                    opened={isModalOpen}
                                    onClose={() => setIsModalOpen(false)}
                                    title={'Contact seller'}
                                >
                                    <Container>
                                        <Image
                                            src={article.seller.image}
                                            radius='xl'
                                        />
                                        <Text>
                                            <Text weight={700}>Name: </Text>{article.seller.firstName} {article.seller.lastName}
                                        </Text>
                                        <Text>
                                            <Text weight={700}>Phone number: </Text>{article.seller.phoneNumber}
                                        </Text>
                                        <Text>
                                            <Text weight={700}>Email: </Text>{article.seller.email}
                                        </Text>
                                        <Text>
                                            <Text weight={700}>City: </Text>{article.seller.city}
                                        </Text>
                                    </Container>
                                </Modal>
                                <Dialog
                                    opened={isDialogOpen}
                                    onClose={() => setIsDialogOpen(false)}
                                    withCloseButton
                                    size={'xl'}
                                >
                                    <Heart /> Article {article.title} added to favorites !
                                </Dialog>
                            </Container>
                        </Container>
                    </Container>
                </Container>
            }
        </Layout>
    );
}
