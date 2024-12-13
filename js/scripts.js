// Constantes para os identificadores das Views
const VIEWS = {
    HOME: 'home',
    ABOUT: 'about',
    CONTACT: 'contact'
  };


  // Variáveis para armazenar as views e o estaDo atual
let currentView = null;
const viewsContainer = document.getElementById('views-container');  // Container onde as views serão renderizadas


/**
 * Carrega a view especificada.
 * @param {string} view O nome da view a ser carregada.
 */
function loadView(view) {
    // Verifica se a view já está carregada
    if (currentView === view) return;
  
    // Esconde a view atual
    const currentViewElement = document.querySelector(`#${currentView}`);
    if (currentViewElement) {
      currentViewElement.style.display = 'none';
    }
  
    // Exibe a nova view
    const newViewElement = document.querySelector(`#${view}`);
    if (newViewElement) {
      newViewElement.style.display = 'block';
    }
  
    // Atualiza a variável de estado
    currentView = view;
    updateURL(view);
  }



  /**
 * Atualiza a url no navegador sem recarregar a Página.
 * @param {string} view O nome da view que será refletido na URL.
 */
function updateURL(view) {
    const url = `#${view}`;
    window.history.pushState({ view: view }, '', url);
  }

  

  /**
 * Função que adiciona um ouvinte de eventos aos links para controlar a navegação.
 * @param {NodeList} links A lista de links que irão disparar a navegação.
 */
function setupNavigation(links) {
    links.forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault(); // Previne o comportamento padrão de recarregar a página
        const targetView = link.getAttribute('href').substring(1); // Extrai o nome da view do link (por exemplo, '#home')
        loadView(targetView);
      });
    });
  }



/**
 * Função para inicializar a SPA e carregar a view inicial.
 */
function initializeApp() {
    const links = document.querySelectorAll('.nav-link'); // Suponha que os links de navegação tenham a classe 'nav-link'
    setupNavigation(links);
  
    // Verifica a URL atual e carrega a view correspondente
    const initialView = window.location.hash.substring(1) || VIEWS.HOME; // Se não houver hash, carrega 'home'
    loadView(initialView);
  }
  