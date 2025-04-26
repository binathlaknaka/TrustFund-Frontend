import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { SignIn, SignUp } from './components/AuthComponents';
import Home from './pages/Home';
import GalleryView from './pages/Gallery';
import AboutUs from './pages/About';
import Feedback from './pages/FeedBack';
import LeaderBoard from './pages/LeaderBoard';
import CategoryPage from './pages/Category';
import CharityDetail from './pages/CharityDetail';
import DonationPage from './pages/DonationPage';
import { DonationProvider } from './context/DonationContext';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <div className="mb-auto">
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <DonationProvider>
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
            <Route path="/category/:id" element={<CharityDetail />} />
            <Route path="/category/:id/donate/:orgId" element={<DonationPage />} />
          </Route>
        </Routes>
      </Router>
    </DonationProvider>
  );
}

export default App;