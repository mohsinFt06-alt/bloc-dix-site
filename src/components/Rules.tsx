import { Shield, Ban, AlertTriangle, Heart, Gamepad2, Scale } from 'lucide-react';

const rules = [
  {
    icon: Heart,
    title: 'Respect All Members',
    desc: 'Treat every player with respect. Harassment, discrimination, or personal attacks will not be tolerated.',
    severity: 'High',
  },
  {
    icon: Ban,
    title: 'No Cheating or Exploits',
    desc: 'Using hacks, exploits, or third-party tools to gain an unfair advantage results in a permanent ban.',
    severity: 'Critical',
  },
  {
    icon: AlertTriangle,
    title: 'No Spam or Self-Promo',
    desc: 'Keep chat clean. Unsolicited links, repetitive messages, and advertising are prohibited.',
    severity: 'Medium',
  },
  {
    icon: Gamepad2,
    title: 'Play Fair',
    desc: 'Intentional griefing, team-killing, or throwing matches ruins the experience for everyone.',
    severity: 'High',
  },
  {
    icon: Scale,
    title: 'Dispute Resolution',
    desc: 'If you have a dispute with another player, contact a moderator. Do not take matters into your own hands.',
    severity: 'Medium',
  },
  {
    icon: Shield,
    title: 'Moderator Decisions Are Final',
    desc: 'Moderators enforce the rules in good faith. Arguing or circumventing mod decisions will escalate penalties.',
    severity: 'High',
  },
];

const severityStyles: Record<string, string> = {
  Critical: 'bg-red-500/10 text-red-400 border-red-500/20',
  High: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
};

export function Rules() {
  return (
    <section id="rules" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">
            Community Guidelines
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            Server Rules
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            These rules keep Bloc Dix fair and fun for everyone. Breaking them
            can lead to warnings, mutes, or permanent bans.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rules.map((rule, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan-500/20 hover:bg-cyan-500/[0.02] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <rule.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${severityStyles[rule.severity]}`}
                >
                  {rule.severity}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{rule.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{rule.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
