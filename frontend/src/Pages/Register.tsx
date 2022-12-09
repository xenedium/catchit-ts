import { TextInput, PasswordInput, Anchor, Paper, Title, Text, Container, Group, Button, Select, Alert, createStyles } from '@mantine/core';
import { AlertCircle, ArrowNarrowLeft } from 'tabler-icons-react';
import { MagicSpinner } from 'react-spinners-kit';
import { City } from '../@types';
import { useRegister } from '../Hooks/useRegister';

const useStyles = createStyles(() => ({

}));

export default function Register() {
    const { theme } = useStyles();

    const {
        setEmail,
        setPassword,
        setFirstName,
        setLastName,
        setPhoneNumber,
        setCity,
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        city,
        errorMessages,
        navigate,
        HandleRegister
    } = useRegister();

    return (
        <Container size={420} my={40}>
            <Container className="text-center d-flex flex-column align-content-center align-items-center">
                {
                    theme.colorScheme === 'dark' ?
                        <MagicSpinner size={100} color='#ffffff' /> :
                        <MagicSpinner size={100} color='#000000' />
                }
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
            <form>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput label="Email" placeholder="you@mail.dev" required value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
                    <TextInput label="Firstname" placeholder="Your first name..." required value={firstName} onChange={(e) => setFirstName(e.currentTarget.value)} />
                    <TextInput label="Lastname" placeholder="Your last name..." required value={lastName} onChange={(e) => setLastName(e.currentTarget.value)} />
                    <TextInput label="Phone Number" placeholder="0612345678" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.currentTarget.value)} />
                    <Select
                        label="City"
                        placeholder="Select your city"
                        data={Object.values(City).map((city) => ({ label: city, value: city }))}
                        value={city}
                        onChange={(city: string) => setCity(city as City)}
                    />
                    <PasswordInput label="Password" placeholder="Your password" required mt="md" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
                    <Group position="apart" mt="md">
                    </Group>
                    <Alert icon={<AlertCircle size={16} />} title="Error!" color="red" hidden={errorMessages.length === 0}>
                        {errorMessages.map((message) => message)}
                    </Alert>
                    <Button fullWidth mt="xl" onClick={(e) => {
                        e.preventDefault();
                        HandleRegister();
                    }}>
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
            </form>
        </Container>
    );
}