/* ==========================================================================
   SafeHer — página TESTE INTERATIVO
   ========================================================================== */
import {
  state, criarTradutor, montarShell, atualizarConteudo, iniciarPagina,
} from "../../layout.js";

const I18N_PAGINA = {
  pt: {
    testeIntro:"Responda considerando os últimos 3 meses. Suas respostas ficam só neste dispositivo, ninguém mais vê.",
    perguntaXdeY:"Pergunta {a} de {b}",
    escala0:"Nunca", escala1:"Raramente", escala2:"Às vezes", escala3:"Frequentemente", escala4:"Sempre",
    resultadoTitulo:"Resultado",
    pontuacaoTotal:"Pontuação total: {p}/{t}",
    nivelRisco0:"Sem indícios relevantes", nivelRisco1:"Atenção", nivelRisco2:"Risco Moderado", nivelRisco3:"Alto Risco", nivelRisco4:"Risco Muito Elevado",
    textoRisco0:"No momento, suas respostas não indicam sinais relevantes de violência. Ainda assim, conhecer seus direitos e manter uma rede de apoio é importante.",
    textoRisco1:"Foram identificados comportamentos que merecem atenção. Caso essas situações aumentem em frequência ou intensidade, considere buscar orientação e conversar com pessoas de confiança.",
    textoRisco2:"Suas respostas indicam sinais consistentes de violência. É recomendado procurar orientação junto à rede de proteção à mulher do seu município e fortalecer sua rede de apoio.",
    textoRisco3:"Há fortes indícios de violência. Sempre que for seguro fazê-lo, procure atendimento especializado, registre evidências e planeje formas de proteção com pessoas de confiança.",
    textoRisco4:"As respostas indicam um cenário de alto risco. Se você estiver em perigo imediato, procure um local seguro e acione os serviços de emergência e a rede de proteção à mulher.",
    tiposViolenciaTitulo:"Tipos de violência com indícios",
    semTiposIndicados:"Nenhum tipo com indícios relevantes identificado.",
    alertaPrioritarioTitulo:"Alerta prioritário",
    alertaPrioritarioTexto:"Identificamos uma resposta de alto risco (tentativa de estrangulamento ou ameaça com objeto, ou percepção de risco para a própria vida). Esses fatores são amplamente reconhecidos na literatura como indicadores de maior gravidade — considere buscar apoio o quanto antes.",
    faixaTeste:"Este teste é apenas informativo e não substitui uma avaliação profissional. Para conversar com alguém, ligue {n180} (sigiloso e gratuito).",
    refazerTeste:"Refazer teste", conversarChatbot:"Conversar com o chatbot",
  },
  en: {
    testeIntro:"Answer thinking about the last 3 months. Your answers stay only on this device — no one else sees them.",
    perguntaXdeY:"Question {a} of {b}",
    escala0:"Never", escala1:"Rarely", escala2:"Sometimes", escala3:"Often", escala4:"Always",
    resultadoTitulo:"Result",
    pontuacaoTotal:"Total score: {p}/{t}",
    nivelRisco0:"No significant signs", nivelRisco1:"Attention", nivelRisco2:"Moderate Risk", nivelRisco3:"High Risk", nivelRisco4:"Very High Risk",
    textoRisco0:"Right now, your answers don't show significant signs of violence. Even so, knowing your rights and keeping a support network close is important.",
    textoRisco1:"Some behaviors that deserve attention were identified. If these situations increase in frequency or intensity, consider seeking guidance and talking with people you trust.",
    textoRisco2:"Your answers show consistent signs of violence. We recommend seeking guidance from your local women's protection network and strengthening your support network.",
    textoRisco3:"There are strong indications of violence. Whenever it's safe to do so, seek specialized care, document evidence, and plan ways to protect yourself with people you trust.",
    textoRisco4:"Your answers point to a high-risk scenario. If you're in immediate danger, get to a safe place and contact emergency services and the women's protection network.",
    tiposViolenciaTitulo:"Types of violence with indications",
    semTiposIndicados:"No type with relevant indications was identified.",
    alertaPrioritarioTitulo:"Priority alert",
    alertaPrioritarioTexto:"We identified a high-risk answer (an attempt to choke/strangle you or a threat with an object, or a perceived risk to your life). These factors are widely recognized in research as indicators of greater severity — consider seeking support as soon as possible.",
    faixaTeste:"This test is for information only and doesn't replace a professional evaluation. To talk to someone, call {n180} (confidential and free).",
    refazerTeste:"Retake test", conversarChatbot:"Talk to the chatbot",
  },
  es: {
    testeIntro:"Responde pensando en los últimos 3 meses. Tus respuestas quedan solo en este dispositivo, nadie más las ve.",
    perguntaXdeY:"Pregunta {a} de {b}",
    escala0:"Nunca", escala1:"Raramente", escala2:"A veces", escala3:"Frecuentemente", escala4:"Siempre",
    resultadoTitulo:"Resultado",
    pontuacaoTotal:"Puntuación total: {p}/{t}",
    nivelRisco0:"Sin indicios relevantes", nivelRisco1:"Atención", nivelRisco2:"Riesgo Moderado", nivelRisco3:"Alto Riesgo", nivelRisco4:"Riesgo Muy Elevado",
    textoRisco0:"Por ahora, tus respuestas no muestran señales relevantes de violencia. Aun así, conocer tus derechos y mantener una red de apoyo es importante.",
    textoRisco1:"Se identificaron comportamientos que merecen atención. Si estas situaciones aumentan en frecuencia o intensidad, considera buscar orientación y hablar con personas de confianza.",
    textoRisco2:"Tus respuestas indican señales consistentes de violencia. Se recomienda buscar orientación en la red de protección a la mujer de tu municipio y fortalecer tu red de apoyo.",
    textoRisco3:"Hay fuertes indicios de violencia. Siempre que sea seguro hacerlo, busca atención especializada, registra evidencias y planea formas de protección con personas de confianza.",
    textoRisco4:"Tus respuestas indican un escenario de alto riesgo. Si estás en peligro inmediato, busca un lugar seguro y contacta a los servicios de emergencia y a la red de protección a la mujer.",
    tiposViolenciaTitulo:"Tipos de violencia con indicios",
    semTiposIndicados:"No se identificó ningún tipo con indicios relevantes.",
    alertaPrioritarioTitulo:"Alerta prioritaria",
    alertaPrioritarioTexto:"Identificamos una respuesta de alto riesgo (intento de asfixia/estrangulamiento o amenaza con un objeto, o percepción de riesgo para tu vida). Estas señales son ampliamente reconocidas en la literatura como indicadores de mayor gravedad — considera buscar apoyo cuanto antes.",
    faixaTeste:"Este test es solo informativo y no sustituye una evaluación profesional. Para hablar con alguien, llama al {n180} (confidencial y gratuito).",
    refazerTeste:"Repetir test", conversarChatbot:"Hablar con el chatbot",
  },
};
const t = criarTradutor(I18N_PAGINA);

/* Questionário SafeHer de Identificação Precoce da Violência — 5 blocos, 15 perguntas.
   Escala de resposta: Nunca=0, Raramente=1, Às vezes=2, Frequentemente=3, Sempre=4.
   As perguntas de índice global 6 (bloco físico, item 3) e 14 (bloco de risco, item 2)
   disparam o alerta prioritário quando respondidas com 3 (Frequentemente) ou 4 (Sempre). */
const TESTE_BLOCOS = {
  pt: [
    {chave:"psicologica", nome:"Violência Psicológica", perguntas:[
      "Alguém com quem você mantém ou manteve um relacionamento costuma humilhar, insultar ou ridicularizar você?",
      "Essa pessoa controla com quem você conversa, sai ou mantém contato?",
      "Você sente medo da reação dessa pessoa quando discorda dela ou toma decisões por conta própria?",
      "Essa pessoa tenta afastar você de familiares, amigos ou pessoas importantes?",
    ]},
    {chave:"fisica", nome:"Violência Física", perguntas:[
      "Essa pessoa já empurrou, segurou, sacudiu ou agrediu você fisicamente?",
      "Essa pessoa já bateu, chutou, deu socos ou utilizou força física para machucar você?",
      "Essa pessoa já tentou sufocar, estrangular ou ameaçou utilizar algum objeto para ferir você?",
    ]},
    {chave:"sexual", nome:"Violência Sexual", perguntas:[
      "Você já foi pressionada ou obrigada a manter relações íntimas contra sua vontade?",
      "Você sente medo de recusar relações íntimas por receio da reação dessa pessoa?",
      "Essa pessoa tenta controlar suas decisões sobre gravidez ou métodos contraceptivos?",
    ]},
    {chave:"patrimonial", nome:"Violência Patrimonial e Controle Coercitivo", perguntas:[
      "Essa pessoa controla seu dinheiro ou impede que você utilize seus próprios recursos?",
      "Essa pessoa já destruiu, escondeu ou danificou objetos pessoais seus?",
      "Essa pessoa monitora constantemente seu celular, senhas, redes sociais ou localização?",
    ]},
    {chave:"risco", nome:"Avaliação do Risco", perguntas:[
      "Nos últimos meses, a frequência ou a intensidade das agressões aumentou?",
      "Você acredita que sua integridade física ou sua vida possa estar em risco por causa dessa pessoa?",
    ]},
  ],
  en: [
    {chave:"psicologica", nome:"Psychological Violence", perguntas:[
      "Does someone you are or have been in a relationship with often humiliate, insult, or ridicule you?",
      "Does this person control who you talk to, go out with, or stay in contact with?",
      "Do you feel afraid of this person's reaction when you disagree with them or make decisions on your own?",
      "Does this person try to keep you away from family, friends, or people who matter to you?",
    ]},
    {chave:"fisica", nome:"Physical Violence", perguntas:[
      "Has this person ever pushed, grabbed, shaken, or physically assaulted you?",
      "Has this person ever hit, kicked, punched, or used physical force to hurt you?",
      "Has this person ever tried to choke or strangle you, or threatened to hurt you with an object?",
    ]},
    {chave:"sexual", nome:"Sexual Violence", perguntas:[
      "Have you ever been pressured or forced into intimacy against your will?",
      "Are you afraid to refuse intimacy because of how this person might react?",
      "Does this person try to control your decisions about pregnancy or contraception?",
    ]},
    {chave:"patrimonial", nome:"Financial Abuse and Coercive Control", perguntas:[
      "Does this person control your money or stop you from using your own resources?",
      "Has this person ever destroyed, hidden, or damaged your personal belongings?",
      "Does this person constantly monitor your phone, passwords, social media, or location?",
    ]},
    {chave:"risco", nome:"Risk Assessment", perguntas:[
      "Over the last few months, has the frequency or intensity of the aggression increased?",
      "Do you believe your physical safety or your life may be at risk because of this person?",
    ]},
  ],
  es: [
    {chave:"psicologica", nome:"Violencia Psicológica", perguntas:[
      "¿Alguien con quien mantienes o mantuviste una relación suele humillarte, insultarte o ridiculizarte?",
      "¿Esa persona controla con quién hablas, sales o mantienes contacto?",
      "¿Sientes miedo de su reacción cuando no estás de acuerdo con ella o tomas decisiones por tu cuenta?",
      "¿Esa persona intenta alejarte de familiares, amigos o personas importantes para ti?",
    ]},
    {chave:"fisica", nome:"Violencia Física", perguntas:[
      "¿Esa persona te ha empujado, sujetado, sacudido o agredido físicamente?",
      "¿Esa persona te ha golpeado, pateado, dado puñetazos o usado fuerza física para lastimarte?",
      "¿Esa persona ha intentado asfixiarte, estrangularte o amenazado con usar algún objeto para herirte?",
    ]},
    {chave:"sexual", nome:"Violencia Sexual", perguntas:[
      "¿Alguna vez fuiste presionada u obligada a tener relaciones íntimas en contra de tu voluntad?",
      "¿Sientes miedo de negarte a tener relaciones íntimas por temor a su reacción?",
      "¿Esa persona intenta controlar tus decisiones sobre el embarazo o los métodos anticonceptivos?",
    ]},
    {chave:"patrimonial", nome:"Violencia Patrimonial y Control Coercitivo", perguntas:[
      "¿Esa persona controla tu dinero o te impide usar tus propios recursos?",
      "¿Esa persona ha destruido, escondido o dañado objetos personales tuyos?",
      "¿Esa persona monitorea constantemente tu celular, contraseñas, redes sociales o ubicación?",
    ]},
    {chave:"risco", nome:"Evaluación del Riesgo", perguntas:[
      "En los últimos meses, ¿ha aumentado la frecuencia o la intensidad de las agresiones?",
      "¿Crees que tu integridad física o tu vida pueda estar en riesgo por causa de esa persona?",
    ]},
  ],
};

/* Índices globais (0-14) das perguntas que disparam o alerta prioritário. */
const TESTE_ALERTA_INDICES = [6, 14];

const testeState = {passo:0, respostas:{}, finalizado:false};

/* Achata os blocos em uma lista única de perguntas, mantendo a referência ao bloco de origem. */
function perguntasTesteFlat(){
  const blocos = TESTE_BLOCOS[state.idioma];
  const lista = [];
  blocos.forEach(b=>{ b.perguntas.forEach(texto=>lista.push({texto, blocoChave:b.chave, blocoNome:b.nome})); });
  return lista;
}
function nivelRiscoPorPontos(pontos){
  if(pontos <= 10) return 0;
  if(pontos <= 20) return 1;
  if(pontos <= 35) return 2;
  if(pontos <= 50) return 3;
  return 4;
}

function conteudoHtml(){
  const perguntas = perguntasTesteFlat();
  const escala = [0,1,2,3,4].map(v=>t("escala"+v));
  if(testeState.finalizado){
    const valores = perguntas.map((_,i)=>testeState.respostas[i] ?? 0);
    const pontosTotal = valores.reduce((a,b)=>a+b,0);
    const pontosMax = perguntas.length*4;
    const nivelIdx = nivelRiscoPorPontos(pontosTotal);
    const coresPorNivel = ["badge-sucesso","badge-sucesso","badge-aviso","badge-erro","badge-erro"];
    const nivel = t("nivelRisco"+nivelIdx), cor = coresPorNivel[nivelIdx], texto = t("textoRisco"+nivelIdx);

    const blocos = TESTE_BLOCOS[state.idioma];
    const tiposComIndicio = [];
    let cursor = 0;
    blocos.forEach(b=>{
      const somaBloco = b.perguntas.reduce((soma,_,j)=> soma + (testeState.respostas[cursor+j] ?? 0), 0);
      if(somaBloco > 0) tiposComIndicio.push(b.nome);
      cursor += b.perguntas.length;
    });

    const alertaAtivo = TESTE_ALERTA_INDICES.some(i => (testeState.respostas[i] ?? 0) >= 3);

    return `
    <div style="display:flex;flex-direction:column;gap:18px;max-width:560px;">
      ${alertaAtivo ? `
      <div class="faixa-emergencia" style="border-color:var(--vinho);">
        <span><b>${t("alertaPrioritarioTitulo")}.</b> ${t("alertaPrioritarioTexto")}</span>
      </div>` : ``}
      <div class="card" style="text-align:center;">
        <div class="h-legenda">${t("resultadoTitulo")}</div>
        <div class="h-titulo" style="margin:6px 0;">${t("pontuacaoTotal",{p:pontosTotal,t:pontosMax})}</div>
        <span class="badge ${cor}">${nivel}</span>
        <div class="h-corpo" style="margin-top:14px;">${texto}</div>
      </div>
      <div class="card">
        <div class="h-corpo-forte" style="margin-bottom:10px;">${t("tiposViolenciaTitulo")}</div>
        ${tiposComIndicio.length
          ? `<div style="display:flex;flex-wrap:wrap;gap:8px;">${tiposComIndicio.map(nome=>`<span class="badge badge-neutro">${nome}</span>`).join("")}</div>`
          : `<div class="h-legenda">${t("semTiposIndicados")}</div>`}
      </div>
      <div class="faixa-emergencia">${t("faixaTeste",{n180:"<b>180</b>"})}</div>
      <div style="display:flex;gap:12px;">
        <button class="btn btn-secundario" style="flex:1;" onclick="window.__testeReiniciar()">${t("refazerTeste")}</button>
        <a class="btn btn-primario" style="flex:1;" href="../chatbot/chatbot.html">${t("conversarChatbot")}</a>
      </div>
    </div>`;
  }
  const p = perguntas[testeState.passo];
  const progresso = Math.round((testeState.passo/perguntas.length)*100);
  const respostaAtual = testeState.respostas[testeState.passo];
  return `
  <div style="display:flex;flex-direction:column;gap:18px;max-width:560px;">
    <div class="h-corpo">${t("testeIntro")}</div>
    <div class="progress-bar"><div style="width:${progresso}%;"></div></div>
    <div class="h-legenda">${t("perguntaXdeY",{a:testeState.passo+1,b:perguntas.length})} · <span class="h-eyebrow">${p.blocoNome}</span></div>
    <div class="card">
      <div class="h-sub">${p.texto}</div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:20px;">
        ${escala.map((rotulo,valor)=>`
          <button class="opcao-sn ${respostaAtual===valor?'selecionada':''}" style="justify-content:flex-start;padding:12px 16px;" onclick="window.__testeResponder(${valor})">${rotulo}</button>
        `).join("")}
      </div>
    </div>
  </div>`;
}

function render(){ montarShell("teste", t("navTeste"), conteudoHtml()); }
function atualizar(){ atualizarConteudo(conteudoHtml()); }

function responderTeste(valor){
  testeState.respostas[testeState.passo] = valor;
  const total = perguntasTesteFlat().length;
  if(testeState.passo < total-1){
    testeState.passo++;
  } else {
    testeState.finalizado = true;
  }
  atualizar();
}
function reiniciarTeste(){ testeState.passo=0; testeState.respostas={}; testeState.finalizado=false; atualizar(); }
window.__testeResponder = responderTeste;
window.__testeReiniciar = reiniciarTeste;

iniciarPagina("teste", { aoAutenticado: render });
