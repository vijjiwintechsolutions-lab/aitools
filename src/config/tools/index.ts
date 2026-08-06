import { ToolConfig } from '@/types/mute';
import { prioritySSSTools } from './priority-sss';

export const toolRegistry: Record<string, ToolConfig> = {
  ...prioritySSSTools,
};

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return toolRegistry[slug];
}

export function getAllTools(): ToolConfig[] {
  return Object.values(toolRegistry);
}

export function getToolsByCategory(category: string): ToolConfig[] {
  return getAllTools().filter((tool) => tool.category === category);
}
