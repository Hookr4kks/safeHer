/* ==========================================================================
   SafeHer — página CONFIGURAÇÕES
   ========================================================================== */
import {
  state, criarTradutor, montarShell, atualizarConteudo, iniciarPagina, toast,
  IDIOMAS, definirIdioma, alternarTema, salvarConfigLocal, salvarContatosNuvem,
} from "../../layout.js";

const I18N_PAGINA = {
  pt: {
    idiomaTitulo:"Idioma", idiomaDesc:"Escolha o idioma do aplicativo.",
    modoEscuroTitulo:"Modo escuro", modoEscuroDesc:"Troca as cores do app para um tema escuro, mais confortável à noite.",
    modoDiscretoTitulo:"Modo discreto", modoDiscretoDesc:"Deixa o app com aparência neutra na tela inicial do celular.",
    notificacoesTitulo:"Notificações", notificacoesDesc:"Receber avisos e lembretes do SafeHer.",
    compartilharLocTitulo:"Compartilhar localização em alertas", compartilharLocDesc:"Envia sua localização ao acionar a emergência.",
    meusDadosTitulo:"Meus dados", meusDadosDesc:"Este protótipo guarda alguns dados apenas na memória desta aba — eles somem ao atualizar a página.",
    limparDados:"Limpar todos os dados",
    toastDadosLimpos:"Dados locais limpos.",
  },
  en: {
    idiomaTitulo:"Language", idiomaDesc:"Choose the app's language.",
    modoEscuroTitulo:"Dark mode", modoEscuroDesc:"Switches the app to a dark color theme, easier on the eyes at night.",
    modoDiscretoTitulo:"Discreet mode", modoDiscretoDesc:"Gives the app a neutral look on your phone's home screen.",
    notificacoesTitulo:"Notifications", notificacoesDesc:"Receive alerts and reminders from SafeHer.",
    compartilharLocTitulo:"Share location in alerts", compartilharLocDesc:"Sends your location when you trigger the emergency alert.",
    meusDadosTitulo:"My data", meusDadosDesc:"This prototype stores some data only in this tab's memory — it disappears when you refresh the page.",
    limparDados:"Clear all data",
    toastDadosLimpos:"Local data cleared.",
  },
  es: {
    idiomaTitulo:"Idioma", idiomaDesc:"Elige el idioma de la aplicación.",
    modoEscuroTitulo:"Modo oscuro", modoEscuroDesc:"Cambia los colores de la app a un tema oscuro, más cómodo de noche.",
    modoDiscretoTitulo:"Modo discreto", modoDiscretoDesc:"Le da a la app una apariencia neutra en la pantalla de inicio del celular.",
    notificacoesTitulo:"Notificaciones", notificacoesDesc:"Recibir avisos y recordatorios de SafeHer.",
    compartilharLocTitulo:"Compartir ubicación en alertas", compartilharLocDesc:"Envía tu ubicación al activar la emergencia.",
    meusDadosTitulo:"Mis datos", meusDadosDesc:"Este prototipo guarda algunos datos solo en la memoria de esta pestaña — desaparecen al actualizar la página.",
    limparDados:"Borrar todos los datos",
    toastDadosLimpos:"Datos locales borrados.",
  },
};
const t = criarTradutor(I18N_PAGINA);

function conteudoHtml(){
  return `
  <div style="max-width:480px;display:flex;flex-direction:column;gap:14px;">
    <div class="card">
      <div class="h-corpo-forte" style="margin-bottom:10px;">${t("idiomaTitulo")}</div>
      <div class="h-legenda" style="margin-bottom:12px;">${t("idiomaDesc")}</div>
      <div style="display:flex;gap:8px;">
        ${IDIOMAS.map(l=>`<button class="btn ${state.idioma===l.codigo?'btn-primario':'btn-outline'} btn-sm" style="flex:1;" onclick="window.__configIdioma('${l.codigo}')">${l.rotulo}</button>`).join("")}
      </div>
    </div>
    <div class="card" style="display:flex;justify-content:space-between;align-items:center;">
      <div><div class="h-corpo-forte">${t("modoEscuroTitulo")}</div><div class="h-legenda">${t("modoEscuroDesc")}</div></div>
      <div class="switch ${state.config.temaEscuro?'on':''}" onclick="window.__configTema()"><div class="knob"></div></div>
    </div>
    <div class="card" style="display:flex;justify-content:space-between;align-items:center;">
      <div><div class="h-corpo-forte">${t("modoDiscretoTitulo")}</div><div class="h-legenda">${t("modoDiscretoDesc")}</div></div>
      <div class="switch ${state.config.modoDiscreto?'on':''}" onclick="window.__configToggle('modoDiscreto')"><div class="knob"></div></div>
    </div>
    <div class="card" style="display:flex;justify-content:space-between;align-items:center;">
      <div><div class="h-corpo-forte">${t("notificacoesTitulo")}</div><div class="h-legenda">${t("notificacoesDesc")}</div></div>
      <div class="switch ${state.config.notificacoes?'on':''}" onclick="window.__configToggle('notificacoes')"><div class="knob"></div></div>
    </div>
    <div class="card" style="display:flex;justify-content:space-between;align-items:center;">
      <div><div class="h-corpo-forte">${t("compartilharLocTitulo")}</div><div class="h-legenda">${t("compartilharLocDesc")}</div></div>
      <div class="switch ${state.config.compartilharLocalizacao?'on':''}" onclick="window.__configToggle('compartilharLocalizacao')"><div class="knob"></div></div>
    </div>
    <div class="card">
      <div class="h-corpo-forte" style="margin-bottom:8px;">${t("meusDadosTitulo")}</div>
      <div class="h-legenda" style="margin-bottom:12px;">${t("meusDadosDesc")}</div>
      <button class="btn btn-outline btn-block" onclick="window.__configLimpar()">${t("limparDados")}</button>
    </div>
  </div>`;
}

function render(){ montarShell("config", t("navConfig"), conteudoHtml()); }
function atualizar(){ atualizarConteudo(conteudoHtml()); }

function toggleConfig(chave){
  state.config[chave] = !state.config[chave];
  salvarConfigLocal();
  atualizar();
}
function tema(){
  alternarTema();
  atualizar();
}
function limparDados(){
  state.alertas = [];
  state.contatos = [];
  atualizar();
  salvarContatosNuvem();
  toast(t("toastDadosLimpos"));
}
window.__configIdioma = definirIdioma;
window.__configTema = tema;
window.__configToggle = toggleConfig;
window.__configLimpar = limparDados;

iniciarPagina("config", { aoAutenticado: render, aoAtualizarContatos: atualizar });
