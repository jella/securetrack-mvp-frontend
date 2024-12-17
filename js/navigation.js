

const VIEWS = {
DASHBOARD: 'dashboard-view',
ATIVOS: 'ativos-view',
CONTROLES: 'controles-view',
CONFORMIDADE: 'conformidade-view',
ASSOCIACAO: 'controles-associacao-view'
};


let currentView = null;

function loadView(viewId) {
    if (currentView === viewId) return;
  
    const views = document.querySelectorAll('.view');
    views.forEach(view => (view.style.display = 'none'));
  
    const newView = document.getElementById(viewId);
    if (newView) {
      newView.style.display = 'block';
      currentView = viewId;
      window.history.pushState({ view: viewId }, '', `#${viewId}`);
  
      // Carregar dados somente quando necessário
      if (viewId === VIEWS.ATIVOS) atualizarTabelaAtivos();
      if (viewId === VIEWS.CONTROLES) atualizarTabelaControles();
      if (viewId === VIEWS.DASHBOARD) updateDashboard();
      //if (viewId === VIEWS.ASSOCIACAO) atualizarTabelaAssociacaoControles();

    

    } else {
      console.error(`View com ID "${viewId}" não encontrada.`);
    }
  }
  
  function loadViewAssociacao(viewId,id) {
    if (currentView === viewId) return;
  
    const views = document.querySelectorAll('.view');
    views.forEach(view => (view.style.display = 'none'));
  
    const newView = document.getElementById(viewId);
    if (newView) {
      newView.style.display = 'block';
      currentView = viewId;
      window.history.pushState({ view: viewId }, '', `#${viewId}`);
  
      if (viewId === VIEWS.ASSOCIACAO) atualizarTabelaAssociacaoControles(id);

    } else {
      console.error(`View com ID "${viewId}" não encontrada.`);
    }
  }
// /**
//  * Função para carregar e exibir a view especificada.
//  * @param {string} viewId O ID da view que será carregada.
//  */
// function loadView(viewId) {
//     // Obtém todas as views da página
//     const views = document.querySelectorAll(".view");
  
//     // Esconde todas as views
//     views.forEach((view) => {
//         view.style.display = "none"; // Esconde a view atual
//     });
  
//     // Localiza a nova view pelo ID e exibe
//     const newView = document.getElementById(viewId);
//     if (newView) {
//         newView.style.display = "block"; // Exibe a nova view
//     } else {
//         console.error(`View com o ID '${viewId}' não encontrada.`);
//     }
  
//     // Atualiza a URL sem recarregar a página
//     updateURL(viewId);
//     limpaCampoAtivos('form-cadastro-ativo');
//     limpaCampoAtivos('form-cadastro-controle');
//     updateDashboard('');
//   }
// /**

// Carrega a view que eu especificar.
//     @param {string} view O nome da view a ser carregada.
// */
// function loadView(view) {
// if (currentView === view) return;


// const currentViewElement = document.querySelector(`#${currentView}`);
// if (currentViewElement) {
// currentViewElement.style.display = 'none';
// }


// const newViewElement = document.querySelector(`#${view}`);
// if (newViewElement) {
//     newViewElement.style.display = 'block';
// }

// currentView = view;
// updateURL(view);
// }

/**

Atualiza a URL no navegador sem recarregar a página.

@param {string} view O nome da view que vai ser refletido na URL.
*/
function updateURL(view) {
const url = `#${view}`;
window.history.pushState({ view: view }, '', url);
}

/**

funçao que adiciona ouvintes de eventos nos links de navegacao .

@param {NodeList} links a lista dos links que irao disparar a navegacao
*/
function setupNavigation(links) {
links.forEach(link => {
link.addEventListener('click', function (event) {
event.preventDefault();
const targetView = link.getAttribute('href').substring(1);
loadView(targetView);
});
});
}
    

/**

funçao que adiciona ouvintes de eventos.

*/
function setupHistoryListeners() {
window.addEventListener('popstate', (event) => {
const view = event.state?.view || VIEWS.DASHBOARD;
loadView(view);
});
}