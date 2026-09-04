import React from 'react';
import { Chapter } from './types';

export const finalPipelineChapters: Chapter[] = [
  {
    id: 'main-flux',
    title: 'Main FLUX Refinement',
    category: 'FINAL PIPELINE',
    order: 200,
    status: 'CONFIRMED',
    content: (
      <div className="space-y-4">
        <p>Главный возврат из PPL-модуля и финальная отрисовка во FLUX img2img:</p>
        <div className="bg-gray-900 p-4 rounded font-mono text-green-400">
          Main FLUX return: 459 → 573 → 67 → 57 → 53
        </div>
      </div>
    )
  },
  {
    id: 'upscale-overlay',
    title: 'Upscale, Tiling & Logo',
    category: 'FINAL PIPELINE',
    order: 210,
    status: 'CONFIRMED',
    content: (
      <div className="space-y-4">
        <p><strong>Внимание:</strong> Блок HQ/upscale/overlay processing полностью сохранён в графе, но в данный момент переведён в режим <span className="font-mono text-gray-400">mode=4 (Bypassed)</span>.</p>
      </div>
    )
  },
  {
    id: 'output',
    title: 'Output & Comparers',
    category: 'FINAL PIPELINE',
    order: 220,
    status: 'CONFIRMED',
    content: (
      <div className="space-y-4">
        <p>Текущий основной вывод графа (LQ output): <strong className="text-green-400 font-mono">53 → 730</strong>.</p>
        <p>Ноды 531 (HQ) и 293 зависят от отключенного апскейлера (833), поэтому финальное сохранение происходит на этапе 730.</p>
        <div className="bg-yellow-900/30 border-l-4 border-yellow-500 p-4 mt-4 text-yellow-200 text-sm">
          <strong>NOT CONFIRMED:</strong> Topology не доказывает визуальное качество или фактическое присутствие людей в конкретном runtime render.
        </div>
      </div>
    )
  }
];