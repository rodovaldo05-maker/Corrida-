# Corrida Canina Turbo

Jogo de corrida de cachorros em 3D que roda 100% no navegador a partir de um único `index.html`.

Todos os modelos (cachorros, pistas, arquibancadas com torcida, árvores, montanhas, casinha, farol, bonecos de neve...), as texturas, os efeitos sonoros e a música são **gerados por código**. Não há nenhum arquivo de imagem, modelo 3D ou áudio. A única dependência externa é a biblioteca [Three.js](https://threejs.org), carregada via CDN (e as fontes do Google Fonts, opcionais).

## Como jogar

Abra o `index.html` no navegador (precisa de internet para baixar o Three.js) ou publique a pasta no GitHub Pages.

| Teclado | Toque | Ação |
|---|---|---|
| ↑ / W | automático | Correr |
| ↓ / S | FREIO | Frear / ré |
| ← → / A D | ◀ ▶ | Virar |
| Shift + direção | DRIFT + direção | Drift (carrega mini-turbo e nitro) |
| N / Ctrl | NITRO | Nitro |
| Espaço | PULO | Pular barreiras |
| B / E | LATIDO | Latir e assustar os rivais à frente |
| C | menu de pausa | Trocar câmera (atrás, alta, visão do cachorro) |
| Esc | ❚❚ | Pausa |

## Mecânicas

- **Direção de carro**: o cachorro tem embalo, derrapa e pode sair da pista (a grama deixa lento). A *assistência de direção* (na pausa) ajuda a seguir a pista quando você não está virando.
- **Drift**: segure drift e vire numa curva. Quanto mais tempo derrapando, maior o **mini-turbo** ao soltar (azul, depois rosa). Drift também enche o nitro e dá pontos.
- **Nitro**: enche com drift, latas azuis na pista, pulos limpos, rampas e andando no **vácuo** de outro cachorro.
- **Largada perfeita**: aperte ↑ quando a última luz vermelha acender.
- **Obstáculos**: barreiras (pule!), lama/água/gelo, rampas de salto e faixas de turbo.
- **Latido**: assusta quem está perto e à frente, que perde velocidade por um instante.
- **Ossos de ouro**: moedas da oficina. Você ganha pela posição, pelos ossos coletados e pelos pontos de drift.

## Oficina

Cada cachorro tem suas próprias melhorias (5 níveis cada): **Motor** (velocidade), **Músculos** (aceleração), **Garras** (curvas e drift), **Tanque de nitro** e **Molas** (pulo). O progresso fica salvo no navegador.

## Pistas

- **Parque Central**: terra batida, dia de sol.
- **Praia do Latido**: areia, pôr do sol e mar.
- **Pico Nevado**: neve, pinheiros e gelo escorregadio.

## Cachorros

Rex (Pastor Alemão), Pingo (Dálmata), Caramelo (Vira-lata), Flecha (Galgo), Nevasca (Husky Siberiano) e Bolinha (Pug), cada um com corpo, pelagem e atributos próprios.
