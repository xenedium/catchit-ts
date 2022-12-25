import { useEffect, useState } from 'react';
import { HttpStatusCode, ServerJsonResponse, UserDto } from '../@types';
import axios from 'axios';
import Cookies from 'js-cookie';

export const useUserData = () => {
    const [userData, setUserData] = useState<UserDto | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [dialogMessage, setDialogMessage] = useState<string | undefined>(undefined);

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
        if (response.statusCode === HttpStatusCode.OK) {
            setUserData(response.user);
            setDialogMessage('✅ User data updated');
        }
        else setDialogMessage(`Invalid fields: ${response.errors?.toString()}`);
        setTimeout(() => setDialogMessage(undefined), 3000);
    };
    const updatePassword = async (oldPassword: string, newPassword: string, newPasswordConfirm: string) => {
        if (newPassword !== newPasswordConfirm) return;
        if (!newPassword || !oldPassword) return setDialogMessage('❌ Invalid fields: password');
        const { data: response } = await axios.put<ServerJsonResponse>('/api/user',
            {
                oldPassword,
                newPassword
            },
            { validateStatus: () => true, withCredentials: true }
        );
        if (response.statusCode === HttpStatusCode.OK) {
            setUserData(response.user);
            setDialogMessage('✅ Password updated');
        }
        else setDialogMessage(`❌ Invalid fields: ${response.errors?.toString()}`);
        setTimeout(() => setDialogMessage(undefined), 3000);
    };
    const updateImage = async (image: File) => {
        const formData = new FormData();
        formData.append('image', image);
        const { data: response } = await axios.put<ServerJsonResponse>('/api/user',
            formData,
            { validateStatus: () => true, withCredentials: true }
        );
        if (response.statusCode === HttpStatusCode.OK) {
            setUserData(response.user);
            setDialogMessage('✅ Profile picture updated');
        }
        else setDialogMessage(`❌ Invalid fields: ${response.errors?.toString()}`);
        setTimeout(() => setDialogMessage(undefined), 3000);
    };

    return { userData, loading, setUserData, updateUserData, updatePassword, updateImage, dialogMessage, setDialogMessage };
};