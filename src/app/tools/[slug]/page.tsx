import ToolForm from '@/components/mute/ToolForm';
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
        <ToolForm tool={tool} executeAction={handleExecutionAction} />
      </div>
    </div>
  );
}
