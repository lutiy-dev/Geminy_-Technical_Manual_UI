const fs = require('fs');
const path = require('path');

const files = {
    // 1. Модуль PEOPLE / PPL
    'lib/manual/people-ppl.tsx': `import React from 'react';
import { Chapter } from './types';

export const peoplePplChapters: Chapter[] = [
  {
    id: 'node-408-prompt',
    title: 'Node 408 Prompt',
    category: 'PEOPLE / PPL · MODULE',
    order: 120,
    status: 'CONFIRMED',
    content: (
      <div className="space-y-4">
        <p><strong>Node 408 = PROMPT PPL FLUX.</strong> Отвечает за генерацию стаффажа. Глобальные строки из 799 (ENVIRONMENT) и 800 (LIGHT, STYLE) используются здесь повторно через сборку в нодах 820-825.</p>
      </div>
    )
  },
  {
    id: 'selector-logic',
    title: 'Selector Logic',
    category: 'PEOPLE / PPL · MODULE',
    order: 160,
    status: 'CONFIRMED',
    content: (
      <div className="space-y-4">
        <p>Логика селекторов и маршрутизации:</p>
        <ul className="list-disc pl-5">
          <li><strong>Node 543 (PPL Selector)</strong> = 1 (FLUX). Это текущий активный PEOPLE mode.</li>
          <li><strong>Node 715 (Return / Downstream Selector)</strong> является <em>вложенным</em> source selector перед node 552, а не самостоятельным финальным output.</li>
          <li className="text-yellow-500 font-bold">Linked control от node 543 переопределяет видимое widget value (2) внутри 715! То есть фактически там сейчас 1.</li>
        </ul>
      </div>
    )
  }
];`,

    // 2. Модуль FINAL PIPELINE
    'lib/manual/final-pipeline.tsx': `import React from 'react';
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
];`,

    // 3. Обновляем Агрегатор, чтобы он увидел новые файлы
    'lib/manual/index.ts': `import { foundationChapters } from './foundation';
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
}`
};

Object.entries(files).forEach(([filepath, content]) => {
    fs.writeFileSync(path.join(__dirname, filepath), content, 'utf8');
    console.log('✅ Добавлен контент: ' + filepath);
});
console.log('🚀 Все модули из ТЗ загружены!');