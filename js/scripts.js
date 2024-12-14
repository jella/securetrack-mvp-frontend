/**

Preenche de forma dinamica a tabela de ativos com os dados passados.

@param {Array} data Lista de ativos que serão exibidos.
*/

function loadAtivosTable(data) {
  const tableBody = document.querySelector('#tabela-ativos tbody');
  tableBody.innerHTML = '';
  
  data.forEach(item => {
    const row = `
      <tr>
        <td>${item.nome}</td>
        <td>${item.tipo}</td>
        <td>${item.status}</td>
        <td>${item.responsavel}</td>
        <td>
          <button class="editar-ativo action-button" data-id="${item.id}">Editar</button>
          <button class="remover-ativo action-button" data-id="${item.id}">Remover</button>
        </td>
      </tr>
    `;
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
  const row =`<tr>
                <td>${item.descricao}</td>
                <td>${item.categoria}</td>
                <td>
                    <button class="editar-controle action-button" data-id="${item.id}">Editar</button>
                    <button class="remover-controle action-button" data-id="${item.id}">Remover</button>
                </td>
            </tr>
      `;
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
  

 //funcoes para interagir com a api. 
/**
 * Função para fazer chamadas GET à API.
 * @param {string} endpoint - O endpoint da API.
 * @returns {Promise<any>} - A resposta da API em formato JSON.
 */
async function apiGet(endpoint) {
  const response = await fetch(`http://127.0.0.1:3001${endpoint}/`);
  if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.statusText}`);
  }
  return response.json();
}

/**
* Função para fazer chamadas POST à API.
* @param {string} endpoint - O endpoint da API.
* @param {object} data - Os dados para envio no corpo da requisição.
* @returns {Promise<any>} - A resposta da API em formato JSON.
*/
async function apiPost(endpoint, data) {
  const response = await fetch(`http://127.0.0.1:3001${endpoint}/`, {
      
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  });

  
  if (!response.ok) {
      throw new Error(`Erro ao enviar dados: ${response.statusText}`);
  }
  return response.json();
}

/**
* Atualiza a tabela de ativos com dados da API.
*/
async function atualizarTabelaAtivos() {
  try {
      const ativos = await apiGet('/ativos');
      loadAtivosTable(ativos);
  } catch (error) {
      console.error('Erro ao carregar ativos:', error);
  }
}

/**
* Atualiza a tabela de controles com dados da API.
*/
async function atualizarTabelaControles() {
  try {
      const controles = await apiGet('/controles');
      loadControlesTable(controles);
  } catch (error) {
      console.error('Erro ao carregar controles:', error);
  }
}


/**
* Salva um novo ativo via API.
* @param {Event} event - O evento do formulário.
*/
async function salvarAtivo(event) {
  event.preventDefault();
  const dadosAtivo = {
      nome: document.getElementById('nome-ativo').value,
      tipo: document.getElementById('tipo-ativo').value,
      status: document.getElementById('status-ativo').value,
      responsavel: document.getElementById('responsavel-ativo').value,
      observacoes: document.getElementById('observacoes-ativo').value,
  };
  try {
      await apiPost('/ativos', dadosAtivo);
      atualizarTabelaAtivos();
  } catch (error) {
      console.error('Erro ao salvar ativo:', error);
  }
}

/**
* Salva um novo controle via API.
* @param {Event} event - O evento do formulário.
*/
async function salvarControle(event) {
  event.preventDefault();
  const dadosControle = {
      descricao: document.getElementById('descricao-controle').value,
      categoria: document.getElementById('categoria-controle').value,
      codigo: document.getElementById('codigo-controle').value,
      anotacoes: document.getElementById('anotacoes-controle').value,
  };
  try {
      await apiPost('/controles', dadosControle);
      atualizarTabelaControles();
  } catch (error) {
      console.error('Erro ao salvar controle:', error);
  }
}

/**
* Inicializa os eventos do frontend com as integrações da API
*/
function inicializarEventosIntegracao() {
  document.getElementById('form-cadastro-ativo')?.addEventListener('submit', salvarAtivo);
  document.getElementById('form-cadastro-controle')?.addEventListener('submit', salvarControle);
  //atualizarTabelaAtivos();
  //atualizarTabelaControles();
}


document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  inicializarEventosIntegracao();
  setupHistoryListeners();
});