import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from './components/common/Footer';
import Header from './components/common/Header';
import AddProductPage from './pages/AddProductPage';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">

        <Header />

        <main className="grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/add" element={<AddProductPage />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
