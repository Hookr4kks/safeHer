/* ==========================================================================
   SafeHer — página MAPA DE APOIO
   ========================================================================== */
import {
  ICONE, state, criarTradutor, montarShell, iniciarPagina, attrJs,
  SECRETARIA_MULHER, CONTATOS_UTEIS,
} from "../../layout.js";

const I18N_PAGINA = {
  pt: {
    mapaIntro:"Encontre rapidamente pontos de apoio perto de você. Toque em uma categoria para abrir os locais mais próximos no mapa.",
    usarLocalizacao:"Usar minha localização atual",
    obtendoLocalizacao:"Obtendo localização…",
    localObtida:"Localização obtida — os links de mapa agora usarão sua posição atual.",
    localFalhaGenerica:"Não foi possível obter sua localização. Buscando de forma genérica.",
    geoNaoSuportada:"Geolocalização não suportada neste navegador.",
    abrirNoMapa:"Abrir no mapa",
    linhasApoio:"Linhas de apoio nacionais",
    ligar:"Ligar",
  },
  en: {
    mapaIntro:"Quickly find support points near you. Tap a category to open the closest places on the map.",
    usarLocalizacao:"Use my current location",
    obtendoLocalizacao:"Getting location…",
    localObtida:"Location obtained — map links will now use your current position.",
    localFalhaGenerica:"We couldn't get your location. Searching in a generic way instead.",
    geoNaoSuportada:"Geolocation isn't supported in this browser.",
    abrirNoMapa:"Open on map",
    linhasApoio:"National support lines",
    ligar:"Call",
  },
  es: {
    mapaIntro:"Encuentra rápidamente puntos de apoyo cerca de ti. Toca una categoría para abrir los lugares más cercanos en el mapa.",
    usarLocalizacao:"Usar mi ubicación actual",
    obtendoLocalizacao:"Obteniendo ubicación…",
    localObtida:"Ubicación obtenida — los enlaces del mapa ahora usarán tu posición actual.",
    localFalhaGenerica:"No pudimos obtener tu ubicación. Buscando de forma genérica.",
    geoNaoSuportada:"Geolocalización no compatible con este navegador.",
    abrirNoMapa:"Abrir en el mapa",
    linhasApoio:"Líneas de apoyo nacionales",
    ligar:"Llamar",
  },
};
const t = criarTradutor(I18N_PAGINA);

const LOCAIS_APOIO = {
  pt: [
    {tipo:"Delegacia da Mulher", busca:"delegacia da mulher"},
    {tipo:"Hospital / Pronto-socorro", busca:"hospital pronto socorro"},
    {tipo:"CRAS / Assistência Social", busca:"CRAS assistência social"},
    {tipo:"Casa abrigo", busca:"casa abrigo mulheres"},
    {tipo:"Defensoria Pública", busca:"defensoria publica"},
    {tipo:"Secretaria da Mulher (Lages/SC)", busca:SECRETARIA_MULHER.endereco},
  ],
  en: [
    {tipo:"Women's Police Station", busca:"delegacia da mulher"},
    {tipo:"Hospital / Emergency room", busca:"hospital pronto socorro"},
    {tipo:"Social Assistance Center", busca:"CRAS assistência social"},
    {tipo:"Shelter house", busca:"casa abrigo mulheres"},
    {tipo:"Public Defender's Office", busca:"defensoria publica"},
    {tipo:"Women's Office (Lages/SC)", busca:SECRETARIA_MULHER.endereco},
  ],
  es: [
    {tipo:"Comisaría de la Mujer", busca:"delegacia da mulher"},
    {tipo:"Hospital / Sala de emergencias", busca:"hospital pronto socorro"},
    {tipo:"Centro de Asistencia Social", busca:"CRAS assistência social"},
    {tipo:"Casa de acogida", busca:"casa abrigo mulheres"},
    {tipo:"Defensoría Pública", busca:"defensoria publica"},
    {tipo:"Secretaría de la Mujer (Lages/SC)", busca:SECRETARIA_MULHER.endereco},
  ],
};

function conteudoHtml(){
  const locais = LOCAIS_APOIO[state.idioma];
  const contatos = CONTATOS_UTEIS[state.idioma];
  return `
  <div style="display:flex;flex-direction:column;gap:18px;">
    <div class="h-corpo">${t("mapaIntro")}</div>
    <button class="btn btn-secundario" onclick="window.__mapaUsarLocalizacao()">${ICONE.local}${t("usarLocalizacao")}</button>
    <div id="locMapaStatus" class="h-legenda"></div>
    <div class="grid grid-2">
      ${locais.map(l=>`
        <div class="card card-hover" style="display:flex;flex-direction:column;gap:10px;">
          <div class="h-corpo-forte">${l.tipo}</div>
          <button class="btn btn-outline btn-sm" onclick="window.__mapaAbrir(${attrJs(l.busca)})">${ICONE.seta}${t("abrirNoMapa")}</button>
        </div>
      `).join("")}
    </div>
    <div class="card">
      <div class="h-corpo-forte" style="margin-bottom:10px;">${t("linhasApoio")}</div>
      ${contatos.map(c=>`
        <div style="display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid var(--borda);">
          <div><div class="h-corpo-forte" style="font-size:14.5px;">${c.nome}</div><div class="h-legenda">${c.desc}</div></div>
          <a class="btn btn-primario btn-sm" href="tel:${c.numero}">${t("ligar")} ${c.numero}</a>
        </div>
      `).join("")}
    </div>
  </div>`;
}

function render(){ montarShell("mapa", t("navMapa"), conteudoHtml()); }

function obterLocalizacaoMapa(){
  const st = document.getElementById('locMapaStatus');
  if(!navigator.geolocation){ st.textContent = t("geoNaoSuportada"); return; }
  st.textContent = t("obtendoLocalizacao");
  navigator.geolocation.getCurrentPosition(
    pos=>{ state.localizacaoAtual = {lat:pos.coords.latitude, lng:pos.coords.longitude}; st.textContent = t("localObtida"); },
    ()=>{ st.textContent = t("localFalhaGenerica"); },
    {timeout:8000}
  );
}
function abrirMapa(busca){
  let url;
  if(state.localizacaoAtual){
    url = `https://www.google.com/maps/search/${encodeURIComponent(busca)}/@${state.localizacaoAtual.lat},${state.localizacaoAtual.lng},14z`;
  } else {
    url = `https://www.google.com/maps/search/${encodeURIComponent(busca)}`;
  }
  window.open(url, "_blank");
}
window.__mapaUsarLocalizacao = obterLocalizacaoMapa;
window.__mapaAbrir = abrirMapa;

iniciarPagina("mapa", { aoAutenticado: render });
