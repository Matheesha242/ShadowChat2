import { Shield, Network, Fingerprint, Trash2 } from 'lucide-react';

const features = [
  {
    icon: <Network className="w-8 h-8 text-neonBlue" />,
    title: 'Stealth Mode Routing',
    desc: 'Traffic camouflage via multi-hop obfuscation & randomized egress nodes.',
  },
  {
    icon: <Shield className="w-8 h-8 text-neonBlue" />,
    title: 'P2P Encrypted Handshakes',
    desc: 'Quantum-resistant handshake protocol with ephemeral session keys.',
  },
  {
    icon: <Fingerprint className="w-8 h-8 text-neonBlue" />,
    title: 'Decoy PIN Caches',
    desc: 'Plausible deniability: alternate PIN reveals fake data pools.',
  },
  {
    icon: <Trash2 className="w-8 h-8 text-neonBlue" />,
    title: 'Covert Anti-Forensic Shredder',
    desc: 'Military-grade file shredder + RAM wipe on session termination.',
  },
];

export default function FeatureMatrix() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {features.map((f, idx) => (
        <div key={idx} className="glass-card p-5 hover:neon-border transition-all duration-300 hover:-translate-y-1 group">
          <div className="mb-4">{f.icon}</div>
          <h3 className="text-xl font-bold text-whitePure mb-2 group-hover:text-neonBlue transition">{f.title}</h3>
          <p className="text-sm text-offWhite/80">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
