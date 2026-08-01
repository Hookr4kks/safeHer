/* ==========================================================================
   SafeHer — lógica (protótipo em memória, sem back-end)
   Suporta modo escuro e três idiomas (pt / en / es).
   ========================================================================== */

/* ---------------------------------------------------------------- ícones */
const ICONE = {
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
const IDIOMAS = [
  {codigo:"pt", rotulo:"PT"},
  {codigo:"en", rotulo:"EN"},
  {codigo:"es", rotulo:"ES"},
];

const I18N = {
  pt: {
    tagline: "Sua rede de segurança, sempre por perto.",
    loginTitulo: "Bem-vinda de volta", loginSub: "Entre para acessar sua rede de apoio",
    labelEmail: "E-mail", labelSenha: "Senha",
    btnEntrar: "Entrar", btnCriarConta: "Criar conta",
    faixaLogin: "Em perigo agora? Ligue {n190} ou {n180} imediatamente.",
    cadTitulo: "Criar sua conta", cadSub: "Leva menos de um minuto",
    labelNome: "Nome", placeholderNome: "Como podemos te chamar?",
    placeholderSenha: "Crie uma senha",
    btnCriarContinuar: "Criar conta e continuar", btnJaTenho: "Já tenho conta",
    toastDigiteEmail: "Digite seu e-mail para entrar.",
    toastLoginOk: "Login realizado. Bem-vinda ao SafeHer!",
    toastPreencheNomeEmail: "Preencha nome e e-mail.",
    toastContaCriada: "Conta criada com sucesso!",

    navInicio:"Início", navEmergencia:"Emergência", navMapa:"Mapa de Apoio", navTeste:"Teste Interativo",
    navChat:"Chatbot", navContatos:"Contatos", navPerfil:"Perfil", navConfig:"Configurações",
    navSobre:"Sobre", navSair:"Sair",

    boasVindasPadrao:"Bem-vinda",
    inicioSaudacao:"Olá, {nome}",
    inicioSub:"Este é seu espaço seguro. O que você precisa agora?",
    faixaInicio:"Emergência agora? Ligue {n190} (Polícia) ou {n180} (Central de Atendimento à Mulher).",
    dicaTitulo:"Dica de segurança",
    dicaTexto:"Combine uma palavra-código com alguém de confiança — se você disser essa palavra em uma ligação, essa pessoa saberá que precisa agir.",

    modAlertaTitulo:"Emergência", modAlertaDesc:"Botão de emergência com localização e aviso rápido aos seus contatos.",
    modMapaTitulo:"Mapa de Apoio", modMapaDesc:"Delegacias, hospitais e abrigos mais próximos de você.",
    modTesteTitulo:"Teste Interativo", modTesteDesc:"Entenda padrões de risco em um relacionamento, com sigilo total.",
    modChatTitulo:"Chatbot de apoio", modChatDesc:"Converse, tire dúvidas e receba orientação a qualquer hora.",
    modContatosTitulo:"Contatos de Emergência", modContatosDesc:"Gerencie quem deve ser avisado em uma emergência.",
    modSobreTitulo:"Sobre o SafeHer", modSobreDesc:"Como este espaço funciona e as linhas de apoio nacionais.",

    alertaAtivoBadge:"Alerta ativo",
    avisandoContatos:"Avisando seus contatos de confiança…",
    locCapturada:"Localização capturada e pronta para envio.",
    locFalhou:"Não foi possível obter sua localização — o aviso será enviado mesmo assim.",
    contatosNotificadosTitulo:"Contatos notificados",
    semContatosCadastrados:"Nenhum contato cadastrado.",
    badgeAvisado:"avisado",
    btnEstouSegura:"Estou segura — cancelar alerta",
    botaoEmergenciaTitulo:"Botão de Emergência",
    botaoEmergenciaDesc:"Ao acionar, o SafeHer captura sua localização e prepara uma mensagem de emergência para todos os seus contatos de confiança.",
    toqueParaAcionar:"Toque para acionar o alerta",
    localizacaoTitulo:"Localização",
    localizacaoLigada:"Será enviada junto ao alerta.",
    localizacaoDesligada:"Compartilhamento desativado nas configurações.",
    contatosQtd:"{n} contato(s)",
    serãoAvisados:"Serão avisados automaticamente.",
    ultimoAlerta:"Último alerta enviado",
    faixaPerigoImediato:"Perigo imediato: ligue {n190}. Este botão avisa pessoas de confiança, não substitui a polícia.",
    toastAlertaAcionado:"Seu alerta foi enviado. As pessoas em quem você confia estão sendo avisadas agora.",
    toastAlertaCancelado:"Alerta cancelado. Que bom que você está segura.",
    mensagemAlerta:"Preciso de ajuda agora. Este é um alerta do SafeHer — pode me ligar assim que ver esta mensagem?",
    mensagemAlertaLocal:"Preciso de ajuda agora. Este é um alerta do SafeHer — pode me ligar assim que ver esta mensagem? Minha localização: {link}",
    btnAvisarWhatsapp:"Avisar por WhatsApp",

    mapaIntro:"Encontre rapidamente pontos de apoio perto de você. Toque em uma categoria para abrir os locais mais próximos no mapa.",
    usarLocalizacao:"Usar minha localização atual",
    obtendoLocalizacao:"Obtendo localização…",
    localObtida:"Localização obtida — os links de mapa agora usarão sua posição atual.",
    localFalhaGenerica:"Não foi possível obter sua localização. Buscando de forma genérica.",
    geoNaoSuportada:"Geolocalização não suportada neste navegador.",
    abrirNoMapa:"Abrir no mapa",
    linhasApoio:"Linhas de apoio nacionais",
    ligar:"Ligar",

    testeIntro:"Responda com sinceridade — suas respostas ficam só neste dispositivo, ninguém mais vê.",
    perguntaXdeY:"Pergunta {a} de {b}",
    opcaoSim:"Sim", opcaoNao:"Não",
    resultadoTitulo:"Resultado",
    sinaisIdentificados:"{p} de {t} sinais identificados",
    nivelBaixo:"Atenção baixa", nivelModerado:"Atenção moderada", nivelAlto:"Atenção alta",
    textoBaixo:"Poucos sinais identificados. Continue atenta ao seu bem-estar e confie na sua percepção.",
    textoModerado:"Existem sinais de alerta que merecem cuidado. Considere conversar com alguém de confiança ou um serviço especializado.",
    textoAlto:"Foram identificados vários sinais associados a relacionamentos abusivos. Você não está sozinha — buscar apoio pode fazer diferença.",
    faixaTeste:"Este teste é apenas informativo, não é um diagnóstico. Para conversar com alguém, ligue {n180} (sigiloso e gratuito).",
    refazerTeste:"Refazer teste", conversarChatbot:"Conversar com o chatbot",

    chatPlaceholder:"Escreva algo…", chatEnviar:"Enviar",
    chipMedo:"Estou com medo", chipDenunciar:"Como denunciar?", chipUrgente:"Ajuda urgente",
    avisoChat:"Este chatbot oferece apoio e orientação inicial, mas não substitui atendimento humano especializado.",
    chatMensagemInicial:"Oi, eu sou a assistente do SafeHer. Este espaço é seu, sigiloso e sem julgamentos. Como você está agora?",

    contatosIntro:"Essas pessoas serão avisadas quando você acionar a emergência.",
    adicionar:"Adicionar",
    semContatosCard:"Você ainda não tem contatos cadastrados. Adicione alguém de confiança para começar.",
    modalNovoContato:"Novo contato de confiança",
    labelTelefone:"Telefone (com DDI+DDD, só números)", placeholderTelefone:"Ex: 5511999998888",
    placeholderNomeContato:"Nome do contato",
    labelRelacao:"Relação",
    relFamilia:"Família", relAmizade:"Amizade", relTrabalho:"Trabalho", relVizinhanca:"Vizinhança", relOutro:"Outro",
    cancelar:"Cancelar", salvar:"Salvar",
    toastPreenchaNomeTelefone:"Preencha nome e telefone.",
    toastContatoAdicionado:"Contato adicionado.",
    toastContatoRemovido:"Contato removido.",
    mensagemWhatsappOi:"Oi, tudo bem? Só passando pra avisar que estou usando o SafeHer.",

    semNome:"Sem nome", labelCidade:"Cidade", placeholderCidade:"Sua cidade",
    salvarAlteracoes:"Salvar alterações", sairDaConta:"Sair da conta",
    toastPerfilAtualizado:"Perfil atualizado.",

    modoDiscretoTitulo:"Modo discreto", modoDiscretoDesc:"Deixa o app com aparência neutra na tela inicial do celular.",
    modoEscuroTitulo:"Modo escuro", modoEscuroDesc:"Troca as cores do app para um tema escuro, mais confortável à noite.",
    notificacoesTitulo:"Notificações", notificacoesDesc:"Receber avisos e lembretes do SafeHer.",
    compartilharLocTitulo:"Compartilhar localização em alertas", compartilharLocDesc:"Envia sua localização ao acionar a emergência.",
    idiomaTitulo:"Idioma", idiomaDesc:"Escolha o idioma do aplicativo.",
    meusDadosTitulo:"Meus dados", meusDadosDesc:"Este protótipo guarda os dados apenas na memória desta aba — eles somem ao atualizar a página.",
    limparDados:"Limpar todos os dados",
    toastDadosLimpos:"Dados locais limpos.",

    sobreTitulo:"Sobre o SafeHer",
    sobreTexto:"O SafeHer é um protótipo de aplicativo de apoio para mulheres em situação de risco ou violência, reunindo botão de emergência, mapa de pontos de apoio, teste de autoavaliação, chatbot de orientação e gestão de contatos de confiança em um só lugar.",
    linhasNacionais:"Linhas de apoio nacionais (Brasil)",
    rodapeSobre:"Versão web de demonstração — dados guardados apenas em memória, sem envio real de mensagens ou ligações automáticas.",
  },

  en: {
    tagline: "Your safety network, always close by.",
    loginTitulo: "Welcome back", loginSub: "Sign in to access your support network",
    labelEmail: "Email", labelSenha: "Password",
    btnEntrar: "Sign in", btnCriarConta: "Create account",
    faixaLogin: "In danger right now? Call {n190} or {n180} immediately.",
    cadTitulo: "Create your account", cadSub: "Takes less than a minute",
    labelNome: "Name", placeholderNome: "What should we call you?",
    placeholderSenha: "Create a password",
    btnCriarContinuar: "Create account and continue", btnJaTenho: "I already have an account",
    toastDigiteEmail: "Enter your email to sign in.",
    toastLoginOk: "Signed in. Welcome to SafeHer!",
    toastPreencheNomeEmail: "Fill in your name and email.",
    toastContaCriada: "Account created successfully!",

    navInicio:"Home", navEmergencia:"Emergency", navMapa:"Support Map", navTeste:"Interactive Test",
    navChat:"Chatbot", navContatos:"Contacts", navPerfil:"Profile", navConfig:"Settings",
    navSobre:"About", navSair:"Sign out",

    boasVindasPadrao:"Welcome",
    inicioSaudacao:"Hello, {nome}",
    inicioSub:"This is your safe space. What do you need right now?",
    faixaInicio:"Emergency right now? Call {n190} (Police) or {n180} (Women's Support Line).",
    dicaTitulo:"Safety tip",
    dicaTexto:"Agree on a code word with someone you trust — if you say that word during a call, they'll know it means you need help.",

    modAlertaTitulo:"Emergency", modAlertaDesc:"Emergency button with location sharing and a quick alert to your contacts.",
    modMapaTitulo:"Support Map", modMapaDesc:"Police stations, hospitals and shelters closest to you.",
    modTesteTitulo:"Interactive Test", modTesteDesc:"Understand risk patterns in a relationship, fully confidential.",
    modChatTitulo:"Support chatbot", modChatDesc:"Talk, ask questions and get guidance at any time.",
    modContatosTitulo:"Emergency Contacts", modContatosDesc:"Manage who should be notified in an emergency.",
    modSobreTitulo:"About SafeHer", modSobreDesc:"How this space works and the national support lines.",

    alertaAtivoBadge:"Alert active",
    avisandoContatos:"Notifying your trusted contacts…",
    locCapturada:"Location captured and ready to send.",
    locFalhou:"We couldn't get your location — the alert will be sent anyway.",
    contatosNotificadosTitulo:"Notified contacts",
    semContatosCadastrados:"No contacts added.",
    badgeAvisado:"notified",
    btnEstouSegura:"I'm safe — cancel alert",
    botaoEmergenciaTitulo:"Emergency Button",
    botaoEmergenciaDesc:"When triggered, SafeHer captures your location and prepares an emergency message for all of your trusted contacts.",
    toqueParaAcionar:"Tap to trigger the alert",
    localizacaoTitulo:"Location",
    localizacaoLigada:"Will be sent along with the alert.",
    localizacaoDesligada:"Sharing is turned off in settings.",
    contatosQtd:"{n} contact(s)",
    serãoAvisados:"They'll be notified automatically.",
    ultimoAlerta:"Last alert sent",
    faixaPerigoImediato:"Immediate danger: call {n190}. This button notifies trusted people, it doesn't replace the police.",
    toastAlertaAcionado:"Your alert has been sent. The people you trust are being notified right now.",
    toastAlertaCancelado:"Alert canceled. Glad you're safe.",
    mensagemAlerta:"I need help right now. This is a SafeHer alert — can you call me as soon as you see this?",
    mensagemAlertaLocal:"I need help right now. This is a SafeHer alert — can you call me as soon as you see this? My location: {link}",
    btnAvisarWhatsapp:"Notify via WhatsApp",

    mapaIntro:"Quickly find support points near you. Tap a category to open the closest places on the map.",
    usarLocalizacao:"Use my current location",
    obtendoLocalizacao:"Getting location…",
    localObtida:"Location obtained — map links will now use your current position.",
    localFalhaGenerica:"We couldn't get your location. Searching in a generic way instead.",
    geoNaoSuportada:"Geolocation isn't supported in this browser.",
    abrirNoMapa:"Open on map",
    linhasApoio:"National support lines",
    ligar:"Call",

    testeIntro:"Answer honestly — your answers stay only on this device, no one else sees them.",
    perguntaXdeY:"Question {a} of {b}",
    opcaoSim:"Yes", opcaoNao:"No",
    resultadoTitulo:"Result",
    sinaisIdentificados:"{p} of {t} signs identified",
    nivelBaixo:"Low concern", nivelModerado:"Moderate concern", nivelAlto:"High concern",
    textoBaixo:"Few signs identified. Keep paying attention to your wellbeing and trust your instincts.",
    textoModerado:"There are warning signs that deserve attention. Consider talking to someone you trust or a specialized service.",
    textoAlto:"Several signs associated with abusive relationships were identified. You're not alone — seeking support can make a difference.",
    faixaTeste:"This test is for information only, it isn't a diagnosis. To talk to someone, call {n180} (confidential and free).",
    refazerTeste:"Retake test", conversarChatbot:"Talk to the chatbot",

    chatPlaceholder:"Type something…", chatEnviar:"Send",
    chipMedo:"I'm scared", chipDenunciar:"How do I report it?", chipUrgente:"Urgent help",
    avisoChat:"This chatbot offers initial support and guidance, but it doesn't replace specialized human care.",
    chatMensagemInicial:"Hi, I'm the SafeHer assistant. This space is yours, confidential and judgment-free. How are you doing right now?",

    contatosIntro:"These people will be notified when you trigger the emergency alert.",
    adicionar:"Add",
    semContatosCard:"You don't have any contacts yet. Add someone you trust to get started.",
    modalNovoContato:"New trusted contact",
    labelTelefone:"Phone (with country + area code, numbers only)", placeholderTelefone:"e.g. 5511999998888",
    placeholderNomeContato:"Contact's name",
    labelRelacao:"Relationship",
    relFamilia:"Family", relAmizade:"Friendship", relTrabalho:"Work", relVizinhanca:"Neighborhood", relOutro:"Other",
    cancelar:"Cancel", salvar:"Save",
    toastPreenchaNomeTelefone:"Fill in name and phone.",
    toastContatoAdicionado:"Contact added.",
    toastContatoRemovido:"Contact removed.",
    mensagemWhatsappOi:"Hi, how are you? Just letting you know I'm using SafeHer.",

    semNome:"No name", labelCidade:"City", placeholderCidade:"Your city",
    salvarAlteracoes:"Save changes", sairDaConta:"Sign out",
    toastPerfilAtualizado:"Profile updated.",

    modoDiscretoTitulo:"Discreet mode", modoDiscretoDesc:"Gives the app a neutral look on your phone's home screen.",
    modoEscuroTitulo:"Dark mode", modoEscuroDesc:"Switches the app to a dark color theme, easier on the eyes at night.",
    notificacoesTitulo:"Notifications", notificacoesDesc:"Receive alerts and reminders from SafeHer.",
    compartilharLocTitulo:"Share location in alerts", compartilharLocDesc:"Sends your location when you trigger the emergency alert.",
    idiomaTitulo:"Language", idiomaDesc:"Choose the app's language.",
    meusDadosTitulo:"My data", meusDadosDesc:"This prototype stores data only in this tab's memory — it disappears when you refresh the page.",
    limparDados:"Clear all data",
    toastDadosLimpos:"Local data cleared.",

    sobreTitulo:"About SafeHer",
    sobreTexto:"SafeHer is a prototype support app for women at risk or experiencing violence, bringing together an emergency button, a map of support points, a self-assessment test, a guidance chatbot and trusted-contact management in one place.",
    linhasNacionais:"National support lines (Brazil)",
    rodapeSobre:"Web demo version — data is stored only in memory, with no real messages sent or automatic calls made.",
  },

  es: {
    tagline: "Tu red de seguridad, siempre cerca.",
    loginTitulo: "Bienvenida de nuevo", loginSub: "Inicia sesión para acceder a tu red de apoyo",
    labelEmail: "Correo electrónico", labelSenha: "Contraseña",
    btnEntrar: "Iniciar sesión", btnCriarConta: "Crear cuenta",
    faixaLogin: "¿Estás en peligro ahora? Llama al {n190} o al {n180} de inmediato.",
    cadTitulo: "Crea tu cuenta", cadSub: "Toma menos de un minuto",
    labelNome: "Nombre", placeholderNome: "¿Cómo te llamamos?",
    placeholderSenha: "Crea una contraseña",
    btnCriarContinuar: "Crear cuenta y continuar", btnJaTenho: "Ya tengo una cuenta",
    toastDigiteEmail: "Escribe tu correo para iniciar sesión.",
    toastLoginOk: "Sesión iniciada. ¡Bienvenida a SafeHer!",
    toastPreencheNomeEmail: "Completa tu nombre y correo.",
    toastContaCriada: "¡Cuenta creada con éxito!",

    navInicio:"Inicio", navEmergencia:"Emergencia", navMapa:"Mapa de Apoyo", navTeste:"Test Interactivo",
    navChat:"Chatbot", navContatos:"Contactos", navPerfil:"Perfil", navConfig:"Configuración",
    navSobre:"Acerca de", navSair:"Cerrar sesión",

    boasVindasPadrao:"Bienvenida",
    inicioSaudacao:"Hola, {nome}",
    inicioSub:"Este es tu espacio seguro. ¿Qué necesitas ahora?",
    faixaInicio:"¿Emergencia ahora? Llama al {n190} (Policía) o al {n180} (Línea de Atención a la Mujer).",
    dicaTitulo:"Consejo de seguridad",
    dicaTexto:"Acuerda una palabra clave con alguien de confianza — si dices esa palabra en una llamada, esa persona sabrá que necesitas ayuda.",

    modAlertaTitulo:"Emergencia", modAlertaDesc:"Botón de emergencia con ubicación y aviso rápido a tus contactos.",
    modMapaTitulo:"Mapa de Apoyo", modMapaDesc:"Comisarías, hospitales y refugios más cercanos a ti.",
    modTesteTitulo:"Test Interactivo", modTesteDesc:"Entiende patrones de riesgo en una relación, con total confidencialidad.",
    modChatTitulo:"Chatbot de apoyo", modChatDesc:"Conversa, resuelve dudas y recibe orientación a cualquier hora.",
    modContatosTitulo:"Contactos de Emergencia", modContatosDesc:"Gestiona quién debe ser avisado en una emergencia.",
    modSobreTitulo:"Acerca de SafeHer", modSobreDesc:"Cómo funciona este espacio y las líneas de apoyo nacionales.",

    alertaAtivoBadge:"Alerta activa",
    avisandoContatos:"Avisando a tus contactos de confianza…",
    locCapturada:"Ubicación capturada y lista para enviar.",
    locFalhou:"No pudimos obtener tu ubicación — la alerta se enviará de todas formas.",
    contatosNotificadosTitulo:"Contactos notificados",
    semContatosCadastrados:"No hay contactos registrados.",
    badgeAvisado:"avisado",
    btnEstouSegura:"Estoy a salvo — cancelar alerta",
    botaoEmergenciaTitulo:"Botón de Emergencia",
    botaoEmergenciaDesc:"Al activarlo, SafeHer captura tu ubicación y prepara un mensaje de emergencia para todos tus contactos de confianza.",
    toqueParaAcionar:"Toca para activar la alerta",
    localizacaoTitulo:"Ubicación",
    localizacaoLigada:"Se enviará junto con la alerta.",
    localizacaoDesligada:"Compartir ubicación está desactivado en la configuración.",
    contatosQtd:"{n} contacto(s)",
    serãoAvisados:"Serán avisados automáticamente.",
    ultimoAlerta:"Última alerta enviada",
    faixaPerigoImediato:"Peligro inmediato: llama al {n190}. Este botón avisa a personas de confianza, no sustituye a la policía.",
    toastAlertaAcionado:"Tu alerta fue enviada. Las personas de tu confianza están siendo avisadas ahora mismo.",
    toastAlertaCancelado:"Alerta cancelada. Qué bueno que estás a salvo.",
    mensagemAlerta:"Necesito ayuda ahora. Esta es una alerta de SafeHer — ¿puedes llamarme en cuanto veas este mensaje?",
    mensagemAlertaLocal:"Necesito ayuda ahora. Esta es una alerta de SafeHer — ¿puedes llamarme en cuanto veas este mensaje? Mi ubicación: {link}",
    btnAvisarWhatsapp:"Avisar por WhatsApp",

    mapaIntro:"Encuentra rápidamente puntos de apoyo cerca de ti. Toca una categoría para abrir los lugares más cercanos en el mapa.",
    usarLocalizacao:"Usar mi ubicación actual",
    obtendoLocalizacao:"Obteniendo ubicación…",
    localObtida:"Ubicación obtenida — los enlaces del mapa ahora usarán tu posición actual.",
    localFalhaGenerica:"No pudimos obtener tu ubicación. Buscando de forma genérica.",
    geoNaoSuportada:"Geolocalización no compatible con este navegador.",
    abrirNoMapa:"Abrir en el mapa",
    linhasApoio:"Líneas de apoyo nacionales",
    ligar:"Llamar",

    testeIntro:"Responde con sinceridad — tus respuestas quedan solo en este dispositivo, nadie más las ve.",
    perguntaXdeY:"Pregunta {a} de {b}",
    opcaoSim:"Sí", opcaoNao:"No",
    resultadoTitulo:"Resultado",
    sinaisIdentificados:"{p} de {t} señales identificadas",
    nivelBaixo:"Atención baja", nivelModerado:"Atención moderada", nivelAlto:"Atención alta",
    textoBaixo:"Pocas señales identificadas. Sigue atenta a tu bienestar y confía en tu percepción.",
    textoModerado:"Existen señales de alerta que merecen atención. Considera hablar con alguien de confianza o un servicio especializado.",
    textoAlto:"Se identificaron varias señales asociadas a relaciones abusivas. No estás sola — buscar apoyo puede marcar la diferencia.",
    faixaTeste:"Este test es solo informativo, no es un diagnóstico. Para hablar con alguien, llama al {n180} (confidencial y gratuito).",
    refazerTeste:"Repetir test", conversarChatbot:"Hablar con el chatbot",

    chatPlaceholder:"Escribe algo…", chatEnviar:"Enviar",
    chipMedo:"Tengo miedo", chipDenunciar:"¿Cómo denunciar?", chipUrgente:"Ayuda urgente",
    avisoChat:"Este chatbot ofrece apoyo y orientación inicial, pero no sustituye la atención humana especializada.",
    chatMensagemInicial:"Hola, soy la asistente de SafeHer. Este espacio es tuyo, confidencial y sin juicios. ¿Cómo estás ahora?",

    contatosIntro:"Estas personas serán avisadas cuando actives la emergencia.",
    adicionar:"Agregar",
    semContatosCard:"Aún no tienes contactos registrados. Agrega a alguien de confianza para empezar.",
    modalNovoContato:"Nuevo contacto de confianza",
    labelTelefone:"Teléfono (con código de país y área, solo números)", placeholderTelefone:"Ej: 5511999998888",
    placeholderNomeContato:"Nombre del contacto",
    labelRelacao:"Relación",
    relFamilia:"Familia", relAmizade:"Amistad", relTrabalho:"Trabajo", relVizinhanca:"Vecindad", relOutro:"Otro",
    cancelar:"Cancelar", salvar:"Guardar",
    toastPreenchaNomeTelefone:"Completa nombre y teléfono.",
    toastContatoAdicionado:"Contacto agregado.",
    toastContatoRemovido:"Contacto eliminado.",
    mensagemWhatsappOi:"Hola, ¿todo bien? Solo para avisarte que estoy usando SafeHer.",

    semNome:"Sin nombre", labelCidade:"Ciudad", placeholderCidade:"Tu ciudad",
    salvarAlteracoes:"Guardar cambios", sairDaConta:"Cerrar sesión",
    toastPerfilAtualizado:"Perfil actualizado.",

    modoDiscretoTitulo:"Modo discreto", modoDiscretoDesc:"Le da a la app una apariencia neutra en la pantalla de inicio del celular.",
    modoEscuroTitulo:"Modo oscuro", modoEscuroDesc:"Cambia los colores de la app a un tema oscuro, más cómodo de noche.",
    notificacoesTitulo:"Notificaciones", notificacoesDesc:"Recibir avisos y recordatorios de SafeHer.",
    compartilharLocTitulo:"Compartir ubicación en alertas", compartilharLocDesc:"Envía tu ubicación al activar la emergencia.",
    idiomaTitulo:"Idioma", idiomaDesc:"Elige el idioma de la aplicación.",
    meusDadosTitulo:"Mis datos", meusDadosDesc:"Este prototipo guarda los datos solo en la memoria de esta pestaña — desaparecen al actualizar la página.",
    limparDados:"Borrar todos los datos",
    toastDadosLimpos:"Datos locales borrados.",

    sobreTitulo:"Acerca de SafeHer",
    sobreTexto:"SafeHer es un prototipo de aplicación de apoyo para mujeres en situación de riesgo o violencia, que reúne botón de emergencia, mapa de puntos de apoyo, test de autoevaluación, chatbot de orientación y gestión de contactos de confianza en un solo lugar.",
    linhasNacionais:"Líneas de apoyo nacionales (Brasil)",
    rodapeSobre:"Versión web de demostración — los datos se guardan solo en memoria, sin envío real de mensajes ni llamadas automáticas.",
  },
};

function t(chave, vars){
  let txt = (I18N[state.idioma] && I18N[state.idioma][chave]) || chave;
  if(vars){ for(const k in vars) txt = txt.replaceAll(`{${k}}`, vars[k]); }
  return txt;
}

/* ---------------------------------------------------------- dados por idioma */
const CONTATOS_UTEIS = {
  pt: [
    {nome:"Central de Atendimento à Mulher", numero:"180", desc:"Ligação gratuita 24h — orientação e denúncia de violência contra a mulher."},
    {nome:"Disque Direitos Humanos", numero:"100", desc:"Denúncias de violações de direitos humanos, 24h."},
    {nome:"Polícia Militar", numero:"190", desc:"Emergência policial imediata."},
    {nome:"CVV — Centro de Valorização da Vida", numero:"188", desc:"Apoio emocional e prevenção do suicídio, 24h, sigiloso."},
  ],
  en: [
    {nome:"Women's Support Hotline", numero:"180", desc:"Free 24h hotline — guidance and reporting of violence against women."},
    {nome:"Human Rights Hotline", numero:"100", desc:"Reports of human rights violations, 24h."},
    {nome:"Military Police", numero:"190", desc:"Immediate police emergency."},
    {nome:"CVV — Life Support Center", numero:"188", desc:"Emotional support and suicide prevention, 24h, confidential."},
  ],
  es: [
    {nome:"Línea de Atención a la Mujer", numero:"180", desc:"Línea gratuita 24h — orientación y denuncia de violencia contra la mujer."},
    {nome:"Línea de Derechos Humanos", numero:"100", desc:"Denuncias de violaciones de derechos humanos, 24h."},
    {nome:"Policía Militar", numero:"190", desc:"Emergencia policial inmediata."},
    {nome:"CVV — Centro de Valorización de la Vida", numero:"188", desc:"Apoyo emocional y prevención del suicidio, 24h, confidencial."},
  ],
};

const PERGUNTAS_TESTE = {
  pt: [
    "Seu(sua) parceiro(a) controla com quem você fala, sai ou se relaciona?",
    "Você já se sentiu com medo de discordar dele(a) por causa da reação que poderia ter?",
    "Ele(a) já te impediu de trabalhar, estudar ou administrar seu próprio dinheiro?",
    "Você já foi humilhada, xingada ou constrangida por ele(a), em público ou em particular?",
    "Ele(a) já ameaçou te machucar, se machucar, ou machucar alguém que você ama?",
    "Já houve empurrões, tapas, apertões ou qualquer contato físico agressivo?",
    "Você sente que precisa pedir permissão para decisões do seu dia a dia?",
    "Ele(a) já revisou seu celular, redes sociais ou mensagens sem sua autorização?",
    "Você já mudou de comportamento por medo da reação dele(a)?",
    "Você sente que está cada vez mais isolada de amigos e família?",
  ],
  en: [
    "Does your partner control who you talk to, go out with, or have relationships with?",
    "Have you ever been afraid to disagree with them because of how they might react?",
    "Have they ever stopped you from working, studying, or managing your own money?",
    "Have you been humiliated, insulted, or embarrassed by them, in public or in private?",
    "Have they ever threatened to hurt you, hurt themselves, or hurt someone you love?",
    "Has there been pushing, slapping, grabbing, or any aggressive physical contact?",
    "Do you feel like you need to ask permission for everyday decisions?",
    "Have they ever gone through your phone, social media, or messages without your permission?",
    "Have you changed your behavior out of fear of their reaction?",
    "Do you feel increasingly isolated from friends and family?",
  ],
  es: [
    "¿Tu pareja controla con quién hablas, sales o te relacionas?",
    "¿Alguna vez tuviste miedo de contradecirle por la reacción que podría tener?",
    "¿Alguna vez te impidió trabajar, estudiar o administrar tu propio dinero?",
    "¿Has sido humillada, insultada o avergonzada por él/ella, en público o en privado?",
    "¿Alguna vez amenazó con lastimarte, lastimarse a sí mismo/a, o lastimar a alguien que amas?",
    "¿Ha habido empujones, bofetadas, agarrones o cualquier contacto físico agresivo?",
    "¿Sientes que necesitas pedir permiso para decisiones de tu día a día?",
    "¿Alguna vez revisó tu celular, redes sociales o mensajes sin tu autorización?",
    "¿Has cambiado tu comportamiento por miedo a su reacción?",
    "¿Sientes que estás cada vez más aislada de amigos y familia?",
  ],
};

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

const LOCAIS_APOIO = {
  pt: [
    {tipo:"Delegacia da Mulher", busca:"delegacia da mulher"},
    {tipo:"Hospital / Pronto-socorro", busca:"hospital pronto socorro"},
    {tipo:"CRAS / Assistência Social", busca:"CRAS assistência social"},
    {tipo:"Casa abrigo", busca:"casa abrigo mulheres"},
    {tipo:"Defensoria Pública", busca:"defensoria publica"},
  ],
  en: [
    {tipo:"Women's Police Station", busca:"delegacia da mulher"},
    {tipo:"Hospital / Emergency room", busca:"hospital pronto socorro"},
    {tipo:"Social Assistance Center", busca:"CRAS assistência social"},
    {tipo:"Shelter house", busca:"casa abrigo mulheres"},
    {tipo:"Public Defender's Office", busca:"defensoria publica"},
  ],
  es: [
    {tipo:"Comisaría de la Mujer", busca:"delegacia da mulher"},
    {tipo:"Hospital / Sala de emergencias", busca:"hospital pronto socorro"},
    {tipo:"Centro de Asistencia Social", busca:"CRAS assistência social"},
    {tipo:"Casa de acogida", busca:"casa abrigo mulheres"},
    {tipo:"Defensoría Pública", busca:"defensoria publica"},
  ],
};

function uid(){ return Math.random().toString(36).slice(2,10); }
function agora(){
  const d = new Date();
  const locale = state.idioma==="en" ? "en-US" : state.idioma==="es" ? "es-ES" : "pt-BR";
  return d.toLocaleDateString(locale) + " " + d.toLocaleTimeString(locale,{hour:'2-digit',minute:'2-digit'});
}
function coresIniciais(nome){
  const paleta = ["#BD5B34","#6E7A52","#8C3E3E","#A67526","#4C7A4A","#9E4A29"];
  let h=0; for(const c of (nome||"?")) h += c.charCodeAt(0);
  return paleta[h % paleta.length];
}
function iniciais(nome){
  if(!nome) return "?";
  const p = nome.trim().split(" ");
  return (p[0][0] + (p[1] ? p[1][0] : "")).toUpperCase();
}

const state = {
  route: "#/splash",
  logado: false,
  idioma: "pt",
  usuario: {nome:"", email:"", cidade:"", corAvatar: coresIniciais("U")},
  contatos: [],
  alertas: [],
  chat: [],
  config: {modoDiscreto:false, notificacoes:true, compartilharLocalizacao:true, temaEscuro:false},
  localizacaoAtual: null,
  alertaAtivo: null,
};
state.chat = [{de:"bot", texto:t("chatMensagemInicial")}];

function toast(msg){
  const wrap = document.getElementById('toastWrap');
  const el = document.createElement('div');
  el.className = 'toast'; el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(()=>{ el.style.opacity='0'; el.style.transition='opacity .3s'; setTimeout(()=>el.remove(),300); }, 2600);
}

function ir(rota){ state.route = rota; location.hash = rota; render(); window.scrollTo(0,0); }
window.addEventListener('hashchange', ()=>{ state.route = location.hash || "#/splash"; render(); });

function aplicarTema(){
  document.documentElement.setAttribute('data-tema', state.config.temaEscuro ? 'escuro' : 'claro');
}
function alternarTema(){
  state.config.temaEscuro = !state.config.temaEscuro;
  aplicarTema();
  render();
}
function definirIdioma(codigo){
  state.idioma = codigo;
  render();
}

/* ---------------------------------------------------------------------- */
/* LAYOUT: navegação                                                       */
/* ---------------------------------------------------------------------- */
function itensNav(){
  return [
    {rota:"#/inicio", ic:"casa", nome:t("navInicio")},
    {rota:"#/alerther", ic:"alerta", nome:t("navEmergencia")},
    {rota:"#/mapa", ic:"mapa", nome:t("navMapa")},
    {rota:"#/teste", ic:"teste", nome:t("navTeste")},
    {rota:"#/chatbot", ic:"chat", nome:t("navChat")},
    {rota:"#/contatos", ic:"contatos", nome:t("navContatos")},
    {rota:"#/perfil", ic:"perfil", nome:t("navPerfil")},
    {rota:"#/config", ic:"config", nome:t("navConfig")},
    {rota:"#/sobre", ic:"info", nome:t("navSobre")},
  ];
}
const NAV_MOBILE = ["#/inicio","#/alerther","#/mapa","#/chatbot","#/perfil"];

function sidebar(){
  const itens = itensNav();
  return `
  <div class="sidebar">
    <div class="brand"><div class="marca">${ICONE.mao}</div><div class="nome">SafeHer</div></div>
    ${itens.map((it,idx)=>`
      ${idx===5 ? '<div class="nav-sep"></div>' : ''}
      <a class="nav-item ${state.route===it.rota?'ativo':''}" href="${it.rota}">${ICONE[it.ic]}${it.nome}</a>
    `).join("")}
    <div class="nav-foot">
      <button class="btn btn-outline btn-block btn-sm" onclick="sair()">${ICONE.sair}${t("navSair")}</button>
    </div>
  </div>`;
}
function topbar(titulo){
  return `<div class="topbar">
    <div class="marca-mini"><div class="marca">${ICONE.mao}</div><span class="h-corpo-forte">${titulo}</span></div>
    <a href="#/config">${ICONE.config}</a>
  </div>`;
}
function bottomnav(){
  const map = {"#/inicio":"casa","#/alerther":"alerta","#/mapa":"mapa","#/chatbot":"chat","#/perfil":"perfil"};
  const nomes = {"#/inicio":t("navInicio"),"#/alerther":t("navEmergencia"),"#/mapa":t("navMapa"),"#/chatbot":t("navChat"),"#/perfil":t("navPerfil")};
  return `<div class="bottomnav">
    ${NAV_MOBILE.map(r=>`<a class="bn-item ${state.route===r?'ativo':''}" href="${r}">${ICONE[map[r]]}${nomes[r]}</a>`).join("")}
  </div>`;
}
function fabPanico(){
  if(["#/splash","#/login","#/cadastro","#/alerther"].includes(state.route)) return "";
  return `<button class="fab-panico ${state.alertaAtivo?'pulsando':''}" onclick="ir('#/alerther')" title="${t("navEmergencia")}">${ICONE.alerta}</button>`;
}

/* ---------------------------------------------------------------------- */
/* RENDER PRINCIPAL                                                        */
/* ---------------------------------------------------------------------- */
function render(){
  const app = document.getElementById('app');
  if(!state.logado && !["#/splash","#/login","#/cadastro"].includes(state.route)){
    state.route = "#/login";
  }
  let conteudo = "";
  switch(state.route){
    case "#/splash": conteudo = telaSplash(); break;
    case "#/login": conteudo = telaLogin(); break;
    case "#/cadastro": conteudo = telaCadastro(); break;
    case "#/inicio": conteudo = telaInicio(); break;
    case "#/alerther": conteudo = telaAlerther(); break;
    case "#/mapa": conteudo = telaMapa(); break;
    case "#/teste": conteudo = telaTeste(); break;
    case "#/chatbot": conteudo = telaChatbot(); break;
    case "#/contatos": conteudo = telaContatos(); break;
    case "#/perfil": conteudo = telaPerfil(); break;
    case "#/config": conteudo = telaConfig(); break;
    case "#/sobre": conteudo = telaSobre(); break;
    default: conteudo = telaInicio();
  }
  if(["#/splash","#/login","#/cadastro"].includes(state.route)){
    app.innerHTML = `<div class="fade-in">${conteudo}</div>`;
  } else {
    app.innerHTML = `<div class="shell">
      ${sidebar()}
      <div class="main">
        ${topbar(tituloRota())}
        <div class="fade-in">${conteudo}</div>
      </div>
    </div>
    ${bottomnav()}
    ${fabPanico()}`;
  }
  posRender();
}
function tituloRota(){
  const f = itensNav().find(i=>i.rota===state.route);
  return f ? f.nome : "SafeHer";
}
function posRender(){
  const chatEl = document.getElementById('chatScroll');
  if(chatEl) chatEl.scrollTop = chatEl.scrollHeight;
}

/* ---------------------------------------------------------------------- */
/* TELA: SPLASH                                                            */
/* ---------------------------------------------------------------------- */
function telaSplash(){
  setTimeout(()=>{ if(state.route==="#/splash") ir(state.logado ? "#/inicio" : "#/login"); }, 1300);
  return `<div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;">
    <div class="marca" style="width:74px;height:74px;border-radius:18px;">${ICONE.mao}</div>
    <div class="h-display">SafeHer</div>
    <div class="h-corpo">${t("tagline")}</div>
  </div>`;
}

/* ---------------------------------------------------------------------- */
/* TELA: LOGIN / CADASTRO                                                  */
/* ---------------------------------------------------------------------- */
function telaLogin(){
  return `<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;">
    <div class="card" style="max-width:380px;width:100%;">
      <div style="text-align:center;margin-bottom:22px;">
        <div class="marca" style="width:52px;height:52px;border-radius:14px;margin:0 auto 14px;">${ICONE.mao}</div>
        <div class="h-titulo">${t("loginTitulo")}</div>
        <div class="h-legenda">${t("loginSub")}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:14px;">
        <div class="input-grp"><label>${t("labelEmail")}</label><input id="loginEmail" class="input-field" placeholder="voce@email.com" type="email"></div>
        <div class="input-grp"><label>${t("labelSenha")}</label><input id="loginSenha" class="input-field" placeholder="••••••••" type="password"></div>
        <button class="btn btn-primario btn-block" onclick="fazerLogin()">${t("btnEntrar")}</button>
        <button class="btn btn-outline btn-block" onclick="ir('#/cadastro')">${t("btnCriarConta")}</button>
      </div>
      <div class="faixa-emergencia" style="margin-top:20px;">${ICONE.aviso}<span>${t("faixaLogin",{n190:"<b>190</b>",n180:"<b>180</b>"})}</span></div>
    </div>
  </div>`;
}
function telaCadastro(){
  return `<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;">
    <div class="card" style="max-width:380px;width:100%;">
      <div style="margin-bottom:18px;">
        <div class="h-titulo">${t("cadTitulo")}</div>
        <div class="h-legenda">${t("cadSub")}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:14px;">
        <div class="input-grp"><label>${t("labelNome")}</label><input id="cadNome" class="input-field" placeholder="${t("placeholderNome")}"></div>
        <div class="input-grp"><label>${t("labelEmail")}</label><input id="cadEmail" class="input-field" placeholder="voce@email.com" type="email"></div>
        <div class="input-grp"><label>${t("labelSenha")}</label><input id="cadSenha" class="input-field" placeholder="${t("placeholderSenha")}" type="password"></div>
        <button class="btn btn-primario btn-block" onclick="fazerCadastro()">${t("btnCriarContinuar")}</button>
        <button class="btn btn-outline btn-block" onclick="ir('#/login')">${t("btnJaTenho")}</button>
      </div>
    </div>
  </div>`;
}
function fazerLogin(){
  const email = document.getElementById('loginEmail').value.trim();
  if(!email){ toast(t("toastDigiteEmail")); return; }
  state.usuario.email = email;
  if(!state.usuario.nome) state.usuario.nome = email.split("@")[0];
  state.usuario.corAvatar = coresIniciais(state.usuario.nome);
  state.logado = true;
  toast(t("toastLoginOk"));
  ir("#/inicio");
}
function fazerCadastro(){
  const nome = document.getElementById('cadNome').value.trim();
  const email = document.getElementById('cadEmail').value.trim();
  if(!nome || !email){ toast(t("toastPreencheNomeEmail")); return; }
  state.usuario.nome = nome; state.usuario.email = email;
  state.usuario.corAvatar = coresIniciais(nome);
  state.logado = true;
  toast(t("toastContaCriada"));
  ir("#/inicio");
}
function sair(){ state.logado = false; ir("#/login"); }

/* ---------------------------------------------------------------------- */
/* TELA: INÍCIO                                                            */
/* ---------------------------------------------------------------------- */
function telaInicio(){
  const nomeExib = state.usuario.nome || t("boasVindasPadrao");
  const modulos = [
    {rota:"#/alerther", ic:"alerta", titulo:t("modAlertaTitulo"), desc:t("modAlertaDesc")},
    {rota:"#/mapa", ic:"mapa", titulo:t("modMapaTitulo"), desc:t("modMapaDesc")},
    {rota:"#/teste", ic:"teste", titulo:t("modTesteTitulo"), desc:t("modTesteDesc")},
    {rota:"#/chatbot", ic:"chat", titulo:t("modChatTitulo"), desc:t("modChatDesc")},
    {rota:"#/contatos", ic:"contatos", titulo:t("modContatosTitulo"), desc:t("modContatosDesc")},
    {rota:"#/sobre", ic:"info", titulo:t("modSobreTitulo"), desc:t("modSobreDesc")},
  ];
  return `
  <div style="display:flex;flex-direction:column;gap:22px;">
    <div>
      <div class="h-titulo">${t("inicioSaudacao",{nome:nomeExib.split(" ")[0]})}</div>
      <div class="h-corpo">${t("inicioSub")}</div>
    </div>

    <div class="faixa-emergencia">${ICONE.aviso}<span>${t("faixaInicio",{n190:"<b>190</b>",n180:"<b>180</b>"})}</span></div>

    <div class="grid grid-3">
      ${modulos.map(m=>`
        <a href="${m.rota}" class="modulo-card fade-in">
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

/* ---------------------------------------------------------------------- */
/* TELA: EMERGÊNCIA (botão de alerta)                                      */
/* ---------------------------------------------------------------------- */
function telaAlerther(){
  if(state.alertaAtivo){
    return `
    <div style="display:flex;flex-direction:column;align-items:center;gap:22px;text-align:center;padding:20px 0;">
      <span class="badge badge-erro">${t("alertaAtivoBadge")}</span>
      <div style="width:150px;height:150px;border-radius:50%;background:var(--vinho-fraco);display:flex;align-items:center;justify-content:center;">
        <div style="width:100px;height:100px;border-radius:50%;background:var(--vinho);display:flex;align-items:center;justify-content:center;" class="fab-panico pulsando">
          <span style="width:34px;height:34px;">${ICONE.alerta}</span>
        </div>
      </div>
      <div class="h-sub">${t("avisandoContatos")}</div>
      <div class="h-corpo" style="max-width:420px;">${state.localizacaoAtual ? t("locCapturada") : t("locFalhou")}</div>
      <div class="card" style="width:100%;max-width:440px;text-align:left;">
        <div class="h-legenda" style="margin-bottom:8px;">${t("contatosNotificadosTitulo")}</div>
        ${state.contatos.map(c=>`
          <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--borda);">
            <span class="h-corpo">${c.nome}</span>
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="badge badge-sucesso">${t("badgeAvisado")}</span>
              <a class="btn btn-outline btn-sm" href="${linkWhatsapp(c.telefone, mensagemAlertaTexto())}" target="_blank">${ICONE.mensagem}</a>
            </div>
          </div>`).join("") || `<div class="h-legenda">${t("semContatosCadastrados")}</div>`}
      </div>
      <button class="btn btn-secundario" style="min-width:220px;" onclick="cancelarAlerta()">${t("btnEstouSegura")}</button>
    </div>`;
  }
  return `
  <div style="display:flex;flex-direction:column;align-items:center;gap:20px;text-align:center;padding:16px 0 30px;">
    <div class="h-titulo">${t("botaoEmergenciaTitulo")}</div>
    <div class="h-corpo" style="max-width:440px;">${t("botaoEmergenciaDesc")}</div>
    <button class="fab-panico" style="position:static;width:132px;height:132px;" onclick="dispararAlerta()">
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

    <div class="faixa-emergencia" style="max-width:560px;">${ICONE.telefone}<span>${t("faixaPerigoImediato",{n190:"<b>190</b>"})}</span></div>
  </div>`;
}
function mensagemAlertaTexto(){
  if(state.localizacaoAtual){
    const link = `https://www.google.com/maps?q=${state.localizacaoAtual.lat},${state.localizacaoAtual.lng}`;
    return t("mensagemAlertaLocal",{link});
  }
  return t("mensagemAlerta");
}
function dispararAlerta(){
  const alerta = {id:uid(), dataHora:agora(), contatosNotificados: state.contatos.map(c=>c.id)};
  state.alertaAtivo = alerta;
  if(navigator.geolocation && state.config.compartilharLocalizacao){
    navigator.geolocation.getCurrentPosition(
      pos=>{ state.localizacaoAtual = {lat:pos.coords.latitude, lng:pos.coords.longitude}; if(state.route==="#/alerther") render(); },
      ()=>{ state.localizacaoAtual = null; if(state.route==="#/alerther") render(); },
      {timeout:6000}
    );
  }
  state.alertas.push(alerta);
  render();
  toast(t("toastAlertaAcionado"));
}
function cancelarAlerta(){
  state.alertaAtivo = null;
  render();
  toast(t("toastAlertaCancelado"));
}
function linkWhatsapp(telefone, msg){
  return `https://wa.me/${telefone}?text=${encodeURIComponent(msg)}`;
}

/* ---------------------------------------------------------------------- */
/* TELA: MAPA DE APOIO                                                     */
/* ---------------------------------------------------------------------- */
function telaMapa(){
  const locais = LOCAIS_APOIO[state.idioma];
  const contatos = CONTATOS_UTEIS[state.idioma];
  return `
  <div style="display:flex;flex-direction:column;gap:18px;">
    <div class="h-corpo">${t("mapaIntro")}</div>
    <button class="btn btn-secundario" onclick="obterLocalizacaoMapa()">${ICONE.local}${t("usarLocalizacao")}</button>
    <div id="locMapaStatus" class="h-legenda"></div>
    <div class="grid grid-2">
      ${locais.map(l=>`
        <div class="card card-hover" style="display:flex;flex-direction:column;gap:10px;">
          <div class="h-corpo-forte">${l.tipo}</div>
          <button class="btn btn-outline btn-sm" onclick="abrirMapa('${l.busca}')">${ICONE.seta}${t("abrirNoMapa")}</button>
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
function obterLocalizacaoMapa(){
  const st = document.getElementById('locMapaStatus');
  if(!navigator.geolocation){ st.textContent=t("geoNaoSuportada"); return; }
  st.textContent = t("obtendoLocalizacao");
  navigator.geolocation.getCurrentPosition(
    pos=>{ state.localizacaoAtual = {lat:pos.coords.latitude, lng:pos.coords.longitude}; st.textContent = t("localObtida"); },
    ()=>{ st.textContent = t("localFalhaGenerica"); },
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

/* ---------------------------------------------------------------------- */
/* TELA: TESTE INTERATIVO                                                  */
/* ---------------------------------------------------------------------- */
const testeState = {passo:0, respostas:{}, finalizado:false};
function telaTeste(){
  const perguntas = PERGUNTAS_TESTE[state.idioma];
  if(testeState.finalizado){
    const pontos = Object.values(testeState.respostas).filter(r=>r==="sim").length;
    let nivel, cor, texto;
    if(pontos <= 2){ nivel=t("nivelBaixo"); cor="badge-sucesso"; texto=t("textoBaixo"); }
    else if(pontos <= 5){ nivel=t("nivelModerado"); cor="badge-aviso"; texto=t("textoModerado"); }
    else { nivel=t("nivelAlto"); cor="badge-erro"; texto=t("textoAlto"); }
    return `
    <div style="display:flex;flex-direction:column;gap:18px;max-width:560px;">
      <div class="card" style="text-align:center;">
        <div class="h-legenda">${t("resultadoTitulo")}</div>
        <div class="h-titulo" style="margin:6px 0;">${t("sinaisIdentificados",{p:pontos,t:perguntas.length})}</div>
        <span class="badge ${cor}">${nivel}</span>
        <div class="h-corpo" style="margin-top:14px;">${texto}</div>
      </div>
      <div class="faixa-emergencia">${ICONE.mensagem}<span>${t("faixaTeste",{n180:"<b>180</b>"})}</span></div>
      <div style="display:flex;gap:12px;">
        <button class="btn btn-secundario" style="flex:1;" onclick="reiniciarTeste()">${t("refazerTeste")}</button>
        <button class="btn btn-primario" style="flex:1;" onclick="ir('#/chatbot')">${t("conversarChatbot")}</button>
      </div>
    </div>`;
  }
  const p = perguntas[testeState.passo];
  const progresso = Math.round((testeState.passo/perguntas.length)*100);
  return `
  <div style="display:flex;flex-direction:column;gap:18px;max-width:560px;">
    <div class="h-corpo">${t("testeIntro")}</div>
    <div class="progress-bar"><div style="width:${progresso}%;"></div></div>
    <div class="h-legenda">${t("perguntaXdeY",{a:testeState.passo+1,b:perguntas.length})}</div>
    <div class="card">
      <div class="h-sub">${p}</div>
      <div style="display:flex;gap:12px;margin-top:20px;">
        <button class="opcao-sn nao" onclick="responderTeste(false)">${t("opcaoNao")}</button>
        <button class="opcao-sn sim" onclick="responderTeste(true)">${t("opcaoSim")}</button>
      </div>
    </div>
  </div>`;
}
function responderTeste(sim){
  testeState.respostas[testeState.passo] = sim ? "sim" : "nao";
  const total = PERGUNTAS_TESTE[state.idioma].length;
  if(testeState.passo < total-1){
    testeState.passo++;
  } else {
    testeState.finalizado = true;
  }
  render();
}
function reiniciarTeste(){ testeState.passo=0; testeState.respostas={}; testeState.finalizado=false; render(); }

/* ---------------------------------------------------------------------- */
/* TELA: CHATBOT                                                           */
/* ---------------------------------------------------------------------- */
function telaChatbot(){
  return `
  <div style="display:flex;flex-direction:column;gap:14px;max-width:640px;">
    <div class="card">
      <div id="chatScroll" class="chat-scroll">
        ${state.chat.map(m=>`<div class="bolha ${m.de==='bot'?'bot':'user'}">${m.texto}</div>`).join("")}
      </div>
      <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
        <div class="chip" onclick="enviarMsgRapida('${t("chipMedo")}')">${t("chipMedo")}</div>
        <div class="chip" onclick="enviarMsgRapida('${t("chipDenunciar")}')">${t("chipDenunciar")}</div>
        <div class="chip" onclick="enviarMsgRapida('${t("chipUrgente")}')">${t("chipUrgente")}</div>
      </div>
      <div style="display:flex;gap:10px;margin-top:14px;">
        <input id="chatInput" class="input-field" placeholder="${t("chatPlaceholder")}" onkeydown="if(event.key==='Enter') enviarMsg();">
        <button class="btn btn-primario" onclick="enviarMsg()">${t("chatEnviar")}</button>
      </div>
    </div>
    <div class="h-legenda">${t("avisoChat")}</div>
  </div>`;
}
function enviarMsgRapida(txt){ document.getElementById('chatInput').value = txt; enviarMsg(); }
function enviarMsg(){
  const input = document.getElementById('chatInput');
  const texto = input.value.trim();
  if(!texto) return;
  state.chat.push({de:"user", texto});
  const textoLower = texto.toLowerCase();
  let resposta = RESPOSTA_PADRAO_BOT[state.idioma];
  for(const fluxo of FLUXO_CHATBOT[state.idioma]){
    if(fluxo.chaves.some(ch=>textoLower.includes(ch))){ resposta = fluxo.resposta; break; }
  }
  render();
  setTimeout(()=>{
    state.chat.push({de:"bot", texto:resposta});
    render();
  }, 500);
}

/* ---------------------------------------------------------------------- */
/* TELA: CONTATOS DE EMERGÊNCIA                                            */
/* ---------------------------------------------------------------------- */
function telaContatos(){
  return `
  <div style="display:flex;flex-direction:column;gap:16px;max-width:640px;">
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <div class="h-corpo">${t("contatosIntro")}</div>
      <button class="btn btn-primario btn-sm" onclick="abrirModalContato()">${ICONE.mais}${t("adicionar")}</button>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px;">
      ${state.contatos.map(c=>`
        <div class="contato-row">
          <div class="avatar" style="background:${coresIniciais(c.nome)};">${iniciais(c.nome)}</div>
          <div style="flex:1;">
            <div class="h-corpo-forte" style="font-size:14.5px;">${c.nome}</div>
            <div class="h-legenda">${c.parentesco} · ${c.telefone}</div>
          </div>
          <a class="btn btn-outline btn-sm" href="tel:${c.telefone}">${ICONE.telefone}</a>
          <a class="btn btn-outline btn-sm" href="${linkWhatsapp(c.telefone,t("mensagemWhatsappOi"))}" target="_blank">${ICONE.mensagem}</a>
          <button class="btn btn-outline btn-sm" onclick="removerContato('${c.id}')">${ICONE.lixo}</button>
        </div>
      `).join("") || `<div class="card h-legenda">${t("semContatosCard")}</div>`}
    </div>
  </div>`;
}
function abrirModalContato(){
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'modalContato';
  overlay.innerHTML = `
    <div class="modal">
      <div class="h-sub" style="margin-bottom:16px;">${t("modalNovoContato")}</div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div class="input-grp"><label>${t("labelNome")}</label><input id="ctNome" class="input-field" placeholder="${t("placeholderNomeContato")}"></div>
        <div class="input-grp"><label>${t("labelTelefone")}</label><input id="ctTelefone" class="input-field" placeholder="${t("placeholderTelefone")}"></div>
        <div class="input-grp"><label>${t("labelRelacao")}</label>
          <select id="ctRelacao" class="input-field">
            <option>${t("relFamilia")}</option><option>${t("relAmizade")}</option><option>${t("relTrabalho")}</option><option>${t("relVizinhanca")}</option><option>${t("relOutro")}</option>
          </select>
        </div>
      </div>
      <div style="display:flex;gap:10px;margin-top:20px;">
        <button class="btn btn-outline" style="flex:1;" onclick="fecharModal()">${t("cancelar")}</button>
        <button class="btn btn-primario" style="flex:1;" onclick="salvarContato()">${t("salvar")}</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
}
function fecharModal(){ const m=document.getElementById('modalContato'); if(m) m.remove(); }
function salvarContato(){
  const nome = document.getElementById('ctNome').value.trim();
  const telefone = document.getElementById('ctTelefone').value.trim().replace(/\D/g,"");
  const parentesco = document.getElementById('ctRelacao').value;
  if(!nome || !telefone){ toast(t("toastPreenchaNomeTelefone")); return; }
  state.contatos.push({id:uid(), nome, telefone, parentesco});
  fecharModal(); render();
  toast(t("toastContatoAdicionado"));
}
function removerContato(id){
  state.contatos = state.contatos.filter(c=>c.id!==id);
  render();
  toast(t("toastContatoRemovido"));
}

/* ---------------------------------------------------------------------- */
/* TELA: PERFIL                                                            */
/* ---------------------------------------------------------------------- */
function telaPerfil(){
  return `
  <div style="max-width:480px;display:flex;flex-direction:column;gap:18px;">
    <div class="card" style="display:flex;align-items:center;gap:16px;">
      <div class="avatar" style="width:60px;height:60px;font-size:20px;background:${state.usuario.corAvatar};">${iniciais(state.usuario.nome)}</div>
      <div><div class="h-sub">${state.usuario.nome || t("semNome")}</div><div class="h-legenda">${state.usuario.email || "-"}</div></div>
    </div>
    <div class="card" style="display:flex;flex-direction:column;gap:14px;">
      <div class="input-grp"><label>${t("labelNome")}</label><input id="perfNome" class="input-field" value="${state.usuario.nome}"></div>
      <div class="input-grp"><label>${t("labelEmail")}</label><input id="perfEmail" class="input-field" value="${state.usuario.email}"></div>
      <div class="input-grp"><label>${t("labelCidade")}</label><input id="perfCidade" class="input-field" value="${state.usuario.cidade||''}" placeholder="${t("placeholderCidade")}"></div>
      <button class="btn btn-primario btn-block" onclick="salvarPerfil()">${t("salvarAlteracoes")}</button>
    </div>
    <button class="btn btn-outline btn-block" onclick="sair()">${t("sairDaConta")}</button>
  </div>`;
}
function salvarPerfil(){
  state.usuario.nome = document.getElementById('perfNome').value.trim() || state.usuario.nome;
  state.usuario.email = document.getElementById('perfEmail').value.trim() || state.usuario.email;
  state.usuario.cidade = document.getElementById('perfCidade').value.trim();
  state.usuario.corAvatar = coresIniciais(state.usuario.nome);
  render();
  toast(t("toastPerfilAtualizado"));
}

/* ---------------------------------------------------------------------- */
/* TELA: CONFIGURAÇÕES                                                     */
/* ---------------------------------------------------------------------- */
function telaConfig(){
  return `
  <div style="max-width:480px;display:flex;flex-direction:column;gap:14px;">
    <div class="card">
      <div class="h-corpo-forte" style="margin-bottom:10px;">${t("idiomaTitulo")}</div>
      <div class="h-legenda" style="margin-bottom:12px;">${t("idiomaDesc")}</div>
      <div style="display:flex;gap:8px;">
        ${IDIOMAS.map(l=>`<button class="btn ${state.idioma===l.codigo?'btn-primario':'btn-outline'} btn-sm" style="flex:1;" onclick="definirIdioma('${l.codigo}')">${l.rotulo}</button>`).join("")}
      </div>
    </div>
    <div class="card" style="display:flex;justify-content:space-between;align-items:center;">
      <div><div class="h-corpo-forte">${t("modoEscuroTitulo")}</div><div class="h-legenda">${t("modoEscuroDesc")}</div></div>
      <div class="switch ${state.config.temaEscuro?'on':''}" onclick="alternarTema()"><div class="knob"></div></div>
    </div>
    <div class="card" style="display:flex;justify-content:space-between;align-items:center;">
      <div><div class="h-corpo-forte">${t("modoDiscretoTitulo")}</div><div class="h-legenda">${t("modoDiscretoDesc")}</div></div>
      <div class="switch ${state.config.modoDiscreto?'on':''}" onclick="toggleConfig('modoDiscreto')"><div class="knob"></div></div>
    </div>
    <div class="card" style="display:flex;justify-content:space-between;align-items:center;">
      <div><div class="h-corpo-forte">${t("notificacoesTitulo")}</div><div class="h-legenda">${t("notificacoesDesc")}</div></div>
      <div class="switch ${state.config.notificacoes?'on':''}" onclick="toggleConfig('notificacoes')"><div class="knob"></div></div>
    </div>
    <div class="card" style="display:flex;justify-content:space-between;align-items:center;">
      <div><div class="h-corpo-forte">${t("compartilharLocTitulo")}</div><div class="h-legenda">${t("compartilharLocDesc")}</div></div>
      <div class="switch ${state.config.compartilharLocalizacao?'on':''}" onclick="toggleConfig('compartilharLocalizacao')"><div class="knob"></div></div>
    </div>
    <div class="card">
      <div class="h-corpo-forte" style="margin-bottom:8px;">${t("meusDadosTitulo")}</div>
      <div class="h-legenda" style="margin-bottom:12px;">${t("meusDadosDesc")}</div>
      <button class="btn btn-outline btn-block" onclick="limparDados()">${t("limparDados")}</button>
    </div>
  </div>`;
}
function toggleConfig(chave){ state.config[chave] = !state.config[chave]; render(); }
function limparDados(){
  state.alertas = [];
  state.contatos = [];
  state.chat = [{de:"bot", texto:t("chatMensagemInicial")}];
  render();
  toast(t("toastDadosLimpos"));
}

/* ---------------------------------------------------------------------- */
/* TELA: SOBRE                                                             */
/* ---------------------------------------------------------------------- */
function telaSobre(){
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
    <div class="h-legenda">${t("rodapeSobre")}</div>
  </div>`;
}

/* ---------------------------------------------------------------------- */
/* BOOT                                                                    */
/* ---------------------------------------------------------------------- */
aplicarTema();
state.route = location.hash || "#/splash";
render();