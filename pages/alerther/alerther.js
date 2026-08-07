/* ==========================================================================
   SafeHer — página EMERGÊNCIA (botão de pânico)
   ========================================================================== */
import {
  ICONE, state, criarTradutor, montarShell, atualizarConteudo, iniciarPagina,
  toast, uid, agora, escapeHtml, linkWhatsapp, SECRETARIA_MULHER,
} from "../../layout.js";

const I18N_PAGINA = {
  pt: {
    alertaAtivoBadge:"Alerta ativo",
    avisandoContatos:"Toque em cada contato abaixo para avisá-lo agora",
    locCapturada:"Localização capturada e pronta para envio.",
    locFalhou:"Não foi possível obter sua localização — você ainda pode avisar seus contatos manualmente.",
    contatosNotificadosTitulo:"Toque para enviar o aviso",
    semContatosCadastrados:"Nenhum contato cadastrado.",
    btnEstouSegura:"Estou segura — cancelar alerta",
    botaoEmergenciaTitulo:"Botão de Emergência",
    botaoEmergenciaDesc:"Ao acionar, o SafeHer captura sua localização e prepara uma mensagem de emergência para todos os seus contatos de confiança.",
    toqueParaAcionar:"Toque para acionar o alerta",
    localizacaoTitulo:"Localização",
    localizacaoLigada:"Será enviada junto ao alerta.",
    localizacaoDesligada:"Compartilhamento desativado nas configurações.",
    contatosQtd:"{n} contato(s)",
    serãoAvisados:"Toque em cada um para avisar quando precisar.",
    ultimoAlerta:"Último alerta acionado",
    faixaPerigoImediato:"Perigo imediato: ligue {n190}. Precisa de orientação? Ligue {n180} ou a Secretaria da Mulher {nsec}. Este botão ajuda você a avisar pessoas de confiança manualmente, não substitui a polícia.",
    toastAlertaAcionado:"Alerta preparado. Toque em cada contato abaixo para avisá-lo agora.",
    toastAlertaCancelado:"Alerta cancelado. Que bom que você está segura.",
    mensagemAlerta:"Preciso de ajuda agora. Este é um alerta do SafeHer — pode me ligar assim que ver esta mensagem?",
    mensagemAlertaLocal:"Preciso de ajuda agora. Este é um alerta do SafeHer — pode me ligar assim que ver esta mensagem? Minha localização: {link}",
    btnAvisarWhatsapp:"Avisar por WhatsApp",
  },
  en: {
    alertaAtivoBadge:"Alert active",
    avisandoContatos:"Tap each contact below to notify them now",
    locCapturada:"Location captured and ready to send.",
    locFalhou:"We couldn't get your location — you can still notify your contacts manually.",
    contatosNotificadosTitulo:"Tap to send the alert",
    semContatosCadastrados:"No contacts added.",
    btnEstouSegura:"I'm safe — cancel alert",
    botaoEmergenciaTitulo:"Emergency Button",
    botaoEmergenciaDesc:"When triggered, SafeHer captures your location and prepares an emergency message for all of your trusted contacts.",
    toqueParaAcionar:"Tap to trigger the alert",
    localizacaoTitulo:"Location",
    localizacaoLigada:"Will be sent along with the alert.",
    localizacaoDesligada:"Sharing is turned off in settings.",
    contatosQtd:"{n} contact(s)",
    serãoAvisados:"Tap each one to notify them when you need to.",
    ultimoAlerta:"Last alert triggered",
    faixaPerigoImediato:"Immediate danger: call {n190}. Need guidance? Call {n180} or the Lages Women's Office {nsec}. This button helps you manually notify trusted people, it doesn't replace the police.",
    toastAlertaAcionado:"Alert ready. Tap each contact below to notify them now.",
    toastAlertaCancelado:"Alert canceled. Glad you're safe.",
    mensagemAlerta:"I need help right now. This is a SafeHer alert — can you call me as soon as you see this?",
    mensagemAlertaLocal:"I need help right now. This is a SafeHer alert — can you call me as soon as you see this? My location: {link}",
    btnAvisarWhatsapp:"Notify via WhatsApp",
  },
  es: {
    alertaAtivoBadge:"Alerta activa",
    avisandoContatos:"Toca cada contacto abajo para avisarle ahora",
    locCapturada:"Ubicación capturada y lista para enviar.",
    locFalhou:"No pudimos obtener tu ubicación — aún puedes avisar a tus contactos manualmente.",
    contatosNotificadosTitulo:"Toca para enviar el aviso",
    semContatosCadastrados:"No hay contactos registrados.",
    btnEstouSegura:"Estoy a salvo — cancelar alerta",
    botaoEmergenciaTitulo:"Botón de Emergencia",
    botaoEmergenciaDesc:"Al activarlo, SafeHer captura tu ubicación y prepara un mensaje de emergencia para todos tus contactos de confianza.",
    toqueParaAcionar:"Toca para activar la alerta",
    localizacaoTitulo:"Ubicación",
    localizacaoLigada:"Se enviará junto con la alerta.",
    localizacaoDesligada:"Compartir ubicación está desactivado en la configuración.",
    contatosQtd:"{n} contacto(s)",
    serãoAvisados:"Toca cada uno para avisarle cuando lo necesites.",
    ultimoAlerta:"Última alerta activada",
    faixaPerigoImediato:"Peligro inmediato: llama al {n190}. ¿Necesitas orientación? Llama al {n180} o a la Secretaría de la Mujer {nsec}. Este botón te ayuda a avisar manualmente a personas de confianza, no sustituye a la policía.",
    toastAlertaAcionado:"Alerta lista. Toca cada contacto abajo para avisarle ahora.",
    toastAlertaCancelado:"Alerta cancelada. Qué bueno que estás a salvo.",
    mensagemAlerta:"Necesito ayuda ahora. Esta es una alerta de SafeHer — ¿puedes llamarme en cuanto veas este mensaje?",
    mensagemAlertaLocal:"Necesito ayuda ahora. Esta es una alerta de SafeHer — ¿puedes llamarme en cuanto veas este mensaje? Mi ubicación: {link}",
    btnAvisarWhatsapp:"Avisar por WhatsApp",
  },
};
const t = criarTradutor(I18N_PAGINA);

function nsecHtml(){
  return `<b>${SECRETARIA_MULHER.numeroExibicaoPlantao}</b>`;
}
function mensagemAlertaTexto(){
  if(state.localizacaoAtual){
    const link = `https://www.google.com/maps?q=${state.localizacaoAtual.lat},${state.localizacaoAtual.lng}`;
    return t("mensagemAlertaLocal",{link});
  }
  return t("mensagemAlerta");
}

function conteudoHtml(){
  if(state.alertaAtivo){
    return `
    <div style="display:flex;flex-direction:column;align-items:center;gap:22px;text-align:center;padding:20px 0;">
      <span class="badge badge-erro">${t("alertaAtivoBadge")}</span>
      <div class="alerther-anel-externo">
        <div class="alerther-anel-interno fab-panico pulsando">${ICONE.alerta}</div>
      </div>
      <div class="h-sub">${t("avisandoContatos")}</div>
      <div class="h-corpo" style="max-width:420px;">${state.localizacaoAtual ? t("locCapturada") : t("locFalhou")}</div>
      <div class="card" style="width:100%;max-width:440px;text-align:left;">
        <div class="h-legenda" style="margin-bottom:8px;">${t("contatosNotificadosTitulo")}</div>
        ${state.contatos.map(c=>`
          <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--borda);">
            <span class="h-corpo">${escapeHtml(c.nome)}</span>
            <div style="display:flex;align-items:center;gap:8px;">
              <a class="btn btn-primario btn-sm" href="${linkWhatsapp(c.telefone, mensagemAlertaTexto())}" target="_blank">${ICONE.mensagem}${t("btnAvisarWhatsapp")}</a>
              <a class="btn btn-outline btn-sm" href="tel:${c.telefone}">${ICONE.telefone}</a>
            </div>
          </div>`).join("") || `<div class="h-legenda">${t("semContatosCadastrados")}</div>`}
      </div>
      <button class="btn btn-secundario" style="min-width:220px;" onclick="window.__alertherCancelar()">${t("btnEstouSegura")}</button>
    </div>`;
  }
  return `
  <div style="display:flex;flex-direction:column;align-items:center;gap:20px;text-align:center;padding:16px 0 30px;">
    <div class="h-titulo">${t("botaoEmergenciaTitulo")}</div>
    <div class="h-corpo" style="max-width:440px;">${t("botaoEmergenciaDesc")}</div>
    <button class="fab-panico" style="position:static;width:132px;height:132px;" onclick="window.__alertherDisparar()">
      <span style="width:44px;height:44px;">${ICONE.alerta}</span>
    </button>
    <div class="h-legenda">${t("toqueParaAcionar")}</div>

    <div class="grid grid-2" style="width:100%;max-width:560px;text-align:left;margin-top:10px;">
      <div class="card">
        <div class="h-corpo-forte" style="margin-bottom:6px;">${t("localizacaoTitulo")}</div>
        <div class="h-legenda">${state.config.compartilharLocalizacao ? t("localizacaoLigada") : t("localizacaoDesligada")}</div>
      </div>
      <div class="card">
        <div class="h-corpo-forte" style="margin-bottom:6px;">${t("contatosQtd",{n:state.contatos.length})}</div>
        <div class="h-legenda">${t("serãoAvisados")}</div>
      </div>
    </div>

    ${state.alertas.length ? `
    <div class="card" style="width:100%;max-width:560px;text-align:left;margin-top:6px;">
      <div class="h-corpo-forte" style="margin-bottom:4px;">${t("ultimoAlerta")}</div>
      <div class="h-legenda">${state.alertas[state.alertas.length-1].dataHora}</div>
    </div>` : ""}

    <div class="faixa-emergencia" style="max-width:560px;border-width:2px;">${ICONE.telefone}<span>${t("faixaPerigoImediato",{n190:"<b>190</b>",n180:"<b>180</b>",nsec:nsecHtml()})}</span></div>
  </div>`;
}

function render(){ montarShell("alerther", t("navEmergencia"), conteudoHtml()); }
function atualizar(){ atualizarConteudo(conteudoHtml()); }

function dispararAlerta(){
  const alerta = {id:uid(), dataHora:agora(), contatosNotificados: state.contatos.map(c=>c.id)};
  state.alertaAtivo = alerta;
  state.alertas.push(alerta);
  atualizar();
  toast(t("toastAlertaAcionado"));
  if(navigator.geolocation && state.config.compartilharLocalizacao){
    navigator.geolocation.getCurrentPosition(
      pos=>{ state.localizacaoAtual = {lat:pos.coords.latitude, lng:pos.coords.longitude}; atualizar(); },
      ()=>{ state.localizacaoAtual = null; atualizar(); },
      {timeout:6000}
    );
  }
}
function cancelarAlerta(){
  state.alertaAtivo = null;
  atualizar();
  toast(t("toastAlertaCancelado"));
}
window.__alertherDisparar = dispararAlerta;
window.__alertherCancelar = cancelarAlerta;

iniciarPagina("alerther", { aoAutenticado: render, aoAtualizarContatos: atualizar });
