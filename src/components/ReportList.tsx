import { useEffect, useState } from 'react';
import { Loader2, FileWarning, Clock, Eye, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Report } from '@/lib/types';

const statusConfig: Record<string, { label: string; icon: typeof Clock; color: string }> = {
  pending: { label: 'Pending', icon: Clock, color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
  reviewing: { label: 'Reviewing', icon: Eye, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  resolved: { label: 'Resolved', icon: CheckCircle2, color: 'text-green-400 bg-green-500/10 border-green-500/20' },
};

const categoryLabels: Record<string, string> = {
  cheating: 'Cheating',
  toxicity: 'Toxicity',
  spam: 'Spam',
  other: 'Other',
};

export function ReportList() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (!error && data) setReports(data as Report[]);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <FileWarning className="w-10 h-10 text-gray-600 mb-3" />
        <p className="text-gray-500 text-sm">No reports yet. The community is behaving well.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reports.map((r) => {
        const sc = statusConfig[r.status] ?? statusConfig.pending;
        const StatusIcon = sc.icon;
        return (
          <div
            key={r.id}
            className="p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-cyan-500/15 transition-colors"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-white">
                  {r.reported_player}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {categoryLabels[r.category] ?? r.category}
                </span>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${sc.color}`}
              >
                <StatusIcon className="w-3.5 h-3.5" />
                {sc.label}
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-2">{r.description}</p>
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <span>Reported by {r.reporter_name}</span>
              <span>·</span>
              <span>{new Date(r.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
