import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';

import AdminDashboard from './pages/admin/Dashboard';

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
      <HelmetProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              {/* Regular user routes */}
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
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/chat" element={<ChatPage />} />

              {/* Admin routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </Router>
      </HelmetProvider>
    </DonationProvider>
  );
}

export default App;