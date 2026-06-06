import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import ProfilePage from './ProfilePage';
import AnimePage from './AnimePage';
import AnimeDetail from './AnimeDetail';
import LoginPage from './Login';
import AdminPage from './AdminPage';
import NavBarSection from './NavBarSection';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell" data-bs-theme="dark">
        <NavBarSection />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Profile" element={<ProfilePage />} />
            <Route path="/Anime" element={<AnimePage />} />
            <Route path="/anime/:id" element={<AnimeDetail />} />
            <Route path="/Admin" element={<AdminPage />} />
          </Routes>
        </main>
        <footer className="border-top py-4 text-center small text-muted">
          © 2026 Anime Database. Front End Project by Diandra Nwafuleze
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
