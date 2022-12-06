import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { Layout } from '../Components/Others/Layout';
import { FullLoader } from '../Components/Others/FullLoader';
import { ArticleCard } from '../Components/Others/Card';
import { Container, Grid, Title } from '@mantine/core';
import { NothingFoundType } from '../@types/props';
import { NothingFound } from '../Components/Others/NothingFound';


// “We’re all living in each other’s paranoia.”
// — Elliot Alderson, Mr. Robot, Mr. Robot Season 1: eps1.7_wh1ter0se.m4v

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


export default function Favorites() {
    const [favorites] = useLocalStorage<number[]>({
        key: 'favorites',
        defaultValue: []
    });

    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        Promise.all(
            favorites.map(id =>
                fetch(`/api/articles/?id=${id}`)
                    .then(res => res.json())))
            .then(res => {
                setArticles(res.filter(article =>
                    article.status === 200).map(article =>
                    article.data[0]));
                setIsLoading(false);
            });
    }, [favorites]);

    return (
        <Layout>
            {
                isLoading ? <FullLoader /> :
                    articles.length === 0 ? <NothingFound type={NothingFoundType.NoFavorites} /> :
                        <Container style={{ marginTop: 20 }}>
                            <Title style={{marginBottom: 40}} >My favorite articles: </Title>
                            <Grid>
                                {
                                    articles.map(article =>
                                        <Grid.Col xs={4}>
                                            <ArticleCard
                                                {...{
                                                    id: article.id,
                                                    title: article.title,
                                                    image: article.image ? `https://catchit.fra1.digitaloceanspaces.com/${article.image.split('/')[3]}/${article.image.split('/')[4]}` : 'https://catchit.fra1.digitaloceanspaces.com/assets/no_image.png',
                                                    link: `/article/?id=${article.id}`,
                                                    author: {
                                                        name: '',
                                                        description: '',
                                                        image: ''
                                                    }

                                                }}
                                            />
                                        </Grid.Col>
                                    )
                                }
                            </Grid>
                        </Container>
            }
        </Layout>
    );
}
