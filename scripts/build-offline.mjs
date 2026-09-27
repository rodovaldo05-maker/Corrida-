// Gera dist/www: o jogo inteiro sem depender de internet (Three.js embutido).
// Uso: npm install && npm run offline
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const start = html.indexOf('<script type="module">');
const end = html.indexOf('</script>', start);
if (start < 0 || end < 0) throw new Error('script do jogo não encontrado no index.html');
const code = html.slice(start + '<script type="module">'.length, end);

rmSync('dist/www', { recursive: true, force: true });
mkdirSync('dist/www', { recursive: true });
writeFileSync('dist/.jogo-src.mjs', code);
await build({
  entryPoints: ['dist/.jogo-src.mjs'], bundle: true, format: 'iife', minify: true,
  target: ['chrome80', 'safari14'], outfile: 'dist/www/jogo.js', logLevel: 'warning',
});
rmSync('dist/.jogo-src.mjs');

const page = html.slice(0, start).replace(/<script type="importmap">[\s\S]*?<\/script>\n?/, '')
  + '<script src="jogo.js"></script>' + html.slice(end + '</script>'.length);
writeFileSync('dist/www/index.html', page);
cpSync('musica', 'dist/www/musica', { recursive: true });
cpSync('modelos.js', 'dist/www/modelos.js');
cpSync('caes.js', 'dist/www/caes.js');
console.log('dist/www pronto');
