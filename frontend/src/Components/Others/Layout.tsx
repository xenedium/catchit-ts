import { LayoutProps } from '../../@types/props';
import { footerLinks } from '../../Constants';
import { useFetchUserData } from '../../Hooks/useFetchUserData';
import { HeaderTabsColored, FooterCentered } from '../Home';



export const Layout = ({ children }: LayoutProps) => {

    const {
        userData
    } = useFetchUserData();

    return (
        <>
            <HeaderTabsColored user={{
                name: userData?.firstName ?? 'Sign In',
                image: userData?.image ?? 'https://cdn.catchit.shop/static/default-user-profile.jpg',
            }} />
            <main>
                { children }
            </main>
            <FooterCentered links={footerLinks.links} />
        </>
    );
};