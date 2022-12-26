import { Layout } from '../Components/Others/Layout';
import { createStyles, Container, Title, TextInput, Image, Space, Button, Textarea, Select, Dialog, FileButton, LoadingOverlay } from '@mantine/core';
import { Edit } from 'tabler-icons-react';
import { City } from '../@types';
import { Carousel } from '@mantine/carousel';
import { useAddArticle } from '../Hooks/useAddArticle';


const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10rem',
        flexDirection: 'row',
        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column'
        }
    }
}));


export default function AddArticle() {

    const {
        title,
        setTitle,
        description,
        setDescription,
        category,
        setCategory,
        condition,
        setCondition,
        price,
        setPrice,
        quantity,
        setQuantity,
        city,
        setCity,
        loading,
        categories,
        images,
        setImages,
        HandleUpload,
        error,
        modalMessage,
        setModalMessage,
        setError
    } = useAddArticle();
    const { classes } = useStyles();

    return (
        <Layout>
            <LoadingOverlay visible={loading} />
            {
                <Container>
                    <Container className={classes.container} mt='xl'>
                        <Container>
                            <Title order={2}>Add article: </Title>
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
                                autosize
                                minRows={2}
                                maxRows={4}
                            />
                            <Select
                                label="Category"
                                placeholder="Category"
                                required
                                data={categories.map(category => { return { value: category._id as unknown as string, label: category.name }; })}
                                value={category?._id}
                                onChange={(cat: string) => {
                                    const category = categories.find(category => category._id === cat);
                                    if (category) setCategory(category);
                                }}
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
                                onChange={(e) => setPrice(Number(e.target.value) || 0)}
                                error={error}
                            />
                            <TextInput
                                label="Quantity"
                                placeholder="Quantity"
                                required
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value) || 0)}
                                error={error}
                            />
                            <Select
                                label="City"
                                placeholder="City"
                                required
                                data={Object.values(City).map(city => { return { value: city, label: city }; })}
                                value={city}
                                onChange={(city: string) => setCity(city as City)}
                                error={error}
                            />
                            <Space h="xl" />
                            <Button
                                fullWidth
                                onClick={HandleUpload}
                                leftIcon={<Edit />}
                            >
                                Publish
                            </Button>
                        </Container>
                        <Container size="xs" className="d-flex flex-column align-items-center" style={{ marginTop: 100 }}>
                            <Title order={4}>Article Image</Title>
                            {
                                images.length > 0 &&
                                <Carousel w={300} slideGap="md" withIndicators loop>
                                    {
                                        images.map((image, index) => (
                                            <Carousel.Slide key={index}>
                                                <Image
                                                    radius='md'
                                                    src={URL.createObjectURL(image)}
                                                    alt={title}
                                                    width={300}
                                                    height={300}
                                                />
                                            </Carousel.Slide>
                                        ))
                                    }
                                </Carousel>
                            }
                            <Space h="xs" />
                            <FileButton onChange={setImages} accept="image/png,image/jpeg" multiple>
                                {(props) => <Button {...props}>Upload image</Button>}
                            </FileButton>
                        </Container>
                    </Container>
                    <Dialog
                        opened={modalMessage !== ''}
                        onClose={() => {
                            setError(false);
                            setModalMessage('');
                        }}
                        withBorder
                        withCloseButton
                    >
                        {modalMessage}
                    </Dialog>
                </Container>
            }
        </Layout >
    );
}
