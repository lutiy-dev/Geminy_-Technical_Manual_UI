const fs = require('fs');
const path = require('path');

const files = {
    // 1. Возвращаем вызов твоего UI в основной роутер
    'app/[slug]/page.tsx': `import { allChapters, getChapterBySlug } from '@/lib/manual';
import { notFound } from 'next/navigation';
import { ManualPage } from '@/components/manual-page';

export async function generateStaticParams() {
  return allChapters.map((chapter) => ({ slug: chapter.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const chapter = getChapterBySlug(params.slug);
  if (!chapter) return {};
  return { title: chapter.title + ' · EPSPOZICIYA ARCHVIZ Manual' };
}

export default function Page({ params }: { params: { slug: string } }) {
  const chapter = getChapterBySlug(params.slug);
  if (!chapter) notFound();
  return <ManualPage chapter={chapter} />;
}`,

    // 2. Интегрируем твой дизайн с новой базой знаний
    'components/manual-page.tsx': `'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, CircleHelp, CircleX, FileArchive, Moon, Sun, Workflow } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarTrigger } from '@/components/ui/sidebar';
import { withBasePath } from '@/lib/site-path';
import { allChapters, type Chapter } from '@/lib/manual';

const statusCopy: Record<string, { label: string; icon: any; short: string }> = {
  'CONFIRMED': { label: 'CONFIRMED', icon: CheckCircle2, short: 'Доказано graph data / topology' },
  'INFERRED': { label: 'INFERRED', icon: CircleHelp, short: 'Практический вывод из структуры' },
  'NOT_CONFIRMED': { label: 'NOT CONFIRMED', icon: CircleX, short: 'Нужен runtime / preview' },
};

function EvidenceBadge({ status, compact = false }: { status: string; compact?: boolean }) {
  const entry = statusCopy[status] || statusCopy['NOT_CONFIRMED'];
  const Icon = entry.icon;
  const statusClass = status.toLowerCase().replace('_', '-');
  return (
    <span className={\`evidence-badge \${statusClass} \${compact ? 'compact' : ''}\`}>
      <Icon size={compact ? 13 : 15} />
      {entry.label}
    </span>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  useEffect(() => {
    const stored = window.localStorage.getItem('ppl-manual-theme');
    const preferred = stored === 'dark' || stored === 'light' ? stored 
      : window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    window.requestAnimationFrame(() => setTheme(preferred));
    document.documentElement.dataset.theme = preferred;
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem('ppl-manual-theme', next);
  }

  return (
    <Button className="theme-toggle" variant="ghost" size="icon" onClick={toggleTheme}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
}

function SideNavigation({ activeSlug }: { activeSlug: string }) {
  const groupedChapters = useMemo(() => {
    return allChapters.reduce((acc, ch) => {
      if (!acc[ch.category]) acc[ch.category] = [];
      acc[ch.category].push(ch);
      return acc;
    }, {} as Record<string, Chapter[]>);
  }, []);

  return (
    <Sidebar className="manual-sidebar" collapsible="offcanvas">
      <SidebarHeader className="manual-sidebar-header">
        <a className="brand" href={withBasePath('/overview')}>
          <span className="brand-mark">EPS</span>
          <span className="brand-copy">
            <strong>Archviz Manual</strong>
            <small>Technical field guide</small>
          </span>
        </a>
      </SidebarHeader>
      <SidebarContent>
        {Object.entries(groupedChapters).map(([category, chapters]) => (
          <SidebarGroup key={category}>
            <SidebarGroupLabel className="manual-sidebar-label">{category}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {chapters.map((item, idx) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      className="manual-menu-button"
                      isActive={item.id === activeSlug}
                      render={<a href={withBasePath(\`/\${item.id}\`)} />}
                    >
                      <span className="menu-index">{String(idx + 1).padStart(2, '0')}</span>
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="manual-sidebar-footer">
        <div className="source-card">
          <span className="micro-label">SOURCE OF TRUTH</span>
          <strong>252 nodes · 341 links</strong>
          <p>Epspoziciya_archviz_ph_sdxlflux_v001.json</p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function PageRail() {
  return (
    <aside className="page-rail">
      <div className="page-rail-card legend">
        <span className="micro-label">EVIDENCE</span>
        {Object.keys(statusCopy).map((status) => (
          <div key={status}>
            <EvidenceBadge status={status} compact />
            <small>{statusCopy[status].short}</small>
          </div>
        ))}
      </div>
    </aside>
  );
}

export function ManualPage({ chapter }: { chapter: Chapter }) {
  const pageIndex = allChapters.findIndex((item) => item.id === chapter.id);
  const previous = pageIndex > 0 ? allChapters[pageIndex - 1] : undefined;
  const next = pageIndex < allChapters.length - 1 ? allChapters[pageIndex + 1] : undefined;
  const pageProgress = useMemo(() => Math.round(((pageIndex + 1) / allChapters.length) * 100), [pageIndex]);

  return (
    <SidebarProvider className="manual-app" style={{ '--sidebar-width': '17.25rem' } as React.CSSProperties}>
      <SideNavigation activeSlug={chapter.id} />
      <SidebarInset className="manual-inset">
        <header className="manual-topbar">
          <div className="topbar-left">
            <SidebarTrigger className="sidebar-trigger" />
            <a className="mobile-brand" href={withBasePath('/overview')}><span>EPS</span> Manual</a>
          </div>
          <div className="topbar-progress">
            <span>{String(pageIndex + 1).padStart(2, '0')} / {allChapters.length}</span>
            <i><b style={{ width: \`\${pageProgress}%\` }} /></i>
          </div>
          <div className="topbar-actions">
            <ThemeToggle />
          </div>
        </header>

        <div className="manual-page-grid">
          <article className="manual-article">
            <Breadcrumb className="manual-breadcrumb">
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink render={<a href={withBasePath('/overview')} />}>Epspoziciya Archviz</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink render={<a href={withBasePath('/overview')} />}>{chapter.category}</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>{chapter.title}</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <header className="chapter-hero">
              <div className="chapter-number">{String(pageIndex + 1).padStart(2, '0')}</div>
              <div className="chapter-title-block">
                <div className="chapter-eyebrow">{chapter.category}</div>
                <h1>{chapter.title}</h1>
                <div className="chapter-evidence">
                  <EvidenceBadge status={chapter.status} />
                </div>
              </div>
            </header>

            <div className="manual-article-content mt-8">
              {chapter.content}
            </div>

            <nav className="chapter-navigation mt-12">
              {previous ? (
                <a className="chapter-nav-link previous" href={withBasePath(\`/\${previous.id}\`)}>
                  <ArrowLeft />
                  <span><small>PREVIOUS</small><strong>{previous.title}</strong></span>
                </a>
              ) : <span />}
              {next ? (
                <a className="chapter-nav-link next" href={withBasePath(\`/\${next.id}\`)}>
                  <span><small>NEXT</small><strong>{next.title}</strong></span>
                  <ArrowRight />
                </a>
              ) : <span />}
            </nav>
          </article>
          <PageRail />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}`
};

// Дублируем роутер
files['app/Technical_Manual_UI/[slug]/page.tsx'] = files['app/[slug]/page.tsx'];

Object.entries(files).forEach(([filepath, content]) => {
    fs.writeFileSync(path.join(__dirname, filepath), content, 'utf8');
    console.log('✅ UI обновлен: ' + filepath);
});
console.log('🚀 Готово! Выполни npm run build и отправляй на GitHub.');