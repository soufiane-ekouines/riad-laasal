import React, { createContext, useContext, useEffect, useState } from 'react';
import { SITE_CONFIG } from '../config';
import { hasPrice } from '../utils/price';

export interface CartItem {
  id: string; // unique cart entry id (productId + variantId)
  productId: string;
  variantId: string;
  name: string;
  arabicName: string;
  weight: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  shippingCost: number;
  isFreeShipping: boolean;
  amountNeededForFreeShipping: number;
  freeShippingProgress: number;
  totalPrice: number;
  hasUnpricedItems: boolean; // au moins un article dont le prix n'est pas encore renseigné
  generateWhatsAppOrderUrl: (customer?: CustomerDetails) => string;
  // Abandoned cart restoration
  hasAbandonedCartNotice: boolean;
  abandonedCartItemCount: number;
  restoreAbandonedCart: () => void;
  dismissAbandonedCartNotice: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// v2 : catalogue réel (les paniers v1 contenaient les anciens produits/prix de démo)
const STORAGE_KEY = 'riad_cart_items_v2';
const TIMESTAMP_KEY = 'riad_cart_last_updated_v1';
const SESSION_KEY = 'riad_session_id_v1';
const ABANDONED_NOTICE_DISMISSED_KEY = 'riad_abandoned_dismissed_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasAbandonedCartNotice, setHasAbandonedCartNotice] = useState(false);
  const [abandonedCartItemCount, setAbandonedCartItemCount] = useState(0);

  // Check abandoned cart on initial mount
  useEffect(() => {
    try {
      const savedItemsStr = localStorage.getItem(STORAGE_KEY);
      const lastUpdatedStr = localStorage.getItem(TIMESTAMP_KEY);
      const prevSessionId = localStorage.getItem(SESSION_KEY);
      const isDismissed = sessionStorage.getItem(ABANDONED_NOTICE_DISMISSED_KEY);

      const currentSessionId = sessionStorage.getItem('current_session_marker');
      if (!currentSessionId) {
        // New browser session
        const newSessionMarker = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
        sessionStorage.setItem('current_session_marker', newSessionMarker);

        if (savedItemsStr && !isDismissed) {
          const parsed: CartItem[] = JSON.parse(savedItemsStr);
          if (parsed && parsed.length > 0) {
            const count = parsed.reduce((sum, item) => sum + item.quantity, 0);
            // If the cart has been inactive from previous session
            if (prevSessionId && prevSessionId !== newSessionMarker) {
              setHasAbandonedCartNotice(true);
              setAbandonedCartItemCount(count);
            } else if (lastUpdatedStr) {
              const diffMinutes = (Date.now() - parseInt(lastUpdatedStr, 10)) / (1000 * 60);
              if (diffMinutes > 15) {
                setHasAbandonedCartNotice(true);
                setAbandonedCartItemCount(count);
              }
            }
          }
        }
        localStorage.setItem(SESSION_KEY, newSessionMarker);
      }
    } catch (e) {
      console.error('Error checking abandoned cart', e);
    }
  }, []);

  // Save items to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [items]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (newItem: Omit<CartItem, 'id'>) => {
    const entryId = `${newItem.productId}-${newItem.variantId}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === entryId);
      if (existing) {
        return prev.map((i) =>
          i.id === entryId ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }
      return [...prev, { ...newItem, id: entryId }];
    });
    showToast(`✓ "${newItem.name}" ajouté à votre panier`);
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter((i): i is CartItem => i !== null)
    );
  };

  const clearCart = () => {
    setItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(TIMESTAMP_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const restoreAbandonedCart = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setItems(parsed);
      }
    } catch (e) {
      console.error(e);
    }
    setHasAbandonedCartNotice(false);
    sessionStorage.setItem(ABANDONED_NOTICE_DISMISSED_KEY, 'true');
    setIsOpen(true);
    showToast('Votre panier précédent a été restauré avec succès !');
  };

  const dismissAbandonedCartNotice = () => {
    setHasAbandonedCartNotice(false);
    sessionStorage.setItem(ABANDONED_NOTICE_DISMISSED_KEY, 'true');
  };

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeShipping = subtotal >= SITE_CONFIG.freeShippingThreshold;
  const shippingCost = items.length === 0 ? 0 : isFreeShipping ? 0 : SITE_CONFIG.standardShippingFee;
  const amountNeededForFreeShipping = Math.max(0, SITE_CONFIG.freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / SITE_CONFIG.freeShippingThreshold) * 100));
  const totalPrice = subtotal + shippingCost;
  const hasUnpricedItems = items.some((item) => !hasPrice(item.price));

  const generateWhatsAppOrderUrl = (customer?: CustomerDetails) => {
    let message = `Salam Alaykoum *${SITE_CONFIG.name}*,\n\nJe souhaite valider ma commande sur votre boutique en ligne :\n\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (${item.weight})\n`;
      message += hasPrice(item.price)
        ? `   Quantité : ${item.quantity} x ${item.price} ${SITE_CONFIG.currency} = ${item.quantity * item.price} ${SITE_CONFIG.currency}\n`
        : `   Quantité : ${item.quantity} (prix à confirmer)\n`;
    });

    message += `\n-----------------------\n`;
    if (hasUnpricedItems) {
      message += `*Total :* à confirmer par ${SITE_CONFIG.name} (Paiement à la livraison)\n`;
    } else {
      message += `*Sous-total :* ${subtotal} ${SITE_CONFIG.currency}\n`;
      message += `*Frais de livraison :* ${isFreeShipping ? 'Offerte (Gratuit)' : `${shippingCost} ${SITE_CONFIG.currency}`}\n`;
      message += `*TOTAL À RÉGLER :* ${totalPrice} ${SITE_CONFIG.currency} (Paiement à la livraison)\n`;
    }

    if (customer && customer.fullName) {
      message += `\n*Coordonnées de livraison :*\n`;
      message += `👤 Nom : ${customer.fullName}\n`;
      message += `📞 Tél : ${customer.phone || 'Non renseigné'}\n`;
      message += `📍 Ville : ${customer.city || 'Casablanca'}\n`;
      message += `🏠 Adresse : ${customer.address || 'À préciser'}\n`;
      if (customer.notes) {
        message += `📝 Note : ${customer.notes}\n`;
      }
    }

    message += `\nMerci de bien vouloir me confirmer la date de livraison. Baraka Allahou fikoum.`;

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encoded}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
        shippingCost,
        isFreeShipping,
        amountNeededForFreeShipping,
        freeShippingProgress,
        totalPrice,
        hasUnpricedItems,
        generateWhatsAppOrderUrl,
        hasAbandonedCartNotice,
        abandonedCartItemCount,
        restoreAbandonedCart,
        dismissAbandonedCartNotice,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
