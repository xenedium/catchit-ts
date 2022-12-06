import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HttpStatusCode, ServerJsonResponse } from '../@types';
import PublicUrl from '../Config';

export const useLogin = () => {
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const HandleLogin = () => {
        fetch(`${PublicUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then(res => res.json())
            .then((res: ServerJsonResponse) => {
                if (res.statusCode === HttpStatusCode.OK) {
                    navigate(-1);
                }
                setErrorMessages(res.errors || []);
            });
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);

    return {
        errorMessages,
        email,
        password,
        setEmail,
        setPassword,
        HandleLogin,
        navigate
    };
};