import { Flag } from 'lucide-react';
import { ReportForm } from './ReportForm';
import { ReportList } from './ReportList';

export function Reports() {
  return (
    <section id="reports" className="relative py-24 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px]" />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">
            Player Reports
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            Report a Player
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See something wrong? Submit a report and our moderation team will look
            into it. Browse recent reports below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <ReportForm />
          <div>
            <div className="flex items-center gap-2 mb-4 px-1">
              <Flag className="w-4 h-4 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Recent Reports</h3>
            </div>
            <ReportList />
          </div>
        </div>
      </div>
    </section>
  );
}
