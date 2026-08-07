/* ==========================================================================
   SafeHer — página CADASTRO
   ========================================================================== */
import {
  auth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail,
  sendEmailVerification, updateProfile,
  criarTradutor, toast, montarSemShell, iniciarPagina, suprimirRedirecionamento,
} from "../../layout.js";

const I18N_PAGINA = {
  pt: {
    cadTitulo: "Criar sua conta", cadSub: "Leva menos de um minuto",
    labelNome: "Nome", placeholderNome: "Como podemos te chamar?",
    labelEmail: "E-mail", labelSenha: "Senha", placeholderSenha: "Crie uma senha",
    btnCriarContinuar: "Criar conta e continuar", btnJaTenho: "Já tenho conta",
    toastPreencheNomeEmail: "Preencha nome, e-mail e senha.",
    toastSenhaCurta: "A senha precisa ter pelo menos 6 caracteres.",
    toastContaCriada: "Conta criada com sucesso! Enviamos um e-mail de verificação para você.",
    toastCadastroErro: "Nao foi possivel criar a conta. Confira os dados ou tente outro e-mail.",
    toastEmailJaCadastrado: "Este e-mail já tem uma conta. Faça login ou use outro e-mail.",
  },
  en: {
    cadTitulo: "Create your account", cadSub: "Takes less than a minute",
    labelNome: "Name", placeholderNome: "What should we call you?",
    labelEmail: "Email", labelSenha: "Password", placeholderSenha: "Create a password",
    btnCriarContinuar: "Create account and continue", btnJaTenho: "I already have an account",
    toastPreencheNomeEmail: "Fill in your name, email and password.",
    toastSenhaCurta: "Password must be at least 6 characters.",
    toastContaCriada: "Account created successfully! We've sent you a verification email.",
    toastCadastroErro: "Could not create the account. Check your details or try another email.",
    toastEmailJaCadastrado: "This email already has an account. Sign in or use another email.",
  },
  es: {
    cadTitulo: "Crea tu cuenta", cadSub: "Toma menos de un minuto",
    labelNome: "Nombre", placeholderNome: "¿Cómo te llamamos?",
    labelEmail: "Correo electrónico", labelSenha: "Contraseña", placeholderSenha: "Crea una contraseña",
    btnCriarContinuar: "Crear cuenta y continuar", btnJaTenho: "Ya tengo una cuenta",
    toastPreencheNomeEmail: "Completa tu nombre, correo y contraseña.",
    toastSenhaCurta: "La contraseña debe tener al menos 6 caracteres.",
    toastContaCriada: "¡Cuenta creada con éxito! Te enviamos un correo de verificación.",
    toastCadastroErro: "No fue posible crear la cuenta. Revisa los datos o prueba otro correo.",
    toastEmailJaCadastrado: "Este correo ya tiene una cuenta. Inicia sesión o usa otro correo.",
  },
};
const t = criarTradutor(I18N_PAGINA);

function render(){
  montarSemShell(`
  <div class="tela-login">
    <div class="card">
      <div style="margin-bottom:18px;">
        <div class="h-titulo">${t("cadTitulo")}</div>
        <div class="h-legenda">${t("cadSub")}</div>
      </div>
      <div class="campos">
        <div class="input-grp"><label>${t("labelNome")}</label><input id="cadNome" class="input-field" placeholder="${t("placeholderNome")}"></div>
        <div class="input-grp"><label>${t("labelEmail")}</label><input id="cadEmail" class="input-field" placeholder="voce@email.com" type="email"></div>
        <div class="input-grp"><label>${t("labelSenha")}</label><input id="cadSenha" class="input-field" placeholder="${t("placeholderSenha")}" type="password"></div>
        <button class="btn btn-primario btn-block" id="btnCriar">${t("btnCriarContinuar")}</button>
        <button class="btn btn-outline btn-block" id="btnIrLogin">${t("btnJaTenho")}</button>
      </div>
    </div>
  </div>`);
  document.getElementById('btnCriar').onclick = fazerCadastro;
  document.getElementById('btnIrLogin').onclick = ()=>{ location.href = "../login/login.html"; };
}

async function fazerCadastro(){
  const nome = document.getElementById('cadNome').value.trim();
  const email = document.getElementById('cadEmail').value.trim();
  const senha = document.getElementById('cadSenha').value;
  if(!nome || !email || !senha){ toast(t("toastPreencheNomeEmail")); return; }
  if(senha.length < 6){ toast(t("toastSenhaCurta")); return; }

  try{
    const metodosExistentes = await fetchSignInMethodsForEmail(auth, email);
    if(metodosExistentes.length > 0){ toast(t("toastEmailJaCadastrado")); return; }
  }catch(erro){
    console.error("Erro ao verificar e-mail existente:", erro);
  }

  /* Segura o redirecionamento automático de páginas públicas (ver layout.js)
     enquanto terminamos updateProfile + sendEmailVerification + o toast de
     sucesso — senão o Firebase autentica o usuário assim que
     createUserWithEmailAndPassword resolve e a navegação corta o resto no meio. */
  suprimirRedirecionamento(true);
  try{
    const credencial = await createUserWithEmailAndPassword(auth, email, senha);
    await updateProfile(credencial.user, { displayName: nome });
    try{ await sendEmailVerification(credencial.user); }
    catch(erroVerif){ console.error("Erro ao enviar e-mail de verificação:", erroVerif); }
    toast(t("toastContaCriada"));
    setTimeout(()=>{ location.href = "../inicio/inicio.html"; }, 1400);
  }catch(erro){
    suprimirRedirecionamento(false);
    console.error("Erro no cadastro com e-mail e senha:", erro);
    if(erro && erro.code === "auth/email-already-in-use"){ toast(t("toastEmailJaCadastrado")); }
    else{ toast(t("toastCadastroErro")); }
  }
}

render();
iniciarPagina("cadastro", {});
