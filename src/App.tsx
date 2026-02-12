import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <Header />
        <main className="grow container mx-auto p-4">
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            {/* Puedes agregar más rutas aquí */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;