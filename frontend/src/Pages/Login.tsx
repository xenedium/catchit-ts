import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Alert,
    Space
} from '@mantine/core';

import { AlertCircle, ArrowNarrowLeft } from 'tabler-icons-react';
import { MagicSpinner } from 'react-spinners-kit';
import { useLogin } from '../Hooks/useLogin';
import { FullLoader } from '../Components/Others/FullLoader';

export default function Login() {

    const {
        errorMessages,
        email,
        password,
        setEmail,
        setPassword,
        HandleLogin,
        navigate,
        loading
    } = useLogin();

    return (
        <Container size={420} my={40}>
            {loading && <FullLoader />}
            <Container className="text-center d-flex flex-column align-content-center align-items-center">
                <MagicSpinner size={100} color="#000000" />
            </Container>
            <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
                Welcome back!
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor<'a'> size="sm" onClick={() => navigate('/register')}>
                    Create account
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form>
                    <TextInput label="Email" placeholder="you@mail.dev" required error={errorMessages.length > 0} value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
                    <PasswordInput label="Password" placeholder="Your password" required mt="md" error={errorMessages.length > 0} value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
                    <Group position="apart" mt="md">
                        <Checkbox label="Remember me" />
                        <Anchor<'a'> onClick={(event) => {
                            event.preventDefault();
                            alert('Not implemented yet');
                        }} size="sm">
                            Forgot password?
                        </Anchor>
                    </Group>
                    <Space h={20} />
                    <Alert icon={<AlertCircle size={16} />} title="Error!" color="red" hidden={errorMessages.length <= 0}>
                        {errorMessages.map((error) => error)}
                    </Alert>
                    <Button fullWidth mt="xl" onClick={HandleLogin}>
                        Sign in
                    </Button>
                </form>
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