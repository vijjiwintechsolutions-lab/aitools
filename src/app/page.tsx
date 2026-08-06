import { toolRegistry } from '@/config/tools';
import { Cpu, Sparkles } from 'lucide-react';

export default function HomePage() {
  const tools = Object.values(toolRegistry);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          Market1 Universal Tool Engine (MUTE) v1.0
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
          One Platform. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Every Tool.</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Enterprise-grade AI, document processing, and utility platform powered by configuration-driven engine architecture.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-blue-400" />
          Priority SSS Core Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all shadow-lg hover:shadow-blue-500/5 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {tool.category}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 uppercase">
                  {tool.engine}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {tool.name}
              </h3>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                {tool.seo.description}
              </p>
              <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/80 pt-4">
                <span>Processor: {tool.processor}</span>
                <span>Formats: {tool.accept.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
