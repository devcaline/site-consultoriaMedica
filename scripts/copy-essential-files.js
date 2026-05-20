import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');

// Arquivos essenciais que devem estar sempre na dist
const essentialFiles = [
  'enviar-formulario.php',
  '.htaccess'
];

console.log('📦 Copiando arquivos essenciais para dist...');

essentialFiles.forEach(file => {
  const sourcePath = path.join(publicDir, file);
  const destPath = path.join(distDir, file);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✅ ${file} copiado`);
  } else {
    console.warn(`⚠️  ${file} não encontrado em public/`);
  }
});

// Copiar favicon para a raiz da dist (fallback para navegadores)
const faviconSource = path.join(distDir, 'img', 'storm-ico.PNG');
const faviconDest = path.join(distDir, 'favicon.ico');

if (fs.existsSync(faviconSource)) {
  fs.copyFileSync(faviconSource, faviconDest);
  console.log('✅ favicon.ico criado na raiz da dist');
} else {
  console.warn('⚠️  storm-ico.PNG não encontrado em dist/img/');
}

console.log('✅ Arquivos essenciais copiados!');
