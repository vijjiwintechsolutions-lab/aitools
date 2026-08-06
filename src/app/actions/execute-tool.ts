'use server';

import { toolRegistry } from '@/config/tools';
import { ToolExecutionResponse } from '@/types/mute';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

export async function executeBackendTool(
  toolId: string,
  formData: FormData
): Promise<ToolExecutionResponse> {
  const startTime = Date.now();
  const config = toolRegistry[toolId];

  if (!config) {
    return {
      success: false,
      error: `Tool ID '${toolId}' not found in MUTE Registry.`,
    };
  }

  try {
    if (config.processor === 'sharp') {
      const file = formData.get('file') as File | null;
      if (!file) {
        return { success: false, error: 'No file provided for image processing.' };
      }

      const quality = Number(formData.get('quality')) || 80;
      const targetFormat = (formData.get('format') as string) || 'webp';
      const arrayBuffer = await file.arrayBuffer();
      const inputBuffer = Buffer.from(arrayBuffer);

      let processedBuffer: Buffer;

      if (targetFormat === 'jpg' || targetFormat === 'jpeg') {
        processedBuffer = await sharp(inputBuffer).jpeg({ quality }).toBuffer();
      } else if (targetFormat === 'png') {
        processedBuffer = await sharp(inputBuffer).png({ quality }).toBuffer();
      } else {
        processedBuffer = await sharp(inputBuffer).webp({ quality }).toBuffer();
      }

      const base64Data = processedBuffer.toString('base64');
      const mimeType = `image/${targetFormat === 'jpg' ? 'jpeg' : targetFormat}`;

      return {
        success: true,
        downloadUrl: `data:${mimeType};base64,${base64Data}`,
        mimeType,
        executionTimeMs: Date.now() - startTime,
      };
    }

    if (config.processor === 'pdf-lib') {
      const files = formData.getAll('files') as File[];
      if (!files || files.length < 2) {
        return { success: false, error: 'Please upload at least 2 PDF files to merge.' };
      }

      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const base64Data = Buffer.from(pdfBytes).toString('base64');
      const mimeType = 'application/pdf';

      return {
        success: true,
        downloadUrl: `data:${mimeType};base64,${base64Data}`,
        mimeType,
        executionTimeMs: Date.now() - startTime,
      };
    }

    return {
      success: false,
      error: `Processor '${config.processor}' is not implemented on backend.`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown backend processing error.';
    return {
      success: false,
      error: message,
      executionTimeMs: Date.now() - startTime,
    };
  }
}
