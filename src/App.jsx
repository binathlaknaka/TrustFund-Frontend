import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { SignIn, SignUp } from './components/AuthComponents';
import Home from './pages/Home';
import GalleryView from './pages/Gallery';
import AboutUs from './pages/About'
import Feedback from './pages/FeedBack';
import LeaderBoard from './pages/LeaderBoard';
import CategoryPage from './pages/Category';

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
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/category" element={<CategoryPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;