import { LayoutProps } from '../../@types/props';
import { footerLinks } from '../../Constants';
import { useUserData } from '../../Hooks/useUserData';
import { HeaderTabsColored, FooterCentered } from '../Home';
import { AppShell } from '@mantine/core';
import { useEffect, useState } from 'react';


export const Layout = ({ children }: LayoutProps) => {
    const {
        userData,
        loading
    } = useUserData();
    const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);

    useEffect(() => {
        window.addEventListener('resize', () => setInnerHeight(window.innerHeight));
    }, []);

    return (
        <AppShell
            header={
                <HeaderTabsColored user={{
                    name: loading ? 'Loading' : userData?.firstName ?? 'Sign In',
                    image: userData?.image ?? 'https://cdn.catchit.shop/static/default-user-profile.jpg',
                }} />
            }
            footer={
                <FooterCentered links={footerLinks.links} />
            }
            styles={{ main: { minHeight: innerHeight - 165 } }}
        >
            {children}
        </AppShell>
    );
};