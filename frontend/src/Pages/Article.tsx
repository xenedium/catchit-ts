import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Layout } from '../Components/Others/Layout';
import { FullLoader } from '../Components/Others/FullLoader';
import decode from 'jwt-decode';
import { Container, Image, Title, createStyles, Text, Badge, Button, Modal, Dialog } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { Check, Heart, Pencil, UserCircle } from 'tabler-icons-react';
import { NothingFoundType } from '../@types/props';
import { NothingFound } from '../Components/Others/NothingFound';

// "A future is not given to you. It is something you must take for yourself."
// POD 042 @ Ending E.

interface Article {
    id: number;
    title: string;
    description: string;
    category: number;
    seller: number;
    condition: string;
    price: string;
    quantity: number;
    is_sold: boolean;
    city: string;
    image: string;
}

interface Seller {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone_number: string;
    city: string;
    image: string;
}

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
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [article, setArticle] = useState<Article>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [isCurrentUserOwner, setIsCurrentUserOwner] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { classes } = useStyles();
    const [seller, setSeller] = useState<Seller>();
    const [favorites, setFavorites] = useLocalStorage<number[]>({
        key: 'favorites',
        defaultValue: []
    });
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const HandleMarkAsSold = () => {
        fetch('/api/articles/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                id: article?.id,
                isSold: !article?.is_sold
            })
        })
            .then(() => window.location.reload());
    };

    const HandleAddToFavorite = () => {
        if (article) if (!favorites.includes(article.id)) setFavorites([...favorites, article.id]);
        setIsDialogOpen(true);
    };

    const HandleBuy = () => {
        if (!seller) {
            fetch(`/api/users/?id=${article?.seller}`)
                .then(res => res.json())
                .then(res => setSeller(res.data[0]));
        }

        setIsModalOpen(true);
    };

    const HandleEditArticle = () => {
        navigate(`/edit-article/?id=${article?.id}`);
    };

    useEffect(() => {
        fetch(`/api/articles/?id=${searchParams.get('id')}`, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then((res) => {
                setIsLoading(false);
                if (res.status === undefined || res.status === 404) {
                    setIsError(true);
                    return;
                }
                if (localStorage.getItem('token') !== null) {   // Check if the current user is the owner of the article
                    const token: string = localStorage.getItem('token')?.split(' ')[1] ?? '';
                    if (token !== '') {
                        const decoded: any = decode(token);
                        if (decoded.id === (res.data as Article[])[0].seller) {
                            setIsCurrentUserOwner(true);
                        }
                    }
                }

                setArticle(res.data[0]);
            });
    }, [navigate, searchParams]);


    return (
        <Layout>
            <Container style={{ marginTop: 40, marginBottom: 40 }}>
                {isLoading ? <FullLoader /> :                                           // Loading spinner if the article is not yet loaded
                    isError ? <NothingFound type={NothingFoundType.NotFound} /> :       // Error message if the article is not found
                        !article ? <FullLoader /> :                                     // Avoiding error message if the article is not yet loaded
                            <Container className={classes.container}>
                                <Container>
                                    <Image
                                        src={article.image ? `https://catchit.fra1.digitaloceanspaces.com/${article.image.split('/')[3]}/${article.image.split('/')[4]}` : 'https://catchit.fra1.digitaloceanspaces.com/assets/no_image.png'}
                                        alt={article.title}
                                    />
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
                                            isCurrentUserOwner ?
                                                <Button
                                                    fullWidth
                                                    color={'red'}
                                                    onClick={HandleMarkAsSold}
                                                    leftIcon={<Check />}
                                                >
                                                    {article.is_sold ? 'Mark as available' : 'Mark as sold'}
                                                </Button>
                                                : null
                                        }
                                        {
                                            isCurrentUserOwner ?
                                                <Button
                                                    leftIcon={<Pencil />}
                                                    style={{ marginTop: 10 }}
                                                    fullWidth
                                                    color={'red'}
                                                    onClick={HandleEditArticle}
                                                >
                                                    Edit article
                                                </Button>
                                                : null
                                        }
                                        <Button
                                            style={{ marginTop: 10 }}
                                            fullWidth
                                            variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
                                            onClick={HandleBuy}
                                            leftIcon={<UserCircle />}
                                        >
                                            Contact seller
                                        </Button>
                                        <Button
                                            style={{ marginTop: 10 }}
                                            fullWidth
                                            color={'red'}
                                            onClick={HandleAddToFavorite}
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
                                                    src={seller?.image ?
                                                        `https://catchit.fra1.digitaloceanspaces.com/${seller?.image.split('/')[3]}/${seller?.image.split('/')[4]}` :
                                                        'https://catchit.fra1.digitaloceanspaces.com/assets/not_signed_in.png'}
                                                />
                                                <Text>
                                                    <Text weight={700}>Name: </Text>{seller?.firstname} {seller?.lastname}
                                                </Text>
                                                <Text>
                                                    <Text weight={700}>Phone number: </Text>{seller?.phone_number}
                                                </Text>
                                                <Text>
                                                    <Text weight={700}>Email: </Text>{seller?.email}
                                                </Text>
                                                <Text>
                                                    <Text weight={700}>City: </Text>{seller?.city}
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
                }
            </Container>
        </Layout>
    );
}
