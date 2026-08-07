/* ==========================================================================
   SafeHer — página SOBRE
   ========================================================================== */
import {
  ICONE, state, criarTradutor, montarShell, iniciarPagina,
  CONTATOS_UTEIS, SECRETARIA_MULHER, linkWhatsapp,
} from "../../layout.js";

const I18N_PAGINA = {
  pt: {
    sobreTitulo:"Sobre o SafeHer",
    sobreTexto:"O SafeHer é um protótipo de aplicativo de apoio para mulheres em situação de risco ou violência, reunindo botão de emergência, mapa de pontos de apoio, teste de autoavaliação, chatbot de orientação e gestão de contatos de confiança em um só lugar.",
    linhasNacionais:"Linhas de apoio nacionais (Brasil)",
    secretariaTitulo:"Secretaria da Mulher — Lages/SC",
    secretariaTexto:"Secretaria de Políticas para a Mulher e para a Pessoa Idosa de Lages/SC. Atendimento presencial de segunda a sexta e plantão 24h por telefone/WhatsApp.",
    secretariaEndereco:"Rua Santa Cruz, 155 — Centro, Lages/SC (ao lado da Igreja Santa Cruz)",
    secretariaTelComercial:"Atendimento (seg. a sex., WhatsApp)",
    secretariaTelPlantao:"Plantão 24h (WhatsApp)",
    rodapeSobre:"Versão web de demonstração — dados dos contatos são sincronizados com sua conta; os demais dados ficam apenas neste dispositivo.",
    abrirNoMapa:"Abrir no mapa", ligar:"Ligar",
    mensagemWhatsappOi:"Oi, tudo bem? Só passando pra avisar que estou usando o SafeHer.",
  },
  en: {
    sobreTitulo:"About SafeHer",
    sobreTexto:"SafeHer is a prototype support app for women at risk or experiencing violence, bringing together an emergency button, a map of support points, a self-assessment test, a guidance chatbot and trusted-contact management in one place.",
    linhasNacionais:"National support lines (Brazil)",
    secretariaTitulo:"Women's Office — Lages/SC",
    secretariaTexto:"Municipal Department of Policies for Women and the Elderly of Lages/SC. In-person service Monday to Friday, plus a 24h phone/WhatsApp line.",
    secretariaEndereco:"Rua Santa Cruz, 155 — Centro, Lages/SC (next to Igreja Santa Cruz)",
    secretariaTelComercial:"Service line (Mon–Fri, WhatsApp)",
    secretariaTelPlantao:"24h on-call line (WhatsApp)",
    rodapeSobre:"Web demo version — your contacts are synced to your account; other data is stored only on this device.",
    abrirNoMapa:"Open on map", ligar:"Call",
    mensagemWhatsappOi:"Hi, how are you? Just letting you know I'm using SafeHer.",
  },
  es: {
    sobreTitulo:"Acerca de SafeHer",
    sobreTexto:"SafeHer es un prototipo de aplicación de apoyo para mujeres en situación de riesgo o violencia, que reúne botón de emergencia, mapa de puntos de apoyo, test de autoevaluación, chatbot de orientación y gestión de contactos de confianza en un solo lugar.",
    linhasNacionais:"Líneas de apoyo nacionales (Brasil)",
    secretariaTitulo:"Secretaría de la Mujer — Lages/SC",
    secretariaTexto:"Secretaría de Políticas para la Mujer y para la Persona Mayor de Lages/SC. Atención presencial de lunes a viernes y línea 24h por teléfono/WhatsApp.",
    secretariaEndereco:"Rua Santa Cruz, 155 — Centro, Lages/SC (junto a la Iglesia Santa Cruz)",
    secretariaTelComercial:"Atención (lun. a vie., WhatsApp)",
    secretariaTelPlantao:"Línea 24h (WhatsApp)",
    rodapeSobre:"Versión web de demostración — tus contactos se sincronizan con tu cuenta; los demás datos se guardan solo en este dispositivo.",
    abrirNoMapa:"Abrir en el mapa", ligar:"Llamar",
    mensagemWhatsappOi:"Hola, ¿todo bien? Solo para avisarte que estoy usando SafeHer.",
  },
};
const t = criarTradutor(I18N_PAGINA);

function conteudoHtml(){
  const contatos = CONTATOS_UTEIS[state.idioma];
  return `
  <div style="max-width:600px;display:flex;flex-direction:column;gap:16px;">
    <div class="card">
      <div class="h-sub" style="margin-bottom:8px;">${t("sobreTitulo")}</div>
      <div class="h-corpo">${t("sobreTexto")}</div>
    </div>
    <div class="card">
      <div class="h-corpo-forte" style="margin-bottom:10px;">${t("linhasNacionais")}</div>
      ${contatos.map(c=>`<div style="padding:6px 0;"><b>${c.numero}</b> — ${c.nome}: <span class="h-legenda">${c.desc}</span></div>`).join("")}
    </div>
    <div class="card">
      <div class="h-corpo-forte" style="margin-bottom:6px;">${t("secretariaTitulo")}</div>
      <div class="h-corpo" style="margin-bottom:10px;">${t("secretariaTexto")}</div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
          <span class="h-legenda">${t("secretariaTelComercial")}</span>
          <a class="btn btn-outline btn-sm" href="tel:${SECRETARIA_MULHER.numeroComercial}">${t("ligar")} ${SECRETARIA_MULHER.numeroExibicaoComercial}</a>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
          <span class="h-legenda">${t("secretariaTelPlantao")}</span>
          <a class="btn btn-primario btn-sm" href="${linkWhatsapp(SECRETARIA_MULHER.numeroPlantao, t("mensagemWhatsappOi"))}" target="_blank">${ICONE.mensagem}${SECRETARIA_MULHER.numeroExibicaoPlantao}</a>
        </div>
        <div class="h-legenda" style="margin-top:6px;">${t("secretariaEndereco")}</div>
        <a class="btn btn-outline btn-sm" style="align-self:flex-start;" href="https://www.google.com/maps/search/${encodeURIComponent(SECRETARIA_MULHER.endereco)}/@${SECRETARIA_MULHER.lat},${SECRETARIA_MULHER.lng},16z" target="_blank">${ICONE.local}${t("abrirNoMapa")}</a>
      </div>
    </div>
    <div class="h-legenda">${t("rodapeSobre")}</div>
  </div>`;
}

function render(){ montarShell("sobre", t("navSobre"), conteudoHtml()); }

iniciarPagina("sobre", { aoAutenticado: render });
