'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface ProStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProStatusModal({ isOpen, onClose }: ProStatusModalProps) {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      toast.success('🚀 Pro Status Activated! Full stealth suite unlocked.', { duration: 4000 });
      const timer = setTimeout(() => {
        onClose();
        router.push('/');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-card max-w-md w-full p-8 text-center border-neonBlue shadow-[0_0_30px_rgba(72,202,228,0.4)] animate-in fade-in zoom-in duration-300">
        <div className="text-6xl mb-4">🚀</div>
        <h2 className="text-3xl font-bold text-neonBlue mb-2">Pro Status Active!</h2>
        <p className="text-offWhite/80 mb-6">Shadow Chat encrypted core — fully unlocked. Redirecting to bunker...</p>
        <div className="w-12 h-12 border-4 border-neonBlue/30 border-t-neonBlue rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}
