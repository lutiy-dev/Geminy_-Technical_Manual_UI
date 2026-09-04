import React from 'react';
import { Chapter } from './types';

export const baseGenerationChapters: Chapter[] = [
  {
    id: 'controlnet',
    title: 'ControlNet & Preprocessors',
    category: 'BASE GENERATION',
    order: 80,
    status: 'NOT_CONFIRMED',
    content: (
      <div className="space-y-6">
        <p>Стек накладывается последовательно: <strong>417 (Depth) → 419 (Canny) → 418 (Apply)</strong>.</p>
        <div className="bg-yellow-900/30 border-l-4 border-yellow-500 p-4 text-yellow-200 text-sm">
          <strong>Errata (Canny Source Discrepancy):</strong><br/>
          Старый документ утверждает, что нода 25 используется как внешний источник Canny через 732. Однако топология графа показывает иное:
          <ul className="list-disc pl-5 mt-2 font-mono">
            <li>Canny input 1: 79 → 785 → 732</li>
            <li>Canny preprocessed: 79 → 165 → 732</li>
          </ul>
          До появления Raw Workflow утверждение «external Canny = node 25» считается неподтвержденным.
        </div>
      </div>
    )
  }
];