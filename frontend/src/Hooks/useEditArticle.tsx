import { useState, useEffect } from 'react';
import { ArticleDto, ServerJsonResponse, HttpStatusCode, CategoryDto } from '../@types';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import decode from 'jwt-decode';

export const useEditArticle = () => {
    const [article, setArticle] = useState<ArticleDto>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [images, setImages] = useState<File[]>([]);

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const GetArticle = async () => {
            const { data: categoryData } = await axios.get<ServerJsonResponse>('/api/category', { validateStatus: () => true });
            if (categoryData.statusCode !== HttpStatusCode.OK) return navigate('/FourOhFour');
            setCategories(categoryData.docs as CategoryDto[]);
            const { data: articleData } = await axios.get<ServerJsonResponse>(`/api/article/${id}`, { withCredentials: true, validateStatus: () => true});
            if (articleData.statusCode === HttpStatusCode.NOT_FOUND) return navigate('/FourOhFour');
            const token = Cookies.get('catchit-token');
            if (token && (decode(token) as any).id !== articleData.doc.seller._id) return navigate('/FourOhFour');
            setArticle(articleData.doc);
            setLoading(false);
        };
        GetArticle();
    }
    , [id]);

    const HandleUpload = async () => {
        if (!article) return;
        const formData = new FormData();
        formData.append('title', article.title);
        formData.append('description', article.description);
        formData.append('category', article.category._id);
        formData.append('condition', article.condition);
        formData.append('price', article.price as unknown as string );
        formData.append('quantity', article.quantity as unknown as string);
        formData.append('city', article.city);
        formData.append('isSold', article.isSold as unknown as string);
        if (images.length > 0) for (let i = 0; i < images.length; i++) formData.append('images', images[i]);

        const { data } = await axios.put<ServerJsonResponse>(`/api/article/${id}`, formData, { withCredentials: true, validateStatus: () => true });
        if (data.statusCode !== HttpStatusCode.OK) {
            setError(true);
            setModalMessage('❌ An error occured');
            setTimeout(() => setModalMessage(''), 2500);
        }
        else {
            setArticle(data.doc);
            setModalMessage('✅ Article updated successfully');
            setTimeout(() => setModalMessage(''), 2500);
        }
    };



    return {
        article,
        loading,
        categories,
        error,
        modalMessage,
        images,
        setArticle,
        setError,
        HandleUpload,
        setImages,
        setModalMessage
    };
};