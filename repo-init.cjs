const fs = require('fs');
const path = require('path');

// 1. Обновляем README.md по требованиям ТЗ
const readmeContent = `# EPSPOZICIYA ARCHVIZ · TECHNICAL WORKFLOW MANUAL

Полный технический учебник по Epspoziciya_archviz_ph_sdxlflux_v001.
Based on the Paul Hansen workflow · Unofficial technical documentation.

## Онлайн-версия
После успешной сборки учебник будет доступен по адресу:
https://lutiy-dev.github.io/Geminy_-Technical_Manual_UI/

## Локальный запуск
Требуется Node.js 22 или новее.
\`\`\`bash
npm ci
npm run dev
\`\`\`

## Достоверность технических данных
Материалы явно разделяют утверждения на **CONFIRMED**, **INFERRED** и **NOT CONFIRMED**.
`;
fs.writeFileSync(path.join(__dirname, 'README.md'), readmeContent, 'utf8');

// 2. Ищем старое название путей во всех конфигурациях и меняем на новое
const filesToUpdate = [
    'app/layout.tsx',
    'lib/site-path.ts',
    'next.config.ts',
    'vite.config.ts'
];

filesToUpdate.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        // Заменяем старый base path на новый
        content = content.replace(/Technical_Manual_UI/g, 'Geminy_-Technical_Manual_UI');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`✅ Обновлены пути в: ${file}`);
    }
});

console.log('🚀 Репозиторий успешно перенастроен под Geminy_-Technical_Manual_UI!');