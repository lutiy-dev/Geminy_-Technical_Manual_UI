import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist', 'client');
if (fs.existsSync(distDir)) {
    const files = fs.readdirSync(distDir);
    const htmlFile = files.find(f => f.endsWith('.html') && f !== 'index.html');
    if (htmlFile) {
        fs.copyFileSync(path.join(distDir, htmlFile), path.join(distDir, 'index.html'));
        console.log('Copied ' + htmlFile + ' to index.html');
    }
}