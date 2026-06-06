import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

const JSON_SERVER_URL = 'http://localhost:5000';

const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);
  const [userReviews, setUserReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchUserReviews();
  }, [user]);

  const fetchUserReviews = async () => {
    try {
      const response = await fetch(`${JSON_SERVER_URL}/reviews?userId=${user.id}`);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      setUserReviews(await response.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        const response = await fetch(`${JSON_SERVER_URL}/reviews/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        fetchUserReviews();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const startEdit = (review) => {
    setEditingReview(review);
    reset({
      rating: review.rating,
      comment: review.comment,
    });
  };

  const onEditSubmit = async (data) => {
    try {
      const response = await fetch(`${JSON_SERVER_URL}/reviews/${editingReview.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: parseInt(data.rating),
          comment: data.comment,
          date: new Date().toISOString(),
        }),
      });
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      setEditingReview(null);
      fetchUserReviews();
    } catch (err) {
      console.error(err);
    }
  };

  const renderStars = (rating) => (
    <span className="stars small">
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  );

  return (
    <Container fluid="md" className="page-container">
      <div className="mb-4">
        <h1 className="h2 fw-bold text-black">Welcome, {user?.name}</h1>
        <p className="mt-2 text-secondary">Manage your reviews and activity.</p>
      </div>

      <Card className="anime-card mb-4 border-0">
        <Card.Header className="fw-semibold text-white">
          Your Reviews
        </Card.Header>
        <Card.Body className="p-4">
          {userReviews.length === 0 ? (
            <p className="text-muted mb-0">
              You haven&apos;t written any reviews yet.{' '}
              <Link to="/Anime">Browse anime</Link>
            </p>
          ) : (
            <Stack gap={3}>
              {userReviews.map((review) => (
                <Card key={review.id}>
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col md={8} className="mb-3 mb-md-0">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <Link
                            to={`/anime/${review.animeId}`}
                            className="fw-semibold text-primary text-decoration-none"
                          >
                            Anime #{review.animeId}
                          </Link>
                          {renderStars(review.rating)}
                        </div>
                        <p className="mb-0 text-secondary small">{review.comment}</p>
                      </Col>
                      <Col md={4} className="d-flex gap-2 justify-content-md-end">
                        <Button variant="primary" size="sm" onClick={() => startEdit(review)}>
                          Edit
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(review.id)}>
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </Stack>
          )}
        </Card.Body>
      </Card>

      {editingReview && (
        <Card className="anime-card border-0">
          <Card.Header className="fw-semibold text-white">
            Edit Review for Anime #{editingReview.animeId}
          </Card.Header>
          <Card.Body className="p-4">
            <Form onSubmit={handleSubmit(onEditSubmit)}>
              <Form.Group className="mb-3" controlId="editRating">
                <Form.Label className="text-secondary">Rating (1-5)</Form.Label>
                <Form.Select
                  {...register('rating', { required: 'Rating is required' })}
                  isInvalid={!!errors.rating}
                >
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.rating?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="editComment">
                <Form.Label className="text-secondary">Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
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

              <Stack direction="horizontal" gap={2}>
                <Button type="submit" variant="success">Save Changes</Button>
                <Button type="button" variant="secondary" onClick={() => setEditingReview(null)}>
                  Cancel
                </Button>
              </Stack>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default ProfilePage;
