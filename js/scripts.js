/**

Preenche de forma dinamica a tabela de ativos com os dados passados.

@param {Array} data Lista de ativos que serão exibidos.
*/

function loadAtivosTable(data) {
  const tableBody = document.querySelector('#tabela-ativos tbody');
  tableBody.innerHTML = '';
  
  data.forEach(item => {
  const row =          <tr>
                <td>${item.nome}</td>
                <td>${item.tipo}</td>
                <td>${item.status}</td>
                <td>${item.responsavel}</td>
                <td>
                    <button class="editar-ativo action-button" data-id="${item.id}">Editar</button>
                    <button class="remover-ativo action-button" data-id="${item.id}">Remover</button>
                </td>
            </tr>
      ;
  tableBody.insertAdjacentHTML('beforeend', row);
  });
  }
  
  /**
  
  Preenche dinamicamente a tabela de controles com dados passados.
  
  @param {Array} data Lista de controles a serem exibidos.

  */
  function loadControlesTable(data) {
  const tableBody = document.querySelector('#tabela-controles tbody');
  tableBody.innerHTML = '';
  
  data.forEach(item => {
  const row =          <tr>
                <td>${item.descricao}</td>
                <td>${item.categoria}</td>
                <td>
                    <button class="editar-controle action-button" data-id="${item.id}">Editar</button>
                    <button class="remover-controle action-button" data-id="${item.id}">Remover</button>
                </td>
            </tr>
      ;
  tableBody.insertAdjacentHTML('beforeend', row);
  });
  }
  

  function initializeApp() {
  const links = document.querySelectorAll('.nav-link');
  setupNavigation(links);
  setupDashboardEvents();
  

  const initialView = window.location.hash.substring(1) || VIEWS.DASHBOARD;
  loadView(initialView);
  }
  

  document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  setupHistoryListeners();
  });