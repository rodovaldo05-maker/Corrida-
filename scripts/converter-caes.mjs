// Converte os modelos .glb de cachorros em caes.js (node scripts/converter-caes.mjs export). Ajuste ROOT: precisa de node_modules/three, pasta glb/ e caes-cfg.json.
// Converte os GLB de cachorros num pacote compacto (caes.js) com cor por vértice.
import { chromium } from 'playwright-core';
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
const ROOT = '/tmp/claude-0/-home-user-Corrida-/12c70dc5-3af9-5060-bc59-59419b3aa5b3/scratchpad';
const CFG = JSON.parse(readFileSync(ROOT + '/caes-cfg.json', 'utf8'));
const mode = process.argv[2] || 'preview';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
page.on('console', m => console.log(m.text())); page.on('pageerror', e => console.log('ERR', e.message));
await page.route('http://local/**', r => {
  const u = decodeURIComponent(new URL(r.request().url()).pathname);
  if (u === '/index.html') return r.fulfill({ contentType: 'text/html', body: `<body style="margin:0;background:#222"><script type="importmap">{"imports":{"three":"http://local/three/build/three.module.js","three/addons/":"http://local/three/examples/jsm/"}}</script></body>` });
  const f = u.startsWith('/three/') ? ROOT + '/node_modules' + u : ROOT + u;
  if (!existsSync(f)) return r.fulfill({ status: 404, body: '' });
  r.fulfill({ body: readFileSync(f), contentType: f.endsWith('.js') ? 'application/javascript' : 'application/octet-stream' });
});
await page.goto('http://local/index.html');
const out = await page.evaluate(async ({ CFG, mode }) => {
  const THREE = await import('three');
  const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
  const { mergeVertices } = await import('three/addons/utils/BufferGeometryUtils.js');
  const L = new GLTFLoader();
  const imgData = new Map();
  const texPixels = (tex) => {
    if (imgData.has(tex)) return imgData.get(tex);
    const img = tex.image, c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
    const x = c.getContext('2d'); x.drawImage(img, 0, 0); const d = { w: img.width, h: img.height, d: x.getImageData(0, 0, img.width, img.height).data, flipY: tex.flipY };
    imgData.set(tex, d); return d;
  };
  const res = [];
  for (const c of CFG) {
    const g = await L.loadAsync('http://local/glb/' + c.file);
    g.scene.updateMatrixWorld(true);
    const P = [], C = [];
    const v = new THREE.Vector3(), col = new THREE.Color();
    g.scene.traverse(o => {
      if (!o.isMesh) return;
      const geo = o.geometry, pos = geo.attributes.position, uv = geo.attributes.uv, vc = geo.attributes.color, idx = geo.index;
      const mats = [].concat(o.material), groups = geo.groups.length ? geo.groups : [{ start: 0, count: idx ? idx.count : pos.count, materialIndex: 0 }];
      const getV = (i) => { v.fromBufferAttribute(pos, i); if (o.isSkinnedMesh) o.applyBoneTransform(i, v); return v.applyMatrix4(o.matrixWorld); };
      for (const gr of groups) {
        const m = mats[gr.materialIndex] || mats[0];
        const base = m.color ? m.color.clone() : new THREE.Color(1, 1, 1);
        const tex = m.map && m.map.image ? texPixels(m.map) : null;
        for (let t = gr.start; t < gr.start + gr.count; t += 3) {
          const ids = [0, 1, 2].map(k => idx ? idx.getX(t + k) : t + k);
          col.copy(base);
          if (tex && uv) {
            let u = 0, w = 0; for (const i of ids) { u += uv.getX(i) / 3; w += uv.getY(i) / 3; }
            u = ((u % 1) + 1) % 1; w = ((w % 1) + 1) % 1;
            const px = Math.min(tex.w - 1, Math.floor(u * tex.w)), py = Math.min(tex.h - 1, Math.floor((tex.flipY ? 1 - w : w) * tex.h)), k = (py * tex.w + px) * 4;
            const tc = new THREE.Color().setRGB(tex.d[k] / 255, tex.d[k + 1] / 255, tex.d[k + 2] / 255, THREE.SRGBColorSpace);
            col.multiply(tc);
          }
          if (vc) { let r = 0, gg = 0, b = 0; for (const i of ids) { r += vc.getX(i) / 3; gg += vc.getY(i) / 3; b += vc.getZ(i) / 3; } col.multiply(new THREE.Color(r, gg, b)); }
          for (const i of ids) { const p = getV(i); P.push(p.x, p.y, p.z); C.push(col.r, col.g, col.b); }
        }
      }
    });
    let geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(P, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(C, 3));
    const r = c.rot || [0, 0, 0];
    geo.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(r[0] * Math.PI / 180, r[1] * Math.PI / 180, r[2] * Math.PI / 180, 'YXZ')));
    geo.computeBoundingBox();
    let bb = geo.boundingBox, sz = bb.getSize(new THREE.Vector3());
    const s = c.fitH ? c.fitH / sz.y : c.len / sz.z;
    geo.translate(-(bb.min.x + bb.max.x) / 2, -bb.min.y, -(bb.min.z + bb.max.z) / 2); geo.scale(s, s, s);
    geo = mergeVertices(geo, 1e-5);
    geo.computeBoundingBox(); bb = geo.boundingBox; sz = bb.getSize(new THREE.Vector3());
    res.push({ c, geo, sz: sz.toArray() });
  }
  if (mode === 'preview') {
    const R = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true }); R.setSize(1600, 1000); document.body.appendChild(R.domElement);
    R.setScissorTest(true); R.outputColorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.8 });
    res.forEach((o, i) => {
      const sc = new THREE.Scene(); sc.background = new THREE.Color(0x3a4050);
      sc.add(new THREE.HemisphereLight(0xffffff, 0x445566, 2.2)); const d = new THREE.DirectionalLight(0xffffff, 2); d.position.set(3, 5, 4); sc.add(d);
      const m = new THREE.Mesh(o.geo, mat); m.geometry.computeVertexNormals(); sc.add(m);
      // chão e seta +z (frente)
      const ar = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.2, 8), new THREE.MeshBasicMaterial({ color: 0xff3333 })); ar.rotation.x = Math.PI / 2; ar.position.set(0, 0.02, o.sz[2] / 2 + 0.15); sc.add(ar);
      const cam = new THREE.OrthographicCamera(-1.3, 1.3, 0.8, -0.8, 0.01, 50); cam.position.set(6, 0.7, 0.4); cam.lookAt(0, 0.7, 0.4 * 0); cam.position.set(6, 0.8, 0); cam.lookAt(0, 0.8, 0);
      const w = 400, h = 250, x = (i % 4) * w, y = 1000 - (Math.floor(i / 4) + 1) * h;
      R.setViewport(x, y, w, h); R.setScissor(x, y, w, h); R.render(sc, cam);
    });
    return res.map(o => o.c.id + ' ' + o.sz.map(v => v.toFixed(2)).join('x') + ' v=' + o.geo.attributes.position.count);
  }
  // exporta
  const out = [];
  const toB64 = (ta) => { const b = new Uint8Array(ta.buffer, ta.byteOffset, ta.byteLength); let s = ''; for (let i = 0; i < b.length; i += 0x8000) s += String.fromCharCode.apply(null, b.subarray(i, i + 0x8000)); return btoa(s); };
  for (const o of res) {
    const g = o.geo, P = g.attributes.position, Cc = g.attributes.color, bb = g.boundingBox, mn = bb.min.toArray(), sz = o.sz;
    const q = new Int16Array(P.count * 3), cb = new Uint8Array(P.count * 3), cc = new THREE.Color();
    for (let i = 0; i < P.count; i++) {
      for (let a = 0; a < 3; a++) q[i * 3 + a] = Math.round(((P.array[i * 3 + a] - mn[a]) / (sz[a] || 1)) * 65534 - 32767);
      cc.setRGB(Cc.getX(i), Cc.getY(i), Cc.getZ(i)); const hx = cc.getHex(THREE.SRGBColorSpace);
      cb[i * 3] = hx >> 16 & 255; cb[i * 3 + 1] = hx >> 8 & 255; cb[i * 3 + 2] = hx & 255;
    }
    const big = P.count > 65535, idx = big ? new Uint32Array(g.index.array) : new Uint16Array(g.index.array);
    out.push({ id: o.c.id, v: P.count, i: g.index.count, big, min: mn.map(x => +x.toFixed(5)), size: sz.map(x => +x.toFixed(5)), p: toB64(q), c: toB64(cb), x: toB64(idx) });
  }
  return out;
}, { CFG, mode });
if (mode === 'preview') { console.log(out.join('\n')); await page.screenshot({ path: 'caes_side.png' }); }
else {
  const parts = [], meta = []; let off = 0;
  const push = (b64) => { const b = Buffer.from(b64, 'base64'); const pad = (4 - (off % 4)) % 4; if (pad) { parts.push(Buffer.alloc(pad)); off += pad; } parts.push(b); const o = off; off += b.length; return o; };
  for (const m of out) meta.push({ n: m.id, v: m.v, i: m.i, big: m.big, min: m.min, size: m.size, p: push(m.p), c: push(m.c), x: push(m.x) });
  const bin = Buffer.concat(parts);
  const js = `// Modelos 3D de cachorros (arquivos .glb enviados), convertidos para o jogo. Créditos no README.\nwindow.CAES = { meta: ${JSON.stringify(meta)},\n  data: "${bin.toString('base64')}" };\n`;
  writeFileSync('/home/user/Corrida-/caes.js', js);
  console.log('caes.js', (js.length / 1024).toFixed(0) + 'KB', meta.map(m => m.n + ':' + m.v).join(' '));
}
await browser.close();
