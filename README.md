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

## Modelos 3D dos cenários

As pistas usam modelos low poly gratuitos da [CraftPix](https://craftpix.net) (licença: https://craftpix.net/file-licenses/), convertidos para o arquivo `modelos.js`:

- **Parque**: árvores folhosas, pedras, postes de luz, bancos, placas e uma fazendinha com poço, fardos de feno, varal, barris e cerca.
- **Praia**: pedras na beira do mar e um acampamento pirata com baú, barris, sacos e toldo.
- **Pico Nevado**: pinheiros nevados, troncos caídos, colinas e montanhas nevadas e um cantinho com lenha, tocos e machado.

Se o `modelos.js` não carregar, o jogo usa os modelos feitos por código. O script `scripts/converter-modelos.mjs` refaz a conversão a partir dos arquivos FBX.

## Corredores com modelos 3D prontos

16 corredores usam modelos `.glb` (convertidos para `caes.js`). Como esses modelos não têm esqueleto, as patas galopam por deformação no próprio jogo. A Kemilly é a exceção: o modelo do coelho tem esqueleto e animações próprias (correr, pular, atirar), guardadas em `coelho.js`.

| Corredor | Raça | Modelo e autor |
|---|---|---|
| Faiton | Lobo negro | enviado pelo jogador |
| Paz | Cachorro da paz (voa numa nuvem) | enviado pelo jogador |
| Pintado | Mabeco | African wild dog, Poly by Google |
| Ruivo | Dingo | Dingo, Poly by Google |
| Ninja | Shiba Inu | Black Shiba Inu, elkiotbear |
| Sombra | Dobermann | Dog, Poly by Google |
| Paçoca | Vira-lata | Dog, Poly by Google |
| Raio | Greyhound | Greyhound, Pat Siefring |
| Duque | Pinscher alemão | Dog, madtrollstudio |
| Frufru | Poodle | Poodle, Poly by Google |
| Major | Pastor alemão | Dog, madtrollstudio |
| Tofu | Pug | Pug, Quaternius |
| Bidu | Boiadeiro bernês | Dog, Poly by Google |
| Canela | Akita | Dog, Poly by Google |
| Biscoito | Beagle | Beagle, Poly by Google |
| Linda | Javali | enviado pelo jogador |
| Kemilly | Coelho bocó (atira cenouras) | enviado pelo jogador |

Os modelos de terceiros vêm do [Poly Pizza](https://poly.pizza) (Poly by Google e os outros autores: CC-BY 3.0; Quaternius: CC0). O Paz voa numa nuvem (sem mochila a jato) e passa por cima de barreiras, poças e bolas.

## Campeonato, loja e missões

- **Campeonato (Copa)**: no menu, troque o *Modo* para COPA. São 4 corridas seguidas (Parque, Praia, Pico e Serra) contra os mesmos 5 rivais, com pontos por posição (10, 7, 5, 3, 2, 1). No fim tem troféu de ouro, prata ou bronze e prêmio em ossos de ouro.
- **Loja de visual**: chapéus (boné, festa, cartola, caubói, capacete, coroa), óculos, capas, cores de colete e rastros (bolhas, corações, estrelas, fogo, arco-íris). Cada bicho guarda o próprio visual.
- **Missões**: 3 missões diárias que mudam à meia-noite (+250 cada e +300 de bônus) e 15 conquistas com prêmios.
- **Narrador**: avisa quem assumiu a liderança, quem ultrapassou quem e quem acertou míssil em quem.
- **Vibração**: o celular vibra com batidas, mísseis, mini-turbos e vitórias (desligue na pausa).

## Oficina

Cada cachorro tem suas próprias melhorias (5 níveis cada): **Motor** (velocidade), **Músculos** (aceleração), **Garras** (curvas e drift), **Tanque de nitro** e **Molas** (pulo). O progresso fica salvo no navegador.

## Pistas

- **Parque Central**: terra batida, dia de sol.
- **Praia do Latido**: areia, pôr do sol e mar.
- **Pico Nevado**: neve, pinheiros e gelo escorregadio.
- **Serra do Drift**: estreita, lisa, cheia de grampos e com subidas e descidas fortes. Nas descidas o cachorro embala, nas subidas perde força, e sem drift ele quase não faz as curvas. O *Modo* DRIFT leva direto para ela.

## Modo online

No menu, toque em **ONLINE**. Na primeira vez, crie a conta (apelido, senha e cor). A conta fica salva no aparelho e dá para ter várias. Depois:

1. Um jogador toca em **CRIAR SALA** e recebe um código de 5 letras.
2. Os amigos digitam o código e tocam em **ENTRAR** (até 6 jogadores).
3. O anfitrião escolhe pista e voltas e toca em **COMEÇAR CORRIDA**.

Cada um corre com o cachorro escolhido no menu, e o placar mostra o apelido e a cor de cada jogador. Latidos, mísseis e cenouras chegam nos amigos. A conexão é direta entre os aparelhos (WebRTC via [PeerJS](https://peerjs.com)), sem servidor próprio, e precisa de internet.

## Cachorros

Rex (Pastor Alemão), Pingo (Dálmata), Caramelo (Vira-lata), Flecha (Galgo), Nevasca (Husky Siberiano), Bolinha (Pug), Pitiquin (Pinscher) e Princesa (Pitbull, de coroinha), mais cinco corredores que não são cachorros: Emilly (Saruê, de cara branca e orelhas de ponta branca), Linda (Javali, pesada nas trombadas), Kemilly (Coelho bocó, que atira cenouras), Taissa (Lagartixa-leopardo, ótima nas curvas) e Tiffany (Teiú preto e branco, de língua bifurcada). Cada um tem corpo, pelagem e atributos próprios. Cada corrida tem 6 corredores: você e 5 rivais sorteados.

## Habilidades passivas

Cada corredor tem uma habilidade especial que funciona sozinha, mostrada no menu abaixo dos atributos.

| Corredor | Passiva | Efeito |
|---|---|---|
| Rex | **GUARDIÃO** | Latido alcança mais longe e recarrega mais rápido |
| Pingo | **BOMBEIRO** | Lama, água e gelo não atrapalham |
| Caramelo | **SORTUDO** | Ossos de ouro valem o dobro e latas de nitro às vezes dão um míssil |
| Flecha | **ARRANCADA** | No vácuo de um rival fica muito mais rápido e enche o nitro |
| Nevasca | **PATA DE NEVE** | Nunca escorrega na neve nem no gelo |
| Bolinha | **CABEÇA DURA** | Fica tonto só pela metade do tempo |
| Pitiquin | **PEQUENO E BRAVO** | Latir dá um mini-turbo |
| Princesa | **REALEZA** | Trombadas não a atrasam, e quem bate nela é empurrado |
| Linda | **INVESTIDA** | Com nitro ligado, derruba quem ela atropelar |
| Faiton | **UIVO DA LUA** | Quando alguém o ultrapassa, uiva e corre mais rápido |
| Paz | **VOO DA PAZ** | Com o nitro, voa alto: passa por cima da cerca, dos rivais e dos mísseis |
| Pintado | **MATILHA** | Fica mais rápido quanto mais rivais estiverem por perto |
| Ruivo | **SELVAGEM** | Correr fora da pista não deixa lento |
| Ninja | **PULO DUPLO** | Aperte pular de novo no ar para dar um segundo pulo |
| Sombra | **ESQUIVA** | Metade dos mísseis erram ele |
| Paçoca | **COMILÃO** | Latas de nitro enchem muito mais |
| Raio | **RELÂMPAGO** | Nitro mais forte que o de todo mundo |
| Duque | **ARTILHEIRO** | Começa com 3 mísseis e carrega até 4 |
| Frufru | **ELEGÂNCIA** | Drift enche o nitro em dobro e o mini-turbo dura mais |
| Major | **DISCIPLINA** | Os bichos voadores não se atrevem a atacá-lo |
| Tofu | **ROLINHO** | Tropeçar ou ser atropelado quase não o atrasa |
| Bidu | **TANQUE** | Bolas rolando não o derrubam |
| Canela | **FÔLEGO** | O nitro enche sozinho aos poucos |
| Biscoito | **FARO** | Pega ossos, latas e munição de mais longe |
| Emilly | **FINGIR DE MORTA** | Depois de ficar tonta, levanta com um mini-turbo |
| Taissa | **GRUDENTA** | Não escorrega em poças nem no gelo e faz curvas mais fechadas |
| Tiffany | **RABO-CHICOTE** | O chiado dela derruba quem estiver perto |
| Kemilly | **CENOURADA** | Atira cenouras em vez de mísseis: mais rápidas, e quem leva perde nitro |

## No celular

### Android (APK)

O arquivo `dist/CorridaCaninaTurbo.apk` é o jogo como aplicativo, **funcionando sem internet** (a biblioteca 3D e as músicas vão dentro).

1. Baixe o APK no celular.
2. Abra o arquivo e permita "instalar apps de fontes desconhecidas" quando o Android pedir.
3. O ícone **Corrida Canina** aparece na tela de apps.

O botão *voltar* do Android pausa a corrida; no menu, fecha o jogo. O progresso fica salvo no próprio app.

### Pasta com os arquivos

`dist/CorridaCaninaTurbo-pasta.zip` tem a versão offline em arquivos soltos (`index.html`, `jogo.js` e a pasta `musica/`). Extraia numa pasta e abra o `index.html` num navegador. No computador basta dar dois cliques; no celular, alguns navegadores não abrem arquivos locais, e aí o APK é o caminho mais fácil.

### Refazer o APK depois de mudar o jogo

```bash
npm install
npm run offline          # gera dist/www (sem internet)
ANDROID_BUILD_TOOLS=/caminho/build-tools/35.0.0 \
ANDROID_JAR=/caminho/platforms/android-35/android.jar \
bash scripts/build-apk.sh   # gera dist/CorridaCaninaTurbo.apk
```

A chave `android/corrida-dev.keystore` (senha `corrida123`) assina o APK. Use sempre a mesma para que as atualizações instalem por cima sem perder o progresso. É uma chave de desenvolvimento, não serve para publicar na Play Store.
