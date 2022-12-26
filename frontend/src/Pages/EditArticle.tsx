import { Layout } from '../Components/Others/Layout';
import { createStyles, Container, Title, TextInput, Image, Space, Button, Textarea, Select, Dialog, FileButton, LoadingOverlay } from '@mantine/core';
import { Edit } from 'tabler-icons-react';
import { useEditArticle } from '../Hooks/useEditArticle';
import { City } from '../@types';
import { Carousel } from '@mantine/carousel';


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


export default function EditArticle() {

    const { loading, article, categories, error, modalMessage, images, setArticle, setError, HandleUpload, setImages, setModalMessage } = useEditArticle();
    const { classes } = useStyles();

    return (
        <Layout>
            <LoadingOverlay visible={loading} />
            {article &&
                <Container>
                    <Container className={classes.container} mt='xl'>
                        <Container>
                            <Title order={2}>Edit article: </Title>
                            <Space h="xs" />
                            <TextInput
                                label="Title"
                                placeholder="Title"
                                required
                                value={article.title}
                                onChange={(e) => setArticle({ ...article, title: e.target.value })}
                                error={error}
                            />
                            <Textarea
                                style={{ width: 300 }}
                                label="Description"
                                placeholder="Description"
                                required
                                value={article.description}
                                onChange={(e) => setArticle({ ...article, description: e.target.value })}
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
                                value={article.category._id}
                                onChange={(cat: string) => {
                                    const category = categories.find(category => category._id === cat);
                                    if (category) setArticle({ ...article, category });
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
                                value={article.condition}
                                onChange={(cond: string) => setArticle({ ...article, condition: cond })}
                                error={error}
                            />
                            <TextInput
                                label="Price"
                                placeholder="Price"
                                required
                                value={article.price}
                                onChange={(e) => setArticle({ ...article, price: Number(e.target.value) || 0 })}
                                error={error}
                            />
                            <TextInput
                                label="Quantity"
                                placeholder="Quantity"
                                required
                                value={article.quantity}
                                onChange={(e) => {
                                    setArticle({ ...article, quantity: Number(e.target.value) || 0 });
                                }}
                                error={error}
                            />
                            <Select
                                label="City"
                                placeholder="City"
                                required
                                data={Object.values(City).map(city => { return { value: city, label: city }; })}
                                value={article.city}
                                onChange={(city: string) => setArticle({ ...article, city: city as City })}
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
                            <Carousel w={300} slideGap="md" withIndicators loop>
                                {
                                    images.length > 0 ?
                                        images.map((image, index) => (
                                            <Carousel.Slide key={index}>
                                                <Image
                                                    radius='md'
                                                    width={300}
                                                    height={300}
                                                    src={URL.createObjectURL(image)}
                                                    alt={article.title}
                                                />
                                            </Carousel.Slide>
                                        ))
                                        :
                                        article.images?.map((image, index) => (
                                            <Carousel.Slide key={index}>
                                                <Image
                                                    radius='md'
                                                    src={image}
                                                    alt={article.title}
                                                />
                                            </Carousel.Slide>
                                        ))
                                }
                            </Carousel>
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
