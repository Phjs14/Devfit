const form = document.getElementById('form-treino');
const inputExercicio = document.getElementById('exercicio');
const inputCarga = document.getElementById('carga');
const inputRepeticoes = document.getElementById('repeticoes');
const listaTreinos = document.getElementById('lista-treinos');

let treinos = JSON.parse(localStorage.getItem('meusTreinos')) || [];

// Lista para saber o nome do dia de hoje baseado no relógio do sistema
const diasIniciais = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
const diaNumeroHoje = new Date().getDay();
const diaNomeHoje = diasIniciais[diaNumeroHoje];

function renderizarTreinos() {
    listaTreinos.innerHTML = '';

    // Filtra para pegar apenas os exercícios que foram carimbados com o dia de hoje
    const treinosDeHoje = treinos.filter(treino => treino.diaSemana === diaNomeHoje);

    // Adiciona o título do dia atual no topo da lista
    listaTreinos.innerHTML = `
        <div class="cabecalho-dia" style="margin-bottom: 15px;">
            <h2 style="font-size: 1.4rem;">Treino de <span style="color: var(--cor-acento, #22d3ee);">${diaNomeHoje}</span></h2>
        </div>
    `;

    if (treinosDeHoje.length === 0) {
        listaTreinos.innerHTML += '<p style="color: #888; text-align: center; margin-top: 20px;">Nenhum exercício para hoje. Descanso ou novo cadastro!</p>';
        return;
    }

    // Desenha apenas os cards do dia atual
    treinosDeHoje.forEach((treino) => {
        // Encontra o índice correto no banco principal para não deletar o exercício errado
        const indexReal = treinos.findIndex(t => t === treino);
        const classeConcluido = treino.concluido ? 'concluido' : '';
        
        listaTreinos.innerHTML += `
            <div class="card-treino ${classeConcluido}" onclick="alternarConcluido(${indexReal})">
                <div class="info-principal">
                    <h3>${treino.exercicio}</h3>
                    <div class="tags-info">
                        <span class="tag-carga">${treino.carga} kg</span>
                        <span class="tag-reps">${treino.repeticoes} reps</span>
                    </div>
                </div>
                <button class="btn-deletar" onclick="deletarTreino(${indexReal}, event)">
                    Remover
                </button>
            </div>
        `;
    });
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const novoTreino = {
        exercicio: inputExercicio.value,
        carga: inputCarga.value,
        repeticoes: inputRepeticoes.value,
        diaSemana: diaNomeHoje, // Carimba o exercício AUTOMATICAMENTE com o dia de hoje (ex: "Domingo")
        concluido: false
    };

    treinos.push(novoTreino);
    localStorage.setItem('meusTreinos', JSON.stringify(treinos));
    
    renderizarTreinos();
    form.reset();
    inputExercicio.focus();
});

window.alternarConcluido = function (index) {
    treinos[index].concluido = !treinos[index].concluido;
    localStorage.setItem('meusTreinos', JSON.stringify(treinos));
    renderizarTreinos();
};

window.deletarTreino = function (index, event) {
    event.stopPropagation();
    treinos.splice(index, 1);
    localStorage.setItem('meusTreinos', JSON.stringify(treinos));
    renderizarTreinos();
};

renderizarTreinos();