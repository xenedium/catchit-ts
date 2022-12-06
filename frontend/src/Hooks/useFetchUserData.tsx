import { useEffect, useState } from 'react';
import type { ServerJsonResponse, UserDto } from '../@types';
import axios from 'axios';

export const useFetchUserData = () => {
    const [userData, setUserData] = useState<UserDto | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const { data } = await axios.get<ServerJsonResponse>('/api/user/me',
                { validateStatus: () => true, withCredentials: true }
            );
            setUserData(data.user);
            setLoading(false);
        };
        fetchUserData();
    }, []);

    return { userData, loading };
};