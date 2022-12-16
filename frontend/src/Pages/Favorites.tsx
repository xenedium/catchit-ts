/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { Layout } from '../Components/Others/Layout';
import { ArticleCard } from '../Components/Others/Card';
import { Container, Grid, LoadingOverlay, Title } from '@mantine/core';
import { NothingFoundType } from '../@types/props';
import { NothingFound } from '../Components/Others/NothingFound';
import { ArticleDto, ServerJsonResponse } from '../@types';
import axios from 'axios';


// “We’re all living in each other’s paranoia.”
// — Elliot Alderson, Mr. Robot, Mr. Robot Season 1: eps1.7_wh1ter0se.m4v


// TODO: Switch the cards component

export default function Favorites() {
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
            { /* XOR op */ }
            <LoadingOverlay visible={isLoading !== (articles.length === 0)} />
            {
                articles.length === 0 ? <NothingFound type={NothingFoundType.NoFavorites} /> :
                    <Container style={{ marginTop: 20 }}>
                        <Title style={{ marginBottom: 40 }} >My favorite articles: </Title>
                        <Grid>
                            {
                                articles.map(articles =>
                                    <Grid.Col xs={4}>

                                    </Grid.Col>
                                )
                            }
                        </Grid>
                    </Container>
            }
        </Layout>
    );
}
