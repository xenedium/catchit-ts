import React, { useEffect, useState } from 'react';
import {
    HeaderTabsColored,
    FooterLinks,
} from '../Home';

import { FullLoader } from './FullLoader';
import PublicUrl from '../../Config';

interface HeaderTabsProps {
    user: { name: string; image: string };
}

interface FooterLinksProps {
    data: {
        title: string;
        links: { label: string; link: string }[];
    }[];
}

type Props = {
    children: React.ReactNode;
};


const footerLinks: FooterLinksProps = {
    data: [
        {
            'title': 'Community',
            'links': [
                {
                    'label': 'Join Discord',
                    'link': '#'
                },
                {
                    'label': 'Follow on Twitter',
                    'link': '#'
                },
                {
                    'label': 'Email newsletter',
                    'link': '#'
                },
                {
                    'label': 'GitHub discussions',
                    'link': '#'
                }
            ]
        }
    ]
};


export const Layout = ({ children }: Props) => {

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

        fetch(`${PublicUrl}/api/validate-jwt`, {
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
                        image: res.payload.image ? `https://catchit.fra1.digitaloceanspaces.com${res.payload.image}` : 'https://catchit.fra1.digitaloceanspaces.com/assets/not_signed_in.png'
                    }
                });
                setLoading(false);

            });
    }, []);



    return (
        <>
            <HeaderTabsColored user={headerData.user} />
            <main>
                { !loading ? children : <FullLoader /> }
            </main>
            <FooterLinks data={footerLinks.data} />
        </>
    );
};