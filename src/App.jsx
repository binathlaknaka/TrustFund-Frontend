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
import { AuthProvider } from './context/AuthContext';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';

import AdminDashboard from './pages/admin/Dashboard';
import AdminOrganizations from './pages/admin/Organizations';
import AdminDonors from './pages/admin/Donors';
import AdminGallery from './pages/admin/Gallery';
import AdminProfile from './pages/admin/Profile';

import OrgDonations from './pages/org/Donations';
import OrgChatLists from './pages/org/ChatList';
import OrgChatPage from './pages/org/ChatPage';
import OrgPosts from './pages/org/Post';
import OrgCreatePosts from './pages/org/CreatePost';
import OrgProfile from './pages/org/Profile';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import SuccessPage from './pages/SuccessPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminSignup from './pages/admin/AdminSignup';
import CharityDetailPage from './pages/CharityDetail';

const stripePromise = loadStripe('pk_test_51RKc2MPbl3KSyR3oVvvTsslNNEVbN5cwqhKnkw8GjpbJponyV5GCbvjmogYeo4M5VrwfKNZuXO4tmTTzSQ1QFNv700VKZfpoZU');

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
       <Elements stripe={stripePromise}>
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
                {/* <Route path="/category/:id/donate/:orgId" element={<DonationPage />} /> */}
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/donate/:id" element={<DonationPage />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/charity/:id" element={<CharityDetailPage />} />

                {/* Admin routes */}
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-signup" element={<AdminSignup />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/organizations" element={<AdminOrganizations />} />
                <Route path="/admin/donors" element={<AdminDonors />} />
                <Route path="/admin/gallery" element={<AdminGallery />} />
                <Route path="/admin/profile" element={<AdminProfile />} />

                {/* Organization routes */}
                <Route path="/org" element={<OrgDonations />} />
                <Route path="/org/donations" element={<OrgDonations />} />
                <Route path="/org/chats" element={<OrgChatLists />} />
                <Route path="/org/chats/:chatId" element={<OrgChatPage />} />
                <Route path="/org/post" element={<OrgPosts />} />
                <Route path="/org/create-post" element={<OrgCreatePosts />} />
                <Route path="/org/profile" element={<OrgProfile />} />
              </Route>
            </Routes>
          </Router>
        </HelmetProvider>
      </DonationProvider>
      </Elements>
    </AuthProvider>
  );
}

export default App;
