import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import GalleryView from './pages/Gallery';
import AboutUs from './pages/About'

function Layout() {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <div class="mb-auto">
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/about" element={<AboutUs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;