import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { fetchFeaturedAnime } from './animeSlice';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

const JSON_SERVER_URL = 'http://localhost:5000';

const AdminPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { featuredAnime } = useSelector((state) => state.anime);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    dispatch(fetchFeaturedAnime(user.id));
  }, [dispatch, user.id]);

  const onAddFeatured = async (data) => {
    const newFeatured = {
      ...data,
      featuredBy: user.email,
    };
    try {
      const response = await fetch(`${JSON_SERVER_URL}/featured`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFeatured),
      });
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      reset();
      dispatch(fetchFeaturedAnime());
    } catch (err) {
      console.error(err);
    }
  };

  const removeFeatured = async (id) => {
    if (window.confirm('Remove from featured?')) {
      try {
        const response = await fetch(`${JSON_SERVER_URL}/featured/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        dispatch(fetchFeaturedAnime());
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Container fluid="md" className="page-container">
      <div className="mb-4">
        <h1 className="h2 fw-bold text-white">Admin Dashboard</h1>
        <p className="mt-2 text-secondary">Manage featured anime on the homepage.</p>
      </div>

      <Row className="g-4">
        <Col lg={4}>
          <Card className="anime-card h-100 border-0">
            <Card.Header className="fw-semibold text-white">
              Add Featured Anime
            </Card.Header>
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit(onAddFeatured)}>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label className="text-secondary">Anime Title</Form.Label>
                  <Form.Control
                    type="text"
                    isInvalid={!!errors.title}
                    {...register('title', { required: 'Title is required' })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="imageUrl">
                  <Form.Label className="text-secondary">Image URL</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="https://..."
                    isInvalid={!!errors.imageUrl}
                    {...register('imageUrl', { required: 'Image URL is required' })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.imageUrl?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="description">
                  <Form.Label className="text-secondary">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    isInvalid={!!errors.description}
                    {...register('description', { required: 'Description is required' })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">
                  Add to Featured
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="anime-card border-0">
            <Card.Header className="fw-semibold text-white">
              Manage Featured Anime
            </Card.Header>
            <Card.Body className="p-4">
              {featuredAnime.length === 0 ? (
                <p className="text-muted mb-0">No featured anime yet.</p>
              ) : (
                <Stack gap={3}>
                  {featuredAnime.map((anime) => (
                    <Card key={anime.id}>
                      <Card.Body className="d-flex flex-column flex-sm-row gap-3 align-items-sm-start">
                        <img
                          src={anime.imageUrl}
                          alt={anime.title}
                          className="rounded object-fit-cover flex-shrink-0"
                          style={{ width: '6rem', height: '8rem' }}
                        />
                        <div className="flex-grow-1 min-w-0">
                          <h3 className="h5 fw-semibold text-white mb-1">{anime.title}</h3>
                          <p className="text-secondary small mb-2">{anime.description}</p>
                          <p className="text-primary mb-0" style={{ fontSize: '0.75rem' }}>
                            Added by: {anime.featuredBy}
                          </p>
                        </div>
                        <Button variant="danger" size="sm" className="flex-shrink-0" onClick={() => removeFeatured(anime.id)}>
                          Remove
                        </Button>
                      </Card.Body>
                    </Card>
                  ))}
                </Stack>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
