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
document.getElementById('view-compliance-report')?.addEventListener('click', () => loadView(VIEWS.CONFORMIDADE));
}

//configura eventos para os botões do dashboard
async function updateDashboard() {
    try {
        // Fazer chamadas GET para os endpoints de ativos e controles
        const ativos = await apiGet('/ativos');
        const controles = await apiGet('/controles');

        // Atualizar os contadores no HTML
        document.getElementById('assets-count').textContent = ativos.length;
        document.getElementById('controls-count').textContent = controles.length;
    } catch (error) {
        console.error('Erro ao atualizar o dashboard:', error);
    }
}