import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from './userSlice';
import { useSelector, useDispatch } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user, error } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (user) {
      navigate('/Profile');
    }
  }, [user, navigate]);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group as={Row} className="mb-3" controlId="loginEmail">
        <Form.Label column sm="3" className="text-secondary">
          Email
        </Form.Label>
        <Col sm="9">
          <Form.Control
            type="email"
            placeholder="you@example.com"
            isInvalid={!!errors.email}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email',
              },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-4" controlId="loginPassword">
        <Form.Label column sm="3" className="text-secondary">
          Password
        </Form.Label>
        <Col sm="9">
          <Form.Control
            type="password"
            placeholder="••••••••"
            isInvalid={!!errors.password}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'At least 6 characters' },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <div className="text-end">
        <Button type="submit" variant="primary" size="lg" disabled={loading} className="px-5">
          {loading ? 'Signing in…' : 'Sign In'}
        </Button>
      </div>
    </Form>
  );
};

const LoginPage = () => {
  return (
    <div className="page-container login-page d-flex align-items-center justify-content-center">
      <Card className="anime-card w-100 shadow-lg" style={{ maxWidth: '28rem' }}>
        <Card.Header className="text-center fs-5 fw-semibold text-white">
          Welcome back
        </Card.Header>
        <Card.Body className="p-4">
          <p className="mb-4 text-center small text-secondary">
            Sign in to write reviews and manage your profile.
          </p>
          <LoginForm />
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginPage;
