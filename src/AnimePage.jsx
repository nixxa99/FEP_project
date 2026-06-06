import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchallAnime } from './animeSlice';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

const AnimePage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { allAnime, loading } = useSelector((state) => state.anime);

  const page = parseInt(searchParams.get('page')) || 1;
  const q = searchParams.get('q') || '';

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', String(newPage));
      if (q) next.set('q', q);
      else next.delete('q');
      return next;
    });
  };

  useEffect(() => {
    dispatch(fetchallAnime({ page, q }));
  }, [dispatch, page, q]);

  return (
    <Container fluid="md" className="page-container">
      <div className="mb-4">
        <h1 className="h2 fw-bold text-white">Anime Catalog</h1>
        <p className="mt-2 text-white">Browse and discover your next favorite series.</p>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Loading anime...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Row xs={2} sm={3} md={4} lg={5} xl={6} className="g-3">
            {allAnime.data?.map((anime) => (
              <Col key={anime.mal_id}>
                <Card
                  as={Link}
                  to={`/anime/${anime.mal_id}`}
                  className="anime-card anime-card-link h-100 text-decoration-none overflow-hidden"
                >
                  <Card.Img
                    variant="top"
                    src={anime.images.jpg.image_url}
                    alt={anime.title}
                    style={{ height: '14rem', objectFit: 'cover' }}
                  />
                  <Card.Body className="p-3">
                    <Card.Title className="fs-6 mb-2 text-truncate">{anime.title}</Card.Title>
                    <div className="d-flex justify-content-between align-items-center small text-secondary">
                      <span className="stars">★ {anime.score || 'N/A'}</span>
                      <span>{anime.episodes ? `${anime.episodes} ep` : 'Ongoing'}</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {allAnime.pagination && (
            <div className="d-flex justify-content-center align-items-center gap-3 mt-5">
              <Button
                variant="outline-light"
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
              >
                Previous
              </Button>
              <span className="small text-secondary">
                Page {page} of {allAnime.pagination.last_visible_page || 1}
              </span>
              <Button
                variant="outline-light"
                onClick={() => handlePageChange(page + 1)}
                disabled={!allAnime.pagination.has_next_page}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default AnimePage;
