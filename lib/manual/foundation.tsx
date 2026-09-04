import React from 'react';
import { Chapter } from './types';

export const foundationChapters: Chapter[] = [
  {
    id: 'overview',
    title: 'Master Architecture',
    category: 'FOUNDATION',
    order: 10,
    status: 'CONFIRMED',
    content: (
      <div className="space-y-6">
        <div className="bg-red-900/30 border-l-4 border-red-500 p-4 text-red-200 text-sm">
          <strong>NOT CONFIRMED · Raw workflow is not bundled;</strong> documentation is based on the derived topology specification (HANSEN_WORKFLOW_SPEC.json).
        </div>
        <p>Полный маршрут активной генерации проходит через 16 логических групп графа:</p>
        <div className="bg-gray-900 p-4 rounded font-mono text-green-400">
          79 → 783 → SDXL 2/5/6/417/419/418/535/1/14 → 565 → 779 → PEOPLE/PPL → 459 → 573 → 67 → 57 → 53 → 730
        </div>
        <h3 className="text-xl font-bold text-yellow-500 mt-6">Bypassed Routes (mode=4)</h3>
        <ul className="list-disc pl-5">
          <li>Upscale: <span className="font-mono text-gray-400">53 → 834 → 833 → 531</span></li>
          <li>Logos: <span className="font-mono text-gray-400">833 → 848 → 849 → 15/293</span></li>
        </ul>
      </div>
    )
  },
  {
    id: 'control-panel',
    title: 'Controls & Mode Presets',
    category: 'FOUNDATION',
    order: 40,
    status: 'CONFIRMED',
    content: (
      <div className="space-y-4">
        <p>Критические переключатели, управляющие маршрутизацией графа:</p>
        <ul className="list-disc pl-5">
          <li><strong>Node 541 (Global Mode):</strong> Current: 1 (TXT+CNET2IMG). Фиксирует денойз на 1.0.</li>
          <li><strong>Node 543 (PPL Switch):</strong> Current: 1 (FLUX). Переопределяет виджет ноды 715.</li>
          <li><strong>Node 168 (SDXL/IPA):</strong> Current: 1 (Чистый SDXL).</li>
          <li><strong>Node 456 (ControlNet Source):</strong> Current: 1 (EXTRA).</li>
        </ul>
      </div>
    )
  }
];