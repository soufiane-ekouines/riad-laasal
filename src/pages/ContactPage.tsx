import React, { useState } from 'react';
import { SITE_CONFIG } from '../config';
import { soundManager } from '../utils/sound';
import { MessageCircle, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'Conseil sur un miel',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playDropSound();

    const formattedMessage = `Salam Alaykoum *${SITE_CONFIG.name}*,\n\nJe vous contacte depuis le formulaire de votre site web :\n\n👤 *Nom & Prénom :* ${formData.name}\n📞 *Téléphone :* ${formData.phone}\n📋 *Sujet :* ${formData.subject}\n\n💬 *Message :*\n${formData.message}\n\nMerci pour votre écoute et vos conseils.`;

    const encoded = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encoded}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setFormSubmitted(true);
  };

  return (
    <div className="py-12 bg-[#FCF9F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8A5A12] block mb-2">
            Service Client Dédié
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2B1A0E] tracking-tight mb-3">
            Contactez Riad El Aâssal
          </h1>
          <p className="text-xs sm:text-sm text-[#2B1A0E]/70 leading-relaxed">
            Pour un conseil personnalisé sur nos miels, une commande directe ou un suivi de livraison partout au Maroc. Tout notre accompagnement s'effectue via WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info & WhatsApp Highlight (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Priority Card */}
            <div className="bg-[#E9F8EE] rounded-3xl p-6 sm:p-8 border border-[#25D366]/30 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#25D366]/30">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#2B1A0E]">Discussion Directe sur WhatsApp</h3>
                  <p className="text-xs text-[#128C7E] font-medium">Réponse rapide garantie</p>
                </div>
              </div>
              <p className="text-xs text-[#2B1A0E]/80 mb-6 leading-relaxed">
                Notre équipe d'apiculteurs et conseillers terroir vous répond 6 jours sur 7. Aucun email, un échange humain et direct.
              </p>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent("Salam Alaykoum, j'aimerais avoir des informations sur vos miels et passer commande.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playDropSound()}
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Ouvrir WhatsApp ({SITE_CONFIG.whatsappDisplay})</span>
              </a>
            </div>

            {/* Practical details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D99A1E]/20 shadow-xs space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D99A1E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#2B1A0E] uppercase tracking-wider">Boutique & Atelier</h4>
                  <p className="text-xs text-[#2B1A0E]/70 mt-0.5">{SITE_CONFIG.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#D99A1E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#2B1A0E] uppercase tracking-wider">Ligne WhatsApp Officielle</h4>
                  <p className="text-xs text-[#2B1A0E]/70 mt-0.5">{SITE_CONFIG.whatsappDisplay}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#D99A1E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#2B1A0E] uppercase tracking-wider">Disponibilité du service</h4>
                  <p className="text-xs text-[#2B1A0E]/70 mt-0.5">{SITE_CONFIG.businessHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form transmitting directly to WhatsApp (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-[#D99A1E]/20 shadow-xl">
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#2B1A0E]">Message ouvert sur WhatsApp !</h3>
                <p className="text-xs sm:text-sm text-[#2B1A0E]/70 max-w-sm mx-auto leading-relaxed">
                  Merci {formData.name}. Votre message a été préparé et transmis vers notre discussion WhatsApp officielle pour une prise en charge immédiate.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="btn-honey-wave px-6 py-2.5 rounded-xl bg-[#D99A1E] text-white text-xs font-bold mt-4"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#2B1A0E] mb-1">
                    Formulaire de Contact Direct via WhatsApp
                  </h3>
                  <p className="text-xs text-[#2B1A0E]/60">
                    Remplissez ce formulaire : il ouvrira instantanément votre message rédigé sur WhatsApp.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2B1A0E] mb-1">Votre Nom & Prénom *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex : Karim Berrada"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#2B1A0E]/20 bg-[#FCF9F2] text-xs text-[#2B1A0E] focus:outline-none focus:border-[#D99A1E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2B1A0E] mb-1">Numéro de Téléphone portable *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Ex : 06 61 00 00 00"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#2B1A0E]/20 bg-[#FCF9F2] text-xs text-[#2B1A0E] focus:outline-none focus:border-[#D99A1E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2B1A0E] mb-1">Sujet de votre demande</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#2B1A0E]/20 bg-[#FCF9F2] text-xs text-[#2B1A0E] focus:outline-none focus:border-[#D99A1E]"
                  >
                    <option value="Conseil sur un miel">Conseil sur le choix d'un miel</option>
                    <option value="Passer une commande directe">Passer une commande directe</option>
                    <option value="Suivi de livraison">Suivi de livraison</option>
                    <option value="Coffrets personnalisés pour entreprise">Coffrets personnalisés pour entreprise</option>
                    <option value="Autre demande">Autre question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2B1A0E] mb-1">Votre Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Précisez votre demande, les miels souhaités ou votre ville de livraison..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#2B1A0E]/20 bg-[#FCF9F2] text-xs text-[#2B1A0E] focus:outline-none focus:border-[#D99A1E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all hover:scale-101"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Envoyer ma demande via WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
