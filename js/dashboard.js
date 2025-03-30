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
      const ativos = await api.get('/ativos');
      const controles = await api.get('/controles');

      // Chamada ao endpoint do backend
      const dadosConformidadePendentes = await api.get(`/conformidade/status?status='Pendente'}`);
      const dadosConformidadeEmAndamento = await api.get(`/conformidade/status?status='Andamento'}`);
      const dadosConformidadeImplementadas = await api.get(`/conformidade/status?status='Implementada'}`);
      const conformidade = await api.get('/conformidade');

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


