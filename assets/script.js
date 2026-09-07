/* =========================================================
   Harmony Farmácia de Manipulação — comportamento da LP
   ========================================================= */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     CONFIGURAÇÃO — altere aqui e vale para a página inteira
     ------------------------------------------------------------------ */
  var CONFIG = {
    // Número no formato internacional, só dígitos: 55 + DDD + número
    whatsapp: '5551993804579',

    // Mensagem que já vem escrita quando o lead abre a conversa
    mensagem: 'Olá! Vim pelo site da Harmony e gostaria de falar sobre uma fórmula manipulada.',

    // Acrescenta ?utm/#origem à mensagem para você saber de qual botão veio.
    // Deixe false se preferir a mensagem limpa.
    rastrearOrigem: true
  };

  /* ------------------------------------------------------------------
     Links de WhatsApp
     ------------------------------------------------------------------ */
  function montarLink(origem) {
    var texto = CONFIG.mensagem;
    if (CONFIG.rastrearOrigem && origem) texto += ' [' + origem + ']';
    return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(texto);
  }

  document.querySelectorAll('.js-wa').forEach(function (el) {
    el.href = montarLink(el.dataset.src || 'site');
    el.target = '_blank';
    el.rel = 'noopener';
  });

  /* ------------------------------------------------------------------
     Header com sombra ao rolar + barra fixa no mobile
     ------------------------------------------------------------------ */
  var header = document.querySelector('.site-header');
  var mobileBar = document.getElementById('mobileBar');
  var finalCta = document.querySelector('.final-cta');

  function aoRolar() {
    var y = window.scrollY;
    header.classList.toggle('is-stuck', y > 40);

    if (mobileBar) {
      // Aparece depois do hero e some quando o CTA final entra em cena
      var fimDoCta = finalCta ? finalCta.getBoundingClientRect().top < window.innerHeight : false;
      mobileBar.classList.toggle('is-visible', y > 520 && !fimDoCta);
    }
  }
  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();

  /* ------------------------------------------------------------------
     Menu mobile
     ------------------------------------------------------------------ */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var aberto = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(aberto));
      toggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------
     Animação de entrada dos blocos
     ------------------------------------------------------------------ */
  var alvos = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    alvos.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        var irmaos = Array.prototype.slice.call(entrada.target.parentElement.children);
        var atraso = Math.min(irmaos.indexOf(entrada.target), 5) * 90;
        setTimeout(function () { entrada.target.classList.add('is-in'); }, atraso);
        obs.unobserve(entrada.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    alvos.forEach(function (el) { obs.observe(el); });

    // Rede de segurança: nada fica invisível se o observer não disparar
    window.addEventListener('load', function () {
      setTimeout(function () {
        alvos.forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in');
        });
      }, 1200);
    });
  }

  /* ------------------------------------------------------------------
     Vídeos: só baixam quando chegam perto da tela, e pausam fora dela
     ------------------------------------------------------------------ */
  var videos = document.querySelectorAll('.js-lazyvideo');
  var semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (videos.length && 'IntersectionObserver' in window) {
    var vObs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          // carrega o arquivo só na primeira vez que aparece
          if (!v.src && v.dataset.src) { v.src = v.dataset.src; v.load(); }
          if (!semMovimento) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        } else if (!v.paused) {
          v.pause();
        }
      });
    }, { rootMargin: '250px 0px' });

    videos.forEach(function (v) { vObs.observe(v); });
  } else {
    // Sem observer: mantém o poster, sem baixar vídeo à toa
    videos.forEach(function (v) { v.removeAttribute('data-src'); });
  }

  /* ------------------------------------------------------------------
     Acordeão: abre um por vez
     ------------------------------------------------------------------ */
  var itens = document.querySelectorAll('.accordion details');
  itens.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      itens.forEach(function (outro) { if (outro !== item) outro.open = false; });
    });
  });

  /* ------------------------------------------------------------------
     Ano do rodapé
     ------------------------------------------------------------------ */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
