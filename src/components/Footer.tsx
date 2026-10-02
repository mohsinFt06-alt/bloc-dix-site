import { Gamepad2, ArrowUp } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative border-t border-cyan-500/10 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Gamepad2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-white">
              Bloc<span className="text-cyan-400"> Dix</span>
            </span>
          </div>

          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Bloc Dix Gaming Server. All rights reserved.
          </p>

          <a
            href="#home"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
