import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import { SignIn, SignUp } from './components/AuthComponents';
import Home from './pages/Home';
import GalleryView from './pages/Gallery';
import AboutUs from './pages/About';
import Feedback from './pages/FeedBack';
import LeaderBoard from './pages/LeaderBoard';
import CategoryPage from './pages/Category';
import CharityDetail from './pages/CharityDetail';
import DonationPage from './pages/DonationPage';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import ChatList from './pages/ChatList';
import CharityDetailPage from './pages/CharityDetail';

import AdminDashboard from './pages/admin/Dashboard';
import AdminOrganizations from './pages/admin/Organizations';
import AdminDonors from './pages/admin/Donors';
import AdminGallery from './pages/admin/Gallery';
import AdminProfile from './pages/admin/Profile';
import AdminLogin from './pages/admin/AdminLogin';
import AdminSignup from './pages/admin/AdminSignup';

import OrgDonations from './pages/org/Donations';
import OrganizationChatList from './pages/org/OrganizationChatList';
import OrganizationChatPage from './pages/org/OrganizationChatPage';
import OrgPosts from './pages/org/Post';
import OrgCreatePosts from './pages/org/CreatePost';
import OrgProfile from './pages/org/Profile';

import SuccessPage from './pages/SuccessPage';
import { DonationProvider } from './context/DonationContext';
import { AuthProvider } from './context/AuthContext';

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
                  {/*Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/admin-login" element={<AdminLogin />} />
                  <Route path="/admin-signup" element={<AdminSignup />} />
                  <Route path="/org" element={<OrgDonations />} />

                  {/*Protected Routes */}
                  <Route path="/gallery" element={<ProtectedRoute><GalleryView /></ProtectedRoute>} />
                  <Route path="/about" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
                  <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
                  <Route path="/leaderboard" element={<ProtectedRoute><LeaderBoard /></ProtectedRoute>} />
                  <Route path="/category" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
                  <Route path="/category/:id" element={<ProtectedRoute><CharityDetail /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                  <Route path="/chat/:chatId" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
                  <Route path="/user/chats" element={<ProtectedRoute><ChatList /></ProtectedRoute>} />
                  <Route path="/donate/:id" element={<ProtectedRoute><DonationPage /></ProtectedRoute>} />
                  <Route path="/success" element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />
                  <Route path="/charity/:id" element={<ProtectedRoute><CharityDetailPage /></ProtectedRoute>} />

                  {/*Admin Routes */}
                  <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/admin/organizations" element={<ProtectedRoute><AdminOrganizations /></ProtectedRoute>} />
                  <Route path="/admin/donors" element={<ProtectedRoute><AdminDonors /></ProtectedRoute>} />
                  <Route path="/admin/gallery" element={<ProtectedRoute><AdminGallery /></ProtectedRoute>} />
                  <Route path="/admin/profile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />

                  {/*Organization Routes */}
                  <Route path="/org/donations" element={<ProtectedRoute><OrgDonations /></ProtectedRoute>} />
                  <Route path="/org/chats" element={<ProtectedRoute><OrganizationChatList /></ProtectedRoute>} />
                  <Route path="/org/chat/:chatId" element={<ProtectedRoute><OrganizationChatPage /></ProtectedRoute>} />
                  <Route path="/org/post" element={<ProtectedRoute><OrgPosts /></ProtectedRoute>} />
                  <Route path="/org/create-post" element={<ProtectedRoute><OrgCreatePosts /></ProtectedRoute>} />
                  <Route path="/org/profile" element={<ProtectedRoute><OrgProfile /></ProtectedRoute>} />
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
