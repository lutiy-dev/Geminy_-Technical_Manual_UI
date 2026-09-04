const fs = require('fs');
const path = require('path');

const projectStructure = [
    'app/[slug]',
    'app/Technical_Manual_UI/[slug]',
    'lib/manual',
    'components'
];

// Создаем папки, если их нет
projectStructure.forEach(dir => {
    fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
});

const files = {
    // 1. Глобальный Layout с новыми метаданными
    'app/layout.tsx': `import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lutiy-dev.github.io/Technical_Manual_UI/';

export const metadata: Metadata = {
  title: 'EPSPOZICIYA ARCHVIZ · TECHNICAL WORKFLOW MANUAL',
  description: 'Полный технический учебник по Epspoziciya_archviz_ph_sdxlflux_v001. Based on the Paul Hansen workflow · Unofficial technical documentation.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'EPSPOZICIYA ARCHVIZ · TECHNICAL WORKFLOW MANUAL',
    description: 'Полный технический учебник по Epspoziciya_archviz_ph_sdxlflux_v001.',
    url: SITE_URL,
    siteName: 'EPS · Manual',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}`,

    // 2. Статический Routing (основной)
    'app/[slug]/page.tsx': `import { allChapters, getChapterBySlug } from '@/lib/manual';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return allChapters.map((chapter) => ({ slug: chapter.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const chapter = getChapterBySlug(params.slug);
  if (!chapter) return {};
  
  return { 
    title: chapter.title + ' · EPSPOZICIYA ARCHVIZ Manual' 
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const chapter = getChapterBySlug(params.slug);
  if (!chapter) notFound();

  return (
    <div className="p-8 max-w-4xl mx-auto text-gray-200">
      <h1 className="text-3xl font-bold text-yellow-500 mb-2">{chapter.title}</h1>
      <div className="mb-8 inline-block px-3 py-1 bg-gray-800 text-xs font-mono rounded">
        STATUS: {chapter.status}
      </div>
      <div>{chapter.content}</div>
    </div>
  );
}`,

    // 3. Типизация базы знаний
    'lib/manual/types.ts': `export type ProofStatus = 'CONFIRMED' | 'INFERRED' | 'NOT_CONFIRMED';

export interface Chapter {
  id: string;
  title: string;
  category: 'FOUNDATION' | 'BASE GENERATION' | 'PEOPLE / PPL · MODULE' | 'FINAL PIPELINE' | 'EVIDENCE & REFERENCE';
  order: number;
  status: ProofStatus;
  content: React.ReactNode;
}`,

    // 4. Агрегатор данных
    'lib/manual/index.ts': `import { foundationChapters } from './foundation';
import { baseGenerationChapters } from './base-generation';
import { Chapter } from './types';

export const allChapters: Chapter[] = [
  ...foundationChapters,
  ...baseGenerationChapters
].sort((a, b) => a.order - b.order);

export function getChapterBySlug(slug: string): Chapter | undefined {
  return allChapters.find((ch) => ch.id === slug);
}`,

    // 5. Модуль FOUNDATION (Master Architecture & Control Panel)
    'lib/manual/foundation.tsx': `import React from 'react';
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
];`,

    // 6. Модуль BASE GENERATION (ControlNet & Errata)
    'lib/manual/base-generation.tsx': `import React from 'react';
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
];`
};

// Генерация дублирующего роута для GitHub Pages
files['app/Technical_Manual_UI/[slug]/page.tsx'] = files['app/[slug]/page.tsx'];

Object.entries(files).forEach(([filepath, content]) => {
    fs.writeFileSync(path.join(__dirname, filepath), content, 'utf8');
    console.log('✅ Сгенерирован: ' + filepath);
});

console.log('🚀 Проект пересобран! Запусти команды:');
console.log('1. npm run lint');
console.log('2. npm run build');