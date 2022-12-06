import React, { useEffect, useState } from 'react';
import { Layout } from '../Components/Others/Layout';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Title } from '@mantine/core';
import { ArticleCard } from '../Components/Others/Card';
import { FullLoader } from '../Components/Others/FullLoader';
import { NothingFoundType } from '../@types/props';
import { NothingFound } from '../Components/Others/NothingFound';

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


export default function MyArticles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token: string | undefined = localStorage.getItem('token')?.split(' ')[1];

        if (!token) navigate('/login');

        fetch('/api/validate-jwt', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status !== 200) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
                else {
                    setName(res.payload.firstname);
                    setEmail(res.payload.email);
                    setImage(`https://catchit.fra1.digitaloceanspaces.com${res.payload.image}`);
                    fetch(`/api/articles/?seller=${res.payload.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(res => res.json())
                        .then(res => {
                            if (res.status === 404)
                            {
                                setIsLoading(false);
                                setArticles([]);
                                return;
                            }
                            setArticles(res.data.filter((article: Article) => (searchParams.get('sold') === 'true' ? article.is_sold : !article.is_sold)));
                            setIsLoading(false);
                        });
                }
            });
    }, [navigate, searchParams]);

    return (
        <Layout>
            <Container style={{ marginTop: 40 }}>
                <Title style={{marginBottom: 40}} >My {searchParams.get('sold') === 'true' ? 'sold' : 'listed'} articles: </Title>
                <Grid>
                    {!isLoading ?
                        articles.length > 0 ? articles.map(article =>
                            (
                                <Grid.Col xs={4}>
                                    <ArticleCard {...{
                                        id: article.id,
                                        image: article.image ? `https://catchit.fra1.digitaloceanspaces.com/${article.image.split('/')[3]}/${article.image.split('/')[4]}` : 'https://catchit.fra1.digitaloceanspaces.com/assets/no_image.png',
                                        title: article.title,
                                        link: '/article/?id=' + article.id,
                                        author: {
                                            name: name,
                                            description: email,
                                            image: image
                                        }

                                    }} />
                                </Grid.Col>
                            ))
                            : <NothingFound type={NothingFoundType.NoArticles} />          // No articles found
                        : <FullLoader />                // Loading
                    }
                </Grid>
            </Container>
        </Layout>
    );
}
