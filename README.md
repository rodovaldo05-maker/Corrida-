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
| Davi | **MÚSCULOS ANCESTRAIS** GALINHA: depois de um tombo sai em pânico, 20% mais rápida por 3 s · DINO: os passos fazem a terra tremer e deixam lentos os rivais em até 8 m · ROBÔ: o reator conserta a durabilidade quando passa 4 s sem apanhar | **INSTINTO DE CAÇA** GALINHA: bota um ovo na pista a cada 10 s e quem pisar escorrega · DINO: cada ultrapassagem enche 15 de fúria · ROBÔ: cada pulo acende os foguetes dos pés (mini-turbo) | **CAUDA E GARRAS** GALINHA: cisca e pega os itens de mais longe · DINO: no drift a cauda varre os lados e derruba quem estiver perto · ROBÔ: giroscópio, o drift não perde velocidade e gruda mais na pista | **PULO ANCESTRAL** GALINHA: bate as asas e cai devagar · DINO: pisão ao pousar derruba quem estiver em até 10 m · ROBÔ: escudo defletor rebate um míssil a cada 8 s | **DINOSSAURO ROBÔ** Vira um dinossauro robô blindado que lança 4 mísseis de uma vez. Só depois de maximizar Músculos e Garras | **RUGIDO JURÁSSICO** Um rugido que derruba todos que estiverem em volta |
| Rex | **PERSEGUIÇÃO** Com o líder até 40 m à frente liga o giroflex e corre 10% mais rápido | **MULTA** Quem o ultrapassa leva uma multa e fica 2 s mais lento | **ENCOSTAR** Derrapando, joga para o lado quem encostar nele | **ABORDAGEM** Pousar em cima de um rival (até 3 m) o derruba | **K9 BLINDADO** Colete azul de polícia: os 2 primeiros mísseis da corrida não o derrubam | **BLOQUEIO POLICIAL** Monta uma barreira de cones atravessando a pista atrás dele: quem vier atrás capota |
| Pingo | **MOLHADO** Por 4 s depois de passar numa poça corre 10% mais rápido | **HIDRANTE** Pulando uma barreira, espirra água: quem vem logo atrás escorrega | **ESGUICHO** Derrapando sobre poças, o mini-turbo carrega 2× mais rápido | **ESCADA DE BOMBEIRO** Segurando o pulo no ar, fica pairando por até 1 segundo | **TANQUE DE ÁGUA** Manchas vermelhas e latas amarelas; cada poça enche 20 de nitro | **MANGUEIRA DE INCÊNDIO** Jato de água para frente por 3 s: tira os rivais da frente do caminho e os deixa escorregando |
| Caramelo | **DIA DE SORTE** A cada volta sorteia um bônus de velocidade de 0% a 15% para aquela volta | **TROCO** Cada osso ou lata tem 25% de chance de vir com um míssil de brinde | **RASPA E GANHA** Raspar na cerca dá 8 de nitro | **CAMBALHOTA DA SORTE** Cada pouso tem 30% de chance de dar um prêmio: nitro, míssil ou turbo | **COFRE DOURADO** Pelo dourado; ossos de ouro valem o triplo | **ROLETA** Gira a roleta: jackpot (nitro cheio, mísseis e escudo), super turbo, azar para os rivais... ou um tombo (10%) |
| Flecha | **LINHA RETA** Quanto mais tempo sem virar, mais rápido fica (até +15%); virar zera | **VÁCUO DUPLO** Ao sair do vácuo de um rival, ganha um turbo | **TRAÇADO LIMPO** Uma volta inteira sem raspar na cerca dá 30 de nitro e um turbo | **PASSADA BAIXA** Pulos curtos e rápidos: volta ao chão 60% mais depressa | **AERODINÂMICA** Pelo prateado; o vácuo dos rivais funciona do dobro da distância | **ESTILINGUE** É lançado até colar atrás do rival da frente, já no vácuo dele |
| Nevasca | **PISTA GELADA** No Pico Nevado e na Serra corre 12% mais rápido; nas outras, 4% | **BOLA DE NEVE** Terminar um drift joga neve em quem vem atrás e os assusta | **PATINAÇÃO** Em pistas lisas e no gelo faz curvas 25% mais fechadas | **TRENÓ VOADOR** No ar o nitro não gasta | **MOTOR TÉRMICO** Pelo azul-gelo; nunca escorrega: imune a gelo, lama jogada e jatos de água | **TRILHA DE GELO** Por 5 s deixa um rastro de gelo atrás: quem passar por cima escorrega |
| Bolinha | **VINGANÇA** Cada tombo que leva o deixa 3% mais rápido pelo resto da corrida (até +15%) | **RICOCHETE** Quando um míssil o acerta, é arremessado para frente e levanta mais rápido | **STRIKE** Batidas durante o drift derrubam o rival como pino de boliche | **QUICA-QUICA** Ao pousar, quica sozinho mais uma vez e ganha um mini-turbo | **PUG DE AÇO** Corpo de aço: trombadas não o tiram do lugar | **BOLA DE BOLICHE** Vira uma bola por 4 s: mais rápido, imune e derruba quem encostar |
| Pitiquin | **BRAVINHO** Perto de um rival maior que ele, fica 12% mais rápido | **MORDIDA NO CALCANHAR** Colado atrás de um rival por 1 s, morde: o rival fica lento e ele ganha turbo | **MINI-CURVA** Em baixa velocidade faz curvas 30% mais fechadas | **PULO NERVOSO** Pode pular mesmo tonto: o pulo acaba com o atordoamento na hora | **PINSCHER ARMADO** Carrega até 5 mísseis, e eles voam 25% mais rápido | **LATIDO SÔNICO** Uma onda sonora para frente: joga os rivais para os lados e destrói mísseis no caminho |
| Princesa | **VAIDADE** Chapéu, óculos e capa equipados a deixam mais rápida (até +12%) | **TRIBUTO** Ao ultrapassar um rival, rouba até 12 de nitro dele | **CARRUAGEM** Correr fora da pista não a deixa mais lenta | **ENTRADA TRIUNFAL** Ao pousar, quem está a 8 m fica encantado e lento | **ESCOLTA REAL** Um drone de guarda bloqueia um ataque a cada 20 segundos | **TROCA DE COROA** Troca de lugar com o rival logo à frente dela |
| Linda | **EMBALO** Depois de 5 s sem frear nem cair, corre 12% mais rápido | **FOCINHADA** Batendo em alguém por trás, rouba o embalo: ela ganha turbo, o rival perde velocidade | **LAMA NAS PATAS** Derrapando, joga lama para trás e quem vem atrás escorrega | **PANCADA NO CHÃO** Pousando de um pulo alto, faz o chão tremer: rivais até 12 m ficam lentos | **COURAÇA** Com o nitro ligado nada a derruba | **ESTOURO** Dispara imparável por 2,5 s e atropela todos no caminho |
| Faiton | **RELÂMPAGO NEGRO** Abaixo do 3º lugar ganha uma aura de raios vermelhos e corre mais rápido | **DASH DAS SOMBRAS** Ao pular uma barreira se teleporta um pouco para frente, deixando sombras para trás | **EQUILÍBRIO DE LOBO** Recupera rápido a estabilidade em curvas escorregadias | **PERNAS DE MOLA** Pernas mais fortes: o pulo o lança para frente | **LOBO BRANCO** Pele branca, latas vermelhas, fica maior e se levanta mais rápido depois de um míssil | **NOITE ETERNA** O céu escurece, os pássaros fogem dele e os rivais ficam assustados |
| Paz | **PAZ INTERIOR** Sem rivais por perto fica mais rápido | **BÊNÇÃO** Cada osso de ouro enche 6 de nitro | **CALMARIA** Sustos e bichos voadores atrapalham só pela metade do tempo | **CÉU PROTEGIDO** No ar os mísseis erram ele | **NUVEM DOURADA** Nuvem dourada, latas azuis e os pássaros não o atacam | **NUVEM DE TEMPESTADE** Raios caem nos 2 rivais logo à frente |
| Pintado | **SANGUE NO FARO** Com um rival atordoado até 60 m à frente, corre 12% mais rápido | **CERCO** Com 2 ou mais rivais por perto, o latido derruba em vez de só assustar | **ENCURRALAR** Derrapando colado num rival, ele fica mais lento | **BOTE** Pulando com um rival até 14 m à frente, salta em cima dele | **RÁDIO DA MATILHA** Mísseis que vêm atrás dela voam 35% mais devagar | **CHAMADO DA MATILHA** Três mabecos fantasmas correm na frente e derrubam os rivais que alcançarem |
| Ruivo | **TERRA VERMELHA** Fora da pista corre 10% mais rápido que dentro | **ATALHO** Voltar da grama para a pista dá um mini-turbo | **CORTE DE CURVA** Derrapando na grama, o mini-turbo carrega 2× mais rápido | **PULO DO ACOSTAMENTO** Pulando de fora da pista, é lançado de volta para ela | **PNEUS DE TERRA** Poças e bolas rolando não o atrapalham | **EMBOSCADA** Cava um buraco escondido na pista: o próximo rival que passar cai nele |
| Ninja | **PASSO LEVE** Por 3 s depois de pousar, corre 10% mais rápido | **SUBSTITUIÇÃO** Quando um míssil ia acertá-lo, 40% de chance de deixar um tronco no lugar e aparecer 6 m à frente | **CURVA FANTASMA** Derrapando, atravessa os rivais sem bater | **SALTO NA PAREDE** Pulando perto da cerca, chuta a parede e é lançado para o meio da pista | **CAMUFLAGEM ÓPTICA** Enquanto derrapa, os mísseis não conseguem mirar nele | **SHURIKENS** Lança 3 estrelas ninja em leque, em linha reta, que derrubam quem acertarem |
| Sombra | **FUGA** Com um rival colado atrás (até 8 m), corre 12% mais rápido | **GOLPE PELAS COSTAS** Mísseis dele que acertam por trás atordoam mais e roubam um míssil do rival | **SEM RASTRO** Quem anda no vácuo dele não ganha nada; o nitro vai para ele | **MERGULHO** No ar, apertar pular de novo mergulha até o chão e solta uma onda de medo | **NÃO RASTREÁVEL** Mísseis disparados de mais de 30 m não conseguem mirar nele | **APAGÃO** Rivais em até 60 m ficam 5 s sem nitro, sem mísseis e sem habilidade |
| Paçoca | **BARRIGA CHEIA** Cada lata de nitro que come o deixa 2% mais rápido pelo resto da corrida (até +12%) | **ESTÔMAGO DE FERRO** Latas de nitro curam na hora: acaba tontura, susto, lentidão e escorregão | **BARRIGUDO** Na Serra do Drift e no gelo vira sem dificuldade | **OSSO NO PULO** Cada barreira pulada dá 10 de nitro e um osso de ouro | **LANCHEIRA** Começa a corrida com o tanque de nitro cheio | **BANQUETE** Joga um banquete na pista atrás dele: quem passar para para comer |
| Raio | **CORRENTE** Acelerando sem parar, ganha 1% de velocidade por segundo (até +12%); frear ou cair zera | **DESCARGA** Passando numa faixa de turbo, um raio acerta o rival mais próximo | **ARCO ELÉTRICO** O super mini-turbo (rosa) eletrocuta quem estiver a 10 m | **PARA-RAIOS** Cada pulo recarrega 12 de nitro | **SUPERCONDUTOR** Na velocidade máxima o nitro recarrega sozinho | **SOBRECARGA** Por 6 s solta raios: a cada segundo eletrocuta o rival mais próximo |
| Duque | **PESO LEVE** Sem munição corre 12% mais rápido | **RECARGA RÁPIDA** Atira com metade do tempo de recarga e 1 a cada 3 tiros sai de graça | **TORRE GIRATÓRIA** Mira em qualquer direção: acerta até quem está do lado e atrás | **PARAQUEDISTA** Atirando no ar, sai um míssil extra | **MIRA LASER** Os mísseis dele fazem curvas 2× mais fechadas | **CANHÃO DE RECUO** Um tiro de canhão para trás derruba quem vem atrás, e o coice o lança para frente |
| Frufru | **PASSARELA** Nos primeiros 150 m de cada volta, passando pela torcida, corre 12% mais rápido | **SALTO QUEBRADO** Quando um míssil a acerta, quem atirou fica encantado e lento | **PIRUETA** Terminar um drift faz uma pirueta que a deixa 1,5 s imune | **BALÉ NO AR** No ar, os mísseis que chegam nela voltam para quem atirou | **GLAMOUR** Quem vem até 12 m atrás dela se distrai de tempos em tempos | **PERFUME ENCANTADOR** Encanta os rivais em até 30 m: ficam 30% mais lentos por 4 s |
| Major | **FORMAÇÃO DE COMBATE** Em 2º ou 3º lugar corre 8% mais rápido | **ORDEM DE COMANDO** Latindo, os rivais à frente abrem caminho para os lados | **MANOBRA MILITAR** Começa o drift em qualquer velocidade, sem perder embalo | **PARAQUEDAS** Cai devagar e controla a direção no ar | **CONTRAMEDIDAS** Solta sinalizadores: 50% de chance de derrubar cada míssil que vem nele | **BOMBARDEIO DE ZONA** Marca uma área 45 m à frente: 2 s depois chovem bombas nela |
| Tofu | **PREGUIÇA CONTAGIANTE** Quem vem até 10 m atrás dele fica mais lento | **COCHILO** Parado ou tonto, recupera 20 de nitro por segundo | **CURVA PREGUIÇOSA** Sem apertar para os lados, faz as curvas sozinho no traçado | **BARRIGADA** Pousando, a barriga derruba quem estiver a 4 m | **COLCHÃO** Pelo branco; tombos duram metade e ele levanta com um mini-turbo | **SONECA TURBO** Tira uma soneca de 1,5 s e acorda descansado: 6 s mais rápido e imune |
| Bidu | **EMPURRÃO** Cada trombada o deixa 8% mais rápido por 3 s | **BARRIL DE RESGATE** Uma vez por volta, se cair, levanta na hora e ganha 30 de nitro | **ÂNCORA** Nas curvas ninguém o empurra | **IMPACTO DA MONTANHA** Pousando de um pulo alto, quem está a 15 m perde o equilíbrio | **GUINCHO** Com um rival até 12 m à frente, acelera 30% mais | **AVALANCHE** Solta uma bola de neve que rola na frente, crescendo e derrubando todos no caminho |
| Canela | **FINAL DE VOLTA** Nos últimos 30% de cada volta corre 10% mais rápido | **CAUDA DE FOGO** Mini-turbos deixam fogo na pista: quem passar fica lento | **ESPÍRITO DO VENTO** A cada 6 s de drift ganha uma carga de habilidade (sem upgrade, 25 de nitro) | **SALTO DE AKITA** Pula mais alto e mais longe | **ESCAPAMENTO** Pelo vermelho-fogo; o nitro solta chamas que atrasam quem vem colado | **ESPÍRITO GUARDIÃO** Uma raposa espiritual a protege por 8 s: o próximo ataque volta para quem atacou |
| Biscoito | **RECOMPENSA** Por 3 s depois de pegar qualquer item corre 10% mais rápido | **FAREJADOR** Caixas de munição dão 2 mísseis | **NARIZ NO CHÃO** Derrapando, pega itens de 3× mais longe | **ORELHAS PLANADORAS** Plana depois do pulo, caindo devagar | **MOCHILA EXTRA** Carrega 1 míssil a mais e começa a corrida com 2 | **FARO DE TESOURO** Fareja e pega na hora todos os itens nos próximos 150 m da pista |
| Emilly | **RABEIRA** Em último ou penúltimo lugar corre 14% mais rápido | **CONTRA-ATAQUE** Por 6 s depois de levantar de um tombo, cada míssil sai em dobro | **RABO PREÊNSIL** Raspar na cerca vira estilingue: ganha um mini-turbo | **PENDURADA** No ar o nitro enche | **AIRBAG** A cada 15 s, o primeiro tombo dura só um instante | **NUVEM DE FEDOR** Deixa uma nuvem fedida na pista: quem passar fica com os controles invertidos |
| Taissa | **PAREDÃO** Correndo colada na cerca fica 10% mais rápida | **TROCA DE PELE** O primeiro tombo da corrida não pega: ela troca de pele e segue | **VENTOSAS NA CERCA** Bater na cerca não freia: ela gruda e é impulsionada para frente | **SALTO GRUDENTO** Por 2 s depois de pousar tem aderência máxima | **CAMALEOA** Escamas neon; 30% dos mísseis e bichos voadores simplesmente não a veem | **RABO SOLTO** Solta o rabo como isca: os mísseis e pássaros atrás dela se perdem, e ela ganha turbo |
| Tiffany | **SANGUE QUENTE** Esquenta durante a corrida: +1% de velocidade a cada 10 s (até +12%) | **LÍNGUA SENSORIAL** Sente mísseis chegando e pula sozinha para desviar | **CAUDA LEME** Em alta velocidade faz curvas 20% mais fechadas | **RABADA NO POUSO** Ao pousar, a cauda varre para os lados quem estiver a 5 m | **SOL NAS ESCAMAS** No Parque e na Praia, o sol enche o nitro sozinho | **CHICOTADA GIRATÓRIA** Gira a cauda por 2 s: derruba e arremessa quem chegar a 7 m |
| Kemilly | **HOP HOP** Cada pulo dá +4% de velocidade por 5 s (acumula até 3 vezes) | **CENOURA NO BOLSO** Acertar uma cenoura tem 50% de chance de devolver a munição | **ZIGUE-ZAGUE** Trocar de lado no drift em menos de 1 s dá um mini-turbo na hora | **SUPER COELHO** Pula mais alto e as barreiras viram trampolim | **CENOURAS EXPLOSIVAS** Pelo de chocolate; as cenouras explodem e acertam todos a 5 m | **TOCA DE COELHO** Cava um túnel e sai 35 m à frente, derrubando quem estiver na saída |

## Davi, a Galinha Ancestral

A Davi muda de forma:

- **Galinha**: começa fraca, com 1 quadrado em cada atributo. Os pássaros não a atacam.
- **Dinossauro** (T-Rex, 4 vezes a altura da galinha): ao deixar **Músculos** e **Garras** no máximo na oficina, vira dinossauro de vez e fica com um dos atributos base mais altos do jogo.
- **Dinossauro robô** (2 vezes a altura do dinossauro): o upgrade mecânico dela só pode ser comprado depois de Músculos e Garras no máximo. Vira um dinossauro robô blindado que lança **4 mísseis de uma vez**, cada um atrás de um rival.
- **Robô sem nitro, com durabilidade**: o robô não usa nitro e não cai com barreiras, bolas, mísseis nem pancadas. Cada batida gasta a **durabilidade** (que também se desgasta aos poucos durante a corrida). Quando ela quebra, vira o dinossauro normal até o fim da corrida.
- **Fúria do tiranossauro**: no dinossauro a barra de nitro vira **FÚRIA**. Ligada (botão de nitro), ele fica 2 pontos de velocidade mais rápido, deixa um rastro vermelho e derruba quem estiver perto.
- **Dinossauro**: míssil não o derruba, só o deixa lento por alguns segundos, e ele atropela as barreiras sem precisar pular.
- Ainda galinha, cada **carga especial** (cristal roxo) tem 20% de chance de transformá-la em dinossauro por 12 segundos.
- **Passivas que mudam com a forma**: as passivas da oficina da Davi trocam junto com o corpo. Galinha: pânico depois de tombar, bota ovos que fazem escorregar, cisca itens de longe e plana. Dinossauro: passos de tremor, fúria a cada ultrapassagem, rabada no drift e pisão ao pousar. Robô: reator que conserta a durabilidade, foguetes nos pés a cada pulo, giroscópio no drift e escudo defletor que rebate mísseis.

Modelos: Chicken (jeremy, Poly Pizza) e T-Rex (Quaternius, CC0), enviados pelo jogador. O dinossauro robô é feito por código, com juntas no quadril, joelho, tornozelo, mandíbula, cauda e braços.

## Campeonato, loja e missões

- **Campeonato (Copa)**: no menu, troque o *Modo* para COPA. São 4 corridas seguidas (Parque, Praia, Pico e Serra) contra os mesmos 5 rivais, com pontos por posição (10, 7, 5, 3, 2, 1). No fim tem troféu de ouro, prata ou bronze e prêmio em ossos de ouro.
- **Loja de visual**: chapéus (boné, festa, cartola, caubói, capacete, coroa), óculos, capas, cores de colete e rastros (bolhas, corações, estrelas, fogo, arco-íris). Cada bicho guarda o próprio visual.
- **Cores**: aba CORES da loja, de graça: preto, branco, vermelho, azul, dourado, verde ou roxo no corpo inteiro do bicho (os coletes usam as mesmas cores).
- **Pinturas de pele**: aba PINTURAS da loja, com padrões inspirados nos personagens (Manchas do Pingo, Listras da Tiffany, Pelagem do Faiton, Máscara da Nevasca, Pintinhas da Taissa, Rosa da Princesa, Camuflagem do Major, Retalhos do Pintado) e extras (Tigre, Chamas, Galáxia, Arco-íris, Ouro Puro). Funcionam em todos os bichos, inclusive nas formas da Davi.
- **Equipar e desequipar**: o upgrade mecânico comprado pode ser desequipado e equipado de novo na aba MECÂNICO da loja.
- **Missões**: 3 missões diárias que mudam à meia-noite (+250 cada e +300 de bônus) e 15 conquistas com prêmios.
- **Narrador**: avisa quem assumiu a liderança, quem ultrapassou quem e quem acertou míssil em quem. (só escrito no topo da tela, sem voz).
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
