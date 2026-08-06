import { executeBackendTool } from '@/app/actions/execute-tool';
import { toolRegistry } from '@/config/tools';
import { ToolExecutionResponse } from '@/types/mute';
import QRCode from 'qrcode';

export async function processToolRequest(
  toolId: string,
  formData: FormData,
  textInput?: string
): Promise<ToolExecutionResponse> {
  const startTime = Date.now();
  const config = toolRegistry[toolId];

  if (!config) {
    return { success: false, error: `Tool ${toolId} configuration not found.` };
  }

  if (config.engine === 'browser') {
    try {
      if (config.processor === 'qrcode') {
        const text = textInput || (formData.get('text') as string) || 'https://market1.app';
        const size = Number(formData.get('size')) || 300;
        const margin = Number(formData.get('margin')) || 2;

        const qrDataUrl = await QRCode.toDataURL(text, {
          width: size,
          margin,
        });

        return {
          success: true,
          downloadUrl: qrDataUrl,
          mimeType: 'image/png',
          executionTimeMs: Date.now() - startTime,
        };
      }

      if (config.processor === 'browser-js') {
        const text = textInput || (formData.get('text') as string) || '';
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const characters = text.length;
        const paragraphs = text.trim() ? text.split(/\n+/).length : 0;
        const readingTimeMinutes = Math.ceil(words / 200);

        return {
          success: true,
          data: { words, characters, paragraphs, readingTimeMinutes },
          executionTimeMs: Date.now() - startTime,
        };
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Browser processing error.';
      return { success: false, error: message };
    }
  }

  if (config.engine === 'backend') {
    return await executeBackendTool(toolId, formData);
  }

  if (config.engine === 'ai') {
    return {
      success: false,
      error: 'AI Provider integration route is initializing in next step.',
    };
  }

  return { success: false, error: 'Unsupported execution engine route.' };
}
