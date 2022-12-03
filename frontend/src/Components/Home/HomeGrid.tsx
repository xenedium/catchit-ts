import React from 'react';
import { Container, Grid, SimpleGrid, Title, Space } from '@mantine/core';

import { PacmanLoader } from 'react-spinners';


export function LeadGrid() {

    return (
        <Container my="md">
            <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>

                <Title order={1} style={{ marginTop: 10 }} >
          Hello there !
                    <Space h="md" />

          Still under development.
                    <Space h="md" />
          Sign In and Sign Up are currently working.

                    <Space h="md" />
                </Title>

                <Grid gutter="md">
                    <PacmanLoader size={50} color={'black'} />
                </Grid>
            </SimpleGrid>
        </Container>
    );
}