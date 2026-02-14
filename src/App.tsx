import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { UserProvider } from './context/UserContext';


function App() {
  return (
    <UserProvider>
      <div className="min-h-screen flex flex-col bg-neutral-50">

        <Header />

        <main className="grow container mx-auto p-4">
        </main>

        <Footer />

      </div>
    </UserProvider>
  );
}

export default App;