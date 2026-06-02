import { HelpCircle, Activity, AlertTriangle } from 'lucide-react';

const supportCards = [
  {
    icon: <HelpCircle className="w-6 h-6" />,
    title: 'Encryption Metrics',
    description: 'AES-256-GCM + X25519 key exchange. Verify fingerprints in settings.',
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: 'Troubleshoot Handshake Delays',
    description: 'NAT traversal fallback: enable relay fallback & check Signal strength.',
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: 'Initiating Remote Wipe',
    description: 'Send wipe command via companion device or secret panic code.',
  },
];

export default function SupportDeskMatrix() {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-6">
      {supportCards.map((card, i) => (
        <div key={i} className="bg-darkBg/60 border border-electricCyan/30 rounded-xl p-5 backdrop-blur-sm hover:border-neonBlue/80 transition">
          <div className="text-neonBlue mb-3">{card.icon}</div>
          <h4 className="text-lg font-bold text-whitePure mb-2">{card.title}</h4>
          <p className="text-sm text-offWhite/70">{card.description}</p>
          <button className="mt-4 text-xs text-neonBlue hover:underline">Learn more →</button>
        </div>
      ))}
    </div>
  );
}
