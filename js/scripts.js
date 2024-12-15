  
  /**
  
  Executa as funçoes necessárias para iniciar o app.
   */


  function initializeApp() {
  const links = document.querySelectorAll('.nav-link');
  setupNavigation(links);
  setupDashboardEvents();

  updateDashboard()

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


async function atualizarTabelaAtivos() {
  const loadingElement = document.getElementById('ativos-loading');
  if (loadingElement) loadingElement.style.display = 'block';

  try {
    const ativos = await apiGet('/ativos');
    const tableBody = document.querySelector('#tabela-ativos tbody');
    if (tableBody) {
      tableBody.innerHTML = '';
      ativos.forEach(item => {
        tableBody.insertAdjacentHTML(
          'beforeend',
          `<tr>
            <td>${item.nome}</td>
            <td>${item.tipo}</td>
            <td>${item.status}</td>
            <td>${item.responsavel}</td>
            <td>
              <button class="remover-ativo action-button" data-id="${item.id}">Remover</button>
              <button class="associar-controle action-button" data-id="${item.id}">Associar Controle</button>
            </td>
          </tr>`
        );
      });
    }
  } catch (error) {
    console.error('Erro ao carregar ativos:', error);
  } finally {
    if (loadingElement) loadingElement.style.display = 'none';
  }
}

/**
 * Limpa todos os campos de um formulário usando o método reset.
 * @param {string} formName - O ID do formulário a ser limpo.
 */
async function limpaCampoAtivos(formName) {
  try {
    const form = document.getElementById(formName);
    if (form) {
      form.reset(); 
    } else {
      throw new Error(`Formulário com o ID "${formName}" não encontrado.`);
    }
  } catch (error) {
    console.error('Erro ao limpar campos do formulário:', error);
  }
}

/**
 * Atualiza a tabela de controles com dados da API.
 */
async function atualizarTabelaControles() {
  const loadingElement = document.getElementById('controles-loading'); // Elemento de carregamento, caso exista
  if (loadingElement) loadingElement.style.display = 'block'; // Exibir indicador de carregamento

  try {
    const controles = await apiGet('/controles'); // Chamada à API
    const tableBody = document.querySelector('#tabela-controles tbody');
    if (!tableBody) return; // Se a tabela não existir, termina a execução

    // Reduz manipulações repetitivas no DOM
    let html = '';
    controles.forEach(item => {
      html += `
        <tr>
          <td>${item.descricao}</td>
          <td>${item.categoria}</td>
          <td>${item.codigo}</td>
          <td>${item.anotacoes}</td>
          <td>
            <button class="remover-controle action-button" data-id="${item.id}">Remover</button>
          </td>
        </tr>
      `;
    });

    tableBody.innerHTML = html; // Atualiza o DOM apenas uma vez
  } catch (error) {
    console.error('Erro ao carregar controles:', error);
  } finally {
    if (loadingElement) loadingElement.style.display = 'none'; // Esconde indicador de carregamento
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
 * Atualiza a tabela de conformidade com os dados do backend.
 * @param {string} statusFiltro - Filtro para o status (Conforme, Não Conforme ou vazio para todos).
 */
async function atualizarRelatorioConformidade(statusFiltro) {
  try {
      // Monta a URL com o filtro, se fornecido
      const url = statusFiltro ? `/conformidade/status?status=${statusFiltro}` : '/conformidade/status';

      // Chamada ao endpoint do backend
      const dadosConformidade = await apiGet(url);

      // Seleciona o corpo da tabela
      const tabelaRelatorio = document.querySelector('#tabela-relatorio tbody');
      tabelaRelatorio.innerHTML = ''; // Limpa os dados anteriores

      // Itera sobre os dados e cria as linhas da tabela
      dadosConformidade.forEach(item => {
          const linha = `
              <tr>
                  <td>${item.ativo}</td>
                  <td>${item.controle}</td>
                  <td>${item.status}</td>
              </tr>
          `;
          tabelaRelatorio.insertAdjacentHTML('beforeend', linha);
      });
  } catch (error) {
      console.error('Erro ao carregar o relatório de conformidade:', error);
  }
}


async function geraRelatorio(event) {
  event.preventDefault();
  const statusFiltro = document.querySelector('#filtro-status').value; // Obtém o valor do filtro
  atualizarRelatorioConformidade(statusFiltro); // Atualiza o relatório com o filtro
 
};

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  setupHistoryListeners();
});