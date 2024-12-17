/**

funçao que atualiza os contadores no dashboard com dados passados de forma dimâmica.

@param {number} ativos num de ativos.
@param {number} controles num de controles.
*/
function updateDashboardCounts(ativos, controles) {
document.getElementById('assets-count').textContent = ativos;
document.getElementById('controls-count').textContent = controles;
}

//configura eventos para os botões do dashboard

function setupDashboardEvents() {
document.getElementById('add-asset')?.addEventListener('click', () => loadView(VIEWS.ATIVOS));
document.getElementById('add-control')?.addEventListener('click', () => loadView(VIEWS.CONTROLES));
document.getElementById('view-asset')?.addEventListener('click', () => loadView(VIEWS.ATIVOS));
document.getElementById('view-control')?.addEventListener('click', () => loadView(VIEWS.CONTROLES));
document.getElementById('view-compliance-report')?.addEventListener('click', () => loadView(VIEWS.CONFORMIDADE));
}

//configura eventos para os botões do dashboard
async function updateDashboard() {
    try {
        // Fazer chamadas GET para os endpoints de ativos e controles
        const ativos = await apiGet('/ativos');
        const controles = await apiGet('/controles');

      // Monta a URL com o filtro, se fornecido
      statusFiltro = 'Pendente'
      const url = statusFiltro ? `/conformidade/status?status='${statusFiltro}'` : '/conformidade/status';

      // Chamada ao endpoint do backend
      const dadosConformidadePendentes = await apiGet(url);
      const dadosConformidadeEmAndamento = await apiGet(url);
      const dadosConformidadeImplementadas = await apiGet(url);


// -------        const conformidade = await apiGet('/controles');

        // Atualizar os contadores no HTML
        document.getElementById('assets-count').textContent = ativos.length;
        document.getElementById('controls-count').textContent = controles.length;
        document.getElementById('pendentes-count').textContent = dadosConformidadePendentes.length;
        document.getElementById('em-andamento-count').textContent = dadosConformidadeEmAndamento.length;
        document.getElementById('implementados-count').textContent = dadosConformidadeImplementadas.length;

    } catch (error) {
        console.error('Erro ao atualizar o dashboard:', error);
    }
}


