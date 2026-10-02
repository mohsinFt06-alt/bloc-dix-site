import { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { ReportCategory, ReportInput } from '@/lib/types';

const categories: { value: ReportCategory; label: string }[] = [
  { value: 'cheating', label: 'Cheating / Hacking' },
  { value: 'toxicity', label: 'Toxicity / Harassment' },
  { value: 'spam', label: 'Spam / Advertising' },
  { value: 'other', label: 'Other' },
];

const emptyForm: ReportInput = {
  reporter_name: '',
  reported_player: '',
  category: 'cheating',
  description: '',
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ReportForm() {
  const [form, setForm] = useState<ReportInput>(emptyForm);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const { error } = await supabase.from('reports').insert({
      reporter_name: form.reporter_name.trim(),
      reported_player: form.reported_player.trim(),
      category: form.category,
      description: form.description.trim(),
    });

    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again in a moment.');
      return;
    }

    setStatus('success');
    setForm(emptyForm);
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <div className="p-6 md:p-8 rounded-2xl border border-cyan-500/15 bg-white/[0.02] border-glow">
      <h3 className="text-xl font-bold text-white mb-1">Submit a Report</h3>
      <p className="text-sm text-gray-400 mb-6">
        Provide as much detail as possible. Our moderation team reviews every report.
      </p>

      {status === 'success' && (
        <div className="mb-5 flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          Report submitted successfully. Thank you for helping keep Bloc Dix fair.
        </div>
      )}

      {status === 'error' && (
        <div className="mb-5 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Name
            </label>
            <input
              type="text"
              required
              minLength={2}
              maxLength={50}
              value={form.reporter_name}
              onChange={(e) => setForm({ ...form, reporter_name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#0d0d14] border border-white/10 text-white placeholder-gray-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-colors"
              placeholder="Your in-game name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Reported Player
            </label>
            <input
              type="text"
              required
              minLength={2}
              maxLength={50}
              value={form.reported_player}
              onChange={(e) => setForm({ ...form, reported_player: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#0d0d14] border border-white/10 text-white placeholder-gray-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-colors"
              placeholder="Player to report"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Category
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as ReportCategory })}
            className="w-full px-4 py-3 rounded-xl bg-[#0d0d14] border border-white/10 text-white focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-colors"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value} className="bg-[#0d0d14]">
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            required
            minLength={10}
            maxLength={500}
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[#0d0d14] border border-white/10 text-white placeholder-gray-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-colors resize-none"
            placeholder="Describe what happened, when, and any evidence you have..."
          />
          <p className="text-xs text-gray-600 mt-1.5 text-right">
            {form.description.length}/500
          </p>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Report
            </>
          )}
        </button>
      </form>
    </div>
  );
}
