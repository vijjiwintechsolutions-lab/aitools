import UniversalUpload from '@/components/mute/UniversalUpload';
import { getToolBySlug, toolRegistry } from '@/config/tools';
import { processToolRequest } from '@/lib/mute/processing-router';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) return { title: 'Tool Not Found - Market1' };

  return {
    title: `${tool.seo.title} | Market1`,
    description: tool.seo.description,
    keywords: tool.seo.keywords,
  };
}

export function generateStaticParams() {
  return Object.values(toolRegistry).map((tool) => ({
    slug: tool.slug,
  }));
}

export default async function DynamicToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  async function handleExecutionAction(formData: FormData) {
    'use server';
    return await processToolRequest(tool!.id, formData);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-3 border border-blue-500/20">
          {tool.category} / {tool.subCategory}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">{tool.name}</h1>
        <p className="text-slate-400 text-base">{tool.seo.description}</p>
      </header>

      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
        <form action={async (formData) => {
          'use server';
          await handleExecutionAction(formData);
        }} className="space-y-6">
          {tool.accept.includes('txt') && tool.engine === 'browser' ? (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Input Text Content
              </label>
              <textarea
                name="text"
                rows={5}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 text-sm"
                placeholder="Enter text here..."
              />
            </div>
          ) : (
            <UniversalUpload
              accept={tool.accept}
              multiple={tool.multipleInputs}
              onFilesSelected={() => {}}
            />
          )}

          {tool.options.length > 0 && (
            <div className="border-t border-slate-800 pt-6 space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Tool Options
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tool.options.map((opt) => (
                  <div key={opt.id} className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-medium">{opt.label}</label>
                    {opt.type === 'select' ? (
                      <select
                        name={opt.id}
                        defaultValue={String(opt.defaultValue)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      >
                        {opt.options?.map((o) => (
                          <option key={String(o.value)} value={String(o.value)}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={opt.type === 'slider' || opt.type === 'number' ? 'number' : 'text'}
                        name={opt.id}
                        defaultValue={String(opt.defaultValue)}
                        min={opt.min}
                        max={opt.max}
                        step={opt.step}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.99]"
          >
            Process & Generate
          </button>
        </form>
      </div>
    </div>
  );
}
