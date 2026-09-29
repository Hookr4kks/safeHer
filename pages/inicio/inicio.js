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
    faixaInicio:"Emergência agora? Ligue {n190} (Polícia), {n180} (Central de Atendimento à Mulher) ou {nsec} (Secretaria de Políticas para a Mulher e para a Pessoa Idosa de Lages).",
    dicaTitulo:"Dica de segurança",
    dicaTexto:"Combine uma palavra-código com alguém de confiança — se você disser essa palavra em uma ligação, essa pessoa saberá que precisa agir.",
    modAlertaTitulo:"Emergência", modAlertaDesc:"Botão de emergência com localização e aviso rápido aos seus contatos.",
    modMapaTitulo:"Mapa de Apoio", modMapaDesc:"Delegacias, hospitais, assistência social e a secretaria de apoio mais próximos de você.",
    modTesteTitulo:"Teste Interativo", modTesteDesc:"Entenda padrões de risco em um relacionamento, com sigilo total.",
    modChatTitulo:"Chatbot de apoio", modChatDesc:"Converse, tire dúvidas e receba orientação a qualquer hora.",
    modContatosTitulo:"Contatos de Emergência", modContatosDesc:"Gerencie quem deve ser avisado em uma emergência.",
    modSobreTitulo:"Sobre o SafeHer", modSobreDesc:"Como este espaço funciona e as linhas de apoio nacionais.",
  },
  en: {
    inicioSaudacao:"Hello, {nome}",
    inicioSub:"This is your safe space. What do you need right now?",
    faixaInicio:"Emergency right now? Call {n190} (Police), {n180} (Women's Support Line) or {nsec} (Lages Department of Policies for Women and the Elderly).",
    dicaTitulo:"Safety tip",
    dicaTexto:"Agree on a code word with someone you trust — if you say that word during a call, they'll know it means you need help.",
    modAlertaTitulo:"Emergency", modAlertaDesc:"Emergency button with location sharing and a quick alert to your contacts.",
    modMapaTitulo:"Support Map", modMapaDesc:"Police stations, hospitals, social assistance and the support office closest to you.",
    modTesteTitulo:"Interactive Test", modTesteDesc:"Understand risk patterns in a relationship, fully confidential.",
    modChatTitulo:"Support chatbot", modChatDesc:"Talk, ask questions and get guidance at any time.",
    modContatosTitulo:"Emergency Contacts", modContatosDesc:"Manage who should be notified in an emergency.",
    modSobreTitulo:"About SafeHer", modSobreDesc:"How this space works and the national support lines.",
  },
  es: {
    inicioSaudacao:"Hola, {nome}",
    inicioSub:"Este es tu espacio seguro. ¿Qué necesitas ahora?",
    faixaInicio:"¿Emergencia ahora? Llama al {n190} (Policía), al {n180} (Línea de Atención a la Mujer) o a {nsec} (Secretaría de Políticas para la Mujer y para la Persona Mayor de Lages).",
    dicaTitulo:"Consejo de seguridad",
    dicaTexto:"Acuerda una palabra clave con alguien de confianza — si dices esa palabra en una llamada, esa persona sabrá que necesitas ayuda.",
    modAlertaTitulo:"Emergencia", modAlertaDesc:"Botón de emergencia con ubicación y aviso rápido a tus contactos.",
    modMapaTitulo:"Mapa de Apoyo", modMapaDesc:"Comisarías, hospitales, asistencia social y la secretaría de apoyo más cercanos a ti.",
    modTesteTitulo:"Test Interactivo", modTesteDesc:"Entiende patrones de riesgo en una relación, con total confidencialidad.",
    modChatTitulo:"Chatbot de apoyo", modChatDesc:"Conversa, resuelve dudas y recibe orientación a cualquier hora.",
    modContatosTitulo:"Contactos de Emergencia", modContatosDesc:"Gestiona quién debe ser avisado en una emergencia.",
    modSobreTitulo:"Acerca de SafeHer", modSobreDesc:"Cómo funciona este espacio y las líneas de apoyo nacionales.",
  },
};
const t = criarTradutor(I18N_PAGINA);

const ICONE_LIRIO = `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="M12 3c1.8 0 3 1.8 3 4s-1.2 4-3 4-3-1.8-3-4 1.2-4 3-4Z"/><path d="M21 12c0 1.8-1.8 3-4 3s-4-1.2-4-3 1.8-3 4-3 4 1.2 4 3Z"/><path d="M12 21c-1.8 0-3-1.8-3-4s1.2-4 3-4 3 1.8 3 4-1.2 4-3 4Z"/><path d="M3 12c0-1.8 1.8-3 4-3s4 1.2 4 3-1.8 3-4 3-4-1.2-4-3Z"/></svg>`;

const PETALAS = [
  {w:170, pos:"top:-30px;right:-20px;",   rot:12,  op:.15, cor:"var(--rosa-fraco)"},
  {w:120, pos:"top:170px;left:-30px;",    rot:-30, op:.13, cor:"var(--borda-forte)"},
  {w:95,  pos:"top:60px;left:46%;",       rot:70,  op:.09, cor:"var(--vinho-fraco)"},
  {w:150, pos:"bottom:300px;right:2%;",   rot:-18, op:.13, cor:"var(--rosa-fraco)"},
  {w:110, pos:"bottom:140px;left:6%;",    rot:40,  op:.12, cor:"var(--borda-forte)"},
  {w:190, pos:"bottom:-50px;right:-40px;",rot:26,  op:.14, cor:"var(--rosa-fraco)"},
  {w:80,  pos:"top:340px;right:20%;",     rot:-55, op:.10, cor:"var(--vinho-fraco)"},
];

function petalasFundoHtml(){
  return `<div class="petalas-fundo" aria-hidden="true">
    ${PETALAS.map(p=>`<div class="petala" style="width:${p.w}px;height:${p.w}px;${p.pos}transform:rotate(${p.rot}deg);opacity:${p.op};background:${p.cor};"></div>`).join("")}
  </div>`;
}

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
  <div class="inicio-pagina">
    ${petalasFundoHtml()}
    <div class="inicio-conteudo">
      <div class="inicio-saudacao">
        <div class="ic-lirio">${ICONE_LIRIO}</div>
        <div>
          <div class="h-titulo">${t("inicioSaudacao",{nome:nomeExib.split(" ")[0]})}</div>
          <div class="h-corpo">${t("inicioSub")}</div>
        </div>
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
      <div class="card card-dica">
        <div class="ic">${ICONE_LIRIO}</div>
        <div>
          <div class="h-sub" style="margin-bottom:6px;">${t("dicaTitulo")}</div>
          <div class="h-corpo">${t("dicaTexto")}</div>
        </div>
      </div>
    </div>
  </div>`;
}

function render(){ montarShell("inicio", t("navInicio"), conteudoHtml()); }

iniciarPagina("inicio", { aoAutenticado: render, aoAtualizarContatos: ()=>atualizarConteudo(conteudoHtml()) });
