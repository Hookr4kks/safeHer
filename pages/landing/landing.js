/* ==========================================================================
   SafeHer — página LANDING (pública)
   Porta de entrada antes do login: apresenta o SafeHer, recursos e chama
   para ação. Não usa a "casca" do app (sidebar/topbar/bottomnav de
   layout.js) — tem seu próprio cabeçalho, com menu em topo no desktop e
   sidebar deslizante no mobile.
   ========================================================================== */
import { ICONE, criarTradutor, montarSemShell, SECRETARIA_MULHER } from "../../layout.js";

const I18N_PAGINA = {
  pt: {
    slogan: "Cuidar, apoiar, proteger.",
    navInicio:"Início", navSobre:"Sobre", navRecursos:"Recursos", navComoFunciona:"Como funciona", navContato:"Contato",
    pedirAjuda:"Pedir ajuda",
    badge: "Você não está sozinha",
    tituloA:"Segurança, apoio e ", tituloEm1:"proteção", tituloB:" para todas as ", tituloEm2:"mulheres", tituloFim:".",
    sub: "Sistema para prevenção e proteção de mulheres em situação de violência. Alerta de emergência, mapa de apoio, chatbot e orientação ao seu alcance.",
    ctaPrimario:"Pedir ajuda agora", ctaSecundario:"Criar minha conta",
    citacao1:"Você merece viver sem medo.", citacao2:"Você merece ser livre.",
    recursosEyebrow:"O que o SafeHer oferece",
    recTitulo1:"Alerta de emergência", recDesc1:"Envie um alerta rápido para seus contatos de confiança.",
    recTitulo2:"Mapa de apoio", recDesc2:"Encontre delegacias, hospitais, assistência social e serviços perto de você.",
    recTitulo3:"Chat confidencial", recDesc3:"Converse com nossa assistente virtual de forma sigilosa.",
    recTitulo4:"Teste interativo", recDesc4:"Identifique sinais de violência e receba orientações.",
    recTitulo5:"Contatos de confiança", recDesc5:"Organize sua rede de apoio para agir rápido quando precisar.",
    comoEyebrow:"Como funciona", comoTitulo:"Três passos simples",
    passo1Titulo:"Crie sua conta", passo1Desc:"Cadastro rápido e seguro, com seus dados protegidos.",
    passo2Titulo:"Monte sua rede", passo2Desc:"Adicione contatos de confiança para receberem seus alertas.",
    passo3Titulo:"Fique protegida", passo3Desc:"Use o botão de emergência sempre que precisar de ajuda.",
    ctaFinalTitulo:"Não espere para se proteger", ctaFinalDesc:"Crie sua conta gratuita e tenha uma rede de apoio sempre por perto.",
    ctaFinalBtn:"Criar minha conta",
    contatoEyebrow:"Precisa de ajuda agora?", contatoTitulo:"Contatos de emergência",
    footerTexto:"Rede de proteção para mulheres.",
    footerEntrar:"Já tenho conta",
  },
  en: {
    slogan: "Care, support, protect.",
    navInicio:"Home", navSobre:"About", navRecursos:"Features", navComoFunciona:"How it works", navContato:"Contact",
    pedirAjuda:"Get help",
    badge: "You are not alone",
    tituloA:"Safety, support and ", tituloEm1:"protection", tituloB:" for all ", tituloEm2:"women", tituloFim:".",
    sub: "A system for the prevention and protection of women facing violence. Emergency alerts, a support map, chatbot and guidance within reach.",
    ctaPrimario:"Get help now", ctaSecundario:"Create my account",
    citacao1:"You deserve to live without fear.", citacao2:"You deserve to be free.",
    recursosEyebrow:"What SafeHer offers",
    recTitulo1:"Emergency alert", recDesc1:"Send a quick alert to your trusted contacts.",
    recTitulo2:"Support map", recDesc2:"Find police stations, hospitals, social assistance and services near you.",
    recTitulo3:"Confidential chat", recDesc3:"Talk to our virtual assistant privately.",
    recTitulo4:"Interactive test", recDesc4:"Identify signs of violence and get guidance.",
    recTitulo5:"Trusted contacts", recDesc5:"Organize your support network to act fast when needed.",
    comoEyebrow:"How it works", comoTitulo:"Three simple steps",
    passo1Titulo:"Create your account", passo1Desc:"Quick, secure sign-up with your data protected.",
    passo2Titulo:"Build your network", passo2Desc:"Add trusted contacts to receive your alerts.",
    passo3Titulo:"Stay protected", passo3Desc:"Use the emergency button whenever you need help.",
    ctaFinalTitulo:"Don't wait to protect yourself", ctaFinalDesc:"Create your free account and keep a support network close.",
    ctaFinalBtn:"Create my account",
    contatoEyebrow:"Need help now?", contatoTitulo:"Emergency contacts",
    footerTexto:"A protection network for women.",
    footerEntrar:"I already have an account",
  },
  es: {
    slogan: "Cuidar, apoyar, proteger.",
    navInicio:"Inicio", navSobre:"Acerca de", navRecursos:"Recursos", navComoFunciona:"Cómo funciona", navContato:"Contacto",
    pedirAjuda:"Pedir ayuda",
    badge: "No estás sola",
    tituloA:"Seguridad, apoyo y ", tituloEm1:"protección", tituloB:" para todas las ", tituloEm2:"mujeres", tituloFim:".",
    sub: "Un sistema para la prevención y protección de mujeres en situación de violencia. Alerta de emergencia, mapa de apoyo, chatbot y orientación a tu alcance.",
    ctaPrimario:"Pedir ayuda ahora", ctaSecundario:"Crear mi cuenta",
    citacao1:"Mereces vivir sin miedo.", citacao2:"Mereces ser libre.",
    recursosEyebrow:"Qué ofrece SafeHer",
    recTitulo1:"Alerta de emergencia", recDesc1:"Envía una alerta rápida a tus contactos de confianza.",
    recTitulo2:"Mapa de apoyo", recDesc2:"Encuentra comisarías, hospitales, asistencia social y servicios cerca de ti.",
    recTitulo3:"Chat confidencial", recDesc3:"Habla con nuestra asistente virtual de forma privada.",
    recTitulo4:"Test interactivo", recDesc4:"Identifica señales de violencia y recibe orientación.",
    recTitulo5:"Contactos de confianza", recDesc5:"Organiza tu red de apoyo para actuar rápido cuando lo necesites.",
    comoEyebrow:"Cómo funciona", comoTitulo:"Tres pasos simples",
    passo1Titulo:"Crea tu cuenta", passo1Desc:"Registro rápido y seguro, con tus datos protegidos.",
    passo2Titulo:"Arma tu red", passo2Desc:"Agrega contactos de confianza para recibir tus alertas.",
    passo3Titulo:"Mantente protegida", passo3Desc:"Usa el botón de emergencia siempre que necesites ayuda.",
    ctaFinalTitulo:"No esperes para protegerte", ctaFinalDesc:"Crea tu cuenta gratuita y ten una red de apoyo siempre cerca.",
    ctaFinalBtn:"Crear mi cuenta",
    contatoEyebrow:"¿Necesitas ayuda ahora?", contatoTitulo:"Contactos de emergencia",
    footerTexto:"Una red de protección para mujeres.",
    footerEntrar:"Ya tengo cuenta",
  },
};
const t = criarTradutor(I18N_PAGINA);

const ICONE_ESCUDO = `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z"/></svg>`;
const ICONE_MENU = `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>`;
const ICONE_FECHAR = `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg>`;

function itensNav(){
  return [
    {href:"#inicio", nome:t("navInicio")},
    {href:"#recursos", nome:t("navRecursos")},
    {href:"#como-funciona", nome:t("navComoFunciona")},
    {href:"#contato", nome:t("navContato")},
  ];
}

function headerHtml(){
  const itens = itensNav();
  return `
  <header class="lp-header">
    <a href="#inicio" class="lp-marca">
      <img src="../../assets/img/iconSiteRock.png" alt="SafeHer" class="lp-marca-icone">
      <div class="lp-marca-texto"><div class="nome">SafeHer</div><div class="slogan">${t("slogan")}</div></div>
    </a>
    <nav class="lp-nav-desktop">
      ${itens.map(it=>`<a href="${it.href}">${it.nome}</a>`).join("")}
    </nav>
    <div class="lp-header-acoes">
      <a href="../login/login.html" class="btn btn-primario btn-sm"><span>${t("pedirAjuda")}</span>${ICONE.alerta}</a>
      <button class="lp-btn-menu" id="btnAbrirMenu" aria-label="Menu">${ICONE_MENU}</button>
    </div>
  </header>`;
}

function sidebarMobileHtml(){
  const itens = itensNav();
  return `
  <div class="lp-overlay-menu" id="overlayMenu"></div>
  <aside class="lp-sidebar-mobile" id="sidebarMobile">
    <div class="lp-topo">
      <div class="lp-marca">
        <img src="../../assets/img/iconSiteRock.png" alt="SafeHer" class="lp-marca-icone">
        <div class="lp-marca-texto"><div class="nome">SafeHer</div></div>
      </div>
      <button class="lp-fechar" id="btnFecharMenu" aria-label="Fechar">${ICONE_FECHAR}</button>
    </div>
    ${itens.map(it=>`<a href="${it.href}" class="lp-link-menu">${it.nome}</a>`).join("")}
    <div class="lp-sep"></div>
    <a href="../login/login.html" class="lp-link-menu">${t("footerEntrar")}</a>
    <a href="../login/login.html" class="btn btn-primario btn-block lp-cta">${t("pedirAjuda")}</a>
  </aside>`;
}

function heroHtml(){
  return `
  <section class="lp-hero" id="inicio">
    <div class="lp-hero-bg"><img src="../../assets/img/arteSiteRock2.png" alt="" class="lp-hero-bg-img"></div>
    <div class="lp-hero-texto">
      <span class="lp-badge reveal" style="--atraso:0">${ICONE_ESCUDO}${t("badge")}</span>
      <h1 class="lp-hero-titulo reveal" style="--atraso:1">${t("tituloA")}<em>${t("tituloEm1")}</em>${t("tituloB")}<em>${t("tituloEm2")}</em>${t("tituloFim")}</h1>
      <p class="lp-hero-sub reveal" style="--atraso:2">${t("sub")}</p>
      <div class="lp-hero-ctas reveal" style="--atraso:3">
        <a href="../login/login.html" class="btn btn-emergencia">${ICONE.alerta}${t("ctaPrimario")}</a>
        <a href="../cadastro/cadastro.html" class="btn btn-outline">${t("ctaSecundario")}</a>
      </div>
    </div>
    <div class="lp-quote reveal" style="--atraso:4">
      <div class="aspas">“</div>
      <p>${t("citacao1")}<br>${t("citacao2")}</p>
    </div>
  </section>`;
}

function recursosHtml(){
  const itens = [
    {ic:"alerta", titulo:t("recTitulo1"), desc:t("recDesc1")},
    {ic:"mapa", titulo:t("recTitulo2"), desc:t("recDesc2")},
    {ic:"chat", titulo:t("recTitulo3"), desc:t("recDesc3")},
    {ic:"teste", titulo:t("recTitulo4"), desc:t("recDesc4")},
    {ic:"contatos", titulo:t("recTitulo5"), desc:t("recDesc5")},
  ];
  return `
  <section class="lp-recursos" id="recursos">
    <div class="lp-secao-cabecalho reveal" style="--atraso:0">
      <span class="h-eyebrow">${t("recursosEyebrow")}</span>
    </div>
    <div class="lp-recursos-grid">
      ${itens.map((it,i)=>`
        <div class="card card-hover lp-recurso-card reveal" style="--atraso:${i+1}">
          <div class="lp-recurso-icone">${ICONE[it.ic]}</div>
          <div class="h-corpo-forte" style="margin-bottom:6px;">${it.titulo}</div>
          <div class="h-legenda">${it.desc}</div>
        </div>
      `).join("")}
    </div>
  </section>`;
}

function comoFuncionaHtml(){
  const passos = [
    {n:"1", titulo:t("passo1Titulo"), desc:t("passo1Desc")},
    {n:"2", titulo:t("passo2Titulo"), desc:t("passo2Desc")},
    {n:"3", titulo:t("passo3Titulo"), desc:t("passo3Desc")},
  ];
  return `
  <section class="lp-secao" id="como-funciona">
    <div class="lp-secao-cabecalho reveal" style="--atraso:0">
      <span class="h-eyebrow">${t("comoEyebrow")}</span>
      <h2 class="h-titulo">${t("comoTitulo")}</h2>
    </div>
    <div class="lp-passos">
      ${passos.map((p,i)=>`
        <div class="lp-passo reveal" style="--atraso:${i+1}">
          <div class="lp-passo-num">${p.n}</div>
          <div class="h-corpo-forte" style="margin-bottom:6px;">${p.titulo}</div>
          <div class="h-legenda">${p.desc}</div>
        </div>
      `).join("")}
    </div>
  </section>`;
}

function ctaFinalHtml(){
  return `
  <section class="lp-cta-final reveal" style="--atraso:0">
    <div class="h-titulo">${t("ctaFinalTitulo")}</div>
    <p>${t("ctaFinalDesc")}</p>
    <a href="../cadastro/cadastro.html" class="btn btn-primario">${t("ctaFinalBtn")}</a>
  </section>`;
}

function contatoHtml(){
  return `
  <section class="lp-secao" id="contato">
    <div class="lp-secao-cabecalho reveal" style="--atraso:0">
      <span class="h-eyebrow">${t("contatoEyebrow")}</span>
      <h2 class="h-titulo">${t("contatoTitulo")}</h2>
    </div>
    <div class="faixa-emergencia reveal" style="--atraso:1">${ICONE.aviso}<span><b>190</b> — Polícia Militar &nbsp;•&nbsp; <b>180</b> — Central de Atendimento à Mulher &nbsp;•&nbsp; <b>${SECRETARIA_MULHER.numeroExibicaoPlantao}</b> — Secretaria de Políticas para a Mulher e para a Pessoa Idosa</span></div>
  </section>`;
}

function footerHtml(){
  return `
  <footer class="lp-footer">
    <div>SafeHer — ${t("footerTexto")}</div>
    <a href="../login/login.html">${t("footerEntrar")}</a>
  </footer>`;
}

function iniciarRevelacoes(){
  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){ els.forEach(el=>el.classList.add('visto')); return; }
  const obs = new IntersectionObserver((entradas)=>{
    entradas.forEach(entrada=>{
      if(entrada.isIntersecting){ entrada.target.classList.add('visto'); obs.unobserve(entrada.target); }
    });
  }, { threshold:0.15, rootMargin:'0px 0px -60px 0px' });
  els.forEach(el=> obs.observe(el));
}

function render(){
  montarSemShell(`
  <div class="lp">
    ${headerHtml()}
    ${sidebarMobileHtml()}
    ${heroHtml()}
    ${recursosHtml()}
    ${comoFuncionaHtml()}
    ${ctaFinalHtml()}
    ${contatoHtml()}
    ${footerHtml()}
  </div>`);

  const overlay = document.getElementById('overlayMenu');
  const sidebar = document.getElementById('sidebarMobile');
  const abrir = ()=>{ overlay.classList.add('aberto'); sidebar.classList.add('aberto'); };
  const fechar = ()=>{ overlay.classList.remove('aberto'); sidebar.classList.remove('aberto'); };
  document.getElementById('btnAbrirMenu').onclick = abrir;
  document.getElementById('btnFecharMenu').onclick = fechar;
  overlay.onclick = fechar;
  sidebar.querySelectorAll('a').forEach(a=> a.addEventListener('click', fechar));

  iniciarRevelacoes();
}

render();
