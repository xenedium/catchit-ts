import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HttpStatusCode, type ServerJsonResponse } from '../@types';
import axios from 'axios';
import Cookies from 'js-cookie';

export const useLogin = () => {
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

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
        const token = Cookies.get('catchit-token');
        if (token) navigate(-1);
        else setLoading(false);
    }, [navigate]);

    return {
        loading,
        errorMessages,
        email,
        password,
        setEmail,
        setPassword,
        HandleLogin,
        navigate,
    };
};