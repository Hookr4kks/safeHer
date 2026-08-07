/* ==========================================================================
   SafeHer — página CONTATOS DE EMERGÊNCIA
   ========================================================================== */
import {
  ICONE, state, criarTradutor, montarShell, atualizarConteudo, iniciarPagina,
  toast, uid, coresIniciais, iniciais, linkWhatsapp, escapeHtml, salvarContatosNuvem,
} from "../../layout.js";

const I18N_PAGINA = {
  pt: {
    contatosIntro:"Essas pessoas serão avisadas quando você acionar a emergência.",
    adicionar:"Adicionar",
    semContatosCard:"Você ainda não tem contatos cadastrados. Adicione alguém de confiança para começar.",
    modalNovoContato:"Novo contato de confiança",
    labelNome:"Nome",
    labelTelefone:"Telefone (com DDI+DDD, só números)", placeholderTelefone:"Ex: 5511999998888",
    placeholderNomeContato:"Nome do contato",
    labelRelacao:"Relação",
    relFamilia:"Família", relAmizade:"Amizade", relTrabalho:"Trabalho", relVizinhanca:"Vizinhança", relOutro:"Outro",
    cancelar:"Cancelar", salvar:"Salvar",
    toastPreenchaNomeTelefone:"Preencha nome e telefone.",
    toastTelefoneInvalido:"Telefone inválido. Inclua DDI e DDD, só números (ex: 5511999998888).",
    toastContatoAdicionado:"Contato adicionado.",
    toastContatoRemovido:"Contato removido.",
    mensagemWhatsappOi:"Oi, tudo bem? Só passando pra avisar que estou usando o SafeHer.",
  },
  en: {
    contatosIntro:"These people will be notified when you trigger the emergency alert.",
    adicionar:"Add",
    semContatosCard:"You don't have any contacts yet. Add someone you trust to get started.",
    modalNovoContato:"New trusted contact",
    labelNome:"Name",
    labelTelefone:"Phone (with country + area code, numbers only)", placeholderTelefone:"e.g. 5511999998888",
    placeholderNomeContato:"Contact's name",
    labelRelacao:"Relationship",
    relFamilia:"Family", relAmizade:"Friendship", relTrabalho:"Work", relVizinhanca:"Neighborhood", relOutro:"Other",
    cancelar:"Cancel", salvar:"Save",
    toastPreenchaNomeTelefone:"Fill in name and phone.",
    toastTelefoneInvalido:"Invalid phone number. Include country and area code, numbers only (e.g. 5511999998888).",
    toastContatoAdicionado:"Contact added.",
    toastContatoRemovido:"Contact removed.",
    mensagemWhatsappOi:"Hi, how are you? Just letting you know I'm using SafeHer.",
  },
  es: {
    contatosIntro:"Estas personas serán avisadas cuando actives la emergencia.",
    adicionar:"Agregar",
    semContatosCard:"Aún no tienes contactos registrados. Agrega a alguien de confianza para empezar.",
    modalNovoContato:"Nuevo contacto de confianza",
    labelNome:"Nombre",
    labelTelefone:"Teléfono (con código de país y área, solo números)", placeholderTelefone:"Ej: 5511999998888",
    placeholderNomeContato:"Nombre del contacto",
    labelRelacao:"Relación",
    relFamilia:"Familia", relAmizade:"Amistad", relTrabalho:"Trabajo", relVizinhanca:"Vecindad", relOutro:"Otro",
    cancelar:"Cancelar", salvar:"Guardar",
    toastPreenchaNomeTelefone:"Completa nombre y teléfono.",
    toastTelefoneInvalido:"Teléfono inválido. Incluye código de país y área, solo números (ej: 5511999998888).",
    toastContatoAdicionado:"Contacto agregado.",
    toastContatoRemovido:"Contacto eliminado.",
    mensagemWhatsappOi:"Hola, ¿todo bien? Solo para avisarte que estoy usando SafeHer.",
  },
};
const t = criarTradutor(I18N_PAGINA);

function conteudoHtml(){
  return `
  <div style="display:flex;flex-direction:column;gap:16px;max-width:640px;">
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <div class="h-corpo">${t("contatosIntro")}</div>
      <button class="btn btn-primario btn-sm" onclick="window.__contatosAbrirModal()">${ICONE.mais}${t("adicionar")}</button>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px;">
      ${state.contatos.map(c=>`
        <div class="contato-row">
          <div class="avatar" style="background:${coresIniciais(c.nome)};">${iniciais(c.nome)}</div>
          <div style="flex:1;">
            <div class="h-corpo-forte" style="font-size:14.5px;">${escapeHtml(c.nome)}</div>
            <div class="h-legenda">${escapeHtml(c.parentesco)} · ${escapeHtml(c.telefone)}</div>
          </div>
          <a class="btn btn-outline btn-sm" href="tel:${c.telefone}">${ICONE.telefone}</a>
          <a class="btn btn-outline btn-sm" href="${linkWhatsapp(c.telefone,t("mensagemWhatsappOi"))}" target="_blank">${ICONE.mensagem}</a>
          <button class="btn btn-outline btn-sm" onclick="window.__contatosRemover('${c.id}')">${ICONE.lixo}</button>
        </div>
      `).join("") || `<div class="card h-legenda">${t("semContatosCard")}</div>`}
    </div>
  </div>`;
}

function render(){ montarShell("contatos", t("navContatos"), conteudoHtml()); }
function atualizar(){ atualizarConteudo(conteudoHtml()); }

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
        <button class="btn btn-outline" style="flex:1;" onclick="window.__contatosFecharModal()">${t("cancelar")}</button>
        <button class="btn btn-primario" style="flex:1;" onclick="window.__contatosSalvar()">${t("salvar")}</button>
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
  if(telefone.length < 10){ toast(t("toastTelefoneInvalido")); return; }
  state.contatos.push({id:uid(), nome, telefone, parentesco});
  fecharModal();
  atualizar();
  salvarContatosNuvem();
  toast(t("toastContatoAdicionado"));
}
function removerContato(id){
  state.contatos = state.contatos.filter(c=>c.id!==id);
  atualizar();
  salvarContatosNuvem();
  toast(t("toastContatoRemovido"));
}
window.__contatosAbrirModal = abrirModalContato;
window.__contatosFecharModal = fecharModal;
window.__contatosSalvar = salvarContato;
window.__contatosRemover = removerContato;

iniciarPagina("contatos", { aoAutenticado: render, aoAtualizarContatos: atualizar });
