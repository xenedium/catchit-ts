import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { City, HttpStatusCode, type ServerJsonResponse } from '../@types';
import axios from 'axios';
import Cookies from 'js-cookie';

export const useRegister = () => {
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [city, setCity] = useState<City>(City.Casablanca);
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const HandleRegister = async () => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('phoneNumber', phoneNumber);
        formData.append('city', city);
        if (image) formData.append('image', image);

        const { data } = await axios.post<ServerJsonResponse>('/api/auth/register',
            formData,
            { validateStatus: () => true, withCredentials: true }
        );
        if (data.statusCode === HttpStatusCode.CREATED) navigate(-1);
        else {
            setErrorMessages(data.errors ?? []);
            setTimeout(() => setErrorMessages([]), 3000);
        }
    };

    useEffect(() => {
        const token = Cookies.get('catchit-token');
        if (token) navigate(-1);
        else setLoading(false);
    }, [navigate]);

    return {
        loading,
        errorMessages,
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        city,
        image,
        setEmail,
        setPassword,
        setFirstName,
        setLastName,
        setPhoneNumber,
        setCity,
        HandleRegister,
        setImage,
        navigate,
    };
};