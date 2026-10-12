import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PromoPopup } from './components/PromoPopup';
import { AbandonedCartBanner } from './components/AbandonedCartBanner';
import { HoneyCursor } from './components/HoneyCursor';
import { HoneyLoader } from './components/HoneyLoader';
import { Toast } from './components/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { BoutiquePage } from './pages/BoutiquePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { PacksPage } from './pages/PacksPage';
import { OffersPage } from './pages/OffersPage';
import { HistoirePage } from './pages/HistoirePage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
};

export default function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          
          {/* Custom Desktop Honey Droplet Cursor */}
          <HoneyCursor />

          {/* First visit luxury Honey Loader */}
          <HoneyLoader />

          <div className="min-h-screen flex flex-col bg-[#FCF9F2] text-[#2B1A0E] selection:bg-[#D99A1E]/30 selection:text-[#2B1A0E]">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/boutique" element={<BoutiquePage />} />
                <Route path="/produit/:slug" element={<ProductDetailPage />} />
                <Route path="/packs" element={<PacksPage />} />
                <Route path="/offres" element={<OffersPage />} />
                <Route path="/histoire" element={<HistoirePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/mentions-legales" element={<LegalPage type="mentions" />} />
                <Route path="/cgv" element={<LegalPage type="cgv" />} />
                <Route path="/confidentialite" element={<LegalPage type="confidentialite" />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />

            {/* Cart Slide-out Drawer */}
            <CartDrawer />

            {/* Persistent Abandoned Cart Banner */}
            <AbandonedCartBanner />

            {/* Floating WhatsApp Quick Action */}
            <FloatingWhatsApp />

            {/* Promotional Dwell / Exit-Intent Popup */}
            <PromoPopup />

            {/* Micro Toast Feedback */}
            <Toast />
          </div>
        </BrowserRouter>
      </CartProvider>
    </HelmetProvider>
  );
}
