import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchsingleAnime } from './animeSlice';
import { useForm } from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';

const JSON_SERVER_URL = 'http://localhost:5000';

const AnimeDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentAnime, loading } = useSelector((state) => state.anime);
  const { user } = useSelector((state) => state.user);

  const [reviews, setReviews] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    dispatch(fetchsingleAnime(id));
    fetchReviews();
  }, [dispatch, id]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${JSON_SERVER_URL}/reviews?animeId=${id}`);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      setReviews(await response.json());
    } catch (err) {
      console.error(err);
    }
  };

  const createReview = async (data) => {
    const newReview = {
      animeId: Number(id),
      userId: Number(user.id),
      userName: user.name,
      rating: parseInt(data.rating),
      comment: data.comment,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${JSON_SERVER_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      reset();
      fetchReviews();
    } catch (err) {
      console.error('Failed to post review', err);
    }
  };

  const renderStars = (rating) => (
    <span className="stars small">
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  );

  if (loading || !currentAnime) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading details...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container fluid="md" className="page-container">
      <Card className="anime-card mb-4 overflow-hidden border-0">
        <Row className="g-0">
          <Col md={4}>
            <Card.Img
              src={currentAnime.images.jpg.large_image_url}
              alt={currentAnime.title}
              className="h-100"
              style={{ objectFit: 'cover', minHeight: '280px' }}
            />
          </Col>
          <Col md={8}>
            <Card.Body className="p-4 p-md-5">
              <Card.Title as="h1" className="h2 mb-2 text-white">
                {currentAnime.title}
              </Card.Title>
              {currentAnime.title_english && (
                <Card.Subtitle className="mb-3 text-secondary">
                  {currentAnime.title_english}
                </Card.Subtitle>
              )}

              <Stack direction="horizontal" gap={2} className="mb-3 flex-wrap">
                <Badge bg="primary">★ {currentAnime.score}</Badge>
                <Badge bg="secondary">{currentAnime.status}</Badge>
                <Badge bg="secondary">{currentAnime.episodes} Episodes</Badge>
              </Stack>

              <Card.Text className="text-secondary small" style={{ whiteSpace: 'pre-line' }}>
                {currentAnime.synopsis}
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <Card className="anime-card border-0">
        <Card.Header className="fw-semibold text-white">
          Reviews
        </Card.Header>
        <Card.Body className="p-4">
          {reviews.length === 0 ? (
            <p className="text-muted fst-italic mb-4">No reviews yet. Be the first!</p>
          ) : (
            <Stack gap={3} className="mb-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-semibold text-white">{review.userName}</span>
                      {renderStars(review.rating)}
                    </div>
                    <p className="mb-0 text-secondary small">{review.comment}</p>
                  </Card.Body>
                </Card>
              ))}
            </Stack>
          )}

          {user ? (
            <Card>
              <Card.Body>
                <Card.Title as="h3" className="h6 mb-3 text-white">
                  Add your review
                </Card.Title>
                <Form onSubmit={handleSubmit(createReview)}>
                  <Form.Group className="mb-3" controlId="reviewRating">
                    <Form.Label className="text-secondary">Rating (1-5)</Form.Label>
                    <Form.Select
                      {...register('rating', { required: 'Rating is required', min: 1, max: 5 })}
                      isInvalid={!!errors.rating}
                    >
                      <option value="5">5 - Masterpiece</option>
                      <option value="4">4 - Great</option>
                      <option value="3">3 - Good</option>
                      <option value="2">2 - Fair</option>
                      <option value="1">1 - Poor</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.rating?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="reviewComment">
                    <Form.Label className="text-secondary">Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="What did you think of this anime?"
                      {...register('comment', {
                        required: 'Comment is required',
                        minLength: { value: 10, message: 'Minimum 10 characters' },
                      })}
                      isInvalid={!!errors.comment}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.comment?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button type="submit" variant="primary">
                    Submit Review
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          ) : (
            <Alert variant="info" className="mb-0 text-center">
              Please <Link to="/Login">log in</Link> to add a review.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AnimeDetail;
