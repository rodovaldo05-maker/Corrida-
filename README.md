# Corrida Canina Turbo

Jogo de corrida de cachorros em 3D que roda 100% no navegador a partir de um único `index.html`.

Todos os modelos (cachorros, lagartos, javali, pistas, arquibancadas com torcida, árvores, montanhas, casinha, farol, bonecos de neve...), as texturas, os efeitos sonoros e a música são **gerados por código**. Não há nenhum arquivo de imagem ou modelo 3D. As únicas faixas de áudio externas são as duas músicas da pasta `musica/` (Redline Agog e Apex Pursuit); se elas não carregarem, o jogo usa uma música 8-bit gerada por código. A única dependência externa é a biblioteca [Three.js](https://threejs.org), carregada via CDN (e as fontes do Google Fonts, opcionais).

## Como jogar

Abra o `index.html` no navegador (precisa de internet para baixar o Three.js) ou publique a pasta no GitHub Pages. Mantenha a pasta `musica/` ao lado do `index.html`.

| Teclado | Toque | Ação |
|---|---|---|
| ↑ / W | automático | Correr |
| ↓ / S | FREIO | Frear / ré |
| ← → / A D | ◀ ▶ | Virar |
| Shift + direção | DRIFT + direção | Drift (carrega mini-turbo e nitro) |
| N / Ctrl | NITRO | Nitro |
| Espaço | PULO | Pular barreiras |
| B / E | LATIDO | Latir e assustar os rivais à frente |
| F / X | MÍSSIL | Disparar míssil |
| M | menu de pausa | Trocar música (todas, Redline Agog, Apex Pursuit, 8-bit, desligada) |
| C | menu de pausa | Trocar câmera (atrás, alta, visão do cachorro) |
| Esc | ❚❚ | Pausa |

## Mecânicas

- **Direção de carro**: o cachorro tem embalo, derrapa e pode sair da pista (a grama deixa lento). A *assistência de direção* (na pausa) ajuda a seguir a pista quando você não está virando.
- **Drift**: segure drift e vire numa curva. Quanto mais tempo derrapando, maior o **mini-turbo** ao soltar (azul, depois rosa). Drift também enche o nitro e dá pontos.
- **Nitro**: enche com drift, latas azuis na pista, pulos limpos, rampas e andando no **vácuo** de outro cachorro.
- **Largada perfeita**: aperte ↑ quando a última luz vermelha acender.
- **Obstáculos**: barreiras (pule!), lama/água/gelo, rampas de salto e faixas de turbo.
- **Latido**: assusta quem está perto e à frente, que perde velocidade por um instante, e **espanta os bichos voadores**.
- **Lança-mísseis**: todo corredor leva um nas costas. Pegue as caixas verdes de munição na pista (até 3 mísseis) e dispare: o míssil persegue o rival à sua frente e o deixa atordoado. Quando um míssil vem na sua direção, o aviso MÍSSIL VINDO! pisca.
- **Bichos voadores**: pombos (parque), gaivotas (praia) e corvos (neve) mergulham no focinho dos cachorros, deixando-os lentos e desgovernados. Late para espantar e ganhe nitro.
- **Bolas rolando**: fardos de feno, bolas de praia e bolas de neve atravessam a pista (tem placa avisando). Pule por cima ou desvie.
- **Desafios da corrida**: cada corrida sorteia 3 metas (mini-turbos, bichos espantados, pulos limpos, ossos, latas de nitro, terminar sem tropeçar, pódio). Cada uma cumprida vale +120 ossos de ouro.
- **Ossos de ouro**: moedas da oficina. Você ganha pela posição, pelos ossos coletados e pelos pontos de drift.

## Oficina

Cada cachorro tem suas próprias melhorias (5 níveis cada): **Motor** (velocidade), **Músculos** (aceleração), **Garras** (curvas e drift), **Tanque de nitro** e **Molas** (pulo). O progresso fica salvo no navegador.

## Pistas

- **Parque Central**: terra batida, dia de sol.
- **Praia do Latido**: areia, pôr do sol e mar.
- **Pico Nevado**: neve, pinheiros e gelo escorregadio.

## Cachorros

Rex (Pastor Alemão), Pingo (Dálmata), Caramelo (Vira-lata), Flecha (Galgo), Nevasca (Husky Siberiano), Bolinha (Pug), Pitiquin (Pinscher) e Princesa (Pitbull, de coroinha), mais três corredores que não são cachorros: Linda (Javali, com presas e crina, pesada nas trombadas), Taissa (Lagartixa-leopardo, ótima nas curvas) e Tiffany (Teiú preto e branco, de língua bifurcada). Cada um tem corpo, pelagem e atributos próprios. Cada corrida tem 6 cachorros: você e 5 rivais sorteados.
