import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { SITE_CONFIG } from '../config';
import { soundManager } from '../utils/sound';
import { ShieldCheck, Truck, Clock, Phone, MapPin, MessageCircle, ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [waName, setWaName] = useState('');
  const [waPhone, setWaPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleWhatsAppSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playDropSound();
    const text = encodeURIComponent(
      `Salam Alaykoum ${SITE_CONFIG.name},\nJe m'appelle ${waName || 'Client'} (${waPhone || 'Mon numéro'})\nJe souhaite m'abonner pour recevoir vos offres exclusives et les annonces de nouvelles récoltes sur WhatsApp.`
    );
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
    setSubscribed(true);
  };

  return (
    <footer className="relative bg-[#201207] text-[#FFF8E7] overflow-hidden border-t border-[#D99A1E]/30 pt-16 pb-12">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D99A1E] to-transparent" />

      {/* Trust Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-[#2B1A0E]/80 border border-[#D99A1E]/20 backdrop-blur-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D99A1E]/20 text-[#D99A1E] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-white">100% Pur & Naturel</h3>
              <p className="text-[11px] text-[#FFF8E7]/60">Récolte à froid non pasteurisée</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D99A1E]/20 text-[#D99A1E] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-white">Livraison Express Maroc</h3>
              <p className="text-[11px] text-[#FFF8E7]/60">Offerte dès {SITE_CONFIG.freeShippingThreshold} {SITE_CONFIG.currency}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D99A1E]/20 text-[#D99A1E] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-white">Paiement à la livraison</h3>
              <p className="text-[11px] text-[#FFF8E7]/60">Réglez après réception</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D99A1E]/20 text-[#D99A1E] flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-white">Commande 100% WhatsApp</h3>
              <p className="text-[11px] text-[#FFF8E7]/60">Conseils 6j/7 personnalisés</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & WhatsApp Club */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
        {/* Brand & Manifesto (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Link to="/" onClick={() => soundManager.playDropSound()}>
            <BrandLogo className="h-12" variant="light" />
          </Link>
          <p className="text-xs text-[#FFF8E7]/70 leading-relaxed max-w-sm">
            Maison marocaine dédiée à l'art apicole authentique. Miels purs récoltés à froid d'Aït Baâmrane, de l'Atlas et du Gharb, et authentique Amlou aux amandes et huile d'argan.
          </p>

          <div className="pt-2 space-y-2 text-xs text-[#FFF8E7]/80">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D99A1E] shrink-0" />
              <span>{SITE_CONFIG.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#25D366] shrink-0" />
              <span>WhatsApp Officiel : {SITE_CONFIG.whatsappDisplay}</span>
            </div>
          </div>
        </div>

        {/* Quick Links (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D99A1E]">Nos Miels</h4>
          <ul className="space-y-2 text-xs text-[#FFF8E7]/70">
            <li>
              <Link to="/boutique?cat=miel" onClick={() => soundManager.playDropSound()} className="hover:text-white transition-colors">
                Miel de Daghmouss
              </Link>
            </li>
            <li>
              <Link to="/boutique?cat=miel" onClick={() => soundManager.playDropSound()} className="hover:text-white transition-colors">
                Miel de Thym Sauvage
              </Link>
            </li>
            <li>
              <Link to="/boutique?cat=miel" onClick={() => soundManager.playDropSound()} className="hover:text-white transition-colors">
                Miel d'Oranger
              </Link>
            </li>
            <li>
              <Link to="/boutique?cat=pate-a-tartiner" onClick={() => soundManager.playDropSound()} className="hover:text-white transition-colors">
                Amlou aux Amandes & Argan
              </Link>
            </li>
            <li>
              <Link to="/packs" onClick={() => soundManager.playDropSound()} className="hover:text-white transition-colors">
                Coffrets & Packs
              </Link>
            </li>
          </ul>
        </div>

        {/* Information (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D99A1E]">La Maison</h4>
          <ul className="space-y-2 text-xs text-[#FFF8E7]/70">
            <li>
              <Link to="/histoire" onClick={() => soundManager.playDropSound()} className="hover:text-white transition-colors">
                Notre Histoire & Terroir
              </Link>
            </li>
            <li>
              <Link to="/offres" onClick={() => soundManager.playDropSound()} className="hover:text-white transition-colors">
                Offres Exclusives
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => soundManager.playDropSound()} className="hover:text-white transition-colors">
                Nous Écrire sur WhatsApp
              </Link>
            </li>
            <li>
              <Link to="/cgv" onClick={() => soundManager.playDropSound()} className="hover:text-white transition-colors">
                Conditions Générales (CGV)
              </Link>
            </li>
            <li>
              <Link to="/mentions-legales" onClick={() => soundManager.playDropSound()} className="hover:text-white transition-colors">
                Mentions Légales
              </Link>
            </li>
          </ul>
        </div>

        {/* WhatsApp Club / Exclusive Alerts (Replaces email newsletter) (4 cols) */}
        <div className="lg:col-span-4 bg-[#2D1B0F] p-6 rounded-2xl border border-[#D99A1E]/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#F5D07A] uppercase tracking-wider">
            <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
            <span>Club Privilège WhatsApp</span>
          </div>
          <h4 className="text-base font-serif font-bold text-white">
            Recevez nos Offres & Récoltes Rares sur WhatsApp
          </h4>
          <p className="text-xs text-[#FFF8E7]/70 leading-relaxed">
            Soyez les premiers avertis lors des récoltes fraîches de Daghmouss, Thym d'altitude et lots numérotés. Aucun spam.
          </p>

          {subscribed ? (
            <div className="p-3 bg-[#25D366]/20 border border-[#25D366]/40 rounded-xl text-xs text-white flex items-center gap-2">
              <Check className="w-4 h-4 text-[#25D366]" />
              <span>Demande ouverte sur WhatsApp !</span>
            </div>
          ) : (
            <form onSubmit={handleWhatsAppSubscribe} className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Votre prénom"
                  value={waName}
                  onChange={(e) => setWaName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder:text-white/40 text-xs border border-white/20 focus:outline-none focus:border-[#D99A1E]"
                />
                <input
                  type="tel"
                  required
                  placeholder="N° WhatsApp"
                  value={waPhone}
                  onChange={(e) => setWaPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder:text-white/40 text-xs border border-white/20 focus:outline-none focus:border-[#D99A1E]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-3 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <span>S'abonner via WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#FFF8E7]/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FFF8E7]/50 gap-4">
        <div>
          © {new Date().getFullYear()} {SITE_CONFIG.name}. Canal de vente & assistance officiel sur WhatsApp.
        </div>
        <div className="flex items-center gap-4">
          <span>Paiement à la Livraison au Maroc</span>
          <span>·</span>
          <span>100% Naturel Garanti</span>
          <span>·</span>
          <span>🇲🇦 Terroirs du Maroc</span>
        </div>
      </div>
    </footer>
  );
};
