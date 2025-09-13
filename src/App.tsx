import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Main } from './pages/Main';
import { Header } from './components/other/Header';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { Footer } from './components/other/Footer';
import { ToastProvider } from './components/other/Toast';
import { ChatWidget } from './components/other/ChatWidget';

function App() {

  return (
    <div className="App">
      <ToastProvider>
        <Router>
        <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
          <ChatWidget />
        </Router>
      </ToastProvider>
    </div>
  );
}

export default App;

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}
