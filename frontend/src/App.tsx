import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useLocalStorage, useHotkeys } from '@mantine/hooks';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './Scss/custom.scss';
import HomePage from './Pages/HomePage';
import Error404 from './Pages/Error404';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Account from './Pages/Account';
import MyArticles from './Pages/MyArticles';
import Article from './Pages/Article';
import Favorites from './Pages/Favorites';
import Articles from './Pages/Articles';
import AddArticle from './Pages/AddArticle';
import EditArticle from './Pages/EditArticle';

const App = () => {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    useHotkeys([['mod+J', () => toggleColorScheme()]]);
    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme, primaryColor: 'gray' }} withGlobalStyles withNormalizeCSS>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/account' element={<Account />} />
                        <Route path='/my-articles' element={<MyArticles />} />
                        <Route path='/article' element={<Article />} />
                        <Route path='/my-favorites' element={<Favorites />} />
                        <Route path='/articles' element={<Articles />} />
                        <Route path='/add-article' element={<AddArticle />} />
                        <Route path='/edit-article' element={<EditArticle />} />
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                </BrowserRouter>
            </MantineProvider>
        </ColorSchemeProvider>
    );
};

export default App;