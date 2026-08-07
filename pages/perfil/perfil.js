/* ==========================================================================
   SafeHer — página PERFIL
   ========================================================================== */
import {
  state, criarTradutor, montarShell, atualizarConteudo, iniciarPagina, toast,
  coresIniciais, iniciais, escapeHtml, sair,
  auth, updateProfile, doc, setDoc, db, sendEmailVerification,
} from "../../layout.js";

const I18N_PAGINA = {
  pt: {
    semNome:"Sem nome", labelNome:"Nome", labelEmail:"E-mail", labelCidade:"Cidade", placeholderCidade:"Sua cidade",
    salvarAlteracoes:"Salvar alterações", sairDaConta:"Sair da conta",
    toastPerfilAtualizado:"Perfil atualizado.",
    toastSyncErro:"Não foi possível sincronizar seus dados agora. Verifique sua conexão.",
    avisoEmailNaoVerificado:"Seu e-mail ainda não foi verificado. Verifique sua caixa de entrada para manter sua conta segura.",
    btnReenviarVerificacao:"Reenviar e-mail de verificação",
    toastVerificacaoReenviada:"E-mail de verificação reenviado.",
  },
  en: {
    semNome:"No name", labelNome:"Name", labelEmail:"Email", labelCidade:"City", placeholderCidade:"Your city",
    salvarAlteracoes:"Save changes", sairDaConta:"Sign out",
    toastPerfilAtualizado:"Profile updated.",
    toastSyncErro:"We couldn't sync your data right now. Check your connection.",
    avisoEmailNaoVerificado:"Your email hasn't been verified yet. Check your inbox to keep your account secure.",
    btnReenviarVerificacao:"Resend verification email",
    toastVerificacaoReenviada:"Verification email resent.",
  },
  es: {
    semNome:"Sin nombre", labelNome:"Nombre", labelEmail:"Correo electrónico", labelCidade:"Ciudad", placeholderCidade:"Tu ciudad",
    salvarAlteracoes:"Guardar cambios", sairDaConta:"Cerrar sesión",
    toastPerfilAtualizado:"Perfil actualizado.",
    toastSyncErro:"No pudimos sincronizar tus datos ahora. Revisa tu conexión.",
    avisoEmailNaoVerificado:"Tu correo aún no ha sido verificado. Revisa tu bandeja de entrada para mantener tu cuenta segura.",
    btnReenviarVerificacao:"Reenviar correo de verificación",
    toastVerificacaoReenviada:"Correo de verificación reenviado.",
  },
};
const t = criarTradutor(I18N_PAGINA);

function conteudoHtml(){
  return `
  <div style="max-width:480px;display:flex;flex-direction:column;gap:18px;">
    <div class="card" style="display:flex;align-items:center;gap:16px;">
      <div class="avatar" style="width:60px;height:60px;font-size:20px;background:${state.usuario.corAvatar};">${iniciais(state.usuario.nome)}</div>
      <div><div class="h-sub">${escapeHtml(state.usuario.nome || t("semNome"))}</div><div class="h-legenda">${escapeHtml(state.usuario.email || "-")}</div></div>
    </div>
    ${!state.usuario.emailVerificado ? `
    <div class="faixa-emergencia" style="border-color:var(--aviso);background:var(--aviso-fraco);">
      <span style="display:flex;flex-direction:column;gap:10px;">
        ${t("avisoEmailNaoVerificado")}
        <button class="btn btn-secundario btn-sm" style="align-self:flex-start;" onclick="window.__perfilReenviarVerificacao()">${t("btnReenviarVerificacao")}</button>
      </span>
    </div>` : ``}
    <div class="card" style="display:flex;flex-direction:column;gap:14px;">
      <div class="input-grp"><label>${t("labelNome")}</label><input id="perfNome" class="input-field" value="${escapeHtml(state.usuario.nome)}"></div>
      <div class="input-grp"><label>${t("labelEmail")}</label><input id="perfEmail" class="input-field" value="${escapeHtml(state.usuario.email)}" disabled></div>
      <div class="input-grp"><label>${t("labelCidade")}</label><input id="perfCidade" class="input-field" value="${escapeHtml(state.usuario.cidade||'')}" placeholder="${t("placeholderCidade")}"></div>
      <button class="btn btn-primario btn-block" onclick="window.__perfilSalvar()">${t("salvarAlteracoes")}</button>
    </div>
    <button class="btn btn-outline btn-block" onclick="window.__safeherSair()">${t("sairDaConta")}</button>
  </div>`;
}

function render(){ montarShell("perfil", t("navPerfil"), conteudoHtml()); }
function atualizar(){ atualizarConteudo(conteudoHtml()); }

async function salvarPerfil(){
  const novoNome = document.getElementById('perfNome').value.trim() || state.usuario.nome;
  const novaCidade = document.getElementById('perfCidade').value.trim();
  state.usuario.nome = novoNome;
  state.usuario.cidade = novaCidade;
  state.usuario.corAvatar = coresIniciais(novoNome);
  atualizar();
  try{
    if(auth.currentUser){
      await updateProfile(auth.currentUser, { displayName: novoNome });
      await setDoc(doc(db, "usuarios", auth.currentUser.uid), { perfil: { nome: novoNome, cidade: novaCidade } }, { merge:true });
    }
    toast(t("toastPerfilAtualizado"));
  }catch(erro){
    console.error("Erro ao salvar perfil:", erro);
    toast(t("toastSyncErro"));
  }
}
async function reenviarVerificacao(){
  if(!auth.currentUser) return;
  try{
    await sendEmailVerification(auth.currentUser);
    toast(t("toastVerificacaoReenviada"));
  }catch(erro){
    console.error("Erro ao reenviar verificação de e-mail:", erro);
  }
}
window.__perfilSalvar = salvarPerfil;
window.__perfilReenviarVerificacao = reenviarVerificacao;

iniciarPagina("perfil", { aoAutenticado: render });
