import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, MessageCircle } from 'lucide-react';
import { useCart, CustomerDetails } from '../context/CartContext';
import { SITE_CONFIG } from '../config';
import { Link } from 'react-router-dom';
import { soundManager } from '../utils/sound';

export const CartDrawer: React.FC = () => {
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
    subtotal,
    shippingCost,
    isFreeShipping,
    amountNeededForFreeShipping,
    freeShippingProgress,
    totalPrice,
    generateWhatsAppOrderUrl,
  } = useCart();

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    city: 'Casablanca',
    address: '',
    notes: '',
  });

  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleOrderClick = () => {
    soundManager.playDropSound();
    const url = generateWhatsAppOrderUrl(showAddressForm ? customer : undefined);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="relative w-full max-w-md bg-[#FFFDF9] h-full shadow-2xl flex flex-col z-10 border-l border-[#D99A1E]/20"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#2B1A0E]/10 flex items-center justify-between bg-[#F8F1E2]">
              <div className="flex items-center gap-2">
                <span className="text-xl">🍯</span>
                <div>
                  <h2 className="text-lg font-serif font-bold text-[#2B1A0E]">Votre Panier Terroir</h2>
                  <p className="text-xs text-[#8A5A12]">
                    {items.length} {items.length > 1 ? 'articles' : 'article'} sélectionnés
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  soundManager.playDropSound();
                  closeCart();
                }}
                className="p-2 rounded-full hover:bg-black/5 text-[#2B1A0E]/70 transition-colors"
                aria-label="Fermer le panier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-[#FAF4E6] px-5 py-3 border-b border-[#D99A1E]/15">
              <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                {isFreeShipping ? (
                  <span className="text-[#3A7520] flex items-center gap-1.5 font-semibold">
                    <Truck className="w-3.5 h-3.5" /> Félicitations ! Livraison offerte partout au Maroc
                  </span>
                ) : (
                  <span className="text-[#8A5A12]">
                    Plus que <strong className="text-[#2B1A0E]">{amountNeededForFreeShipping} {SITE_CONFIG.currency}</strong> pour la livraison offerte
                  </span>
                )}
                <span className="text-[#8A5A12] font-semibold">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-[#E8DCBF] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#D99A1E] to-[#8A5A12] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Items List or Empty State */}
            <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#2B1A0E]/08">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                  <div className="w-20 h-20 rounded-full bg-[#F5ECDC] flex items-center justify-center mb-4 text-3xl shadow-inner">
                    🏺
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-[#2B1A0E] mb-2">Votre panier est vide</h3>
                  <p className="text-sm text-[#2B1A0E]/70 mb-6 max-w-xs">
                    Découvrez nos miels rares du Maroc récoltés à froid et notre authentique Amlou aux amandes.
                  </p>
                  <Link
                    to="/boutique"
                    onClick={() => {
                      soundManager.playDropSound();
                      closeCart();
                    }}
                    className="btn-honey-wave px-6 py-2.5 rounded-lg bg-[#D99A1E] text-white font-medium text-sm shadow-md hover:shadow-lg transition-all"
                  >
                    Explorer la boutique
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="py-4 flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover rounded-lg border border-[#D99A1E]/20 bg-[#FFF]"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-[#2B1A0E] truncate">{item.name}</h4>
                      <p className="text-xs text-[#8A5A12] font-medium">{item.weight}</p>
                      <div className="text-xs font-semibold text-[#2B1A0E] mt-1">
                        {item.price} {SITE_CONFIG.currency}
                      </div>

                      {/* Quantity selector */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-[#2B1A0E]/20 rounded-md bg-white">
                          <button
                            onClick={() => {
                              soundManager.playDropSound();
                              updateQuantity(item.id, -1);
                            }}
                            className="p-1 hover:bg-[#F5ECDC] text-[#2B1A0E] rounded-l transition-colors"
                            aria-label="Diminuer la quantité"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-[#2B1A0E] min-w-6 text-center tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => {
                              soundManager.playDropSound();
                              updateQuantity(item.id, 1);
                            }}
                            className="p-1 hover:bg-[#F5ECDC] text-[#2B1A0E] rounded-r transition-colors"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            soundManager.playDropSound();
                            removeItem(item.id);
                          }}
                          className="text-xs text-rose-700/80 hover:text-rose-700 flex items-center gap-1 transition-colors"
                          aria-label="Supprimer l'article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right font-serif font-bold text-sm text-[#2B1A0E] tabular-nums">
                      {item.price * item.quantity} {SITE_CONFIG.currency}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Address Optional Toggle */}
            {items.length > 0 && (
              <div className="p-4 bg-[#F8F3E7] border-t border-[#2B1A0E]/10">
                <button
                  type="button"
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="text-xs font-medium text-[#8A5A12] hover:text-[#2B1A0E] flex items-center justify-between w-full"
                >
                  <span>{showAddressForm ? '− Masquer mes coordonnées' : '+ Ajouter mes coordonnées pour WhatsApp (optionnel)'}</span>
                </button>

                {showAddressForm && (
                  <div className="mt-3 space-y-2 text-xs">
                    <input
                      type="text"
                      placeholder="Nom complet"
                      value={customer.fullName}
                      onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                      className="w-full px-3 py-1.5 rounded border border-[#2B1A0E]/20 bg-white focus:outline-none focus:border-[#D99A1E]"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="tel"
                        placeholder="Téléphone"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        className="w-full px-3 py-1.5 rounded border border-[#2B1A0E]/20 bg-white focus:outline-none focus:border-[#D99A1E]"
                      />
                      <input
                        type="text"
                        placeholder="Ville (ex: Casablanca, Rabat...)"
                        value={customer.city}
                        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                        className="w-full px-3 py-1.5 rounded border border-[#2B1A0E]/20 bg-white focus:outline-none focus:border-[#D99A1E]"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Adresse de livraison"
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      className="w-full px-3 py-1.5 rounded border border-[#2B1A0E]/20 bg-white focus:outline-none focus:border-[#D99A1E]"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Footer Summary & Order Button */}
            {items.length > 0 && (
              <div className="p-5 border-t border-[#2B1A0E]/10 bg-white">
                <div className="space-y-1.5 text-xs text-[#2B1A0E]/80 mb-4">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span className="font-semibold tabular-nums">{subtotal} {SITE_CONFIG.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span className="font-semibold">
                      {isFreeShipping ? (
                        <span className="text-emerald-700 font-bold">Offerte</span>
                      ) : (
                        <span>{shippingCost} {SITE_CONFIG.currency}</span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-[#2B1A0E] pt-2 border-t border-[#2B1A0E]/10">
                    <span>Total</span>
                    <span className="text-[#8A5A12] tabular-nums">{totalPrice} {SITE_CONFIG.currency}</span>
                  </div>
                  <p className="text-[11px] text-[#2B1A0E]/60 text-right">Paiement en espèces à la livraison</p>
                </div>

                {/* Primary WhatsApp Order Button */}
                <button
                  onClick={handleOrderClick}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/20 transition-all transform active:scale-98"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Commander via WhatsApp ({totalPrice} {SITE_CONFIG.currency})</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </button>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-[#2B1A0E]/06 text-[10px] text-[#2B1A0E]/60">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D99A1E]" /> 100% Pur Garanti
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#D99A1E]" /> Livraison 24-48h
                  </span>
                  <span>·</span>
                  <span>Paiement à réception</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
