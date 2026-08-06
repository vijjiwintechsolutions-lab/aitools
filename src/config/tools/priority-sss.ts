import { ToolConfig } from '@/types/mute';

export const prioritySSSTools: Record<string, ToolConfig> = {
  'pdf-merge': {
    id: 'pdf-merge',
    name: 'PDF Merge',
    slug: 'pdf-merge',
    category: 'Document Hub',
    subCategory: 'PDF Utilities',
    priority: 'SSS',
    engine: 'backend',
    processor: 'pdf-lib',
    accept: ['pdf'],
    output: ['pdf'],
    multipleInputs: true,
    requiresWallet: false,
    requiresAuth: false,
    options: [
      {
        id: 'sortOrder',
        label: 'Sort Order',
        type: 'select',
        defaultValue: 'asc',
        options: [
          { label: 'Ascending', value: 'asc' },
          { label: 'Descending', value: 'desc' }
        ]
      }
    ],
    seo: {
      title: 'Merge PDF Files Online - Free PDF Joiner',
      description: 'Combine multiple PDF files into one single document instantly.',
      keywords: ['pdf merge', 'combine pdf', 'join pdf files', 'free pdf merger']
    }
  },

  'image-compressor': {
    id: 'image-compressor',
    name: 'Image Compressor',
    slug: 'image-compressor',
    category: 'Media Hub',
    subCategory: 'Image Utilities',
    priority: 'SSS',
    engine: 'backend',
    processor: 'sharp',
    accept: ['jpg', 'jpeg', 'png', 'webp'],
    output: ['jpg', 'png', 'webp'],
    multipleInputs: false,
    requiresWallet: false,
    requiresAuth: false,
    options: [
      {
        id: 'quality',
        label: 'Compression Quality',
        type: 'slider',
        defaultValue: 80,
        min: 10,
        max: 100,
        step: 5
      },
      {
        id: 'format',
        label: 'Output Format',
        type: 'select',
        defaultValue: 'webp',
        options: [
          { label: 'WEBP', value: 'webp' },
          { label: 'JPG', value: 'jpg' },
          { label: 'PNG', value: 'png' }
        ]
      }
    ],
    seo: {
      title: 'Compress Image Online - Reduce File Size',
      description: 'Compress PNG, JPG, WEBP images without quality loss.',
      keywords: ['image compressor', 'reduce photo size', 'compress jpg', 'compress png']
    }
  },

  'qr-generator': {
    id: 'qr-generator',
    name: 'QR Code Generator',
    slug: 'qr-generator',
    category: 'Utility Hub',
    subCategory: 'Browser Tools',
    priority: 'SSS',
    engine: 'browser',
    processor: 'qrcode',
    accept: ['txt'],
    output: ['png', 'svg'],
    multipleInputs: false,
    requiresWallet: false,
    requiresAuth: false,
    options: [
      {
        id: 'size',
        label: 'QR Code Size (px)',
        type: 'number',
        defaultValue: 300
      },
      {
        id: 'margin',
        label: 'Margin Space',
        type: 'slider',
        defaultValue: 2,
        min: 0,
        max: 10,
        step: 1
      }
    ],
    seo: {
      title: 'Free QR Code Generator Online',
      description: 'Generate high resolution QR codes for text, URLs and contacts.',
      keywords: ['qr code generator', 'make qr code', 'custom qr code', 'free qr maker']
    }
  },

  'word-counter': {
    id: 'word-counter',
    name: 'Word Counter',
    slug: 'word-counter',
    category: 'Utility Hub',
    subCategory: 'Text Utilities',
    priority: 'SSS',
    engine: 'browser',
    processor: 'browser-js',
    accept: ['txt'],
    output: ['json'],
    multipleInputs: false,
    requiresWallet: false,
    requiresAuth: false,
    options: [],
    seo: {
      title: 'Word Counter Online - Count Words & Characters',
      description: 'Instant word count, character count, paragraph count and reading time estimator.',
      keywords: ['word counter', 'character counter', 'count words', 'text analysis']
    }
  },

  'chat-ai': {
    id: 'chat-ai',
    name: 'Sandy AI Chat',
    slug: 'chat-ai',
    category: 'AI Hub',
    subCategory: 'AI Assistant',
    priority: 'SSS',
    engine: 'ai',
    processor: 'openrouter',
    accept: ['txt'],
    output: ['txt'],
    multipleInputs: false,
    requiresWallet: true,
    requiresAuth: true,
    options: [
      {
        id: 'model',
        label: 'AI Model',
        type: 'select',
        defaultValue: 'google/gemini-2.0-flash-001',
        options: [
          { label: 'Gemini 2.0 Flash', value: 'google/gemini-2.0-flash-001' },
          { label: 'DeepSeek R1', value: 'deepseek/deepseek-r1' },
          { label: 'Llama 3.3 70B', value: 'meta-llama/llama-3.3-70b-instruct' }
        ]
      }
    ],
    seo: {
      title: 'Sandy AI - Advanced AI Assistant Engine',
      description: 'Chat with top AI models from Google, DeepSeek, and Meta on Market1.',
      keywords: ['ai chat', 'gemini 2.0', 'deepseek r1', 'market1 ai']
    }
  }
};
