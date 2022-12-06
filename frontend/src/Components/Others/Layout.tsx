import React, { useEffect, useState } from 'react';
import { HeaderTabsProps, LayoutProps } from '../../@types/props';
import { footerLinks } from '../../Constants';
import {
    HeaderTabsColored,
    FooterCentered,
} from '../Home';

import { FullLoader } from './FullLoader';



export const Layout = ({ children }: LayoutProps) => {

    const [loading, setLoading] = useState(true);

    const [headerData, setHeaderData] = useState<HeaderTabsProps>({
        user: {
            name: 'Sign In',
            image: 'https://catchit.fra1.digitaloceanspaces.com/assets/not_signed_in.png'
        }
    });

    useEffect(() => {
        const token: string | undefined = localStorage.getItem('token')?.split(' ')[1];

        if (!token) {
            setLoading(false);
            return;
        }

        fetch('/api/validate-jwt', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status !== 200) {
                    localStorage.removeItem('token');
                    setLoading(false);
                    return;
                }
                setHeaderData({
                    user: {
                        name: res.payload.firstname,
                        image: ''
                    }
                });
                setLoading(false);

            });
    }, []);



    return (
        <>
            <HeaderTabsColored user={headerData.user} />
            <main>
                {!loading ? children : <FullLoader />}
            </main>
            <FooterCentered links={footerLinks.links} />
        </>
    );
};