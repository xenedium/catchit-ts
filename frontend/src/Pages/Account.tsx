import React, { useEffect, useState } from 'react';
import { Layout } from '../Components/Others/Layout';
import { useNavigate } from 'react-router-dom';
import { Container, Image, Space, Title, Button, TextInput, Select, PasswordInput, createStyles } from '@mantine/core';
import { Edit, At, Phone, Check, User, Lock, Key } from 'tabler-icons-react';
import PublicUrl from '../Config';

// "Everything that lives is designed to end.
// They are perpetually trapped in a never-ending spiral of life and death.
// However, life is all about the struggle within this cycle. That is what 'we' believe."
// POD 153 @ Ending E.

interface UserPayload {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone_number: string;
    city: string;
    is_admin: boolean;
    image: string;
}

const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '6rem',
        marginBottom: '10rem',
        flexDirection: 'row',
        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column'
        }
    }
}));

export default function MyAccount() {
    const { classes } = useStyles();
    const [user, setUser] = useState<UserPayload | null>(null);
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const navigate = useNavigate();

    const HandleUserUpdate = () => {
        fetch(`${PublicUrl}/api/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                firstname: user?.firstname,
                lastname: user?.lastname,
                email: user?.email,
                phoneNumber: user?.phone_number,
                city: user?.city,
            })
        }).then(() => window.location.reload());
    };

    const HandlePasswordUpdate = () => {
        if (password !== passwordConfirm) return;
        fetch(`${PublicUrl}/api/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                password: password,
            })
        }).then(() => window.location.reload());
    };
    const HandleImageUpload = (e: any) => {

        e.preventDefault();
        let formData = new FormData();
        formData.append('image', e.target.files[0]);
        fetch(`${PublicUrl}/api/users/`,
            {
                method: 'POST',
                headers:
                {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                },
                body: formData
            })
            .then(res => {
                if (res.status === 201) {
                    window.location.reload();
                }
            });

    };


    useEffect(() => {

        const token: string | undefined = localStorage.getItem('token')?.split(' ')[1];

        if (!token) navigate('/login');

        fetch(`${PublicUrl}/api/validate-jwt`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status !== 200) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
                setUser(res.payload);
            });
    }, [navigate]);


    return (
        <Layout>
            {user ?

                <Container className={classes.container}>
                    <Container>
                        <Title order={4} style={{ marginRight: 80, marginLeft: 80 }}>User Info</Title>
                        <Space h={'md'} />
                        <TextInput
                            label="Firstname"
                            value={user.firstname}
                            icon={<User size={14} />}
                            onChange={(e) => {
                                setUser({ ...user, firstname: e.target.value });
                            }}
                        />
                        <TextInput
                            label="Lastname"
                            value={user.lastname}
                            icon={<User size={14} />}
                            onChange={(e) => {
                                setUser({ ...user, lastname: e.target.value });
                            }}
                        />
                        <TextInput
                            label="Email"
                            value={user.email}
                            icon={<At size={14} />}
                            disabled
                        />
                        <TextInput
                            label="Phone number"
                            value={user.phone_number}
                            icon={<Phone size={14} />}
                            disabled
                        />
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
                            value={user.city}

                            onChange={(city: string) => {
                                setUser({ ...user, city: city });
                            }}
                        />

                        <Space h="lg" />
                        <Button leftIcon={<Check />} onClick={HandleUserUpdate}> Update </Button>
                    </Container>
                    <Container style={{ marginTop: 100 }}>
                        <Title order={4} style={{ marginRight: 50, marginLeft: 50 }}> Update Password </Title>
                        <PasswordInput
                            label="New Password"
                            value={password}
                            icon={<Lock size={14} />}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            style={{
                                marginTop: '1rem',
                            }}
                            placeholder="Enter your new password"
                        />
                        <PasswordInput
                            label="Confirm Password"
                            value={passwordConfirm}
                            icon={<Lock size={14} />}
                            onChange={(e) => {
                                setPasswordConfirm(e.target.value);
                            }}
                            error={password !== passwordConfirm ? 'Passwords do not match' : ''}
                            style={{
                                marginTop: '1rem',
                            }}
                            placeholder="Confirm your new password"
                        />
                        <Space h="lg" />
                        <Button leftIcon={<Key />} onClick={HandlePasswordUpdate} > Update Password </Button>
                    </Container>
                    <Container size="xs" className="d-flex flex-column align-items-center" style={{ marginTop: 100 }}>
                        <Title order={4}>Profile Picture</Title>
                        <Space h="xs" />
                        <Image src={user.image ? `https://catchit.fra1.digitaloceanspaces.com${user.image}` : 'https://catchit.fra1.digitaloceanspaces.com/assets/not_signed_in.png'} height={250} width={250} radius="xl" />
                        <Space h="xs" />
                        <Button leftIcon={<Edit />} onClick={() => {document.getElementById('file')?.click();}}> Upload image </Button>
                        <input type="file" id="file" onChange={HandleImageUpload} hidden/>
                    </Container>
                </Container>



                : <></>}
        </Layout>
    );
}