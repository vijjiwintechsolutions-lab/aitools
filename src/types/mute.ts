export type EngineType = 'browser' | 'backend' | 'ai' | 'hybrid';

export type ProcessorType = 
  | 'sharp' 
  | 'pdf-lib' 
  | 'ffmpeg' 
  | 'canvas' 
  | 'qrcode' 
  | 'openrouter' 
  | 'fal-ai' 
  | 'browser-js';

export type InputFormat = 'png' | 'jpg' | 'jpeg' | 'webp' | 'pdf' | 'mp4' | 'mp3' | 'txt' | 'json';
export type OutputFormat = 'png' | 'jpg' | 'webp' | 'pdf' | 'mp4' | 'mp3' | 'txt' | 'json' | 'svg';

export interface ToolOption {
  id: string;
  label: string;
  type: 'select' | 'slider' | 'switch' | 'text' | 'number';
  defaultValue: string | number | boolean;
  options?: { label: string; value: string | number }[];
  min?: number;
  max?: number;
  step?: number;
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
}

export interface ToolConfig {
  id: string;
  name: string;
  slug: string;
  category: string;
  subCategory: string;
  priority: 'SSS' | 'SS' | 'S' | 'A' | 'B' | 'C';
  engine: EngineType;
  processor: ProcessorType;
  accept: InputFormat[];
  output: OutputFormat[];
  multipleInputs: boolean;
  options: ToolOption[];
  requiresWallet: boolean;
  requiresAuth: boolean;
  seo: SEOConfig;
}

export interface ToolExecutionResponse {
  success: boolean;
  data?: string | Buffer | object;
  downloadUrl?: string;
  mimeType?: string;
  error?: string;
  executionTimeMs?: number;
}
