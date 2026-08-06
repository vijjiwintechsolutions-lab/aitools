'use client';

import { InputFormat } from '@/types/mute';
import { FileUp, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

interface UniversalUploadProps {
  accept: InputFormat[];
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
}

export default function UniversalUpload({
  accept,
  multiple = false,
  onFilesSelected,
}: UniversalUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const acceptedMimeTypes = accept
    .map((ext) => {
      if (ext === 'pdf') return 'application/pdf';
      if (['jpg', 'jpeg', 'png', 'webp'].includes(ext)) return `image/${ext === 'jpg' ? 'jpeg' : ext}`;
      if (ext === 'txt') return 'text/plain';
      return `.${ext}`;
    })
    .join(',');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newFiles = multiple ? [...selectedFiles, ...filesArray] : [filesArray[0]];
      setSelectedFiles(newFiles);
      onFilesSelected(newFiles);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const filesArray = Array.from(e.dataTransfer.files);
      const newFiles = multiple ? [...selectedFiles, ...filesArray] : [filesArray[0]];
      setSelectedFiles(newFiles);
      onFilesSelected(newFiles);
    }
  };

  const removeFile = (index: number) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updated);
    onFilesSelected(updated);
  };

  return (
    <div className="w-full space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
        }`}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          multiple={multiple}
          accept={acceptedMimeTypes}
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload" className="cursor-pointer block">
          <FileUp className="w-10 h-10 mx-auto text-blue-400 mb-3" />
          <p className="text-white font-medium mb-1">
            Drag & drop files here, or <span className="text-blue-400 underline">browse</span>
          </p>
          <p className="text-xs text-slate-500 uppercase font-mono">
            Supported formats: {accept.join(', ')}
          </p>
        </label>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Selected Files ({selectedFiles.length})
          </p>
          <div className="space-y-1.5">
            {selectedFiles.map((file, idx) => (
              <div
                key={`${file.name}-${idx}`}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800 text-sm"
              >
                <div className="truncate pr-4">
                  <p className="text-white truncate font-medium">{file.name}</p>
                  <p className="text-xs text-slate-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="p-1.5 text-slate-500 hover:text-red-400 rounded-md transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
