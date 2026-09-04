import React from 'react';
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
];