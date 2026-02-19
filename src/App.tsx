import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import RegisterPage from './pages/RegisterPage';
import FormSigin from './components/forms/FormSigin';
import ProfilePage from './pages/ProfilePage';
import { UserProvider } from './context/UserContext';
import AddProductPage from "./pages/AddProductPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-neutral-50">
          <Header />
          <main className="grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<div className="text-center mt-10">Inicio</div>} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<FormSigin />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/addProducts" element={<AddProductPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;