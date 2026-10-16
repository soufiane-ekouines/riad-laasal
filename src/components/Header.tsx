import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Volume2, VolumeX, Menu, X, MessageCircle } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG } from '../config';
import { soundManager } from '../utils/sound';
import { SearchModal } from './SearchModal';

export const Header: React.FC = () => {
  const location = useLocation();
  const { totalItemsCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(soundManager.getSoundEnabled());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSoundToggle = () => {
    const next = soundManager.toggleSound();
    setSoundEnabled(next);
  };

  const navLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Miel', path: '/boutique?cat=miel' },
    { label: 'Pâte à tartiner', path: '/boutique?cat=pate-a-tartiner' },
    { label: 'Packs & Éditions', path: '/packs' },
    { label: 'Offres Exclusives', path: '/offres' },
    { label: 'Notre Histoire', path: '/histoire' },
    { label: 'Contact', path: '/contact' },
  ];

  const isCurrentActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path.includes('?')) {
      const [base, query] = path.split('?');
      return location.pathname === base && location.search.includes(query);
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-gold py-2.5 shadow-md border-b border-[#D99A1E]/15'
            : 'bg-[#FCF9F2]/90 backdrop-blur-xs py-3.5 border-b border-[#D99A1E]/10'
        }`}
      >
        {/* Top Announcement Bar */}
        <div className="hidden lg:block bg-gradient-to-r from-[#2B1A0E] via-[#4A2D16] to-[#2B1A0E] text-[#FFF8E7] text-[11px] py-1.5 px-4 text-center font-medium tracking-wide">
          <span>{SITE_CONFIG.announcementText}</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark / Logo */}
          <Link
            to="/"
            onClick={() => soundManager.playDropSound()}
            className="flex items-center gap-2 group focus-visible:outline-none"
            aria-label="Accueil Riad El Aâssal"
          >
            <BrandLogo className="h-11 sm:h-12" variant="gold" showTagline={true} />
          </Link>

          {/* Zone 2: Navigation Links (Clean unboxed typography) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const active = isCurrentActive(link.path);
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => soundManager.playDropSound()}
                  className={`text-xs xl:text-sm font-medium tracking-wide transition-colors whitespace-nowrap relative py-1 ${
                    active
                      ? 'text-[#8A5A12] font-semibold'
                      : 'text-[#2B1A0E]/80 hover:text-[#8A5A12]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D99A1E] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (Search, Sound, Cart, WhatsApp) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sound Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundEnabled ? 'Désactiver le son des gouttes' : 'Activer le son des gouttes'}
              className="p-2 rounded-full text-[#2B1A0E]/70 hover:text-[#8A5A12] hover:bg-black/5 transition-colors"
              aria-label="Contrôle du son"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#D99A1E]" /> : <VolumeX className="w-4 h-4 opacity-60" />}
            </button>

            {/* Instant Search */}
            <button
              onClick={() => {
                soundManager.playDropSound();
                setSearchOpen(true);
              }}
              className="p-2 rounded-full text-[#2B1A0E]/70 hover:text-[#8A5A12] hover:bg-black/5 transition-colors"
              aria-label="Rechercher un produit"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => {
                soundManager.playDropSound();
                openCart();
              }}
              className="relative p-2 rounded-full text-[#2B1A0E]/80 hover:text-[#8A5A12] hover:bg-black/5 transition-colors focus-visible:outline-none"
              aria-label={`Panier avec ${totalItemsCount} articles`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D99A1E] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs tabular-nums animate-pulse">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* WhatsApp Direct Header Link */}
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent("Salam Alaykoum, je visite votre site Riad El Aâssal et j'aimerais avoir un conseil ou passer commande.")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playDropSound()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-semibold text-xs transition-colors border border-[#25D366]/30 whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                soundManager.playDropSound();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-lg text-[#2B1A0E]/80 hover:bg-black/5"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Animated Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-full bg-[#FFFDF9] border-b border-[#D99A1E]/20 shadow-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => soundManager.playDropSound()}
                  className={`text-base font-medium py-2 border-b border-[#2B1A0E]/06 ${
                    isCurrentActive(link.path)
                      ? 'text-[#8A5A12] font-semibold'
                      : 'text-[#2B1A0E]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-[#2B1A0E]/10 space-y-3">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent("Salam Alaykoum, je souhaite passer commande sur Riad El Aâssal.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Commander directement sur WhatsApp</span>
              </a>

              <div className="text-center text-xs text-[#2B1A0E]/60 pt-2">
                Livraison offerte dès {SITE_CONFIG.freeShippingThreshold} {SITE_CONFIG.currency} partout au Maroc
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Instant Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
