import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lutiy-dev.github.io/Geminy_-Technical_Manual_UI/';

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
}