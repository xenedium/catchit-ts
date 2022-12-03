import React from 'react';
import {
    Container,
    Overlay
} from '@mantine/core';

import { MetroSpinner } from 'react-spinners-kit';

const ContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20vh',
};

export function FullLoader() {
    return (
        <>
            <Container style={ContainerStyle}>
                <MetroSpinner size={100} color="#000" />
            </Container>
            <Overlay opacity={0.6} color="black" />
        </>
    );
}