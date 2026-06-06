import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { logout } from './userSlice';

const NavBarSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Navbar expand="lg" sticky="top" className="border-bottom py-2">
      <Container fluid="md" className="page-container py-0">
        <Navbar.Brand as={Link} to="/" className="fs-5 fw-bold text-white">
          ANIME DB
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" className="border-secondary" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto gap-1 py-2 py-lg-0">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/Anime">Anime</Nav.Link>
            {user ? (
              <>
                <Nav.Link as={NavLink} to="/Profile">Profile</Nav.Link>
                {user.role === 'admin' && (
                  <Nav.Link as={NavLink} to="/Admin">Admin</Nav.Link>
                )}
              </>
            ) : (
              <Nav.Link as={NavLink} to="/Login">Login</Nav.Link>
            )}
          </Nav>
          {user && (
            <Button variant="outline-light" size="sm" onClick={handleLogout} className="ms-lg-2">
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarSection;
