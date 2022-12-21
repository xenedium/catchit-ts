/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArticleDto, CategoryDto, HttpStatusCode, ServerJsonResponse } from '../@types';

export const useArticles = () => {

    const navigate = useNavigate();
    const [search, setSearch] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [articles, setArticles] = useState<ArticleDto[]>([]);

    const HandleSearchByName = () => {

    };

    const HandleSearchByCity = (city: string) => {

    };

    const HandleSearchByCategory = (category: string) => {

    };

    useEffect(() => {
        (async () => {
            const { data: categoryData } = await axios.get<ServerJsonResponse>('/api/category', { validateStatus: () => true });
            if (categoryData.statusCode !== HttpStatusCode.OK) return navigate('/FourOhFour');
            setCategories(categoryData.docs as CategoryDto[]);
            const { data: articleData } = await axios.get<ServerJsonResponse>('/api/article', { validateStatus: () => true });
            setArticles(articleData.docs as ArticleDto[]);
            setIsLoading(false);
        })();
    }, []);



    return {
        search,
        setSearch,
        city,
        setCity,
        categories,
        setCategories,
        selectedCategory,
        setSelectedCategory,
        isLoading,
        setIsLoading,
        articles,
        setArticles,
        HandleSearchByName,
        HandleSearchByCity,
        HandleSearchByCategory,
    };
};

