/* ==========================================================================
   SafeHer — página INÍCIO
   ========================================================================== */
import {
  ICONE, state, criarTradutor, montarShell, atualizarConteudo, iniciarPagina, SECRETARIA_MULHER,
} from "../../layout.js";

const I18N_PAGINA = {
  pt: {
    inicioSaudacao:"Olá, {nome}",
    inicioSub:"Este é seu espaço seguro. O que você precisa agora?",
    faixaInicio:"Emergência agora? Ligue {n190} (Polícia), {n180} (Central de Atendimento à Mulher) ou {nsec} (Secretaria da Mulher de Lages).",
    dicaTitulo:"Dica de segurança",
    dicaTexto:"Combine uma palavra-código com alguém de confiança — se você disser essa palavra em uma ligação, essa pessoa saberá que precisa agir.",
    modAlertaTitulo:"Emergência", modAlertaDesc:"Botão de emergência com localização e aviso rápido aos seus contatos.",
    modMapaTitulo:"Mapa de Apoio", modMapaDesc:"Delegacias, hospitais e abrigos mais próximos de você.",
    modTesteTitulo:"Teste Interativo", modTesteDesc:"Entenda padrões de risco em um relacionamento, com sigilo total.",
    modChatTitulo:"Chatbot de apoio", modChatDesc:"Converse, tire dúvidas e receba orientação a qualquer hora.",
    modContatosTitulo:"Contatos de Emergência", modContatosDesc:"Gerencie quem deve ser avisado em uma emergência.",
    modSobreTitulo:"Sobre o SafeHer", modSobreDesc:"Como este espaço funciona e as linhas de apoio nacionais.",
  },
  en: {
    inicioSaudacao:"Hello, {nome}",
    inicioSub:"This is your safe space. What do you need right now?",
    faixaInicio:"Emergency right now? Call {n190} (Police), {n180} (Women's Support Line) or {nsec} (Lages Women's Office).",
    dicaTitulo:"Safety tip",
    dicaTexto:"Agree on a code word with someone you trust — if you say that word during a call, they'll know it means you need help.",
    modAlertaTitulo:"Emergency", modAlertaDesc:"Emergency button with location sharing and a quick alert to your contacts.",
    modMapaTitulo:"Support Map", modMapaDesc:"Police stations, hospitals and shelters closest to you.",
    modTesteTitulo:"Interactive Test", modTesteDesc:"Understand risk patterns in a relationship, fully confidential.",
    modChatTitulo:"Support chatbot", modChatDesc:"Talk, ask questions and get guidance at any time.",
    modContatosTitulo:"Emergency Contacts", modContatosDesc:"Manage who should be notified in an emergency.",
    modSobreTitulo:"About SafeHer", modSobreDesc:"How this space works and the national support lines.",
  },
  es: {
    inicioSaudacao:"Hola, {nome}",
    inicioSub:"Este es tu espacio seguro. ¿Qué necesitas ahora?",
    faixaInicio:"¿Emergencia ahora? Llama al {n190} (Policía), al {n180} (Línea de Atención a la Mujer) o a {nsec} (Secretaría de la Mujer de Lages).",
    dicaTitulo:"Consejo de seguridad",
    dicaTexto:"Acuerda una palabra clave con alguien de confianza — si dices esa palabra en una llamada, esa persona sabrá que necesitas ayuda.",
    modAlertaTitulo:"Emergencia", modAlertaDesc:"Botón de emergencia con ubicación y aviso rápido a tus contactos.",
    modMapaTitulo:"Mapa de Apoyo", modMapaDesc:"Comisarías, hospitales y refugios más cercanos a ti.",
    modTesteTitulo:"Test Interactivo", modTesteDesc:"Entiende patrones de riesgo en una relación, con total confidencialidad.",
    modChatTitulo:"Chatbot de apoyo", modChatDesc:"Conversa, resuelve dudas y recibe orientación a cualquier hora.",
    modContatosTitulo:"Contactos de Emergencia", modContatosDesc:"Gestiona quién debe ser avisado en una emergencia.",
    modSobreTitulo:"Acerca de SafeHer", modSobreDesc:"Cómo funciona este espacio y las líneas de apoyo nacionales.",
  },
};
const t = criarTradutor(I18N_PAGINA);

function conteudoHtml(){
  const nomeExib = state.usuario.nome || t("boasVindasPadrao");
  const modulos = [
    {rota:"../alerther/alerther.html", ic:"alerta", titulo:t("modAlertaTitulo"), desc:t("modAlertaDesc"), emergencia:true},
    {rota:"../mapa/mapa.html", ic:"mapa", titulo:t("modMapaTitulo"), desc:t("modMapaDesc")},
    {rota:"../teste/teste.html", ic:"teste", titulo:t("modTesteTitulo"), desc:t("modTesteDesc")},
    {rota:"../chatbot/chatbot.html", ic:"chat", titulo:t("modChatTitulo"), desc:t("modChatDesc")},
    {rota:"../contatos/contatos.html", ic:"contatos", titulo:t("modContatosTitulo"), desc:t("modContatosDesc")},
    {rota:"../sobre/sobre.html", ic:"info", titulo:t("modSobreTitulo"), desc:t("modSobreDesc")},
  ];
  return `
  <div style="display:flex;flex-direction:column;gap:22px;">
    <div>
      <div class="h-titulo">${t("inicioSaudacao",{nome:nomeExib.split(" ")[0]})}</div>
      <div class="h-corpo">${t("inicioSub")}</div>
    </div>
    <div class="faixa-emergencia">${ICONE.aviso}<span>${t("faixaInicio",{n190:"<b>190</b>",n180:"<b>180</b>",nsec:`<b>${SECRETARIA_MULHER.numeroExibicaoPlantao}</b>`})}</span></div>
    <div class="grid grid-3">
      ${modulos.map(m=>`
        <a href="${m.rota}" class="modulo-card fade-in ${m.emergencia?'modulo-emergencia':''}">
          ${m.emergencia ? `<span class="pontinho-emergencia"></span>` : ``}
          <div class="ic">${ICONE[m.ic]}</div>
          <div class="titulo">${m.titulo}</div>
          <div class="desc">${m.desc}</div>
        </a>
      `).join("")}
    </div>
    <div class="card">
      <div class="h-sub" style="margin-bottom:10px;">${t("dicaTitulo")}</div>
      <div class="h-corpo">${t("dicaTexto")}</div>
    </div>
  </div>`;
}

function render(){ montarShell("inicio", t("navInicio"), conteudoHtml()); }

iniciarPagina("inicio", { aoAutenticado: render, aoAtualizarContatos: ()=>atualizarConteudo(conteudoHtml()) });
