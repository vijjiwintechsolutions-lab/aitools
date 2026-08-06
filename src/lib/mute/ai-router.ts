import { ToolExecutionResponse } from '@/types/mute';

export async function executeAiTool(
  prompt: string,
  model: string = 'google/gemini-2.0-flash-001'
): Promise<ToolExecutionResponse> {
  const startTime = Date.now();
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      error: 'OPENROUTER_API_KEY environment variable is not configured on Vercel.',
    };
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://market1.app',
        'X-Title': 'Market1 Platform',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: 'You are Sandy AI, the core intelligent assistant of Market1 platform. Provide concise, accurate, and structured responses.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `AI Provider responded with status ${response.status}`);
    }

    const data = await response.json();
    const replyText = data.choices?.[0]?.message?.content || 'No response generated from AI.';

    return {
      success: true,
      data: replyText,
      executionTimeMs: Date.now() - startTime,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'AI Router processing failed.';
    return {
      success: false,
      error: message,
      executionTimeMs: Date.now() - startTime,
    };
  }
}
