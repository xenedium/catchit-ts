/* eslint-disable no-unreachable */
import { useState, useEffect } from 'react';
import { ServerJsonResponse, HttpStatusCode, CategoryDto, City } from '../@types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useAddArticle = () => {

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<CategoryDto>();
    const [condition, setCondition] = useState<string>('New');
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [city, setCity] = useState<City>();
    const [images, setImages] = useState<File[]>([]);

    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const GetCategories = async () => {
            const { data } = await axios.get<ServerJsonResponse>('/api/category', { validateStatus: () => true });
            if (data.statusCode !== HttpStatusCode.OK) return navigate('/FourOhFour');
            setCategories(data.docs as CategoryDto[]);
            setLoading(false);
        };
        GetCategories();
    }
    , []);

    const HandleUpload = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category?._id as string);
        formData.append('condition', condition);
        formData.append('price', price as unknown as string );
        formData.append('quantity', quantity as unknown as string);
        formData.append('city', city as string);
        if (images.length > 0) for (let i = 0; i < images.length; i++) formData.append('images', images[i]);

        const { data } = await axios.post<ServerJsonResponse>('/api/article', formData, { withCredentials: true, validateStatus: () => true });
        if (data.statusCode !== HttpStatusCode.CREATED) {
            setError(true);
            setModalMessage('❌ Validation error!');
            setTimeout(() => {
                setError(false);
                setModalMessage('');
            }, 2500);
        }
        else {
            navigate('/article/' + data.doc?._id);
        }
    };

    return {
        title,
        setTitle,
        description,
        setDescription,
        category,
        setCategory,
        condition,
        setCondition,
        price,
        setPrice,
        quantity,
        setQuantity,
        city,
        setCity,
        loading,
        categories,
        images,
        setImages,
        HandleUpload,
        error,
        modalMessage,
        setModalMessage,
        setError
    };
};