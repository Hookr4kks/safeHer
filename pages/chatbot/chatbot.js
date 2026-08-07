/* ==========================================================================
   SafeHer — página CHATBOT
   ========================================================================== */
import {
  state, criarTradutor, montarShell, atualizarConteudo, iniciarPagina, escapeHtml, attrJs,
} from "../../layout.js";

const I18N_PAGINA = {
  pt: {
    chatPlaceholder:"Escreva algo…", chatEnviar:"Enviar",
    chipMedo:"Estou com medo", chipDenunciar:"Como denunciar?", chipUrgente:"Ajuda urgente",
    avisoChat:"Este chatbot oferece apoio e orientação inicial, mas não substitui atendimento humano especializado.",
    chatMensagemInicial:"Oi, eu sou a assistente do SafeHer. Este espaço é seu, sigiloso e sem julgamentos. Como você está agora?",
  },
  en: {
    chatPlaceholder:"Type something…", chatEnviar:"Send",
    chipMedo:"I'm scared", chipDenunciar:"How do I report it?", chipUrgente:"Urgent help",
    avisoChat:"This chatbot offers initial support and guidance, but it doesn't replace specialized human care.",
    chatMensagemInicial:"Hi, I'm the SafeHer assistant. This space is yours, confidential and judgment-free. How are you doing right now?",
  },
  es: {
    chatPlaceholder:"Escribe algo…", chatEnviar:"Enviar",
    chipMedo:"Tengo miedo", chipDenunciar:"¿Cómo denunciar?", chipUrgente:"Ayuda urgente",
    avisoChat:"Este chatbot ofrece apoyo y orientación inicial, pero no sustituye la atención humana especializada.",
    chatMensagemInicial:"Hola, soy la asistente de SafeHer. Este espacio es tuyo, confidencial y sin juicios. ¿Cómo estás ahora?",
  },
};
const t = criarTradutor(I18N_PAGINA);

const FLUXO_CHATBOT = {
  pt: [
    {chaves:["oi","ola","olá","bom dia","boa tarde","boa noite"], resposta:"Oi, eu estou aqui com você. Pode me contar em poucas palavras o que está sentindo ou precisando agora?"},
    {chaves:["medo","perigo","socorro","ajuda urgente","correndo risco"], resposta:"Sinto muito que você esteja passando por isso. Se o perigo é imediato, ligue 190 (Polícia) agora. Quer que eu abra o botão de emergência para avisar seus contatos de confiança?"},
    {chaves:["denunciar","denúncia","denuncia","boletim","delegacia"], resposta:"Você pode denunciar pela Central 180 (ligação gratuita, 24h) ou pelo Disque 100. Também é possível registrar boletim de ocorrência em qualquer delegacia, de preferência uma Delegacia da Mulher. Quer que eu te leve para o Mapa de Apoio?"},
    {chaves:["controla","controle","ciumes","ciúmes","isolad"], resposta:"O controle excessivo e o isolamento de amigos e família são sinais de alerta importantes. Isso não é sua culpa. Você pode fazer o teste interativo para entender melhor o padrão que está vivendo."},
    {chaves:["ansiosa","ansiedade","triste","sozinha","exausta","medo dele","medo dela"], resposta:"Seu sentimento é válido e você não precisa passar por isso sozinha. Se quiser conversa humana e sigilosa agora, a Central 180 tem atendimento 24h. Estou aqui para te ouvir também."},
    {chaves:["obrigada","obrigado","valeu"], resposta:"Estou por aqui sempre que precisar. Cuide-se."},
  ],
  en: [
    {chaves:["hi","hello","hey","good morning","good afternoon","good evening"], resposta:"Hi, I'm here with you. Can you tell me in a few words what you're feeling or need right now?"},
    {chaves:["afraid","scared","danger","help","urgent","at risk"], resposta:"I'm sorry you're going through this. If the danger is immediate, call 190 (Police) now. Would you like me to open the emergency button to notify your trusted contacts?"},
    {chaves:["report","police station","file a report"], resposta:"You can report through the Women's Support Hotline 180 (free, 24h) or Human Rights Hotline 100. You can also file a police report at any station, preferably a Women's Police Station. Want me to take you to the Support Map?"},
    {chaves:["controls","control","jealous","isolat"], resposta:"Excessive control and isolation from friends and family are important warning signs. This isn't your fault. You can take the interactive test to better understand the pattern you're experiencing."},
    {chaves:["anxious","sad","alone","exhausted","afraid of him","afraid of her"], resposta:"What you're feeling is valid and you don't have to go through this alone. If you'd like a confidential human conversation right now, the 180 line is available 24h. I'm here to listen too."},
    {chaves:["thanks","thank you"], resposta:"I'm here whenever you need. Take care of yourself."},
  ],
  es: [
    {chaves:["hola","buenos días","buenas tardes","buenas noches"], resposta:"Hola, estoy aquí contigo. ¿Puedes contarme en pocas palabras qué sientes o necesitas ahora?"},
    {chaves:["miedo","peligro","socorro","ayuda urgente","en riesgo"], resposta:"Siento mucho que estés pasando por esto. Si el peligro es inmediato, llama al 190 (Policía) ahora. ¿Quieres que abra el botón de emergencia para avisar a tus contactos de confianza?"},
    {chaves:["denunciar","denuncia","comisaría","boleta"], resposta:"Puedes denunciar a través de la Línea 180 (llamada gratuita, 24h) o la Línea 100. También puedes presentar una denuncia en cualquier comisaría, preferiblemente una Comisaría de la Mujer. ¿Quieres que te lleve al Mapa de Apoyo?"},
    {chaves:["controla","control","celos","aislad"], resposta:"El control excesivo y el aislamiento de amigos y familia son señales de alerta importantes. Esto no es tu culpa. Puedes hacer el test interactivo para entender mejor el patrón que estás viviendo."},
    {chaves:["ansiosa","triste","sola","exhausta","miedo de él","miedo de ella"], resposta:"Lo que sientes es válido y no tienes que pasar por esto sola. Si quieres una conversación humana y confidencial ahora, la Línea 180 atiende 24h. Yo también estoy aquí para escucharte."},
    {chaves:["gracias"], resposta:"Estoy aquí siempre que lo necesites. Cuídate."},
  ],
};
const RESPOSTA_PADRAO_BOT = {
  pt:"Estou te ouvindo. Se preferir, posso te mostrar os contatos de emergência, o mapa de apoio ou o teste interativo — é só pedir.",
  en:"I'm listening. If you'd like, I can show you the emergency contacts, the support map or the interactive test — just ask.",
  es:"Te estoy escuchando. Si prefieres, puedo mostrarte los contactos de emergencia, el mapa de apoyo o el test interactivo — solo pídelo.",
};

let chat = [{de:"bot", texto:t("chatMensagemInicial")}];

function conteudoHtml(){
  return `
  <div style="display:flex;flex-direction:column;gap:14px;max-width:640px;">
    <div class="card">
      <div id="chatScroll" class="chat-scroll">
        ${chat.map(m=>`<div class="bolha ${m.de==='bot'?'bot':'user'}">${escapeHtml(m.texto)}</div>`).join("")}
      </div>
      <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
        <div class="chip" onclick="window.__chatRapida(${attrJs(t("chipMedo"))})">${t("chipMedo")}</div>
        <div class="chip" onclick="window.__chatRapida(${attrJs(t("chipDenunciar"))})">${t("chipDenunciar")}</div>
        <div class="chip" onclick="window.__chatRapida(${attrJs(t("chipUrgente"))})">${t("chipUrgente")}</div>
      </div>
      <div style="display:flex;gap:10px;margin-top:14px;">
        <input id="chatInput" class="input-field" placeholder="${t("chatPlaceholder")}" onkeydown="if(event.key==='Enter') window.__chatEnviar();">
        <button class="btn btn-primario" onclick="window.__chatEnviar()">${t("chatEnviar")}</button>
      </div>
    </div>
    <div class="h-legenda">${t("avisoChat")}</div>
  </div>`;
}

function render(){ montarShell("chatbot", t("navChat"), conteudoHtml()); rolarParaFim(); }
function atualizar(){ atualizarConteudo(conteudoHtml()); rolarParaFim(); }
function rolarParaFim(){
  const chatEl = document.getElementById('chatScroll');
  if(chatEl) chatEl.scrollTop = chatEl.scrollHeight;
}

function enviarMsgRapida(txt){ document.getElementById('chatInput').value = txt; enviarMsg(); }
function enviarMsg(){
  const input = document.getElementById('chatInput');
  const texto = input.value.trim();
  if(!texto) return;
  chat.push({de:"user", texto});
  const textoLower = texto.toLowerCase();
  let resposta = RESPOSTA_PADRAO_BOT[state.idioma];
  for(const fluxo of FLUXO_CHATBOT[state.idioma]){
    if(fluxo.chaves.some(ch=>textoLower.includes(ch))){ resposta = fluxo.resposta; break; }
  }
  atualizar();
  setTimeout(()=>{
    chat.push({de:"bot", texto:resposta});
    atualizar();
  }, 500);
}
window.__chatRapida = enviarMsgRapida;
window.__chatEnviar = enviarMsg;

iniciarPagina("chatbot", { aoAutenticado: render });
