/* ==========================================================================
   SafeHer — LAYOUT (camada global)
   Tudo que é compartilhado entre páginas vive aqui: Firebase, ícones, i18n
   global (navegação), estado do usuário/config, utilitários e a "casca"
   visual (sidebar, topbar, bottomnav, botão de pânico flutuante).
   Cada página importa deste arquivo o que precisa — não deve duplicar nada
   daqui nas páginas.
   ========================================================================== */
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { auth, db, googleProvider } from "./firebase.js";

/* Reexporta tudo de Firebase — as páginas nunca precisam importar do CDN
   diretamente, só deste arquivo. */
export {
  auth, db, googleProvider,
  createUserWithEmailAndPassword, fetchSignInMethodsForEmail, onAuthStateChanged,
  sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut,
  updateProfile, doc, getDoc, onSnapshot, setDoc,
};

/* ---------------------------------------------------------------- ícones */
export const ICONE = {
  mao:      `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.2 13.6c1.4-1.1 3-1.1 4.1-.1l1.7 1.6"/><path d="M9 15.1V8.4a1.05 1.05 0 012.1 0v4.4"/><path d="M11.1 12.8V7.4a1.05 1.05 0 012.1 0v5.2"/><path d="M13.2 12.6V8.2a1.05 1.05 0 012.1 0v5"/><path d="M15.3 13.2V9.6a1 1 0 012 0v5c0 3-2.2 5.4-5.1 5.4h-1.3c-1.4 0-2.7-.5-3.6-1.5l-3.4-3.6"/></svg>`,
  casa:     `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11.5L12 4l8 7.5"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/></svg>`,
  alerta:   `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5"/><path d="M12 16.2v.1"/></svg>`,
  mapa:     `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4l-5 2v14l5-2 6 2 5-2V4l-5 2-6-2z"/><path d="M9 4v14"/><path d="M15 6v14"/></svg>`,
  teste:    `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6v4H9z"/><path d="M9 5H6v16h12V5h-3"/><path d="M9 12h6"/><path d="M9 16h6"/></svg>`,
  chat:     `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H8l-4 4V5z"/></svg>`,
  contatos: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.5-3.2 3-5 5.5-5s5 1.8 5.5 5"/><path d="M16 8.2a3 3 0 010 5.8"/><path d="M20.5 19c-.3-2-1.3-3.6-2.8-4.5"/></svg>`,
  perfil:   `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.6"/><path d="M5 20c1-4 3.8-6 7-6s6 2 7 6"/></svg>`,
  config:   `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  info:     `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><path d="M12 7.8v.1"/></svg>`,
  sair:     `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4H5v16h4"/><path d="M14 8l5 4-5 4"/><path d="M19 12H9"/></svg>`,
  telefone: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h3l1.5 4-2 1.5a10 10 0 005 5l1.5-2 4 1.5v3a2 2 0 01-2.2 2A16 16 0 014 6.2 2 2 0 016 4z"/></svg>`,
  mensagem: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H8l-4 4V5z"/></svg>`,
  lixo:     `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 7h14"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/></svg>`,
  mais:     `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>`,
  local:    `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.5 7-11.5A7 7 0 105 9.5C5 14.5 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.2"/></svg>`,
  seta:     `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>`,
  aviso:    `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4l9 16H3z"/><path d="M12 10v4"/><path d="M12 17v.1"/></svg>`,
  lua:      `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z"/></svg>`,
};

/* ---------------------------------------------------------------- idioma */
export const IDIOMAS = [
  {codigo:"pt", rotulo:"PT"},
  {codigo:"en", rotulo:"EN"},
  {codigo:"es", rotulo:"ES"},
];

/* Textos globais — usados na navegação (sidebar/topbar/bottomnav) e em telas
   protegidas de qualquer página. Cada página tem seu próprio dicionário para
   os textos exclusivos dela (ver I18N_PAGINA em cada page.js). */
export const I18N_GLOBAL = {
  pt: {
    tagline: "Sua rede de segurança, sempre por perto.",
    navInicio:"Início", navEmergencia:"Emergência", navMapa:"Mapa de Apoio", navTeste:"Teste Interativo",
    navChat:"Chatbot", navContatos:"Contatos", navPerfil:"Perfil", navConfig:"Configurações",
    navSobre:"Sobre", navSair:"Sair",
    boasVindasPadrao:"Bem-vinda",
    toastSyncErro: "Não foi possível sincronizar seus dados agora. Verifique sua conexão.",
    aviso: "Aviso",
  },
  en: {
    tagline: "Your safety network, always close by.",
    navInicio:"Home", navEmergencia:"Emergency", navMapa:"Support Map", navTeste:"Interactive Test",
    navChat:"Chatbot", navContatos:"Contacts", navPerfil:"Profile", navConfig:"Settings",
    navSobre:"About", navSair:"Sign out",
    boasVindasPadrao:"Welcome",
    toastSyncErro: "We couldn't sync your data right now. Check your connection.",
    aviso: "Warning",
  },
  es: {
    tagline: "Tu red de seguridad, siempre cerca.",
    navInicio:"Inicio", navEmergencia:"Emergencia", navMapa:"Mapa de Apoyo", navTeste:"Test Interactivo",
    navChat:"Chatbot", navContatos:"Contactos", navPerfil:"Perfil", navConfig:"Configuración",
    navSobre:"Acerca de", navSair:"Cerrar sesión",
    boasVindasPadrao:"Bienvenida",
    toastSyncErro: "No pudimos sincronizar tus datos ahora. Revisa tu conexión.",
    aviso: "Aviso",
  },
};

/* Secretaria de Políticas para a Mulher e para a Pessoa Idosa — Lages/SC.
   Fonte: lages.sc.gov.br (carta de serviços da secretaria). Usado nas
   páginas de emergência e "sobre". */
export const SECRETARIA_MULHER = {
  numeroComercial: "4930197454",
  numeroPlantao: "5549984029413", // (49) 98402-9413 — plantão 24h
  numeroExibicaoComercial: "(49) 3019-7454",
  numeroExibicaoPlantao: "(49) 98402-9413",
  endereco: "Rua Santa Cruz, 155, Centro, Lages - SC",
  lat: -27.812263,
  lng: -50.3200773,
};

export const CONTATOS_UTEIS = {
  pt: [
    {nome:"Central de Atendimento à Mulher", numero:"180", desc:"Ligação gratuita 24h — orientação e denúncia de violência contra a mulher."},
    {nome:"Disque Direitos Humanos", numero:"100", desc:"Denúncias de violações de direitos humanos, 24h."},
    {nome:"Polícia Militar", numero:"190", desc:"Emergência policial imediata."},
    {nome:"CVV — Centro de Valorização da Vida", numero:"188", desc:"Apoio emocional e prevenção do suicídio, 24h, sigiloso."},
    {nome:"Secretaria da Mulher de Lages/SC", numero:SECRETARIA_MULHER.numeroExibicaoPlantao, desc:"Plantão 24h (WhatsApp) da Secretaria de Políticas para a Mulher de Lages/SC."},
  ],
  en: [
    {nome:"Women's Support Hotline", numero:"180", desc:"Free 24h hotline — guidance and reporting of violence against women."},
    {nome:"Human Rights Hotline", numero:"100", desc:"Reports of human rights violations, 24h."},
    {nome:"Military Police", numero:"190", desc:"Immediate police emergency."},
    {nome:"CVV — Life Support Center", numero:"188", desc:"Emotional support and suicide prevention, 24h, confidential."},
    {nome:"Lages/SC Women's Office", numero:SECRETARIA_MULHER.numeroExibicaoPlantao, desc:"24h on-call line (WhatsApp) of the Lages/SC Women's Policy Department."},
  ],
  es: [
    {nome:"Línea de Atención a la Mujer", numero:"180", desc:"Línea gratuita 24h — orientación y denuncia de violencia contra la mujer."},
    {nome:"Línea de Derechos Humanos", numero:"100", desc:"Denuncias de violaciones de derechos humanos, 24h."},
    {nome:"Policía Militar", numero:"190", desc:"Emergencia policial inmediata."},
    {nome:"CVV — Centro de Valorización de la Vida", numero:"188", desc:"Apoyo emocional y prevención del suicidio, 24h, confidencial."},
    {nome:"Secretaría de la Mujer de Lages/SC", numero:SECRETARIA_MULHER.numeroExibicaoPlantao, desc:"Línea 24h (WhatsApp) de la Secretaría de Políticas para la Mujer de Lages/SC."},
  ],
};

/* ---------------------------------------------------------------- estado */
function lerConfigLocal(){
  try{
    const bruto = localStorage.getItem('safeher_config');
    return bruto ? JSON.parse(bruto) : null;
  }catch{ return null; }
}
export const state = {
  logado: false,
  idioma: localStorage.getItem('safeher_idioma') || 'pt',
  usuario: {uid:"", nome:"", email:"", cidade:"", corAvatar:"#BD5B34", emailVerificado:true},
  contatos: [],
  alertas: [],
  config: Object.assign({modoDiscreto:false, notificacoes:true, compartilharLocalizacao:true, temaEscuro:false}, lerConfigLocal() || {}),
  localizacaoAtual: null,
  alertaAtivo: null,
};
export function salvarConfigLocal(){
  localStorage.setItem('safeher_config', JSON.stringify(state.config));
}
export function definirIdioma(codigo){
  state.idioma = codigo;
  localStorage.setItem('safeher_idioma', codigo);
  location.reload();
}

/* Cada página cria seu próprio tradutor, com um dicionário exclusivo dela
   já combinado com os textos globais (nav, sair, etc.). */
export function criarTradutor(dicionarioPagina){
  return function t(chave, vars){
    const doGlobal = I18N_GLOBAL[state.idioma] || {};
    const daPagina = (dicionarioPagina && dicionarioPagina[state.idioma]) || {};
    let txt = (daPagina[chave] ?? doGlobal[chave] ?? chave);
    if(vars){ for(const k in vars) txt = txt.replaceAll(`{${k}}`, vars[k]); }
    return txt;
  };
}

/* ---------------------------------------------------------------- utils */
export function uid(){ return Math.random().toString(36).slice(2,10); }

/* Serializa uma string com segurança para uso dentro de onclick="..." (atributo com aspas duplas). */
export function attrJs(valor){
  return JSON.stringify(valor).replace(/"/g,"&quot;");
}
/* Escapa texto controlado pelo usuário antes de inseri-lo no HTML (evita XSS em nome, chat, contatos etc.). */
export function escapeHtml(valor){
  return String(valor ?? "").replace(/[&<>"']/g, (c)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
export function agora(){
  const d = new Date();
  const locale = state.idioma==="en" ? "en-US" : state.idioma==="es" ? "es-ES" : "pt-BR";
  return d.toLocaleDateString(locale) + " " + d.toLocaleTimeString(locale,{hour:'2-digit',minute:'2-digit'});
}
export function coresIniciais(nome){
  const paleta = ["#BD5B34","#6E7A52","#8C3E3E","#A67526","#4C7A4A","#9E4A29"];
  let h=0; for(const c of (nome||"?")) h += c.charCodeAt(0);
  return paleta[h % paleta.length];
}
export function iniciais(nome){
  if(!nome) return "?";
  const p = nome.trim().split(" ");
  return (p[0][0] + (p[1] ? p[1][0] : "")).toUpperCase();
}
export function linkWhatsapp(telefone, msg){
  return `https://wa.me/${telefone}?text=${encodeURIComponent(msg)}`;
}
export function toast(msg){
  const wrap = document.getElementById('toastWrap');
  if(!wrap) return;
  const el = document.createElement('div');
  el.className = 'toast'; el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(()=>{ el.style.opacity='0'; el.style.transition='opacity .3s'; setTimeout(()=>el.remove(),300); }, 2600);
}
export function aplicarTema(){
  document.documentElement.setAttribute('data-tema', state.config.temaEscuro ? 'escuro' : 'claro');
}
export function alternarTema(){
  state.config.temaEscuro = !state.config.temaEscuro;
  salvarConfigLocal();
  aplicarTema();
}

/* ---------------------------------------------------------------- auth */
export function aplicarUsuarioAuth(user){
  const nome = user.displayName || (user.email ? user.email.split("@")[0] : I18N_GLOBAL[state.idioma].boasVindasPadrao);
  state.usuario.uid = user.uid;
  state.usuario.nome = nome;
  state.usuario.email = user.email || "";
  state.usuario.corAvatar = coresIniciais(nome);
  state.usuario.emailVerificado = user.emailVerified;
  state.logado = true;
}
export async function sair(){
  try{ if(auth.currentUser) await signOut(auth); }
  catch(erro){ console.error("Erro ao sair do Firebase:", erro); }
  pararSyncContatos();
  state.logado = false;
  state.usuario = {uid:"", nome:"", email:"", cidade:"", corAvatar: coresIniciais("U"), emailVerificado:true};
  state.contatos = [];
  location.href = "../login/login.html";
}

/* ---------------------------------------------------------------- sincronização de contatos (Firestore) */
let unsubscribeContatos = null;
export function iniciarSyncContatos(uid, aoAtualizar){
  if(unsubscribeContatos){ unsubscribeContatos(); unsubscribeContatos = null; }
  if(!uid) return;
  const ref = doc(db, "usuarios", uid);
  unsubscribeContatos = onSnapshot(ref, (snap)=>{
    const dados = snap.exists() ? snap.data() : null;
    state.contatos = (dados && Array.isArray(dados.contatos)) ? dados.contatos : [];
    if(dados && dados.perfil && dados.perfil.cidade) state.usuario.cidade = dados.perfil.cidade;
    if(aoAtualizar) aoAtualizar();
  }, (erro)=>{
    console.error("Erro ao sincronizar dados com a nuvem:", erro);
  });
}
export function pararSyncContatos(){
  if(unsubscribeContatos){ unsubscribeContatos(); unsubscribeContatos = null; }
}
export async function salvarContatosNuvem(){
  if(!auth.currentUser) return;
  try{
    await setDoc(doc(db, "usuarios", auth.currentUser.uid), {contatos: state.contatos}, {merge:true});
  }catch(erro){
    console.error("Erro ao salvar contatos na nuvem:", erro);
    toast(I18N_GLOBAL[state.idioma].toastSyncErro);
  }
}

/* ---------------------------------------------------------------------- */
/* BOOTSTRAP DE PÁGINA                                                     */
/* Cada page.js chama iniciarPagina(id, callbacks) uma única vez.          */
/* ---------------------------------------------------------------------- */
const PAGINAS_PUBLICAS = ["login","cadastro"];

/* Enquanto login/cadastro estão no meio da própria sequência de autenticação
   (ex.: createUserWithEmailAndPassword -> updateProfile -> sendEmailVerification),
   o Firebase já dispara onAuthStateChanged assim que o usuário é autenticado —
   bem antes dessas chamadas seguintes terminarem. Se deixássemos iniciarPagina
   redirecionar nesse instante, a navegação destruiria o contexto da página e
   interromperia updateProfile/sendEmailVerification/toast no meio do caminho
   (era isso que fazia a etapa de cadastro parecer "pulada"). Essa trava permite
   que a própria página segure o redirecionamento até terminar o que precisa. */
let suprimirRedirecionamentoAuto = false;
export function suprimirRedirecionamento(valor){ suprimirRedirecionamentoAuto = valor; }

export function iniciarPagina(paginaId, callbacks={}){
  aplicarTema();
  onAuthStateChanged(auth, (user)=>{
    if(user){
      aplicarUsuarioAuth(user);
      if(PAGINAS_PUBLICAS.includes(paginaId)){
        if(suprimirRedirecionamentoAuto) return;
        location.href = "../inicio/inicio.html";
        return;
      }
      iniciarSyncContatos(user.uid, ()=>{ if(callbacks.aoAtualizarContatos) callbacks.aoAtualizarContatos(); });
      if(callbacks.aoAutenticado) callbacks.aoAutenticado();
    } else {
      state.logado = false;
      state.contatos = [];
      pararSyncContatos();
      if(!PAGINAS_PUBLICAS.includes(paginaId)){
        location.href = "../login/login.html";
        return;
      }
      if(callbacks.aoDeslogado) callbacks.aoDeslogado();
    }
  });
}

/* ---------------------------------------------------------------------- */
/* CASCA VISUAL (sidebar / topbar / bottomnav / fab de pânico)             */
/* ---------------------------------------------------------------------- */
const NAV_MOBILE = ["inicio","alerther","mapa","contatos","perfil"];
function itensNav(t){
  return [
    {id:"inicio", ic:"casa", nome:t("navInicio")},
    {id:"alerther", ic:"alerta", nome:t("navEmergencia")},
    {id:"mapa", ic:"mapa", nome:t("navMapa")},
    {id:"teste", ic:"teste", nome:t("navTeste")},
    {id:"chatbot", ic:"chat", nome:t("navChat")},
    {id:"contatos", ic:"contatos", nome:t("navContatos")},
    {id:"perfil", ic:"perfil", nome:t("navPerfil")},
    {id:"config", ic:"config", nome:t("navConfig")},
    {id:"sobre", ic:"info", nome:t("navSobre")},
  ];
}
function href(id){ return `../${id}/${id}.html`; }

function sidebarHtml(paginaAtual, t){
  const itens = itensNav(t);
  return `
  <div class="sidebar">
    <div class="brand"><div class="marca">${ICONE.mao}</div><div class="nome">SafeHer</div></div>
    ${itens.map((it,idx)=>`
      ${idx===5 ? '<div class="nav-sep"></div>' : ''}
      <a class="nav-item ${paginaAtual===it.id?'ativo':''}" href="${href(it.id)}">${ICONE[it.ic]}${it.nome}</a>
    `).join("")}
    <div class="nav-foot">
      <button class="btn btn-outline btn-block btn-sm" onclick="window.__safeherSair()">${ICONE.sair}${t("navSair")}</button>
    </div>
  </div>`;
}
function topbarHtml(titulo, t){
  return `<div class="topbar">
    <div class="marca-mini"><div class="marca">${ICONE.mao}</div><span class="h-corpo-forte">${titulo}</span></div>
    <a href="${href('config')}">${ICONE.config}</a>
  </div>`;
}
function bottomnavHtml(paginaAtual, t){
  const map = {"inicio":"casa","alerther":"alerta","mapa":"mapa","contatos":"contatos","perfil":"perfil"};
  const nomes = {"inicio":t("navInicio"),"alerther":t("navEmergencia"),"mapa":t("navMapa"),"contatos":t("navContatos"),"perfil":t("navPerfil")};
  return `<div class="bottomnav">
    ${NAV_MOBILE.map(id=>`<a class="bn-item ${paginaAtual===id?'ativo':''}" href="${href(id)}">${ICONE[map[id]]}${nomes[id]}</a>`).join("")}
  </div>`;
}
function fabPanicoHtml(paginaAtual, t){
  if(["alerther"].includes(paginaAtual)) return "";
  return `<button class="fab-panico ${state.alertaAtivo?'pulsando':''}" onclick="location.href='${href('alerther')}'" title="${t("navEmergencia")}">${ICONE.alerta}</button>`;
}

/* Monta a casca completa (sidebar+topbar+bottomnav+fab) com o conteúdo da
   página dentro de #pageContent. Use para o primeiro render da página. */
export function montarShell(paginaAtual, tituloPagina, conteudoHtml){
  const t = criarTradutor(null);
  const app = document.getElementById('app');
  app.innerHTML = `<div class="shell">
    ${sidebarHtml(paginaAtual, t)}
    <div class="main">
      ${topbarHtml(tituloPagina, t)}
      <div class="fade-in" id="pageContent">${conteudoHtml}</div>
    </div>
  </div>
  ${bottomnavHtml(paginaAtual, t)}
  ${fabPanicoHtml(paginaAtual, t)}`;
  window.__safeherSair = sair;
}
/* Re-renderiza só o conteúdo interno da página (mais leve que remontar a casca). */
export function atualizarConteudo(conteudoHtml){
  const el = document.getElementById('pageContent');
  if(el) el.innerHTML = conteudoHtml;
}
/* Página sem casca (login/cadastro): renderiza direto em #app. */
export function montarSemShell(conteudoHtml){
  const app = document.getElementById('app');
  app.innerHTML = `<div class="fade-in">${conteudoHtml}</div>`;
}
