'use client';

import UniversalUpload from '@/components/mute/UniversalUpload';
import { ToolConfig, ToolExecutionResponse } from '@/types/mute';
import { AlertCircle, CheckCircle2, Download, Loader2, RefreshCw } from 'lucide-react';
import React, { useState } from 'react';

interface ToolFormProps {
  tool: ToolConfig;
  executeAction: (formData: FormData) => Promise<ToolExecutionResponse>;
}

export default function ToolForm({ tool, executeAction }: ToolFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [textInput, setTextInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ToolExecutionResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const formData = new FormData(e.currentTarget);

      if (tool.accept.includes('txt') && tool.engine === 'browser') {
        formData.set('text', textInput);
      } else {
        if (tool.multipleInputs) {
          files.forEach((file) => formData.append('files', file));
        } else if (files.length > 0) {
          formData.set('file', files[0]);
        }
      }

      const response = await executeAction(formData);
      setResult(response);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Execution failed';
      setResult({ success: false, error: msg });
    } font-medium {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {tool.accept.includes('txt') && tool.engine === 'browser' ? (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Input Text Content
            </label>
            <textarea
              name="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              rows={5}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 text-sm"
              placeholder="Enter or paste text here..."
            />
          </div>
        ) : (
          <UniversalUpload
            accept={tool.accept}
            multiple={tool.multipleInputs}
            onFilesSelected={(selectedFiles) => setFiles(selectedFiles)}
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
          disabled={isLoading}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-5 h-5" />
              <span>Process & Generate</span>
            </>
          )}
        </button>
      </form>

      {/* Result Preview & Download Engine */}
      {result && (
        <div className="mt-8 border-t border-slate-800 pt-6">
          {result.success ? (
            <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Processing completed in {result.executionTimeMs || 0}ms</span>
              </div>

              {/* Browser Analytics / JSON Result */}
              {result.data && (
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                  <pre>{JSON.stringify(result.data, null, 2)}</pre>
                </div>
              )}

              {/* File Download Result */}
              {result.downloadUrl && (
                <div className="space-y-4">
                  {result.mimeType?.startsWith('image/') && (
                    <div className="flex justify-center p-4 bg-slate-950 rounded-lg border border-slate-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={result.downloadUrl}
                        alt="Result Preview"
                        className="max-h-64 object-contain rounded"
                      />
                    </div>
                  )}

                  <a
                    href={result.downloadUrl}
                    download={`market1_${tool.slug}_output`}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-emerald-600/20"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Result</span>
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{result.error || 'An unexpected error occurred during processing.'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
