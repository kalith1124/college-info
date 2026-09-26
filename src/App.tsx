import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import HomePage from '@/pages/HomePage';
import CollegesPage from '@/pages/CollegesPage';
import CollegeDetailPage from '@/pages/CollegeDetailPage';
import ComparePage from '@/pages/ComparePage';
import MapPage from '@/pages/MapPage';
import SavedCollegesPage from '@/pages/SavedCollegesPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import MenuPage from '@/pages/MenuPage';
import RaiseQuestionPage from '@/pages/RaiseQuestionPage';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminDashboardPage from '@/pages/admin/AdminCollegesPage';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/colleges" element={<CollegesPage />} />
                <Route path="/colleges/:slug" element={<CollegeDetailPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/saved" element={<SavedCollegesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/questions" element={<RaiseQuestionPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/admin" element={<AdminLoginPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
            <Toast />
          </div>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
