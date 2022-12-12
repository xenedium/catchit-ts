import React, { useEffect, useState } from 'react';
import { Layout } from '../Components/Others/Layout';
import { useNavigate } from 'react-router-dom';
import { createStyles, Container, Title, TextInput, Image, Space, Button, Textarea, Select, Dialog } from '@mantine/core';
import { Edit, Plus } from 'tabler-icons-react';

// Evil Is Evil. Lesser, Greater, Middling, Makes No Difference.
// The Degree Is Arbitrary, The Definitions Blurred.
// If I'm To Choose Between One Evil And Another, I'd Rather Not Choose At All.
// ― Andrzej Sapkowski, The Last Wish

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

interface CategoryDto {
    _id: string;
    name: string;
    image: string;
}

export default function AddArticle() {

    const { classes } = useStyles();
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<number>(0);
    const [condition, setCondition] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);
    const [city, setCity] = useState<string>('');
    const [isImagePicked, setIsImagePicked] = useState<boolean>(false);
    const [image, setImage] = useState<any>();
    const [imgBuffer, setImgBuffer] = useState<string>();
    const [error, setError] = useState<boolean>(false);

    const [categories, setCategories] = useState<CategoryDto[]>([]);


    useEffect(() => {
        const token: string | undefined = localStorage.getItem('token')?.split(' ')[1];

        if (!token) navigate('/login');

        fetch('/api/validate-jwt', {
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
                else {
                    fetch('/api/categories/')
                        .then(res => res.json())
                        .then(res => {
                            setCategories(res);
                        });
                }
            });
    }, [navigate]);

    const HandleUpload = () => {
        let formData = new FormData();
        if (image) {
            formData.append('image', image);
        }
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category as unknown as string);
        formData.append('condition', condition);
        formData.append('price', price);
        formData.append('quantity', quantity as unknown as string);
        formData.append('city', city);

        fetch('/api/articles/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')?.split(' ')[1]}`
            },
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                if ( res.status === 201 ) {
                    navigate(`/article/?id=${res.article.id}`);
                }
                else {
                    setError(true);
                }
            });

    };

    return (
        <Layout>
            <Container>
                <Container className={classes.container}>
                    <Container>
                        <Title order={2} >Add a new article: </Title>
                        <Space h="xs" />
                        <TextInput
                            label="Title"
                            placeholder="Title"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            error={error}
                        />
                        <Textarea
                            style={{ width: 300 }}
                            label="Description"
                            placeholder="Description"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            error={error}
                        />
                        <Select
                            label="Category"
                            placeholder="Category"
                            required
                            data={categories.map(category => { return { value: category._id, label: category.name }; })}
                            value={category as unknown as string}
                            onChange={(cat: string) => setCategory(cat as unknown as number)}
                            error={error}
                        />
                        <Select
                            label="Condition"
                            placeholder="Condition"
                            required
                            data={[
                                { value: 'New', label: 'New' },
                                { value: 'Used', label: 'Used' },
                            ]}
                            value={condition}
                            onChange={(cond: string) => setCondition(cond)}
                            error={error}
                        />
                        <TextInput
                            label="Price"
                            placeholder="Price"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            error={error}
                        />
                        <TextInput
                            label="Quantity"
                            placeholder="Quantity"
                            required
                            value={quantity as unknown as string}
                            onChange={(e) => {
                                if (Number(e.target.value)) setQuantity(Number(e.target.value));
                                if (e.target.value === '') setQuantity(0);
                            }}
                            error={error}
                        />
                        <Select
                            label="City"
                            placeholder="City"
                            required
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
                            onChange={(city: string) => setCity(city)}
                            error={error}
                        />
                        <Space h="xl" />
                        <Button
                            fullWidth
                            onClick={HandleUpload}
                            leftIcon={<Plus />}
                        >
                                Publish
                        </Button>
                    </Container>
                    <Container size="xs" className="d-flex flex-column align-items-center" style={{ marginTop: 100 }}>
                        <Title order={4}>Article Image</Title>
                        <Image src={isImagePicked ? imgBuffer : 'https://catchit.fra1.digitaloceanspaces.com/assets/no_image.png'} height={250} width={250} radius="xl" />
                        <Space h="xs" />
                        <Button leftIcon={<Edit />} onClick={() => { document.getElementById('file')?.click(); }}> Upload image </Button>
                        <input
                            type="file"
                            id="file"
                            onChange={(e) => {
                                if (e.target.files)
                                {
                                    setImage(e.target.files[0]);
                                    setImgBuffer(URL.createObjectURL(e.target.files[0]));
                                    setIsImagePicked(true);
                                }
                            }}
                            hidden
                            accept="image/*"
                        />
                    </Container>
                </Container>
                <Dialog
                    opened={error}
                    onClose={() => setError(false)}
                    withBorder
                    withCloseButton
                >
                        Please fill all the fields with the correct values.
                </Dialog>
            </Container>
        </Layout>
    );
}
