import React, { useEffect, useState } from 'react';
import { Layout } from '../Components/Others/Layout';
import { createStyles, TextInput, ActionIcon, Select, Container, Grid } from '@mantine/core';
import { Search, ArrowRight } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';
import { ArticleCard } from '../Components/Others/Card';
import { FullLoader } from '../Components/Others/FullLoader';

interface Category {
    id: number;
    name: string;
    image: string | null;
}

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

const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'start',
        marginTop: '6rem',
        marginBottom: '10rem',
        flexDirection: 'row',
        alignContent: 'start',
        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column'
        }

    }
}));



export default function Articles() {

    const { classes } = useStyles();
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>('');
    const [city, setCity] = useState<string>('Casablanca');
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState<number | null>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [articles, setArticles] = useState<Article[]>([]);



    useEffect(() => {
        fetch('/api/categories/')
            .then(res => res.json())
            .then(res => {
                setCategories(res);
            });
        fetch('/api/articles/?city=Casablanca')
            .then(res => res.json())
            .then(res => {
                if (res.status !== 200) {
                    setIsLoading(false);
                    setArticles([]);
                    return;
                }
                setArticles(res.data);
                setIsLoading(false);
            });
    }, [navigate]);


    const HandleSearchByName = () => {
        setIsLoading(true);
        fetch(`/api/articles/?title=${search}`)
            .then(res => res.json())
            .then(res => {
                setCategory(0);
                setCity('');
                if (res.status !== 200) {
                    setIsLoading(false);
                    setArticles([]);
                    return;
                }
                setArticles(res.data);
                setIsLoading(false);
            });
    };

    const HandleSearchByCity = (city: string) => {
        setIsLoading(true);
        fetch(`/api/articles/?city=${city}`)
            .then(res => res.json())
            .then(res => {
                setSearch('');
                setCategory(null);
                if (res.status !== 200) {
                    setIsLoading(false);
                    setArticles([]);
                    return;
                }
                setArticles(res.data);
                setIsLoading(false);
            });
    };

    const HandleSearchByCategory = (category: number) => {
        setIsLoading(true);
        fetch(`/api/articles/?category_id=${category}`)
            .then(res => res.json())
            .then(res => {
                setSearch('');
                setCity('');
                if (res.status !== 200) {
                    setIsLoading(false);
                    setArticles([]);
                    return;
                }
                setArticles(res.data);
                setIsLoading(false);
            });
    };


    return (
        <Layout>

            <Container className={classes.container} size="xl">

                <Container>
                    <TextInput
                        icon={<Search size={18} />}
                        radius="xl"
                        size="md"
                        rightSection={
                            <ActionIcon size={32} radius="xl" color={'blue'} variant="filled">
                                {<ArrowRight size={18} />}
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
                        data={[
                            { value: 'Casablanca', label: 'Casablanca' },
                            { value: 'Rabat', label: 'Rabat' },
                            { value: 'Fes', label: 'Fes' },
                            { value: 'Tanger', label: 'Tanger' },
                            { value: 'Oujda', label: 'Oujda' },
                            { value: 'Agadir', label: 'Agadir' },
                            { value: 'Tetouan', label: 'Tetouan' },
                            { value: 'Meknes', label: 'Meknes' },
                            { value: 'Safi', label: 'Safi' },
                            { value: 'El Jadida', label: 'El Jadida' },
                            { value: 'Khouribga', label: 'Khouribga' },
                            { value: 'Ouarzazate', label: 'Ouarzazate' },
                            { value: 'Settat', label: 'Settat' },
                            { value: 'Sidi Kacem', label: 'Sidi Kacem' },
                            { value: 'Kenitra', label: 'Kenitra' },
                            { value: 'Taza', label: 'Taza' },
                            { value: 'Tiznit', label: 'Tiznit' },
                            { value: 'Sidi Ifni', label: 'Sidi Ifni' },
                        ]}
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
                        data={categories.map(category => { return { value: category.id as unknown as string, label: category.name }; })}
                        value={category as unknown as string}
                        onChange={(cat: string) => {
                            setCategory(cat as unknown as number);
                            HandleSearchByCategory(cat as unknown as number);
                        }}
                        style={{ marginTop: 10 }}
                    />
                </Container>
                <Container size={'xl'} style={{width: '100%'}} >
                    <Grid style={{marginTop: 20}}>
                        {isLoading ? <FullLoader /> :
                            articles.map(article => (
                                <Grid.Col xl={4}>
                                    <ArticleCard {...{
                                        id: article.id,
                                        image: article.image ? `https://catchit.fra1.digitaloceanspaces.com/${article.image.split('/')[3]}/${article.image.split('/')[4]}` : 'https://catchit.fra1.digitaloceanspaces.com/assets/no_image.png',
                                        title: article.title,
                                        link: '/article/?id=' + article.id,
                                        author: {
                                            name: '',
                                            description: '',
                                            image: ''
                                        }
                                    }}

                                    />
                                </Grid.Col>
                            ))
                        }
                    </Grid>
                </Container>
            </Container>
        </Layout>
    );
}
