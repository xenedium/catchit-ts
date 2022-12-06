/* eslint-disable no-unused-vars */
export interface FooterCenteredProps {
    links: { link: string; label: string }[];
}

export interface HeaderTabsProps {
    user: { name: string; image: string };
}

export type LayoutProps = {
    children: React.ReactNode;
};

export enum NothingFoundType {
    NotFound,
    NoArticles,
    NoFavorites,
}
