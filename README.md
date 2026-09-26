# Corrida Canina 3D '97

Jogo de corrida de cachorros em 3D no estilo dos anos 90 (baixa resolução, polígonos "tremidos" estilo PS1, sombras redondas, música chiptune), rodando 100% no navegador a partir de um único arquivo `index.html`.

Todos os modelos (cachorros, pista, arquibancada com torcida, árvores, montanhas, casinha, hidrante, placas), as texturas, os efeitos sonoros e a música são **gerados por código**: não há nenhum arquivo de imagem, modelo ou áudio. A única dependência externa é a biblioteca [Three.js](https://threejs.org) carregada via CDN (e a fonte pixelada do Google Fonts, opcional).

## Como jogar

Abra o `index.html` no navegador (precisa de internet para baixar o Three.js) ou publique a pasta no GitHub Pages.

| Tecla | Ação |
|---|---|
| ↑ / W | Correr |
| ↓ / S | Frear |
| ← → / A D | Virar |
| Espaço | Pular as barreiras |
| Shift | Turbo (gasta fôlego) |
| B | Latir |
| C | Trocar câmera |
| V | Resolução (240p / 360p / nativa) |
| M | Liga/desliga música |
| Esc | Pausa |

No celular aparecem botões na tela e o cachorro corre sozinho; você só vira, pula e usa o turbo.

## Na pista

- **Barreiras**: pule, senão o cachorro tropeça e fica tonto.
- **Poças**: deixam o cachorro lento.
- **Ossos**: recarregam o fôlego e dão um turbo.
- 6 cachorros, cada um com velocidade, aceleração e pulo diferentes: Rex (Pastor Alemão), Pingo (Dálmata), Caramelo (Vira-lata), Flecha (Galgo), Nevasca (Husky) e Bolinha (Pug).
- 3 dificuldades, corridas de 1, 3, 5 ou 7 voltas e recorde salvo no navegador.
