  
const API_BASE_URL = 'http://localhost:5000';

async function makeRequest(method, endpoint, data = null, headers = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    method,
    credentials: 'include', // <- Adicione isso
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro na requisição');
    }
    return await response.json().catch(() => ({}));
  } catch (error) {
    console.error(`Erro em ${method} ${endpoint}:`, error.message);
    throw error;
  }
}


// Define o objeto global `api`
window.api = {
  get: (endpoint, headers = {}) => makeRequest('GET', endpoint, null, headers),
  post: (endpoint, data, headers = {}) => makeRequest('POST', endpoint, data, headers),
  put: (endpoint, data, headers = {}) => makeRequest('PUT', endpoint, data, headers),
  delete: (endpoint, headers = {}) => makeRequest('DELETE', endpoint, null, headers),
};

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

async function atualizarTabelaAtivos() {
  const loadingElement = document.getElementById('ativos-loading');
  if (loadingElement) loadingElement.style.display = 'block';

  try {
    const ativos = await api.get('/ativos/');
    const tableBody = document.querySelector('#tabela-ativos tbody');
    const teste = VIEWS.ASSOCIACAO;
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
              <button class="remover-ativo action-button" onclick="deletarAtivo(${item.id})">Remover</button>
              <button id="controles-associacao-btn" class="associar-controle action-button" "data-id="${item.id}" onclick="loadViewAssociacao('${VIEWS.ASSOCIACAO}',${item.id})">Associar Controle</button>
            </td>
          </tr>`
        );
      });
      limpaCampoAtivos('form-cadastro-ativo')
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
    const controles = await api.get('/controles/'); // Chamada à API
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
             <button class="remover-controle action-button" onclick="deletarControle(${item.id})">Remover</button>
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
 * Atualiza a modal associacao controles
 */
async function atualizarTabelaAssociacaoControles(id) {
  const loadingElement = document.getElementById('controles-loading'); // Elemento de carregamento, caso exista
  if (loadingElement) loadingElement.style.display = 'block'; // Exibir indicador de carregamento

  try {
    const controles = await api.get('/controles/'); // Chamada à API
    const ativo = await api.get('/ativos/'+ id + "/"); // Chamada à API
    const tableBody = document.querySelector('#tabela-controles-associacao tbody');
    if (!tableBody) return; // Se a tabela não existir, termina a execução

    // Reduz manipulações repetitivas no DOM
    let html = "Ativo:" + ativo.nome  +  "<input type='hidden' id='ativo-id' data-id='"+ id +"'>";
    controles.forEach(item => {
      html += `
        <tr>
          <td>
             <input type='checkbox' id='checkbox-controle' value='${item.id}'>
          </td>
          <td>
             ${item.descricao}
          </td>

          <td>
             ${item.categoria}
          </td>
          <td>
             ${item.codigo}
          </td>

        </tr>

      `;
    });
    limpaCampoAtivos('="form-cadastro-controle"')
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
      await api.post('/ativos/', dadosAtivo);
      atualizarTabelaAtivos();
  } catch (error) {
      console.error('Erro ao salvar ativo:', error);
  }
}

/**
 * Remove um ativo via API.
 * @param {number} ativoId - O ID do ativo a ser removido.
 */
async function deletarAtivo(ativoId) {
  // Confirma a exclusão
  const confirmacao = confirm('Tem certeza que deseja remover este ativo?');
  if (!confirmacao) return;

  try {
    // Faz a chamada para a API usando api.delete
    const resultado = await api.delete(`/ativos/${ativoId}/`);
    alert(resultado.message || 'Ativo removido com sucesso!');

    // Encontra e remove a linha correspondente no DOM
    const linha = document.querySelector(`button[onclick="deletarAtivo(${ativoId})"]`).closest('tr');
    if (linha) linha.remove();
  } catch (error) {
    console.error('Erro ao remover ativo:', error);
    alert('Falha ao remover ativo.');
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
      await api.post('/controles/', dadosControle);
      atualizarTabelaControles();
  } catch (error) {
      console.error('Erro ao salvar controle:', error);
  }
}


/**
 * Função para associar controles a um ativo.
 * Envia requisições POST ou PUT para criar ou atualizar associações.
 * @param {number} ativoId - O ID do ativo.
 */
async function salvarAssociacoes(ativoId) {
    try {
        // Captura todos os checkboxes da lista de controles
        const checkboxes = document.querySelectorAll('.controle-checkbox');

        for (const checkbox of checkboxes) {
            const controleId = checkbox.dataset.controleId; // Captura o ID do controle associado
            const isChecked = checkbox.checked; // Verifica se o checkbox está marcado

            if (isChecked) {
                // Tenta associar com POST
                const response = await fetch(`/conformidade/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ativo_id: ativoId,
                        controle_id: controleId,
                        status: "Pendente"
                    }),
                });

                // Caso o POST falhe (já existe), envia PUT para atualizar
                if (!response.ok && response.status === 400) {
                    await fetch(`/conformidade/${ativoId}/${controleId}/`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status: "Conforme" }),
                    });
                }
            }
        }

        alert("Associações salvas com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar associações:", error);
        alert("Ocorreu um erro ao salvar as associações.");
    }
}

async function salvarConformidade() {
  try {
      // Obtém o ID do ativo associado
      const ativoIdElement = document.getElementById('ativo-id');
      if (!ativoIdElement) {
          alert('ID do ativo não encontrado.');
          return;
      }

      const ativoId = ativoIdElement.dataset.id;

      // Seleciona todos os checkboxes marcados na tabela de associação de controles
      const checkboxes = document.querySelectorAll('#tabela-controles-associacao tbody input[type="checkbox"]:checked');
      if (checkboxes.length === 0) {
          alert('Nenhum controle foi selecionado para associação.');
          return;
      }

      // Coleta os IDs dos controles selecionados
      const controleIds = Array.from(checkboxes).map(checkbox => checkbox.value);

      // Dados a serem enviados para o backend
      const dadosConformidade = {
          ativoId: ativoId,
          controleIds: controleIds
      };

      // Faz a chamada à API para salvar a conformidade
      const response = await api.post('/conformidade/', dadosConformidade);
      alert(dadosConformidade)
      // Exibe uma mensagem de sucesso ao usuário
      alert(response.message || 'Conformidade salva com sucesso!');
      console.log('Resposta da API:', response);
      alert(response)

      // Opcional: Atualizar a tabela ou interface
      loadView(view)
  } catch (error) {
      console.error('Erro ao salvar conformidade:', error);
  }
}


/**
 * Remove um controle via API.
 * @param {number} controleId - O ID do controle a ser removido.
 */
async function deletarControle(controleId) {
  // Confirma a exclusão
  const confirmacao = confirm('Tem certeza que deseja remover este controle?');
  if (!confirmacao) return;

  try {
    // Faz a chamada para a API usando api.delete
    const resultado = await api.delete(`/controles/${controleId}`);
    alert(resultado.message || 'Controle removido com sucesso!');

    // Encontra e remove a linha correspondente no DOM
    const linha = document.querySelector(`button[onclick="deletarControle(${controleId})"]`).closest('tr');
    if (linha) linha.remove();
  } catch (error) {
    console.error('Erro ao remover controle:', error);
    alert('Falha ao remover controle.');
  }
}



/**
 * Atualiza a tabela de conformidade com os dados do backend.
 * @param {string} statusFiltro - Filtro para o status (implementado, pendente, em andamento, Não Conforme ou vazio para todos).
 */
async function atualizarRelatorioConformidade(statusFiltro) {
  try {
      // Monta a URL com o filtro, se fornecido
      const url = statusFiltro ? `/conformidade/status?status=${statusFiltro}` : '/conformidade/status/';

      // Chamada ao endpoint do backend
      const dadosConformidade = await api.get(url);

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

function mostrarFeedback(msg, tipo = 'success') {
  const el = document.getElementById('form-feedback');
  el.className = `alert alert-${tipo} mt-3`;
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => el.style.display = 'none', 4000);
}

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  setupHistoryListeners();
});