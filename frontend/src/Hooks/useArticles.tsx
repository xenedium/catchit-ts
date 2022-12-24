import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArticleDto, CategoryDto, HttpStatusCode, ServerJsonResponse } from '../@types';

export const useArticles = () => {

    const navigate = useNavigate();
    const [search, setSearch] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [articles, setArticles] = useState<ArticleDto[]>([]);
    const [categories, setCategories] = useState<CategoryDto[]>([]);

    const HandleSearch = async () => {
        setIsLoading(true);
        const { data: articleData } = await axios.get<ServerJsonResponse>(`/api/article?city=${selectedCity}&category=${selectedCategory}&search=${search}`, { validateStatus: () => true });
        setHasNextPage(articleData.hasNextPage as boolean);
        setArticles(articleData.docs as ArticleDto[]);
        setPage(articleData.page as number);
        setIsLoading(false);
    };

    const HandleLoadMore = async () => {
        setIsLoading(true);
        const { data: articleData } = await axios.get<ServerJsonResponse>(`/api/article?city=${selectedCity}&category=${selectedCategory}&page=${page + 1}`, { validateStatus: () => true });
        setHasNextPage(articleData.hasNextPage as boolean);
        setArticles([...articles, ...articleData.docs as ArticleDto[]]);
        setPage(page + 1);
        setIsLoading(false);
    };

    useEffect(() => {
        (async () => {
            const { data: categoryData } = await axios.get<ServerJsonResponse>('/api/category', { validateStatus: () => true });
            if (categoryData.statusCode !== HttpStatusCode.OK) return navigate('/FourOhFour');
            setCategories(categoryData.docs as CategoryDto[]);
            const { data: articleData } = await axios.get<ServerJsonResponse>('/api/article', { validateStatus: () => true });
            setHasNextPage(articleData.hasNextPage as boolean);
            setArticles(articleData.docs as ArticleDto[]);
            setIsLoading(false);
        })();
    }, []);



    return {
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
    };
};

