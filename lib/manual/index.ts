import { foundationChapters } from './foundation';
import { baseGenerationChapters } from './base-generation';
import { peoplePplChapters } from './people-ppl';
import { finalPipelineChapters } from './final-pipeline';
import { Chapter } from './types';

export const allChapters: Chapter[] = [
  ...foundationChapters,
  ...baseGenerationChapters,
  ...peoplePplChapters,
  ...finalPipelineChapters
].sort((a, b) => a.order - b.order);

export function getChapterBySlug(slug: string): Chapter | undefined {
  return allChapters.find((ch) => ch.id === slug);
}