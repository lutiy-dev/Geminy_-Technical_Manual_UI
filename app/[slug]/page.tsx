import { allChapters, getChapterBySlug } from '@/lib/manual';
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
}