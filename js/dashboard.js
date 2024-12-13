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
document.getElementById('view-assets').addEventListener('click', () => loadView(VIEWS.ATIVOS));
document.getElementById('add-asset').addEventListener('click', () => loadView(VIEWS.ATIVOS));
document.getElementById('view-controls').addEventListener('click', () => loadView(VIEWS.CONTROLES));
document.getElementById('add-control').addEventListener('click', () => loadView(VIEWS.CONTROLES));
document.getElementById('view-compliance-report').addEventListener('click', () => loadView(VIEWS.CONFORMIDADE));
}
