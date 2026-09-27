// Converte os pacotes FBX da CraftPix em modelos.js (rode com: node scripts/converter-modelos.mjs; ajuste ROOT para a pasta com os pacotes extraídos em assets/).
// Converte os FBX da CraftPix num pacote compacto (modelos.js) com cor por vértice.
import { chromium } from 'playwright-core';
import { readFileSync, existsSync, readdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';
const ROOT = '/tmp/claude-0/-home-user-Corrida-/12c70dc5-3af9-5060-bc59-59419b3aa5b3/scratchpad';
const A = ROOT + '/assets';
const packs = [
  { dir: 'free-tree-3d-low-poly-pack/Fbx', tex: 'free-tree-3d-low-poly-pack/Textures/T_Trees_temp_climate.png', pre: 'arvore' },
  { dir: 'free-winter-tree-3d-low-poly-models/Fbx', tex: 'free-winter-tree-3d-low-poly-models/Textures/T_Tree_winter.png', pre: 'pinheiro' },
  { dir: 'free-stone-3d-low-poly-models/Fbx', tex: 'free-stone-3d-low-poly-models/Textures/T_Stone.png', pre: 'pedra' },
  { dir: 'free-winter-mountain-3d-low-poly-models/Fbx', tex: 'free-winter-mountain-3d-low-poly-models/Textures/T_Mountains_winter_32.png', pre: 'montanha' },
  { dir: 'free-medieval-props-3d-low-poly-pack/Fbx', tex: 'free-medieval-props-3d-low-poly-pack/Textures/T_Medieval_ Props.png', pre: 'vila' },
  { dir: 'free-environment-props-3d-low-poly-models/FBX', tex: 'free-environment-props-3d-low-poly-models/Texture/Texture.png', pre: 'parque', skip: /^road/i },
];
const jobs = [];
for (const p of packs) for (const f of readdirSync(join(A, p.dir)).sort()) {
  if (!/\.fbx$/i.test(f) || (p.skip && p.skip.test(f))) continue;
  const clean = f.replace(/\.fbx$/i, '').replace(/[^\x20-\x7e]/g, 'C').toLowerCase();
  jobs.push({ file: p.dir + '/' + f, tex: p.tex, name: p.pre + ':' + clean });
}
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage();
page.on('pageerror', e => console.log('ERR', e.message));
await page.route('http://local/**', r => {
  const u = decodeURIComponent(new URL(r.request().url()).pathname);
  if (u === '/index.html') return r.fulfill({ contentType: 'text/html', body: '<script type="importmap">{"imports":{"three":"http://local/three/build/three.module.js","three/addons/":"http://local/three/examples/jsm/"}}</script>' });
  const f = u.startsWith('/three/') ? ROOT + '/node_modules' + u : A + u.replace(/^\/assets/, '');
  if (!existsSync(f)) return r.fulfill({ status: 404, body: '' });
  r.fulfill({ body: readFileSync(f), contentType: extname(f) === '.js' ? 'application/javascript' : extname(f) === '.png' ? 'image/png' : 'application/octet-stream' });
});
await page.goto('http://local/index.html');
const out = await page.evaluate(async (jobs) => {
  const THREE = await import('three');
  const { FBXLoader } = await import('three/addons/loaders/FBXLoader.js');
  const { mergeVertices } = await import('three/addons/utils/BufferGeometryUtils.js');
  const texCache = {};
  const loadTex = async (p) => {
    if (texCache[p]) return texCache[p];
    const img = new Image(); img.src = 'http://local/assets/' + p.split('/').map(encodeURIComponent).join('/'); await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0);
    return texCache[p] = { w: img.width, h: img.height, d: x.getImageData(0, 0, img.width, img.height).data };
  };
  const L = new FBXLoader();
  const res = [];
  for (const j of jobs) {
    const buf = await (await fetch('http://local/assets/' + j.file.split('/').map(encodeURIComponent).join('/'))).arrayBuffer();
    const o = L.parse(buf, 'http://local/assets/');
    o.updateMatrixWorld(true);
    let mesh = null; o.traverse(c => { if (c.isMesh && !mesh) mesh = c; });
    const t = await loadTex(j.tex);
    let g = mesh.geometry.clone(); g.applyMatrix4(mesh.matrixWorld); g.scale(0.01, 0.01, 0.01);  // cm -> m
    g = g.index ? g.toNonIndexed() : g;
    const pos = g.attributes.position, uv = g.attributes.uv, n = pos.count;
    const col = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      let u = uv.getX(i) % 1, v = uv.getY(i) % 1; if (u < 0) u += 1; if (v < 0) v += 1;
      const px = Math.min(t.w - 1, Math.floor(u * t.w)), py = Math.min(t.h - 1, Math.floor((1 - v) * t.h)), k = (py * t.w + px) * 4;
      col[i * 3] = t.d[k] / 255; col[i * 3 + 1] = t.d[k + 1] / 255; col[i * 3 + 2] = t.d[k + 2] / 255;
    }
    let g2 = new THREE.BufferGeometry(); g2.setAttribute('position', pos.clone()); g2.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g2 = mergeVertices(g2, 1e-4);
    g2.computeBoundingBox();
    const bb = g2.boundingBox, P = g2.attributes.position, C = g2.attributes.color, I = g2.index;
    const q = new Int16Array(P.count * 3), cb = new Uint8Array(P.count * 3);
    const sz = [bb.max.x - bb.min.x || 1, bb.max.y - bb.min.y || 1, bb.max.z - bb.min.z || 1], mn = [bb.min.x, bb.min.y, bb.min.z];
    for (let i = 0; i < P.count; i++) for (let a = 0; a < 3; a++) {
      q[i * 3 + a] = Math.round(((P.array[i * 3 + a] - mn[a]) / sz[a]) * 65534 - 32767);
      cb[i * 3 + a] = Math.round(C.array[i * 3 + a] * 255);
    }
    const big = P.count > 65535, idx = big ? new Uint32Array(I.array) : new Uint16Array(I.array);
    const toB64 = (ta) => { const b = new Uint8Array(ta.buffer, ta.byteOffset, ta.byteLength); let s = ''; for (let i = 0; i < b.length; i += 0x8000) s += String.fromCharCode.apply(null, b.subarray(i, i + 0x8000)); return btoa(s); };
    res.push({ name: j.name, v: P.count, i: I.count, big, min: mn.map(x => +x.toFixed(4)), size: sz.map(x => +x.toFixed(4)), p: toB64(q), c: toB64(cb), x: toB64(idx) });
  }
  return res;
}, jobs);
await browser.close();
// um único buffer binário + índice JSON
const parts = [], meta = [];
let off = 0;
const push = (b64) => { const b = Buffer.from(b64, 'base64'); const pad = (4 - (off % 4)) % 4; if (pad) { parts.push(Buffer.alloc(pad)); off += pad; } parts.push(b); const o = off; off += b.length; return [o, b.length]; };
for (const m of out) {
  const P = push(m.p), C = push(m.c), X = push(m.x);
  meta.push({ n: m.name, v: m.v, i: m.i, big: m.big, min: m.min, size: m.size, p: P[0], c: C[0], x: X[0] });
}
const bin = Buffer.concat(parts);
const js = `// Modelos 3D low poly da CraftPix (craftpix.net), convertidos para o jogo. Licença: https://craftpix.net/file-licenses/\nwindow.MODELOS = { meta: ${JSON.stringify(meta)},\n  data: "${bin.toString('base64')}" };\n`;
writeFileSync('/home/user/Corrida-/modelos.js', js);
console.log('modelos:', meta.length, 'vértices:', meta.reduce((a, m) => a + m.v, 0), 'bin:', (bin.length / 1024).toFixed(0) + 'KB', 'js:', (js.length / 1024).toFixed(0) + 'KB');
console.log(meta.map(m => `${m.n}(${m.v}v ${m.size.map(s => s.toFixed(1)).join('x')})`).join('  '));
