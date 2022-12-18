/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { ArticleDto, HttpStatusCode, ServerJsonResponse } from '../@types';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useMyArticles = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState<ArticleDto[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const sold = useSearchParams()[0].get('sold') === 'true';

    useEffect(() => {
        const GetArticles = async () => {
            const { data } = await axios.get<ServerJsonResponse>(`/api/article/me?sold=${sold}`, { withCredentials: true, validateStatus: () => true });
            if (data.statusCode !== HttpStatusCode.OK) return navigate('/login');
            setArticles(data.docs as ArticleDto[]);
            setIsLoading(false);
        };
        GetArticles();
    }, [sold]);

    return {
        articles,
        isLoading,
        sold
    };
};