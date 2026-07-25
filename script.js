// 1. BANCO DE DADOS DE TREINOS PRONTOS
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

// SUGESTÕES POR GRUPO MUSCULAR
const bancoSugestoes = {
  peito: ["Supino Reto c/ Barra", "Supino Inclinado c/ Halteres", "Crucifixo Reto", "Crossover no Cabo", "Flexão de Braço"],
  costas: ["Puxada Frontal Aberta", "Remada Curvada c/ Barra", "Remada Baixa Triângulo", "Pulloff no Cabo", "Encolhimento c/ Halteres"],
  pernas: ["Agachamento Livre", "Leg Press 45°", "Cadeira Extensora", "Mesa Flexora", "Stiff c/ Barra", "Panturrilha em Pé", "Afundo c/ Halteres"],
  ombros: ["Desenvolvimento c/ Halteres", "Elevação Lateral", "Elevação Frontal", "Crucifixo Invertido Máquina"],
  biceps: ["Rosca Direta c/ Barra W", "Rosca Martelo", "Rosca Alternada"],
  triceps: ["Tríceps Pulley Corda", "Tríceps Testa", "Tríceps Francês"]
};

function obterGrupoMuscular(nomeExercicio) {
  if (!nomeExercicio) return null;
  const nomeLower = nomeExercicio.toLowerCase();
  
  if (nomeLower.includes("supino") || nomeLower.includes("crucifixo reto") || nomeLower.includes("crossover") || nomeLower.includes("flexão")) return "peito";
  if (nomeLower.includes("puxada") || nomeLower.includes("remada") || nomeLower.includes("pulloff") || nomeLower.includes("encolhimento")) return "costas";
  if (nomeLower.includes("agachamento") || nomeLower.includes("leg press") || nomeLower.includes("extensora") || nomeLower.includes("flexora") || nomeLower.includes("stiff") || nomeLower.includes("panturrilha") || nomeLower.includes("afundo")) return "pernas";
  if (nomeLower.includes("desenvolvimento") || nomeLower.includes("elevação") || nomeLower.includes("invertido")) return "ombros";
  if (nomeLower.includes("rosca")) return "biceps";
  if (nomeLower.includes("tríceps")) return "triceps";
  
  return null;
}

// 2. ESTADO DA APLICAÇÃO
let planoAtual = {};
try {
  planoAtual = JSON.parse(localStorage.getItem('devfit_plano')) || {};
} catch(e) {
  planoAtual = {};
}
let diaAtivo = localStorage.getItem('devfit_dia_ativo') || "";
let idEditando = null;

// 3. RENDERIZAR TELA E ABAS
function renderizarTelas() {
  const setup = document.getElementById('setup-treino');
  const painel = document.getElementById('painel-principal');
  const diasDisponiveis = Object.keys(planoAtual);

  if (diasDisponiveis.length === 0) {
    setup.classList.remove('escondido');
    painel.classList.add('escondido');
  } else {
    setup.classList.add('escondido');
    painel.classList.remove('escondido');

    if (!diaAtivo || !planoAtual[diaAtivo]) {
      diaAtivo = diasDisponiveis[0];
    }

    renderizarAbas();
    renderizarExerciciosDoDia();
  }
}

// 4. BOTOES DE ABAS
function renderizarAbas() {
  const containerAbas = document.getElementById('abas-dias');
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

// 5. MOSTRAR EXERCÍCIOS DO DIA
function renderizarExerciciosDoDia() {
  const containerConteudo = document.getElementById('conteudo-dia');
  containerConteudo.innerHTML = '';

  const lista = planoAtual[diaAtivo] || [];

  if (lista.length === 0) {
    containerConteudo.innerHTML = `<p style="color:#888; text-align:center; padding: 20px;">Nenhum exercício cadastrado para este dia.</p>`;
    return;
  }

  lista.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'item-exercicio';

    if (idEditando === index) {
      const grupo = obterGrupoMuscular(item.exercicio);
      const listaFiltrada = grupo ? bancoSugestoes[grupo] : Object.values(bancoSugestoes).flat();
      const opcoesDatalist = listaFiltrada.map(ex => `<option value="${ex}">`).join('');

      card.classList.add('modo-edicao');
      card.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
          <label style="font-size: 0.75rem; color: #007acc;">Nome do Exercício:</label>
          <input type="text" id="edit-nome-${index}" list="sugestoes-list" value="${item.exercicio}" placeholder="Ex: Supino Reto" style="padding: 8px; border-radius: 6px; border: 1px solid #007acc; background: #1e1e1e; color: #fff; outline: none;">
          
          <datalist id="sugestoes-list">
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
        <div class="info">
          <h4>${item.exercicio}</h4>
          <p>🏋️ <strong>${item.carga} kg</strong> | 🔄 <strong>${item.reps} reps</strong></p>
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

// 6. FUNÇÕES DE EDIÇÃO E GERENCIAMENTO
function ativarEdicao(index) {
  idEditando = index;
  renderizarExerciciosDoDia();
}

function cancelarEdicao() {
  idEditando = null;
  renderizarExerciciosDoDia();
}

function salvarEdicao(index) {
  const novoNome = document.getElementById(`edit-nome-${index}`).value;
  const novaCarga = document.getElementById(`edit-carga-${index}`).value;
  const novasReps = document.getElementById(`edit-reps-${index}`).value;

  if (novoNome.trim() !== '') {
    planoAtual[diaAtivo][index].exercicio = novoNome;
    planoAtual[diaAtivo][index].carga = Number(novaCarga) || 0;
    planoAtual[diaAtivo][index].reps = Number(novasReps) || 0;
    
    idEditando = null;
    salvarEAtualizar();
  }
}

function gerarTreinoSugerido(dias) {
  if (dias === 0) {
    planoAtual = {
      "Segunda-Feira": [],
      "Terça-Feira": [],
      "Quarta-Feira": [],
      "Quinta-Feira": [],
      "Sexta-Feira": []
    };
  } else {
    planoAtual = JSON.parse(JSON.stringify(treinosBase[dias]));
  }
  
  idEditando = null;
  salvarEAtualizar();
}

function removerExercicio(index) {
  planoAtual[diaAtivo].splice(index, 1);
  salvarEAtualizar();
}

function toggleFormulario() {
  const form = document.getElementById('form-treino');
  form.classList.toggle('escondido');
}

document.getElementById('form-treino').addEventListener('submit', (e) => {
  e.preventDefault();

  const exercicioInput = document.getElementById('exercicio');
  const cargaInput = document.getElementById('carga');
  const repsInput = document.getElementById('reps');

  const novoItem = {
    id: Date.now(),
    exercicio: exercicioInput.value,
    carga: Number(cargaInput.value) || 0,
    reps: Number(repsInput.value) || 0
  };

  if (!planoAtual[diaAtivo]) {
    planoAtual[diaAtivo] = [];
  }

  planoAtual[diaAtivo].push(novoItem);
  
  exercicioInput.value = '';
  cargaInput.value = '';
  repsInput.value = '';
  toggleFormulario();

  salvarEAtualizar();
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

document.addEventListener('DOMContentLoaded', () => {
  renderizarTelas();
});

