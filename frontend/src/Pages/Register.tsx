import React, { useEffect, useState } from 'react';
import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Select,
    Alert
} from '@mantine/core';

import { AlertCircle, ArrowNarrowLeft } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';
import { MagicSpinner } from 'react-spinners-kit';

interface Errors {
    active: boolean;
    message: string;
}

export default function Register() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstname, setFirstName] = useState<string>('');
    const [lastname, setLastName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [city, setCity] = useState<string>('Casablanca');

    const [errors, setErrors] = useState<Errors>({ active: false, message: '' });

    const HandleRegister = () => {
        fetch('/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                firstname,
                lastname,
                phoneNumber,
                city,
            }),
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 201) // created successfully now login
                {
                    fetch('/api/auth-login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email,
                            password,
                        }),
                    })
                        .then(res => res.json())
                        .then(res => {
                            localStorage.setItem('token', `Bearer ${res.token}`);
                            navigate('/');
                        });
                }
                else {
                    setErrors({ active: true, message: res.message });
                }

            });
    };


    return (
        <Container size={420} my={40}>
            <Container className="text-center d-flex flex-column align-content-center align-items-center">
                <MagicSpinner size={100} color="#000000" />
            </Container>
            <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
                Welcome !
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Already have an account ?{' '}
                <Anchor<'a'> size="sm" onClick={() => navigate('/login')}>
                    Sign In
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Email" placeholder="you@mail.dev" required value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
                <TextInput label="Firstname" placeholder="Your first name..." required value={firstname} onChange={(e) => setFirstName(e.currentTarget.value)} />
                <TextInput label="Lastname" placeholder="Your last name..." required value={lastname} onChange={(e) => setLastName(e.currentTarget.value)} />
                <TextInput label="Phone Number" placeholder="0612345678" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.currentTarget.value)} />
                <Select
                    label="City"
                    placeholder="Select your city"
                    data={[
                        { value: 'Casablanca', label: 'Casablanca' },
                        { value: 'Rabat', label: 'Rabat' },
                        { value: 'Fes', label: 'Fes' },
                        { value: 'Tanger', label: 'Tanger' },
                        { value: 'Oujda', label: 'Oujda' },
                        { value: 'Agadir', label: 'Agadir' },
                        { value: 'Tetouan', label: 'Tetouan' },
                        { value: 'Meknes', label: 'Meknes' },
                        { value: 'Safi', label: 'Safi' },
                        { value: 'El Jadida', label: 'El Jadida' },
                        { value: 'Khouribga', label: 'Khouribga' },
                        { value: 'Ouarzazate', label: 'Ouarzazate' },
                        { value: 'Settat', label: 'Settat' },
                        { value: 'Sidi Kacem', label: 'Sidi Kacem' },
                        { value: 'Kenitra', label: 'Kenitra' },
                        { value: 'Taza', label: 'Taza' },
                        { value: 'Tiznit', label: 'Tiznit' },
                        { value: 'Sidi Ifni', label: 'Sidi Ifni' },
                    ]}
                    value={city}
                    // @ts-ignore
                    onChange={setCity}
                />
                <PasswordInput label="Password" placeholder="Your password" required mt="md" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
                <Group position="apart" mt="md">
                </Group>
                <Alert icon={<AlertCircle size={16} />} title="Error!" color="red" hidden={!errors.active}>
                    {errors.message}
                </Alert>
                <Button fullWidth mt="xl" onClick={HandleRegister}>
                    Register
                </Button>
                <Button
                    fullWidth
                    color={'dark'}
                    mt="xl"
                    onClick={() => navigate('/')}
                    leftIcon={<ArrowNarrowLeft size={16} />}
                >
                    Back to home page
                </Button>
            </Paper>
        </Container>
    );
}