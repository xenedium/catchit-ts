import { useEffect, useState } from 'react';
import { Layout } from '../Components/Others/Layout';
import {
    Image, Space, Button, TextInput, Select, PasswordInput,
    LoadingOverlay, Tabs, Container, Center, FileButton, Dialog, Text
} from '@mantine/core';
import { Edit, At, Phone, Check, User, Lock, Key } from 'tabler-icons-react';
import { useUserData } from '../Hooks/useUserData';
import { City } from '../@types';
import { IconUser, IconKey, IconPhoto } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

export default function MyAccount() {

    const [oldPassword, setOldPassword] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const { userData, loading, dialogMessage, setUserData, updateUserData, updatePassword, updateImage, setDialogMessage } = useUserData();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !userData) navigate('/login');
    }, [loading]);

    return (
        <Layout>
            {
                !loading && userData &&
                <>
                    <Dialog
                        opened={dialogMessage !== undefined}
                        withCloseButton
                        onClose={() => setDialogMessage(undefined)}
                        size="lg"
                        radius="md"
                    >
                        <Text>{dialogMessage}</Text>
                    </Dialog>
                    <LoadingOverlay visible={loading} />
                    <Container>
                        <Tabs defaultValue={'userData'} variant='outline'>
                            <Tabs.List>
                                <Tabs.Tab value="userData" icon={<IconUser size={14} />}>User Information</Tabs.Tab>
                                <Tabs.Tab value="password" icon={<IconKey size={14} />}>Password</Tabs.Tab>
                                <Tabs.Tab value="picture" icon={<IconPhoto size={14} />}>Profile picture</Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Panel value='userData'>
                                <Center>
                                    <Container>
                                        <Space h={'md'} />
                                        <TextInput
                                            label="Firstname"
                                            value={userData?.firstName}
                                            icon={<User size={14} />}
                                            onChange={(e) => {
                                                if (userData)
                                                    setUserData({ ...userData, firstName: e.target.value });
                                            }}
                                        />
                                        <TextInput
                                            label="Lastname"
                                            value={userData?.lastName}
                                            icon={<User size={14} />}
                                            onChange={(e) => {
                                                if (userData)
                                                    setUserData({ ...userData, lastName: e.target.value });
                                            }}
                                        />
                                        <TextInput
                                            label="Email"
                                            value={userData?.email}
                                            icon={<At size={14} />}
                                            disabled
                                        />
                                        <TextInput
                                            label="Phone number"
                                            value={userData?.phoneNumber}
                                            icon={<Phone size={14} />}
                                            disabled
                                        />
                                        <Select
                                            label="City"
                                            placeholder="Select your city"
                                            data={Object.values(City).map((city) => ({ label: city, value: city }))}
                                            value={userData?.city}

                                            onChange={(city: string) => {
                                                if (userData)
                                                    setUserData({ ...userData, city: city as City });
                                            }}
                                        />

                                        <Space h="lg" />
                                        <Button leftIcon={<Check />} onClick={() => updateUserData()} fullWidth> Update </Button>
                                    </Container>
                                </Center>
                            </Tabs.Panel>
                            <Tabs.Panel value='password'>
                                <Center>
                                    <Container>
                                        <PasswordInput
                                            label="Old Password"
                                            value={oldPassword}
                                            icon={<Lock size={14} />}
                                            onChange={(e) => {
                                                setOldPassword(e.target.value);
                                            }}
                                            style={{
                                                marginTop: '1rem',
                                            }}
                                            placeholder="Enter your old password"
                                        />
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
                                        <Button leftIcon={<Key />} fullWidth onClick={() => updatePassword(oldPassword, password, passwordConfirm)} > Update Password </Button>
                                    </Container>
                                </Center>
                            </Tabs.Panel>
                            <Tabs.Panel value='picture'>
                                <Center>
                                    <Container>
                                        <Space h="xs" />
                                        <Image src={userData?.image} height={250} width={250} radius="xl" />
                                        <Space h="xs" />
                                        <FileButton onChange={updateImage} accept="image/*">
                                            {(props) => <Button fullWidth leftIcon={<Edit />} {...props}>Upload image</Button>}
                                        </FileButton>
                                    </Container>
                                </Center>
                            </Tabs.Panel>
                        </Tabs>
                    </Container>
                </>
            }
        </Layout >
    );
}