# Harmony — Landing Page

LP institucional com foco em conversão pelo WhatsApp.
HTML/CSS/JS puro, sem build, sem dependências. É só subir os arquivos.

```
index.html
assets/
  styles.css
  script.js
  logo.svg / logo-white.svg      logo completo (vetor, extraído do Logo.pdf oficial)
  mark.svg / mark-white.svg      só a borboleta (favicon, selos, marca d'água)
  og-image.png                   imagem de compartilhamento (1200×630)
  img/    hero, farmaceutica, laboratorio, pipeta, serum, creme,
          produtos, corrida, yoga, sorriso
  video/  gota.mp4 (+poster), formula.mp4 (+poster)
```

## Rodar localmente

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## Estrutura da página

1. **Hero** — foto em tela cheia com efeito Ken Burns, "Corpo e mente em harmonia"
2. **Barra de confiança** — 4 diferenciais
3. **A farmácia** — sobre, com composição de duas fotos + selo da borboleta
4. **O que manipulamos** — bento grid de 6 fotos com as linhas
5. **Precisão** — faixa com **vídeo de fundo** (gota âmbar), 3 pontos de processo
6. **Como funciona** — 3 passos até o WhatsApp
7. **Na bancada** — **vídeo vertical** (cápsulas e ervas) + tipos de apresentação
8. **Bem-estar** — galeria de lifestyle
9. **Depoimentos** — *seção comentada, ver abaixo*
10. **FAQ** — acordeão
11. **Onde estamos** — endereço, horário e mapa
12. **CTA final** + rodapé + botão flutuante de WhatsApp

## Vídeos

Ambos são `muted / loop / playsinline` com `preload="none"`: o arquivo **só baixa
quando a seção chega perto da tela** e pausa quando sai. Até lá aparece o poster.
Carregamento inicial da página fica em torno de 1,5 MB; os 8 MB de vídeo são sob demanda.

Para trocar um vídeo, substitua o `.mp4` em `assets/video/` mantendo o nome, e
atualize o `-poster.jpg` correspondente (um frame do próprio vídeo).

## O que você precisa ajustar

| Onde | O quê |
|---|---|
| `assets/script.js` → `CONFIG` | número do WhatsApp e a mensagem que já vem preenchida |
| `index.html` → `.socials` | trocar os `href="#"` pelos links reais de Instagram / Facebook / TikTok |
| `index.html` → rodapé | **farmacêutico(a) responsável + nº do CRF/RS** — obrigatório (RDC 67/2007 e CFF). Há um `TODO` marcado no HTML |
| `index.html` → bloco `DEPOIMENTOS` | a seção está **comentada**. Descomente e preencha quando tiver depoimentos reais (com autorização de uso) |
| `index.html` → "Já é cliente?" | trocar o link pelo `writereview?placeid=` do perfil da Harmony no Google Meu Negócio |
| `index.html` → `#localizacao` | há um bloco comentado pronto para a **foto real da fachada/interior** da Harmony |
| `index.html` → `og:image` / `canonical` | trocar para a URL final quando publicar |

### Sobre as imagens

As fotos e vídeos atuais são **stock livre (Pexels — uso comercial, sem
atribuição obrigatória)**, escolhidos na linha da identidade da Harmony:
luz quente, lifestyle, "corpo e mente". Funcionam para publicar hoje, mas
**foto real converte mais**: assim que você tiver imagens da loja, da bancada e
da equipe, é só substituir os arquivos em `assets/img/` mantendo os nomes — o
layout já está com os recortes certos (`object-fit: cover`).

Proporções que cada slot espera:

- `hero.jpg` — paisagem ampla, 3:2 ou mais larga, com espaço à esquerda para o texto
- `farmaceutica.jpg` — retrato 4:5
- `serum.jpg`, `produtos.jpg` — retrato 4:5 (tiles altos do bento)
- os demais — paisagem 3:2

## Rastreamento de origem do lead

Cada botão manda um sufixo na mensagem (`[hero]`, `[faq]`, `[cta_final]`…), então
você vê no WhatsApp de qual parte da página o lead veio. Para desligar, mude
`rastrearOrigem: false` em `assets/script.js`.

Se for plugar Google Analytics / Meta Pixel, cole o snippet antes de `</head>` e
adicione o evento no listener dos `.js-wa`.

## Identidade

Cores tiradas do logo oficial, nada inventado:

- laranja `#EC5A29` · âmbar `#F79E1B` (gradiente da marca)
- grafite `#4F4F4F` · tinta `#241C18`
- creme `#FFF9F5` / `#FDF1EA` · escuro `#2B211C`

Tipografia: **Outfit** (títulos, geométrica humanista como a do logo) + **Inter** (texto).

## Dados usados (fonte: farmaciasharmony.com.br)

- Rua Riachuelo, 1484 — Centro Histórico, Porto Alegre / RS — CEP 90010-273
- (51) 99926-0000 · harmonygestao@gmail.com
- Segunda a sexta, 8h às 18h
- CNPJ 30.227.765/0001-20 *(o site traz `30.227.76/50001-20`, com a pontuação
  deslocada — corrigi para o formato válido, mas **confira antes de publicar**)*
