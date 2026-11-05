import { useState } from 'react';
import { supabase } from './lib/supabase.js';

const sideItems = [{ label: 'Início', icon: '⌂' }, { label: 'Cadastros', icon: '＋' }, { label: 'Relatórios', icon: '▤' }];
const bottomItems = [{ label: 'Painel', icon: '▦' }, { label: 'Atalhos', icon: '⌘' }, { label: 'Perfil', icon: '◉' }];

export default function App() {
  const [nome, setNome] = useState('');
  const [active, setActive] = useState('Início');
  const [feedback, setFeedback] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const value = nome.trim();
    if (!value) return setFeedback('Digite um nome antes de salvar.');
    if (!supabase) return setFeedback('Supabase ainda não configurado. Configure as variáveis de ambiente.');

    setSaving(true);
    setFeedback('');
    const { error } = await supabase.from('nomes_teste').insert({ nome: value });
    setSaving(false);
    if (error) return setFeedback(`Não foi possível salvar: ${error.message}`);
    setNome('');
    setFeedback('Nome salvo com sucesso no Supabase!');
  }

  function navigate(label) {
    setActive(label);
    setFeedback(`${label}: navegação demonstrativa (mock).`);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" onClick={() => navigate('Início')}>
          <span className="brand-mark">OC</span><span>Oficina <strong>Conexão</strong></span>
        </a>
        <div className="topbar-right">
          <span className="environment"><i /> Ambiente de teste</span>
          <div className="avatar" aria-label="Perfil do usuário">A</div>
        </div>
      </header>

      <div className="workspace">
        <aside className="sidebar" aria-label="Menu lateral">
          <div className="sidebar-caption">MENU PRINCIPAL</div>
          <nav>
            {sideItems.map(item => <button key={item.label} className={active === item.label ? 'nav-item active' : 'nav-item'} onClick={() => navigate(item.label)}><span className="nav-icon">{item.icon}</span>{item.label}</button>)}
          </nav>
          <div className="sidebar-note"><span className="note-icon">✦</span><strong>Área de testes</strong><p>Uma estrutura simples para validar a navegação e a conexão com o banco.</p></div>
          <div className="sidebar-bottom">APP OFICINA CONEXÃO · v0.1</div>
        </aside>

        <main className="main-content" id="inicio">
          <div className="page-heading">
            <div><div className="eyebrow">ÁREA DE TRABALHO / {active.toUpperCase()}</div><h1>Olá! Vamos começar.</h1><p>Este é um ambiente simples para testar o cadastro e a integração.</p></div>
            <span className="status-pill"><i /> Projeto de teste</span>
          </div>

          <section className="form-card" aria-labelledby="form-title">
            <div className="card-topline"><span className="step-number">01</span><span>CADASTRO SIMPLES</span></div>
            <h2 id="form-title">Informe seu nome</h2>
            <p className="card-description">Digite um nome no campo abaixo para testar a gravação no banco de dados.</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="nome">Nome</label>
              <input id="nome" name="nome" type="text" placeholder="Ex.: Maria da Silva" value={nome} onChange={event => setNome(event.target.value)} maxLength={120} autoComplete="name" />
              <button className="submit-button" type="submit" disabled={saving}>{saving ? 'Salvando...' : 'Salvar nome'} <span aria-hidden="true">→</span></button>
            </form>
            {feedback && <p className="feedback" role="status">{feedback}</p>}
          </section>
          <div className="helper-line"><span>⌁</span> Seus dados serão enviados ao Supabase quando a conexão estiver configurada.</div>
        </main>
      </div>

      <footer className="bottom-nav" aria-label="Menu inferior">
        {bottomItems.map(item => <button key={item.label} className={active === item.label ? 'bottom-item active' : 'bottom-item'} onClick={() => navigate(item.label)}><span>{item.icon}</span>{item.label}</button>)}
      </footer>
    </div>
  );
}
