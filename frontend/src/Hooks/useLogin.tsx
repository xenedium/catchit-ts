import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HttpStatusCode, type ServerJsonResponse } from '../@types';
import axios from 'axios';
import { useFetchUserData } from './useFetchUserData';

export const useLogin = () => {
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { userData, loading } = useFetchUserData();

    const HandleLogin = async () => {
        const { data } = await axios.post<ServerJsonResponse>('/api/auth/login',
            { email, password },
            { validateStatus: () => true, withCredentials: true }
        );
        if (data.statusCode === HttpStatusCode.OK) navigate(-1);
        else {
            setErrorMessages(data.errors ?? []);
            setTimeout(() => setErrorMessages([]), 3000);
        }
    };

    useEffect(() => {
        if (userData) navigate(-1);
    }, [navigate, loading]);

    return {
        errorMessages,
        email,
        password,
        setEmail,
        setPassword,
        HandleLogin,
        navigate,
        loading
    };
};