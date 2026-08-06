import { Cpu, Layers, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-white block leading-none">
              MARKET1
            </span>
            <span className="text-[10px] font-mono text-blue-400 tracking-widest uppercase">
              Project Atlas
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/tools/chat-ai"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold hover:bg-indigo-500/20 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sandy AI</span>
          </Link>

          <Link
            href="/tools/pdf-merge"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>All Tools</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
