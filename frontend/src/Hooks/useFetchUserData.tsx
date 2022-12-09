import { useEffect, useState } from 'react';
import type { ServerJsonResponse, UserDto } from '../@types';
import axios from 'axios';
import Cookies from 'js-cookie';

export const useFetchUserData = () => {
    const [userData, setUserData] = useState<UserDto | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

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

    return { userData, loading };
};