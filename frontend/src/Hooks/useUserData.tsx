import { useEffect, useState } from 'react';
import { HttpStatusCode, ServerJsonResponse, UserDto } from '../@types';
import axios from 'axios';
import Cookies from 'js-cookie';

export const useUserData = () => {
    const [userData, setUserData] = useState<UserDto | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchUserData = async () => {
            const { data } = await axios.get<ServerJsonResponse>('/api/user/me',
                { validateStatus: () => true, withCredentials: true }
            );
            if (data.statusCode !== 200) Cookies.remove('catchit-token');
            setUserData(data.user);
            setLoading(false);
        };
        if (Cookies.get('catchit-token')) fetchUserData();
        else setLoading(false);
    }, []);

    const updateUserData = async () => {
        const { data: response } = await axios.put<ServerJsonResponse>('/api/user',
            {
                firstName: userData?.firstName,
                lastName: userData?.lastName,
                city: userData?.city,
            },
            { validateStatus: () => true, withCredentials: true }
        );
        if (response.statusCode === HttpStatusCode.OK) window.location.reload();
        else setError(response.message);
    };
    const updatePassword = async (oldPassword: string, newPassword: string, newPasswordConfirm: string) => {
        if (newPassword !== newPasswordConfirm) return;
        const { data: response } = await axios.put<ServerJsonResponse>('/api/user',
            {
                oldPassword,
                newPassword
            },
            { validateStatus: () => true, withCredentials: true }
        );
        if (response.statusCode === HttpStatusCode.OK) window.location.reload();
        else setError(response.message);
    };
    const updateImage = async (image: File) => {
        const formData = new FormData();
        formData.append('image', image);
        const { data: response } = await axios.put<ServerJsonResponse>('/api/user',
            formData,
            { validateStatus: () => true, withCredentials: true }
        );
        if (response.statusCode === HttpStatusCode.OK) window.location.reload();
        else setError(response.message);
    };

    return { userData, loading, setUserData, updateUserData, updatePassword, updateImage, error, setError };
};