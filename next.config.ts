import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'Geminy_-Technical_Manual_UI';

const nextConfig: NextConfig = {
  output: 'export', // Обязательно для статической генерации GitHub Pages
  // Указываем basePath и assetPrefix только для production-сборки на GitHub
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  images: {
    unoptimized: true, // Отключаем оптимизацию картинок для статики
  },
};

export default nextConfig;