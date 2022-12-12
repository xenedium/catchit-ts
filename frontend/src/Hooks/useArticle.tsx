import { useState, useEffect } from 'react';
import { ArticleDto, ServerJsonResponse, HttpStatusCode } from '../@types';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import decode from 'jwt-decode';

export const useArticle = () => {
    const [article, setArticle] = useState<ArticleDto>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isArticleOwner, setIsArticleOwner] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const GetArticle = async () => {
            const { data } = await axios.get<ServerJsonResponse>(`/api/article/${id}`, { withCredentials: true, validateStatus: () => true});
            if (data.statusCode === HttpStatusCode.NOT_FOUND) return navigate('/FourOhFour');
            const token = Cookies.get('catchit-token');
            if (token) setIsArticleOwner((decode(token) as any).id === data.doc.seller._id);
            setArticle(data.doc);
            setLoading(false);
        };
        GetArticle();
    }
    , [id]);

    const HandleMarkAsSold = async () => {
        const { data } = await axios.put<ServerJsonResponse>(`/api/article/${id}`, { isSold: !article?.isSold }, { withCredentials: true, validateStatus: () => true });
        if (data.statusCode !== HttpStatusCode.NO_CONTENT) return navigate('/FourOhFour');
        window.location.reload();
    };

    const HandleEditArticle = () => {
        navigate(`/edit-article/${article?._id}`);
    };


    return {
        article,
        loading,
        isModalOpen,
        isDialogOpen,
        isArticleOwner,
        setIsDialogOpen,
        setIsModalOpen,
        HandleMarkAsSold,
        HandleEditArticle
    };
};