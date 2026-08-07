/* ==========================================================================
   SafeHer — página LOGIN
   ========================================================================== */
import {
  auth, googleProvider, signInWithEmailAndPassword, signInWithPopup,
  criarTradutor, toast, montarSemShell, iniciarPagina, escapeHtml, suprimirRedirecionamento,
} from "../../layout.js";

const I18N_PAGINA = {
  pt: {
    loginTitulo: "Bem-vinda de volta", loginSub: "Entre para acessar sua rede de apoio",
    labelEmail: "E-mail", labelSenha: "Senha",
    btnEntrar: "Entrar", btnCriarConta: "Criar conta",
    btnEntrarGoogle: "Continuar com Google",
    faixaLogin: "Em perigo agora? Ligue {n190} ou {n180} imediatamente.",
    toastDigiteEmail: "Digite seu e-mail para entrar.",
    toastDigiteSenha: "Digite sua senha para entrar.",
    toastLoginOk: "Login realizado. Bem-vinda ao SafeHer!",
    toastLoginErro: "E-mail ou senha invalidos. Confira os dados e tente novamente.",
    toastLoginGoogleErro: "Nao foi possivel entrar com Google. Confira se o provedor esta ativado no Firebase.",
  },
  en: {
    loginTitulo: "Welcome back", loginSub: "Sign in to access your support network",
    labelEmail: "Email", labelSenha: "Password",
    btnEntrar: "Sign in", btnCriarConta: "Create account",
    btnEntrarGoogle: "Continue with Google",
    faixaLogin: "In danger right now? Call {n190} or {n180} immediately.",
    toastDigiteEmail: "Enter your email to sign in.",
    toastDigiteSenha: "Enter your password to sign in.",
    toastLoginOk: "Signed in. Welcome to SafeHer!",
    toastLoginErro: "Invalid email or password. Check your details and try again.",
    toastLoginGoogleErro: "Could not sign in with Google. Check if the provider is enabled in Firebase.",
  },
  es: {
    loginTitulo: "Bienvenida de nuevo", loginSub: "Inicia sesión para acceder a tu red de apoyo",
    labelEmail: "Correo electrónico", labelSenha: "Contraseña",
    btnEntrar: "Iniciar sesión", btnCriarConta: "Crear cuenta",
    btnEntrarGoogle: "Continuar con Google",
    faixaLogin: "¿Estás en peligro ahora? Llama al {n190} o al {n180} de inmediato.",
    toastDigiteEmail: "Escribe tu correo para iniciar sesión.",
    toastDigiteSenha: "Escribe tu contraseña para iniciar sesión.",
    toastLoginOk: "Sesión iniciada. ¡Bienvenida a SafeHer!",
    toastLoginErro: "Correo o contraseña invalidos. Revisa los datos e intentalo otra vez.",
    toastLoginGoogleErro: "No fue posible entrar con Google. Revisa si el proveedor esta activado en Firebase.",
  },
};
const t = criarTradutor(I18N_PAGINA);

function render(){
  montarSemShell(`
  <div class="tela-login">
    <div class="card">
      <div class="cabecalho">
        <div class="marca"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.2 13.6c1.4-1.1 3-1.1 4.1-.1l1.7 1.6"/><path d="M9 15.1V8.4a1.05 1.05 0 012.1 0v4.4"/><path d="M11.1 12.8V7.4a1.05 1.05 0 012.1 0v5.2"/><path d="M13.2 12.6V8.2a1.05 1.05 0 012.1 0v5"/><path d="M15.3 13.2V9.6a1 1 0 012 0v5c0 3-2.2 5.4-5.1 5.4h-1.3c-1.4 0-2.7-.5-3.6-1.5l-3.4-3.6"/></svg></div>
        <div class="h-titulo">${t("loginTitulo")}</div>
        <div class="h-legenda">${t("loginSub")}</div>
      </div>
      <div class="campos">
        <div class="input-grp"><label>${t("labelEmail")}</label><input id="loginEmail" class="input-field" placeholder="voce@email.com" type="email"></div>
        <div class="input-grp"><label>${t("labelSenha")}</label><input id="loginSenha" class="input-field" placeholder="••••••••" type="password"></div>
        <button class="btn btn-google btn-block" id="btnGoogle"><span class="google-mark">G</span>${t("btnEntrarGoogle")}</button>
        <button class="btn btn-primario btn-block" id="btnEntrar">${t("btnEntrar")}</button>
        <button class="btn btn-outline btn-block" id="btnIrCadastro">${t("btnCriarConta")}</button>
      </div>
      <div class="faixa-emergencia" style="margin-top:20px;">${t("faixaLogin",{n190:"<b>190</b>",n180:"<b>180</b>"})}</div>
    </div>
  </div>`);

  document.getElementById('btnEntrar').onclick = fazerLogin;
  document.getElementById('btnGoogle').onclick = entrarComGoogle;
  document.getElementById('btnIrCadastro').onclick = ()=>{ location.href = "../cadastro/cadastro.html"; };
  document.getElementById('loginSenha').addEventListener('keydown', (e)=>{ if(e.key==='Enter') fazerLogin(); });
}

async function fazerLogin(){
  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginSenha').value;
  if(!email){ toast(t("toastDigiteEmail")); return; }
  if(!senha){ toast(t("toastDigiteSenha")); return; }
  /* Ver explicação em suprimirRedirecionamento (layout.js) e cadastro.js:
     sem isso o toast de sucesso pode ser cortado pelo redirecionamento
     automático disparado assim que o Firebase autentica o usuário. */
  suprimirRedirecionamento(true);
  try{
    await signInWithEmailAndPassword(auth, email, senha);
    toast(t("toastLoginOk"));
    setTimeout(()=>{ location.href = "../inicio/inicio.html"; }, 900);
  }catch(erro){
    suprimirRedirecionamento(false);
    console.error("Erro no login com e-mail e senha:", erro);
    toast(t("toastLoginErro"));
  }
}
async function entrarComGoogle(){
  suprimirRedirecionamento(true);
  try{
    await signInWithPopup(auth, googleProvider);
    toast(t("toastLoginOk"));
    setTimeout(()=>{ location.href = "../inicio/inicio.html"; }, 900);
  }catch(erro){
    suprimirRedirecionamento(false);
    console.error("Erro no login com Google:", erro);
    toast(t("toastLoginGoogleErro"));
  }
}

render();
iniciarPagina("login", {});
