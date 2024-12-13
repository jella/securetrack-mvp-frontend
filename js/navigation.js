const VIEWS = {
DASHBOARD: 'dashboard-view',
ATIVOS: 'ativos-view',
CONTROLES: 'controles-view',
CONFORMIDADE: 'conformidade-view'
};


let currentView = null;

/**

Carrega a view que eu especificar.
    @param {string} view O nome da view a ser carregada.
*/
function loadView(view) {
if (currentView === view) return;


const currentViewElement = document.querySelector(#${currentView});
if (currentViewElement) {
currentViewElement.style.display = 'none';
}


const newViewElement = document.querySelector(#${view});
if (newViewElement) {
newViewElement.style.display = 'block';
}


currentView = view;
updateURL(view);
}

/**

Atualiza a URL no navegador sem recarregar a página.

@param {string} view O nome da view que vai ser refletido na URL.
*/
function updateURL(view) {
const url = #${view};
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

    

//Configura os ouvintes para manipulaão do historico do navegador.
    function setupHistoryListeners() {
window.addEventListener('popstate', (event) => {
const view = event.state?.view || VIEWS.DASHBOARD;
loadView(view);
});
}