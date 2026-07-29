// ==================== CONFIGURAÇÃO DO SUPABASE ====================
const SUPABASE_URL = 'https://djeosnwexfhqaslavync.supabase.co';
const SUPABASE_KEY = 'sb_publishable_gDnjGmCo6qZKL0QpVtVuQA_s46ZwjoI';

const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// ==================== AUTHENTICATION & LOGIN GOOGLE ====================
async function logarComGoogle() {
  if (!supabaseClient) {
    alert("Supabase não foi carregado corretamente!");
    return;
  }
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + window.location.pathname
    }
  });
  if (error) console.error("Erro ao fazer login:", error.message);
}

async function deslogar() {
  if (!supabaseClient) return;
  await supabaseClient.auth.signOut();
  atualizarInterfaceUsuario(null);
}

function atualizarInterfaceUsuario(user) {
  const statusDeslogado = document.getElementById('status-deslogado');
  const statusLogado = document.getElementById('status-logado');
  const userAvatar = document.getElementById('user-avatar');
  const userNome = document.getElementById('user-nome');
  const userEmail = document.getElementById('user-email');

  if (user) {
    if (statusDeslogado) statusDeslogado.classList.add('escondido');
    if (statusLogado) statusLogado.classList.remove('escondido');

    const meta = user.user_metadata || {};
    if (userAvatar) userAvatar.src = meta.avatar_url || 'https://via.placeholder.com/38';
    if (userNome) userNome.textContent = meta.full_name || meta.name || 'Usuário';
    if (userEmail) userEmail.textContent = user.email || '';
  } else {
    if (statusDeslogado) statusDeslogado.classList.remove('escondido');
    if (statusLogado) statusLogado.classList.add('escondido');
  }
}

async function checarSessaoUsuario() {
  if (!supabaseClient) return;
  const { data: { user } } = await supabaseClient.auth.getUser();
  atualizarInterfaceUsuario(user);
}

// ==================== SALVAR FREQUÊNCIA NO SUPABASE ====================
async function salvarFrequencia(opcao) {
  console.log("Selecionado:", opcao);

  if (!supabaseClient) {
    console.warn("Cliente do Supabase não inicializado.");
    return;
  }

  try {
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      console.warn("Usuário não está logado no Supabase. Frequência salva apenas localmente.");
      return;
    }

    // Grava a opção do botão na tabela 'usuarios' ou 'configuracoes'
    const { data, error } = await supabaseClient
      .from('usuarios')
      .upsert({
        id: user.id,
        frequencia_treino: opcao,
        updated_at: new Date()
      });

    if (error) {
      console.error("❌ Erro ao salvar frequência no Supabase:", error.message);
    } else {
      console.log("✅ Frequência salva no Supabase com sucesso!", data);
    }
  } catch (err) {
    console.error("❌ Erro inesperado ao salvar frequência:", err);
  }
}

// ==================== 1. BANCO DE DADOS DE TREINOS PRONTOS ====================
const treinosBase = {
  3: {
    "Segunda-Feira (Push)": [
      { id: 1, exercicio: "Supino Reto c/ Barra", carga: 30, reps: 10 },
      { id: 2, exercicio: "Supino Inclinado c/ Halteres", carga: 18, reps: 10 },
      { id: 3, exercicio: "Desenvolvimento c/ Halteres", carga: 14, reps: 10 },
      { id: 4, exercicio: "Elevação Lateral", carga: 8, reps: 12 },
      { id: 5, exercicio: "Tríceps Pulley Corda", carga: 15, reps: 12 },
      { id: 6, exercicio: "Tríceps Testa", carga: 10, reps: 10 }
    ],
    "Quarta-Feira (Pull)": [
      { id: 7, exercicio: "Puxada Frontal Aberta", carga: 40, reps: 10 },
      { id: 8, exercicio: "Remada Curvada c/ Barra", carga: 25, reps: 10 },
      { id: 9, exercicio: "Remada Baixa Triângulo", carga: 35, reps: 12 },
      { id: 10, exercicio: "Crucifixo Invertido Máquina", carga: 20, reps: 12 },
      { id: 11, exercicio: "Rosca Direta c/ Barra W", carga: 12, reps: 10 },
      { id: 12, exercicio: "Rosca Martelo", carga: 10, reps: 12 }
    ],
    "Sexta-Feira (Legs)": [
      { id: 13, exercicio: "Agachamento Livre", carga: 40, reps: 10 },
      { id: 14, exercicio: "Leg Press 45°", carga: 100, reps: 12 },
      { id: 15, exercicio: "Cadeira Extensora", carga: 30, reps: 12 },
      { id: 16, exercicio: "Mesa Flexora", carga: 25, reps: 12 },
      { id: 17, exercicio: "Panturrilha em Pé", carga: 50, reps: 15 }
    ]
  },
  4: {
    "Segunda-Feira (Upper A)": [
      { id: 1, exercicio: "Supino Reto c/ Barra", carga: 30, reps: 10 },
      { id: 2, exercicio: "Puxada Frontal Aberta", carga: 40, reps: 10 },
      { id: 3, exercicio: "Desenvolvimento c/ Halteres", carga: 14, reps: 10 },
      { id: 4, exercicio: "Remada Curvada c/ Barra", carga: 25, reps: 10 },
      { id: 5, exercicio: "Tríceps Pulley Corda", carga: 20, reps: 12 },
      { id: 6, exercicio: "Rosca Direta c/ Barra W", carga: 12, reps: 12 }
    ],
    "Terça-Feira (Lower A)": [
      { id: 7, exercicio: "Agachamento Livre", carga: 40, reps: 10 },
      { id: 8, exercicio: "Leg Press 45°", carga: 100, reps: 12 },
      { id: 9, exercicio: "Cadeira Extensora", carga: 30, reps: 12 },
      { id: 10, exercicio: "Stiff c/ Barra", carga: 20, reps: 10 },
      { id: 11, exercicio: "Panturrilha em Pé", carga: 40, reps: 15 }
    ],
    "Quinta-Feira (Upper B)": [
      { id: 12, exercicio: "Supino Inclinado c/ Halteres", carga: 18, reps: 10 },
      { id: 13, exercicio: "Remada Baixa Triângulo", carga: 35, reps: 10 },
      { id: 14, exercicio: "Elevação Lateral", carga: 8, reps: 12 },
      { id: 15, exercicio: "Crucifixo Reto", carga: 12, reps: 12 },
      { id: 16, exercicio: "Tríceps Testa", carga: 10, reps: 10 },
      { id: 17, exercicio: "Rosca Martelo", carga: 10, reps: 12 }
    ],
    "Sexta-Feira (Lower B)": [
      { id: 18, exercicio: "Leg Press 45°", carga: 120, reps: 10 },
      { id: 19, exercicio: "Afundo c/ Halteres", carga: 12, reps: 10 },
      { id: 20, exercicio: "Mesa Flexora", carga: 25, reps: 12 },
      { id: 21, exercicio: "Cadeira Extensora", carga: 35, reps: 12 },
      { id: 22, exercicio: "Panturrilha em Pé", carga: 30, reps: 15 }
    ]
  },
  5: {
    "Segunda-Feira (Peito)": [
      { id: 1, exercicio: "Supino Reto c/ Barra", carga: 30, reps: 10 },
      { id: 2, exercicio: "Supino Inclinado c/ Halteres", carga: 18, reps: 10 },
      { id: 3, exercicio: "Crucifixo Reto", carga: 12, reps: 12 },
      { id: 4, exercicio: "Crossover no Cabo", carga: 15, reps: 12 },
      { id: 5, exercicio: "Flexão de Braço", carga: 0, reps: 15 }
    ],
    "Terça-Feira (Costas)": [
      { id: 6, exercicio: "Puxada Frontal Aberta", carga: 40, reps: 10 },
      { id: 7, exercicio: "Remada Curvada c/ Barra", carga: 25, reps: 10 },
      { id: 8, exercicio: "Remada Baixa Triângulo", carga: 35, reps: 12 },
      { id: 9, exercicio: "Pulloff no Cabo", carga: 20, reps: 12 },
      { id: 10, exercicio: "Encolhimento c/ Halteres", carga: 24, reps: 15 }
    ],
    "Quarta-Feira (Pernas)": [
      { id: 11, exercicio: "Agachamento Livre", carga: 40, reps: 10 },
      { id: 12, exercicio: "Leg Press 45°", carga: 100, reps: 12 },
      { id: 13, exercicio: "Cadeira Extensora", carga: 30, reps: 12 },
      { id: 14, exercicio: "Mesa Flexora", carga: 25, reps: 12 },
      { id: 15, exercicio: "Stiff c/ Barra", carga: 20, reps: 10 },
      { id: 16, exercicio: "Panturrilha em Pé", carga: 40, reps: 15 }
    ],
    "Quinta-Feira (Ombros)": [
      { id: 17, exercicio: "Desenvolvimento c/ Halteres", carga: 14, reps: 10 },
      { id: 18, exercicio: "Elevação Lateral", carga: 8, reps: 12 },
      { id: 19, exercicio: "Elevação Frontal", carga: 8, reps: 12 },
      { id: 20, exercicio: "Crucifixo Invertido Máquina", carga: 20, reps: 12 }
    ],
    "Sexta-Feira (Braços)": [
      { id: 21, exercicio: "Rosca Direta c/ Barra W", carga: 12, reps: 10 },
      { id: 22, exercicio: "Tríceps Pulley Corda", carga: 18, reps: 10 },
      { id: 23, exercicio: "Rosca Alternada", carga: 10, reps: 10 },
      { id: 24, exercicio: "Tríceps Testa", carga: 10, reps: 10 },
      { id: 25, exercicio: "Rosca Martelo", carga: 10, reps: 12 },
      { id: 26, exercicio: "Tríceps Francês", carga: 12, reps: 12 }
    ]
  }
};

const bancoSugestoes = {
  peito: ["Supino Reto c/ Barra", "Supino Inclinado c/ Halteres", "Supino Declinado", "Crucifixo Reto", "Crossover no Cabo", "Flexão de Braço"],
  costas: ["Puxada Frontal Aberta", "Remada Curvada c/ Barra", "Remada Baixa Triângulo", "Pulloff no Cabo", "Encolhimento c/ Halteres", "Remada Cavalinho"],
  pernas: ["Agachamento Livre", "Leg Press 45°", "Cadeira Extensora", "Mesa Flexora", "Stiff c/ Barra", "Panturrilha em Pé", "Afundo c/ Halteres"],
  ombros: ["Desenvolvimento c/ Halteres", "Elevação Lateral", "Elevação Frontal", "Crucifixo Invertido Máquina", "Desenvolvimento Arnold"],
  biceps: ["Rosca Direta c/ Barra W", "Rosca Martelo", "Rosca Alternada", "Rosca Scott", "Rosca Concentrada"],
  triceps: ["Tríceps Pulley Corda", "Tríceps Testa", "Tríceps Francês", "Tríceps Coice", "Mergulho no Banco"]
};

function obterGrupoMuscular(nomeExercicio) {
  const nome = nomeExercicio.toLowerCase();
  if (nome.includes("supino") || nome.includes("crucifixo reto") || nome.includes("crossover") || nome.includes("flexão")) return "peito";
  if (nome.includes("puxada") || nome.includes("remada") || nome.includes("pulloff") || nome.includes("encolhimento")) return "costas";
  if (nome.includes("agachamento") || nome.includes("leg press") || nome.includes("extensora") || nome.includes("flexora") || nome.includes("stiff") || nome.includes("panturrilha") || nome.includes("afundo")) return "pernas";
  if (nome.includes("desenvolvimento") || nome.includes("elevação") || nome.includes("invertido")) return "ombros";
  if (nome.includes("rosca")) return "biceps";
  if (nome.includes("tríceps") || nome.includes("mergulho")) return "triceps";
  return null;
}

const todosExercicios = Object.values(bancoSugestoes).flat();

function getHojeISO() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatarDataBR(dataISO) {
  if (!dataISO) return '';
  const partes = dataISO.split('-');
  if (partes.length < 3) return dataISO;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// ==================== 2. ESTADO DA APLICAÇÃO ====================
let planoAtual = {};
try {
  planoAtual = JSON.parse(localStorage.getItem('devfit_plano')) || {};
} catch(e) {
  planoAtual = {};
}
let diaAtivo = localStorage.getItem('devfit_dia_ativo') || "";
let idEditando = null;

function obterConcluidosHoje() {
  const hoje = getHojeISO();
  const registro = JSON.parse(localStorage.getItem('devfit_concluidos_diarios')) || {};
  return registro[hoje] || [];
}

function salvarConcluidoHoje(nomeExercicio, isConcluido) {
  const hoje = getHojeISO();
  const registro = JSON.parse(localStorage.getItem('devfit_concluidos_diarios')) || {};
  let listaHoje = registro[hoje] || [];

  if (isConcluido) {
    if (!listaHoje.includes(nomeExercicio)) listaHoje.push(nomeExercicio);
  } else {
    listaHoje = listaHoje.filter(ex => ex !== nomeExercicio);
  }

  registro[hoje] = listaHoje;
  localStorage.setItem('devfit_concluidos_diarios', JSON.stringify(registro));
}

// ==================== 3. NAVEGAÇÃO DE ABAS ====================
function trocarAba(nomeAba) {
  const abas = document.querySelectorAll('.aba-conteudo');
  abas.forEach(aba => aba.style.display = 'none');

  const botoes = document.querySelectorAll('.nav-btn');
  botoes.forEach(btn => btn.classList.remove('active'));

  const abaSelecionada = document.getElementById(`aba-${nomeAba}`);
  if (abaSelecionada) {
    abaSelecionada.style.display = 'block';
  }

  const btnAtivo = document.getElementById(`btn-${nomeAba}`);
  if (btnAtivo) {
    btnAtivo.classList.add('active');
  }

  if (nomeAba === 'evolucao') {
    carregarOpcoesExercicios();
    atualizarEExibirPRs();
    atualizarGrafico();
  } else if (nomeAba === 'historico') {
    renderizarCalendario();
  }
}

// ==================== 4. RENDERIZAR TELA E DIA ====================
function renderizarTelas() {
  const setup = document.getElementById('setup-treino');
  const painel = document.getElementById('painel-principal');
  const diasDisponiveis = Object.keys(planoAtual);

  if (diasDisponiveis.length === 0) {
    if (setup) setup.classList.remove('escondido');
    if (painel) painel.classList.add('escondido');
  } else {
    if (setup) setup.classList.add('escondido');
    if (painel) painel.classList.remove('escondido');

    if (!diaAtivo || !planoAtual[diaAtivo]) {
      diaAtivo = diasDisponiveis[0];
    }

    renderizarAbas();
    renderizarExerciciosDoDia();
    configurarAutocompleteInputForm();
  }
}

function renderizarAbas() {
  const containerAbas = document.getElementById('abas-dias');
  if (!containerAbas) return;
  containerAbas.innerHTML = '';

  Object.keys(planoAtual).forEach(dia => {
    const btn = document.createElement('button');
    btn.className = `aba-btn ${dia === diaAtivo ? 'ativa' : ''}`;
    btn.innerText = dia;
    btn.onclick = () => {
      diaAtivo = dia;
      idEditando = null;
      localStorage.setItem('devfit_dia_ativo', diaAtivo);
      renderizarAbas();
      renderizarExerciciosDoDia();
    };
    containerAbas.appendChild(btn);
  });
}

function renderizarExerciciosDoDia() {
  const containerConteudo = document.getElementById('conteudo-dia');
  if (!containerConteudo) return;
  containerConteudo.innerHTML = '';

  const lista = planoAtual[diaAtivo] || [];
  const concluidosHoje = obterConcluidosHoje();

  atualizarBarraProgresso(lista, concluidosHoje);

  if (lista.length === 0) {
    containerConteudo.innerHTML = `<p style="color:#888; text-align:center; padding: 20px;">Nenhum exercício cadastrado para este dia.</p>`;
    return;
  }

  lista.forEach((item, index) => {
    const isConcluido = concluidosHoje.includes(item.exercicio);
    const card = document.createElement('div');
    card.className = `item-exercicio ${isConcluido ? 'concluido' : ''}`;

    if (idEditando === index) {
      const grupo = obterGrupoMuscular(item.exercicio);
      const listaFiltrada = grupo ? bancoSugestoes[grupo] : todosExercicios;
      const opcoesDatalist = listaFiltrada.map(ex => `<option value="${ex}">`).join('');

      card.classList.add('modo-edicao');
      card.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
          <label style="font-size: 0.75rem; color: #007acc;">Trocar por outro de ${grupo ? grupo.toUpperCase() : 'mesmo grupo'}:</label>
          <input type="text" id="edit-nome-${index}" list="lista-grupo-${index}" value="${item.exercicio}" placeholder="Digite para filtrar..." style="padding: 8px; border-radius: 6px; border: 1px solid #007acc; background: #1e1e1e; color: #fff; outline: none;">
          
          <datalist id="lista-grupo-${index}">
            ${opcoesDatalist}
          </datalist>

          <div style="display: flex; gap: 8px;">
            <div style="flex: 1;">
              <label style="font-size: 0.75rem; color: #aaa;">Carga (kg):</label>
              <input type="number" id="edit-carga-${index}" value="${item.carga}" style="width: 100%; padding: 6px; border-radius: 6px; border: 1px solid #333; background: #1e1e1e; color: #fff;">
            </div>
            <div style="flex: 1;">
              <label style="font-size: 0.75rem; color: #aaa;">Reps:</label>
              <input type="number" id="edit-reps-${index}" value="${item.reps}" style="width: 100%; padding: 6px; border-radius: 6px; border: 1px solid #333; background: #1e1e1e; color: #fff;">
            </div>
          </div>

          <div style="display: flex; gap: 6px; margin-top: 6px;">
            <button onclick="salvarEdicao(${index})" style="background: #10b981; color: #fff; border:none; padding: 8px 12px; border-radius: 6px; cursor:pointer; font-weight:600;">💾 Salvar</button>
            <button onclick="cancelarEdicao()" style="background: #444; color: #fff; border:none; padding: 8px 12px; border-radius: 6px; cursor:pointer;">Cancelar</button>
          </div>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <input type="checkbox" ${isConcluido ? 'checked' : ''} onchange="toggleConcluido(${index})" style="width: 20px; height: 20px; cursor: pointer; accent-color: #10b981;">
          <div class="info" style="${isConcluido ? 'opacity: 0.5; text-decoration: line-through;' : ''}">
            <h4>${item.exercicio}</h4>
            <p>🏋️ <strong>${item.carga} kg</strong> | 🔄 <strong>${item.reps} reps</strong></p>
          </div>
        </div>
        <div class="acoes-exercicio">
          <button onclick="ativarEdicao(${index})">✏️ Editar</button>
          <button onclick="removerExercicio(${index})" style="color: #ff5555;">❌ Excluir</button>
        </div>
      `;
    }

    containerConteudo.appendChild(card);
  });
}

function atualizarBarraProgresso(lista, concluidosHoje) {
  const barra = document.getElementById('barra-progresso');
  const texto = document.getElementById('texto-progresso');

  if (!barra || !texto) return;

  if (lista.length === 0) {
    barra.style.width = '0%';
    texto.innerText = '0%';
    return;
  }

  const concluidos = lista.filter(item => concluidosHoje.includes(item.exercicio)).length;
  const porcentagem = Math.round((concluidos / lista.length) * 100);

  barra.style.width = `${porcentagem}%`;
  texto.innerText = `${porcentagem}% (${concluidos}/${lista.length})`;
}

function toggleConcluido(index) {
  const item = planoAtual[diaAtivo][index];
  const concluidosHoje = obterConcluidosHoje();
  const estadoAtual = concluidosHoje.includes(item.exercicio);
  const novoEstado = !estadoAtual;

  salvarConcluidoHoje(item.exercicio, novoEstado);

  if (novoEstado) {
    registrarCargaNoHistorico(item.exercicio, item.carga);
  }

  renderizarExerciciosDoDia();
}

// ==================== 5. MANIPULAÇÃO DE DADOS E FORMULÁRIOS ====================
function configurarAutocompleteInputForm() {
  const exercicioInput = document.getElementById('exercicio');
  let datalistForm = document.getElementById('lista-todos-exercicios');
  
  if (!datalistForm) {
    datalistForm = document.createElement('datalist');
    datalistForm.id = 'lista-todos-exercicios';
    datalistForm.innerHTML = todosExercicios.map(ex => `<option value="${ex}">`).join('');
    document.body.appendChild(datalistForm);
  }

  if (exercicioInput) {
    exercicioInput.setAttribute('list', 'lista-todos-exercicios');
  }
}

function ativarEdicao(index) {
  idEditando = index;
  renderizarExerciciosDoDia();
}

function cancelarEdicao() {
  idEditando = null;
  renderizarExerciciosDoDia();
}

function salvarEdicao(index) {
  const novoNome = document.getElementById(`edit-nome-${index}`).value.trim();
  const novaCarga = Number(document.getElementById(`edit-carga-${index}`).value);
  const novasReps = Number(document.getElementById(`edit-reps-${index}`).value);

  if (!novoNome) {
    alert("O nome do exercício não pode ficar em branco!");
    return;
  }

  if (novaCarga < 0 || novasReps <= 0) {
    alert("Informe valores válidos!");
    return;
  }

  planoAtual[diaAtivo][index].exercicio = novoNome;
  planoAtual[diaAtivo][index].carga = novaCarga;
  planoAtual[diaAtivo][index].reps = novasReps;
  
  idEditando = null;
  salvarEAtualizar();
}

function gerarTreinoSugerido(dias) {
  if (dias === 0) {
    planoAtual = {
      "Segunda-Feira": [],
      "Terça-Feira": [],
      "Quarta-Feira": [],
      "Quinta-Feira": [],
      "Sexta-Feira": [],
      "Sábado": [],
      "Domingo": []
    };
  } else {
    planoAtual = JSON.parse(JSON.stringify(treinosBase[dias]));
  }
  
  idEditando = null;
  salvarEAtualizar();
}

function removerExercicio(index) {
  const ex = planoAtual[diaAtivo][index];
  if (confirm(`Tem certeza que deseja apagar "${ex.exercicio}"?`)) {
    planoAtual[diaAtivo].splice(index, 1);
    salvarEAtualizar();
  }
}

function toggleFormulario() {
  const form = document.getElementById('form-treino');
  if (form) form.classList.toggle('escondido');
}

// EVENT LISTENER INICIAL
document.addEventListener('DOMContentLoaded', () => {
  renderizarTelas();
  checarSessaoUsuario();

  const formTreino = document.getElementById('form-treino');
  if (formTreino) {
    formTreino.addEventListener('submit', async (e) => {
      e.preventDefault();

      const exercicioInput = document.getElementById('exercicio');
      const cargaInput = document.getElementById('carga');
      const repsInput = document.getElementById('reps');

      const nomeTratado = exercicioInput.value.trim();
      const cargaVal = Number(cargaInput.value);
      const repsVal = Number(repsInput.value);

      if (!nomeTratado) {
        alert("Digite o nome do exercício!");
        return;
      }

      if (cargaVal < 0 || repsVal <= 0) {
        alert("A carga não pode ser negativa e as repetições devem ser maiores que 0!");
        return;
      }

      const novoItem = {
        id: Date.now(),
        exercicio: nomeTratado,
        carga: cargaVal,
        reps: repsVal,
        concluido: false
      };

      if (!planoAtual[diaAtivo]) {
        planoAtual[diaAtivo] = [];
      }

      planoAtual[diaAtivo].push(novoItem);
      salvarEAtualizar();

      // Envio ao Supabase
      if (supabaseClient) {
        try {
          await supabaseClient
            .from('treinos')
            .insert([{ exercicio: nomeTratado, carga: cargaVal, repeticoes: repsVal }]);
        } catch (err) {
          console.warn("Erro ao salvar no Supabase:", err);
        }
      }

      exercicioInput.value = '';
      cargaInput.value = '';
      repsInput.value = '';
      toggleFormulario();
    });
  }
  
  const formPersonal = document.getElementById('form-criar-treino-personal');
  if (formPersonal) {
    formPersonal.addEventListener('submit', salvarTreinoPersonal);
  }
});

function voltarParaSetup() {
  if (confirm("Quer alterar a frequência? Seu treino atual será redefinido.")) {
    localStorage.removeItem('devfit_plano');
    localStorage.removeItem('devfit_dia_ativo');
    planoAtual = {};
    diaAtivo = "";
    idEditando = null;
    renderizarTelas();
  }
}

function salvarEAtualizar() {
  localStorage.setItem('devfit_plano', JSON.stringify(planoAtual));
  localStorage.setItem('devfit_dia_ativo', diaAtivo);
  renderizarTelas();
}

// ==================== 6. GRÁFICOS E HISTÓRICO ====================
let meuGrafico = null;

function obterHistoricoCargas() {
  const historico = localStorage.getItem('devfit_historico_cargas');
  return historico ? JSON.parse(historico) : {};
}

function registrarCargaNoHistorico(nomeExercicio, carga) {
  const historico = obterHistoricoCargas();
  const hojeISO = getHojeISO();

  if (!historico[nomeExercicio]) {
    historico[nomeExercicio] = [];
  }

  const ultRegistro = historico[nomeExercicio][historico[nomeExercicio].length - 1];
  if (ultRegistro && ultRegistro.data === hojeISO) {
    ultRegistro.carga = Number(carga);
  } else {
    historico[nomeExercicio].push({ data: hojeISO, carga: Number(carga) });
  }

  localStorage.setItem('devfit_historico_cargas', JSON.stringify(historico));
}

function carregarOpcoesExercicios() {
  const select = document.getElementById('select-exercicio');
  if (!select) return;

  const historico = obterHistoricoCargas();
  const nomesExercicios = Object.keys(historico);

  select.innerHTML = '';

  if (nomesExercicios.length === 0) {
    select.innerHTML = '<option value="">Nenhum histórico registrado ainda</option>';
    return;
  }

  nomesExercicios.forEach(ex => {
    const opt = document.createElement('option');
    opt.value = ex;
    opt.textContent = ex;
    select.appendChild(opt);
  });
}

function atualizarGrafico() {
  const select = document.getElementById('select-exercicio');
  if (!select || !select.value) return;

  const exercicioSelecionado = select.value;
  const historico = obterHistoricoCargas();
  const dadosExercicio = historico[exercicioSelecionado] || [];

  dadosExercicio.sort((a, b) => a.data.localeCompare(b.data));

  const labels = dadosExercicio.map(item => formatarDataBR(item.data));
  const cargas = dadosExercicio.map(item => item.carga);

  const ctx = document.getElementById('graficoEvolucao');
  if (!ctx) return;

  if (meuGrafico) {
    meuGrafico.destroy();
  }

  meuGrafico = new Chart(ctx.getContext('2d'), {
    type: 'line',
    data: {
      labels: labels.length > 0 ? labels : ['Hoje'],
      datasets: [{
        label: 'Carga (kg)',
        data: cargas.length > 0 ? cargas : [0],
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.15)',
        fill: true,
        tension: 0.3,
        borderWidth: 3,
        pointBackgroundColor: '#0284c7',
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' }, beginAtZero: true },
        x: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } }
      }
    }
  });
}

// ==================== 7. RECORDES PESSOAIS (PRs) ====================
let listaPRsCache = [];

function atualizarEExibirPRs() {
  const historico = obterHistoricoCargas();
  const prs = {};

  Object.entries(historico).forEach(([exercicio, registros]) => {
    if (Array.isArray(registros) && registros.length > 0) {
      const cargas = registros.map(r => Number(r.carga) || 0);
      const maiorCarga = Math.max(...cargas);
      if (maiorCarga > 0) {
        prs[exercicio] = maiorCarga;
      }
    }
  });

  listaPRsCache = Object.entries(prs);
  renderizarListaPRs(listaPRsCache);
}

function renderizarListaPRs(lista) {
  const containerPRs = document.getElementById('lista-prs');
  if (!containerPRs) return;

  containerPRs.innerHTML = '';

  if (lista.length === 0) {
    containerPRs.innerHTML = '<div style="padding: 12px; color: #94a3b8; text-align: center; font-size: 0.85rem;">Nenhum recorde encontrado.</div>';
    return;
  }

  lista.forEach(([ex, carga]) => {
    const item = document.createElement('div');
    item.style.cssText = 'display: flex; justify-content: space-between; align-items: center; background: #0f172a; padding: 10px 14px; border-radius: 8px; border: 1px solid #334155; font-size: 0.9rem;';
    item.innerHTML = `
      <span style="color: #f8fafc; font-weight: 500;">💪 ${ex}</span>
      <strong style="color: #38bdf8; font-size: 0.95rem;">${carga} kg</strong>
    `;
    containerPRs.appendChild(item);
  });
}

function filtrarPRs() {
  const termo = document.getElementById('busca-pr').value.toLowerCase();
  const filtrados = listaPRsCache.filter(([ex]) => ex.toLowerCase().includes(termo));
  renderizarListaPRs(filtrados);
}

// ==================== 8. CALENDÁRIO ====================
function obtainingHistoricoOrganizadoPorData() {
  const historicoBruto = obterHistoricoCargas();
  const porData = {};

  Object.entries(historicoBruto).forEach(([exercicio, registros]) => {
    registros.forEach(r => {
      if (!porData[r.data]) porData[r.data] = [];
      porData[r.data].push({ exercicio, carga: r.carga });
    });
  });

  return porData;
}

function renderizarCalendario() {
  const grid = document.getElementById('grid-calendario');
  const tituloMes = document.getElementById('titulo-mes-ano');
  const qtdTreinosEl = document.getElementById('qtd-treinos-mes');
  if (!grid || !tituloMes) return;

  grid.innerHTML = '';
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = agora.getMonth();

  tituloMes.textContent = agora.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  const historico = obtainingHistoricoOrganizadoPorData();
  const primeirodiaSemana = new Date(ano, mes, 1).getDay();
  const totalDiasMes = new Date(ano, mes + 1, 0).getDate();
  const diaHoje = agora.getDate();

  let treinosNoMes = 0;

  for (let i = 0; i < primeirodiaSemana; i++) {
    grid.appendChild(document.createElement('div'));
  }

  for (let dia = 1; dia <= totalDiasMes; dia++) {
    const elDia = document.createElement('div');
    elDia.classList.add('dia-cal');
    elDia.textContent = dia;

    const mesFormatado = String(mes + 1).padStart(2, '0');
    const diaFormatado = String(dia).padStart(2, '0');
    const chaveISO = `${ano}-${mesFormatado}-${diaFormatado}`;

    if (dia === diaHoje) elDia.classList.add('hoje');

    if (historico[chaveISO]) {
      elDia.classList.add('treinado');
      elDia.style.cursor = 'pointer';
      elDia.onclick = () => abrirModalTreino(formatarDataBR(chaveISO), historico[chaveISO]);
      treinosNoMes++;
    }

    grid.appendChild(elDia);
  }

  if (qtdTreinosEl) qtdTreinosEl.textContent = treinosNoMes;
}

function abrirModalTreino(dataBR, exercicios) {
  const modal = document.getElementById('modal-detalhes-dia');
  const titulo = document.getElementById('modal-data-titulo');
  const lista = document.getElementById('lista-exercicios-dia');

  if (!modal || !lista) return;

  titulo.textContent = `Treino de ${dataBR}`;
  lista.innerHTML = '';

  exercicios.forEach(item => {
    const li = document.createElement('li');
    li.style.cssText = 'background: #0f172a; padding: 10px 12px; border-radius: 8px; display: flex; justify-content: space-between; font-size: 0.9rem; color: #f8fafc; border: 1px solid #334155; margin-bottom: 6px;';
    li.innerHTML = `<span>💪 ${item.exercicio}</span> <strong style="color: #38bdf8;">${item.carga} kg</strong>`;
    lista.appendChild(li);
  });

  modal.style.display = 'flex';
}

function fecharModalTreino() {
  const modal = document.getElementById('modal-detalhes-dia');
  if (modal) modal.style.display = 'none';
}

// ==================== 9. TIMER DE DESCANSO ====================
let tempoPadrao = 60;
let tempoRestante = 60;
let intervaloTimer = null;

function abrirModalTimer() {
  const modal = document.getElementById('modal-timer');
  if (modal) modal.style.display = 'flex';
}

function fecharModalTimer() {
  const modal = document.getElementById('modal-timer');
  if (modal) modal.style.display = 'none';
}

function atualizarDisplayTimer() {
  const min = String(Math.floor(tempoRestante / 60)).padStart(2, '0');
  const seg = String(tempoRestante % 60).padStart(2, '0');
  const display = document.getElementById('display-timer');
  if (display) display.textContent = `${min}:${seg}`;
}

function definirTempoTimer(segundos) {
  pausarTimer();
  tempoPadrao = segundos;
  tempoRestante = segundos;
  atualizarDisplayTimer();
}

function ajustarTempoTimer(segundos) {
  tempoRestante += segundos;
  if (tempoRestante < 0) tempoRestante = 0;
  atualizarDisplayTimer();
}

function alternarTimer() {
  const btn = document.getElementById('btn-start-timer');
  
  if (intervaloTimer) {
    pausarTimer();
  } else {
    if (btn) {
      btn.textContent = 'Pausar';
      btn.style.background = '#eab308';
    }

    intervaloTimer = setInterval(() => {
      if (tempoRestante > 0) {
        tempoRestante--;
        atualizarDisplayTimer();
      } else {
        pausarTimer();

        if ("vibrate" in navigator) {
          navigator.vibrate([500, 200, 500]);
        }

        alert('⏱️ Descanso finalizado!');
        resetarTimer();
      }
    }, 1000);
  }
}

function pausarTimer() {
  clearInterval(intervaloTimer);
  intervaloTimer = null;
  const btn = document.getElementById('btn-start-timer');
  if (btn) {
    btn.textContent = 'Iniciar';
    btn.style.background = '#22c55e';
  }
}

function resetarTimer() {
  pausarTimer();
  tempoRestante = tempoPadrao;
  atualizarDisplayTimer();
}

// ==================== 10. STORIES MODAL ====================
function gerandoCardStories() {
  const modal = document.getElementById('modal-stories');
  const dataEl = document.getElementById('stories-data');
  const resumoEl = document.getElementById('stories-resumo-exercicios');

  if (!modal || !resumoEl) return;

  const exerciciosDoDia = planoAtual[diaAtivo] || [];
  const concluidosHoje = obterConcluidosHoje();
  const hoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' });
  if (dataEl) dataEl.textContent = hoje;

  resumoEl.innerHTML = '';
  if (exerciciosDoDia.length === 0) {
    resumoEl.innerHTML = '<p style="color: #94a3b8;">Nenhum exercício para compartilhar hoje.</p>';
  } else {
    exerciciosDoDia.forEach(item => {
      const isConcluido = concluidosHoje.includes(item.exercicio);
      const p = document.createElement('div');
      p.style.cssText = 'padding: 4px 0; border-bottom: 1px dashed #334155;';
      p.innerHTML = `${isConcluido ? '✅' : '⏳'} <strong>${item.exercicio}</strong> - ${item.carga}kg`;
      resumoEl.appendChild(p);
    });
  }

  modal.style.display = 'flex';
}

function fecharModalStories() {
  const modal = document.getElementById('modal-stories');
  if (modal) modal.style.display = 'none';
}

// ==================== 11. CALCULADORA DE SUPLEMENTAÇÃO ====================
function calcularSuplementacao() {
  const pesoInput = document.getElementById('peso-usuario');
  const resContainer = document.getElementById('resultado-calc');
  const resCreatina = document.getElementById('res-creatina');
  const resProteina = document.getElementById('res-proteina');

  if (!pesoInput) {
    alert("Campo de peso não encontrado!");
    return;
  }

  const peso = parseFloat(pesoInput.value);

  if (!peso || peso <= 0) {
    alert("Por favor, digite um peso válido!");
    return;
  }

  const doseCreatina = (peso * 0.07).toFixed(1);
  const doseProteina = Math.round(peso * 2.0);

  if (resCreatina) resCreatina.textContent = `${doseCreatina}g / dia`;
  if (resProteina) resProteina.textContent = `${doseProteina}g / dia`;

  if (resContainer) {
    resContainer.classList.remove('escondido');
    resContainer.style.display = 'block';
  }
}

// ==================== 12. MÓDULO PERSONAL & SUPABASE ====================
function adicionarCampoExercicioPersonal() {
  const container = document.getElementById('lista-exercicios-personal');
  if (!container) return;

  const novoItem = document.createElement('div');
  novoItem.className = 'item-exercicio-form';
  novoItem.style.cssText = 'background: #0f172a; padding: 10px; border-radius: 8px; border: 1px solid #334155; display: flex; flex-direction: column; gap: 8px; margin-top: 8px;';
  novoItem.innerHTML = `
    <input type="text" placeholder="Nome do Exercício" class="input-ex-nome" required style="width: 100%; padding: 8px; background: #1e293b; border: 1px solid #334155; color: white; border-radius: 4px; box-sizing: border-box;">
    <div style="display: flex; gap: 8px;">
      <input type="number" placeholder="Séries" class="input-ex-series" required style="flex: 1; padding: 8px; background: #1e293b; border: 1px solid #334155; color: white; border-radius: 4px; box-sizing: border-box;">
      <input type="text" placeholder="Reps" class="input-ex-reps" required style="flex: 1; padding: 8px; background: #1e293b; border: 1px solid #334155; color: white; border-radius: 4px; box-sizing: border-box;">
    </div>
  `;
  container.appendChild(novoItem);
}

async function salvarTreinoPersonal(e) {
  if (e) e.preventDefault();
  
  const titulo = document.getElementById('personal-titulo').value.trim();
  const categoria = document.getElementById('personal-categoria').value;
  
  const itens = document.querySelectorAll('#lista-exercicios-personal .item-exercicio-form');
  const exercicios = [];

  itens.forEach(item => {
    const nome = item.querySelector('.input-ex-nome').value.trim();
    const series = item.querySelector('.input-ex-series').value;
    const reps = item.querySelector('.input-ex-reps').value;
    if (nome) {
      exercicios.push({ exercicio: nome, series, reps, carga: 0 });
    }
  });

  if (!titulo || exercicios.length === 0) {
    alert("Preencha o título e pelo menos 1 exercício!");
    return;
  }

  const codigo = 'FIT-' + Math.floor(1000 + Math.random() * 9000);

  if (supabaseClient) {
    try {
      const { error } = await supabaseClient
        .from('fichas_personal')
        .insert([{ codigo, titulo, categoria, exercicios }]);

      if (error) throw error;

      alert(`Ficha gerada com sucesso! Código para o aluno: ${codigo}`);
    } catch (err) {
      console.warn("Erro ao salvar no banco, gerando apenas local:", err);
      alert(`Ficha criada localmente! Código: ${codigo}`);
    }
  }
}

async function importarTreinoPorCodigo() {
  const codigoInput = document.getElementById('input-codigo-aluno');
  if (!codigoInput) return;

  const codigo = codigoInput.value.trim().toUpperCase();
  if (!codigo) {
    alert("Digite o código da ficha!");
    return;
  }

  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('fichas_personal')
        .select('*')
        .eq('codigo', codigo)
        .single();

      if (error || !data) {
        alert("Ficha não encontrada. Verifique o código!");
        return;
      }

      const nomeDia = `Treino ${data.categoria} (${data.titulo})`;
      planoAtual[nomeDia] = data.exercicios;
      salvarEAtualizar();
      alert(`Ficha "${data.titulo}" importada com sucesso!`);
    } catch (err) {
      console.error("Erro ao importar ficha:", err);
      alert("Erro ao buscar a ficha no banco de dados.");
    }
  }
}