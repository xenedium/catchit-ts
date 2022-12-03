import React from 'react';
import { Container, createStyles, Title, Group, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 38,
        color: theme.black,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    }
}));

export enum NothingFoundType {
    // eslint-disable-next-line no-unused-vars
    NotFound,
    // eslint-disable-next-line no-unused-vars
    NoArticles,
    // eslint-disable-next-line no-unused-vars
    NoFavorites,
}

export function NothingFound({ type }: { type: NothingFoundType }) {
    const { classes } = useStyles();
    const navigate = useNavigate();

    return (
        <Container>
            <Title className={classes.title}>
                {
                    type === NothingFoundType.NotFound ?
                        'The article you are looking for might have been removed or does not exist.' :
                        type === NothingFoundType.NoArticles ?
                            'Looks like you don\'t have any article...' :
                            type === NothingFoundType.NoFavorites ?
                                'Looks like you don\'t have any favorite article...' :
                                'Unknown error'
                }
            </Title>
            <Group position="center">
                <Button
                    size="md"
                    style={{ marginTop: 50, marginBottom: 50 }}
                    onClick={() => navigate(-1)}
                >
                    Go back
                </Button>
            </Group>
        </Container>
    );
}
