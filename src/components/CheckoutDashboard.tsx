'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/clientApp';
import ProStatusModal from './ProStatusModal';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutDashboard() {
  const { user, isPremium, userUid } = useAuth();
  const [promoCode, setPromoCode] = useState('');
  const [loadingPromo, setLoadingPromo] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [loadingStripe, setLoadingStripe] = useState(false);

  useEffect(() => {
    if (isPremium && userUid) {
      setShowProModal(true);
    }
  }, [isPremium, userUid]);

  const handleStripeCheckout = async () => {
    if (!user) return toast.error('Authentication required');
    setLoadingStripe(true);
    try {
      const res = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.uid }),
      });
      const { sessionId, error } = await res.json();
      if (error) throw new Error(error);
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId });
    } catch (err: any) {
      toast.error(err.message || 'Checkout error');
    } finally {
      setLoadingStripe(false);
    }
  };

  const handlePromoActivation = async () => {
    if (!promoCode.trim()) return toast.error('Enter promo code');
    if (!user) return toast.error('Login required');
    setLoadingPromo(true);
    try {
      const idToken = await user.getIdToken();
      const res = await fetch('/api/apply-promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ promoCode: promoCode.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid code');
      toast.success('Promo activated! Premium unlocked.');
      await updateDoc(doc(db, 'users', user.uid), { isPremium: true });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoadingPromo(false);
    }
  };

  if (!user) return null;

  return (
    <div className="glass-card p-6 mt-8 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-neonBlue flex items-center gap-2">⚡ Activate Shadow Pro</h2>
      <p className="text-sm mb-5">Upgrade for full end-to-end stealth mesh & zero-log network.</p>

      <div className="space-y-6">
        <div className="border-b border-neonBlue/20 pb-4">
          <h3 className="text-xl font-semibold mb-3">💳 Stripe Secure Payment (GBP)</h3>
          <button
            onClick={handleStripeCheckout}
            disabled={loadingStripe}
            className="btn-primary w-full flex justify-center items-center gap-2"
          >
            {loadingStripe ? 'Initializing...' : 'Upgrade to Pro — £9.99/month'}
          </button>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">🎟️ Promo / Activation Code</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter secret code"
              className="input-dark flex-1"
            />
            <button onClick={handlePromoActivation} disabled={loadingPromo} className="btn-outline">
              {loadingPromo ? 'Verifying...' : 'Redeem'}
            </button>
          </div>
          <p className="text-xs text-offWhite/50 mt-2">Try "SHADOW2026" for instant lifetime activation.</p>
        </div>
      </div>
      <ProStatusModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  );
}
