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
| R / H | HABILIDADE | Usar a habilidade do upgrade mecânico |
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
| Davi | Galinha, dinossauro e dinossauro robô | Chicken (jeremy) e T-Rex (Quaternius), enviados pelo jogador; o robô é feito por código |

Os modelos de terceiros vêm do [Poly Pizza](https://poly.pizza) (Poly by Google e os outros autores: CC-BY 3.0; Quaternius: CC0). O Paz voa numa nuvem (sem mochila a jato) e passa por cima de barreiras, poças e bolas.

## Passivas extras e upgrade mecânico

Além da passiva básica, cada personagem tem mais 5 passivas próprias:

- **4 da Oficina**: deixar um atributo no nível máximo (5) libera a passiva dele: Motor (velocidade), Músculos (aceleração), Garras (curvas) e Molas (pulo).
- **1 da Loja**: o **Upgrade Mecânico** (aba MECÂNICO, 3000 ossos) muda o visual (pele, cor das latas e tamanho), dá uma passiva e libera uma **habilidade**.

A habilidade é usada com **R** (ou o botão HABILIDADE no celular). Você larga com 1 carga e ganha mais pegando as **cargas especiais** (cristais roxos) na pista, até 3. Sem o upgrade, a carga especial dá +20 de nitro. Os rivais também podem ter passivas e habilidades.

| Corredor | Velocidade no máximo | Aceleração no máximo | Curvas no máximo | Pulo no máximo | Upgrade mecânico | Habilidade |
|---|---|---|---|---|---|---|
| Rex | **PATRULHA** Com 2 ou mais rivais por perto corre mais rápido, com giroflex azul e vermelho | **CAPTURA** Acertar um míssil em alguém enche 30 de nitro | **ADESTRADO** Sustos e bichos voadores atrapalham só pela metade do tempo | **SALTO DE RESGATE** Pula 25% mais alto | **K9 BLINDADO** Colete azul de polícia, latas azuis, fica maior e mísseis o atordoam menos | **LATIDO DE COMANDO** Um latido gigante derruba todos que estiverem em volta |
| Pingo | **ALARME DE INCÊNDIO** Com o nitro ligado corre ainda mais e solta faíscas de fogo | **MANGUEIRA** Pegar lata de nitro dá 3 segundos de escudo de água | **BOTAS ANTIDERRAPANTES** Faz curvas mais fechadas | **PULO DO CAMINHÃO** Ao pousar de um pulo ganha um mini-turbo | **VIATURA VERMELHA** Manchas vermelhas, latas amarelas e o nitro dura mais | **JATO DE ÁGUA** Espirra água para trás: quem vem atrás escorrega e perde o rumo |
| Caramelo | **VIRADA DE SORTE** Em último lugar a sorte vira e ele corre muito mais rápido | **ACHADO** Pegar munição dá um mini-turbo | **JEITINHO** Raspar na cerca não atrasa | **PULO DA SORTE** Nunca tropeça nas barreiras | **CARAMELO DOURADO** Pelo dourado, latas amarelas e pega itens de longe | **CHUVA DE OSSOS** Puxa todos os itens por perto e enche o nitro |
| Flecha | **RETA FINAL** Na última volta corre mais rápido, riscando o ar | **LARGADA DE GALGO** Na largada dispara com um turbo longo | **CORPO AERODINÂMICO** O drift não gasta velocidade | **VOO RASANTE** Cai devagar depois do pulo, planando | **GALGO DE PRATA** Pelo prateado, latas ciano e o nitro enche sozinho | **DISPARO** Turbo enorme por 3 segundos |
| Nevasca | **VENTO ÁRTICO** Derrapando fica mais rápido e solta neve | **TRENÓ** Cada mini-turbo enche 15 de nitro | **DERRAPADA POLAR** O mini-turbo do drift carrega mais rápido | **AVALANCHE** Ao pousar perto de rivais, a pancada os derruba | **HUSKY GLACIAL** Pelo azul-gelo, latas brancas, fica maior e mais pesado nas trombadas | **NEVASCA** Congela a pista dos rivais à frente: eles escorregam por 4 segundos |
| Bolinha | **PUG BRAVO** Depois de levar um tombo volta com raiva e mais rápido | **OLHO NO PRÓXIMO** Cada ultrapassagem enche 8 de nitro | **CENTRO DE GRAVIDADE** Trombadas quase não o empurram | **QUICA-QUICA** Aperte pular de novo no ar para quicar mais uma vez | **PUG DE AÇO** Corpo de aço, latas laranja, fica maior e levanta mais rápido | **ROLO COMPRESSOR** Vira uma bola e derruba quem estiver perto |
| Pitiquin | **NO ÓDIO** Com o nitro quase vazio corre mais rápido, soltando faíscas vermelhas | **LATIDO ESTRIDENTE** O latido assusta rivais em volta dele, até os de trás | **PILHA ELÉTRICA** O mini-turbo dura mais | **PULO DE PULGA** No ar ganha velocidade em vez de perder | **PINSCHER ARMADO** Pelo vinho, latas vermelhas, fica maior e carrega 1 míssil a mais | **PINSCHER VOADOR** Sai voando por 5 segundos, por cima de tudo |
| Princesa | **REINADO** Em 1º lugar corre ainda mais rápido, com brilho de coroa | **DIGNIDADE REAL** Ao se levantar de um tombo ganha 3 segundos de escudo | **VALSA REAL** Derrapar enche o nitro em dobro | **SALTO REAL** Pula 25% mais alto | **ARMADURA DE RAINHA** Pelo rosa, latas douradas e mísseis a atordoam menos | **MANTO REAL** Escudo por 7 segundos: nada a derruba |
| Linda | **LAMAÇAL** Fora da pista corre mais rápido que dentro | **ESTOURO** Passar numa faixa de turbo dá um mini-turbo extra | **CASCOS FIRMES** Não escorrega em curvas lisas, lama, água ou gelo | **PULO DE JAVALI** Pular uma barreira enche 25 de nitro | **JAVALI COURAÇADO** Couro de bronze, latas verdes, fica maior e mais pesado nas trombadas | **ESTOURO DA MANADA** Uma pancada no chão derruba quem estiver perto |
| Faiton | **RELÂMPAGO NEGRO** Abaixo do 3º lugar ganha uma aura de raios vermelhos e corre mais rápido | **DASH DAS SOMBRAS** Ao pular uma barreira se teleporta um pouco para frente, deixando sombras para trás | **EQUILÍBRIO DE LOBO** Recupera rápido a estabilidade em curvas escorregadias | **PERNAS DE MOLA** Pernas mais fortes: o pulo o lança para frente | **LOBO BRANCO** Pele branca, latas vermelhas, fica maior e se levanta mais rápido depois de um míssil | **NOITE ETERNA** O céu escurece, os pássaros fogem dele e os rivais ficam assustados |
| Paz | **PAZ INTERIOR** Sem rivais por perto fica mais rápido | **BÊNÇÃO** Cada osso de ouro enche 6 de nitro | **CALMARIA** Sustos e bichos voadores atrapalham só pela metade do tempo | **CÉU PROTEGIDO** No ar os mísseis erram ele | **NUVEM DOURADA** Nuvem dourada, latas azuis e os pássaros não o atacam | **NUVEM DE TEMPESTADE** Raios caem nos 2 rivais logo à frente |
| Pintado | **PERSEGUIÇÃO** No vácuo de um rival corre ainda mais | **MORDIDA** Cada ultrapassagem dá um mini-turbo | **SAVANA** Correr fora da pista não deixa lento | **BOTE** O pulo o lança para frente | **ALFA DA MATILHA** Pelagem dourada, latas pretas e o nitro enche sozinho | **CAÇADA** Dispara 3 mísseis teleguiados de uma vez |
| Ruivo | **DINGO FAMINTO** Nos primeiros 8 segundos da corrida corre muito mais rápido | **ATERRISSAGEM** Ao pousar de um pulo ganha 10 de nitro | **RASPÃO** Raspar na cerca não atrasa | **SALTO DO DESERTO** Enquanto está no ar o nitro enche | **DINGO DE FERRO** Pelo cor de ferrugem, latas laranja e se levanta mais rápido | **TEMPESTADE DE AREIA** Levanta uma nuvem de poeira: quem vem atrás perde o rumo |
| Ninja | **CHAKRA** Com o tanque de nitro quase cheio corre mais, com aura roxa | **KAWARIMI** Ao latir se teleporta um pouco para frente | **PASSO LEVE** Faz curvas mais fechadas | **PIPA NINJA** Cai devagar depois do pulo, planando | **SHINOBI** Roupa preta e roxa, latas roxas e carrega 1 míssil a mais | **TELETRANSPORTE NINJA** Some numa fumaça e reaparece bem mais à frente |
| Sombra | **ESPREITA** Colado atrás de um rival corre mais rápido | **SUMIÇO** Ao se levantar de um tombo se teleporta para frente | **DRIFT FANTASMA** O drift não gasta velocidade | **SALTO ESCURO** No ar os mísseis erram ele | **DOBERMANN DE OBSIDIANA** Pelo roxo-escuro, latas roxas e mísseis o atordoam menos | **ECLIPSE** O céu escurece, os pássaros fogem dele e os rivais ficam assustados |
| Paçoca | **AÇÚCAR** Por 4 segundos depois de pegar uma lata corre mais rápido | **LANCHINHO** Pegar uma carga especial dá um turbo | **PATAS SUJAS** Lama, água e gelo não atrapalham | **PULO GORDINHO** Nunca tropeça nas barreiras | **PAÇOCA RECHEADA** Pelo cor de amendoim, latas marrons e o nitro dura mais | **AÇÚCAR NO SANGUE** Turbo enorme por 3 segundos |
| Raio | **RETA ELÉTRICA** Nas retas corre mais rápido, soltando faíscas | **SOBRECARGA** Passar numa faixa de turbo enche 20 de nitro | **CURTO-CIRCUITO** O mini-turbo do drift carrega mais rápido | **DESCARGA** O pulo o lança para frente | **GREYHOUND ELÉTRICO** Pelo amarelo, latas azuis e o nitro enche sozinho | **TROVOADA** Raios caem nos 2 rivais logo à frente |
| Duque | **PAIOL CHEIO** Com 2 ou mais mísseis carregados corre mais rápido | **RECARGA** Pegar munição enche 15 de nitro | **TRINCHEIRA** Trombadas quase não o empurram | **PARAQUEDISTA** Ao pousar perto de rivais, a pancada os derruba | **ARSENAL** Farda verde-oliva, latas pretas e carrega 1 míssil a mais | **BATERIA DE MÍSSEIS** Dispara 3 mísseis teleguiados de uma vez |
| Frufru | **DESFILE** Derrapando fica mais rápido e solta brilhos | **POSE** Cada mini-turbo dá 2 segundos de escudo | **PASSO DE BALÉ** Derrapar enche o nitro em dobro | **PIRUETA** Aperte pular de novo no ar para dar outro pulo | **POODLE DE CRISTAL** Pelo rosa-cristal, latas lilás e pega itens de longe | **BRILHO DE DIVA** Escudo por 7 segundos: nada a derruba |
| Major | **MARCHA FINAL** Na última volta corre mais rápido | **FORMAÇÃO** Na largada ganha 4 segundos de escudo | **SANGUE-FRIO** Sustos e bichos voadores atrapalham só pela metade do tempo | **TREINO DE OBSTÁCULOS** Pular uma barreira enche 25 de nitro | **BLINDADO** Camuflagem militar, latas verdes e mísseis o atordoam menos | **ATAQUE AÉREO** Bombas caem nos 2 rivais logo à frente |
| Tofu | **LANTERNINHA** Em último lugar corre muito mais rápido | **ROLINHO** Ao se levantar de um tombo ganha um mini-turbo | **BOLA DE PELO** Trombadas quase não o empurram | **CAMBALHOTA** Ao pousar de um pulo ganha um mini-turbo | **TOFU BLINDADO** Pelo branco, latas pretas, fica maior e se levanta mais rápido | **BOLA DE BOLICHE** Rola como uma bola e derruba quem estiver perto |
| Bidu | **BARRIL CHEIO** Com o nitro quase cheio corre mais rápido | **ÁGUA DOS ALPES** Pular uma barreira enche 20 de nitro | **PATAS DE MONTANHA** Raspar na cerca não atrasa | **ESTRONDO** Ao pousar perto de rivais, a pancada os derruba | **SÃO BERNARDO DE AÇO** Pelo cinza-aço, latas vermelhas, fica maior e mais pesado | **MURALHA** Escudo por 7 segundos: nada o derruba |
| Canela | **ESPÍRITO LIVRE** Sem rivais por perto fica mais rápido | **PASSO DO AKITA** Ao pousar de um pulo se teleporta um pouco para frente | **PATA CERTEIRA** Não escorrega em curvas lisas, lama, água ou gelo | **SALTO ALTO** Pula 25% mais alto | **AKITA DE FOGO** Pelo vermelho-fogo, latas laranja e o nitro enche sozinho | **PASSO DO VENTO** Some e reaparece bem mais à frente |
| Biscoito | **RASTREADOR** Colado atrás de um rival corre mais rápido | **FARO DE OURO** Cada osso de ouro dá um mini-turbo | **PATAS CURTAS** Lama, água e gelo não atrapalham | **ORELHAS DE PLANADOR** Enquanto está no ar o nitro enche | **BEAGLE DETETIVE** Pelo caramelo-escuro, latas verdes e pega itens de muito longe | **FARO ABSOLUTO** Puxa todos os itens por perto e enche o nitro |
| Emilly | **SOBREVIVENTE** Depois de levar um tombo volta mais rápida | **VINGANÇA** Acertar um míssil em alguém dá um mini-turbo | **VIRA-LIXO** Correr fora da pista não deixa lenta | **RABO DE PARAQUEDAS** Cai devagar depois do pulo, planando | **SARUÊ NOTURNA** Pelo cinza-noite, latas rosa e se levanta mais rápido | **FEDOR DE SARUÊ** Solta um cheiro horrível: quem vem atrás perde o rumo |
| Taissa | **CAUDA ÁGIL** Derrapando fica mais rápida | **RABO SOLTO** Cada mini-turbo a teleporta um pouco para frente | **VENTOSAS** Faz curvas mais fechadas | **PULO DE PAREDE** No ar ganha velocidade em vez de perder | **LAGARTIXA NEON** Escamas verde-neon, latas amarelas e os pássaros não a atacam | **CAMUFLAGEM** Some e reaparece bem mais à frente |
| Tiffany | **CAÇADORA** Colada atrás de um rival corre mais rápido | **LÍNGUA RÁPIDA** Cada chiado enche 10 de nitro | **GARRAS DE TEIÚ** Não escorrega em curvas lisas, lama, água ou gelo | **RABADA** Ao pousar perto de rivais, a pancada os derruba | **TEIÚ DE LAVA** Escamas cor de lava, latas pretas e mísseis a atordoam menos | **CHIADO DA SELVA** Um chiado gigante derruba todos que estiverem em volta |
| Kemilly | **SALTITANTE** No ar corre mais rápido | **PULO DE COELHO** Pular uma barreira dá um mini-turbo | **HORTA** Derrapar enche o nitro em dobro | **PERNAS DE COELHO** Pula 25% mais alto | **COELHO DE CHOCOLATE** Pelo de chocolate, latas laranja e carrega 1 cenoura a mais | **CHUVA DE CENOURAS** Joga 3 cenouras teleguiadas de uma vez |

## Davi, a Galinha Ancestral

A Davi muda de forma:

- **Galinha**: começa fraca, com 1 quadrado em cada atributo. Os pássaros não a atacam.
- **Dinossauro** (T-Rex, 4 vezes a altura da galinha): ao deixar **Músculos** e **Garras** no máximo na oficina, vira dinossauro de vez e fica com um dos atributos base mais altos do jogo.
- **Dinossauro robô** (2 vezes a altura do dinossauro): o upgrade mecânico dela só pode ser comprado depois de Músculos e Garras no máximo. Vira um dinossauro robô blindado que lança **4 mísseis de uma vez**, cada um atrás de um rival.
- Ainda galinha, cada **carga especial** (cristal roxo) tem 20% de chance de transformá-la em dinossauro por 12 segundos.

Modelos: Chicken (jeremy, Poly Pizza) e T-Rex (Quaternius, CC0), enviados pelo jogador. O dinossauro robô é feito por código, com juntas no quadril, joelho, tornozelo, mandíbula, cauda e braços.

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
