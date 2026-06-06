import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedAnime } from './animeSlice';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Homepage = () => {
  const dispatch = useDispatch();
  const { featuredAnime } = useSelector((state) => state.anime);

  useEffect(() => {
    dispatch(fetchFeaturedAnime());
  }, [dispatch]);

  return (
    <Container fluid="md" className="page-container">
      <section className="anime-card text-center p-4 p-sm-5 mb-4">
        <p className="mb-3 text-primary text-uppercase small fw-semibold" style={{ letterSpacing: '0.15em' }}>
          Discover · Rate · Review
        </p>
        <h1 className="mb-4 display-5 fw-bold text-white">
          Your personal
          <span className="d-block text-gradient">anime universe database</span>
        </h1>
        <p className="mx-auto mb-4 text-secondary" style={{ maxWidth: '36rem' }}>
          Browse thousands of titles, read community reviews, and share your own ratings.
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <Button as={Link} to="/Anime" variant="primary" size="lg" className="px-4">
            Explore Anime
          </Button>
          <Button as={Link} to="/Login" variant="outline-light" size="lg" className="px-4">
            Sign In
          </Button>
        </div>
      </section>

      <section>
        <h2 className="h3 fw-bold text-white mb-4">What our admin says</h2>
        {featuredAnime.length === 0 ? (
          <p className="text-muted">No featured anime yet. Check back soon!</p>
        ) : (
          <Row xs={1} sm={2} lg={3} className="g-4">
            {featuredAnime.map((anime) => (
              <Col key={anime.id}>
                <Card className="anime-card h-100 border-0">
                  <Card.Img
                    variant="top"
                    src={anime.imageUrl}
                    alt={anime.title}
                    style={{ height: '12rem', objectFit: 'cover' }}
                  />
                  <Card.Body className="p-4">
                    <Card.Title className="text-white mb-2">{anime.title}</Card.Title>
                    <Card.Text className="text-secondary small mb-3">{anime.description}</Card.Text>
                    <p className="text-primary mb-0" style={{ fontSize: '0.75rem' }}>
                      — {anime.featuredBy}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </section>
    </Container>
  );
};

export default Homepage;
