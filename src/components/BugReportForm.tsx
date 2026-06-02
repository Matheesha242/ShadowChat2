'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase/clientApp';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

export default function BugReportForm() {
  const [mobileUserId, setMobileUserId] = useState('');
  const [category, setCategory] = useState('Crash');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileUserId.trim() || !description.trim()) {
      toast.error('User ID and description are required');
      return;
    }
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'bug_reports'), {
        mobileUserId,
        category,
        description,
        timestamp: serverTimestamp(),
        status: 'pending',
      });
      toast.success('Bug report submitted securely');
      setMobileUserId('');
      setDescription('');
      setCategory('Crash');
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit report');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-2xl font-bold text-neonBlue mb-2">Report App Anomalies / Bugs</h3>
      <p className="text-sm text-offWhite/70 mb-5">Help us fortify the bunker — reports are encrypted end-to-end.</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-2">Mobile UserID</label>
          <input
            type="text"
            value={mobileUserId}
            onChange={(e) => setMobileUserId(e.target.value)}
            className="input-dark"
            placeholder="shadow_user_1337"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-dark bg-darkBg"
          >
            <option value="Crash">💥 Crash / Freeze</option>
            <option value="Leak">🔓 Data Leak Suspicion</option>
            <option value="UI Artifact">👾 UI Artifact / Glitch</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-dark resize-none"
            placeholder="Detailed steps to reproduce..."
            required
          />
        </div>
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? 'Sending...' : 'Submit to Shadow Labs'}
        </button>
      </form>
    </div>
  );
}
