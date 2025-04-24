import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Gallery from './pages/Gallery'
import About from './pages/About'
import FeedBack from './pages/FeedBack'
import Footer from './components/Footer';

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
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<FeedBack />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;