# SecureTrack - Front-End

Este é o repositório do **front-end** da aplicação SecureTrack. Ele consiste em uma **Single Page Application (SPA)** desenvolvida com **HTML, CSS, JavaScript** e **Bootstrap**, projetada para consumir a API do backend.

---

## 🚀 Funcionalidades

- Cadastro de ativos e controles de segurança.
- Listagem de ativos e controles.
- Relatórios de conformidade.
- Navegação fluida entre as telas, sem recarregamento completo.

---

## 🛠️ Configuração do Ambiente Local

Siga os passos abaixo para configurar o ambiente local e iniciar o projeto.

### 1. Clonar o Repositório

Faça o clone deste repositório em sua máquina local:

```bash
git clone https://github.com/jella/securetrack-mvp-api.git
cd system-control-app
```

---

## 📁 Estrutura do Projeto

```plaintext
/system-control-app
├── index.html          # Ponto de entrada principal
├── css/
│   ├── bootstrap.min.css  # Biblioteca Bootstrap
│   ├── styles.css         # Estilização personalizada
├── js/
│   ├── scripts.js         # Scripts gerais
│   ├── navigation.js      # Lógica de navegação
│   ├── dashboard.js       # Lógica da dashboard
└── README.md           # Documentação do projeto
```

### 2. Servir os Arquivos Localmente

Não é necessario usar usar um servidor HTTP para acessar frontend. E só clicar no arquivo index.html na pasta raiz da aplicação (system-control-app). 

*Antes de acessar Certifique-se de que o backend está rodando. 

## 🔗 Integração com o Backend

O front-end consome a API do backend para gerenciar os dados. Certifique-se de que o servidor do backend está ativo. Consulte o [repositório do backend](https://github.com/jella/securetrack-mvp-api.git) para mais detalhes.

### Configuração da API

Certifique-se de que o backend está rodando em [http://127.0.0.1:5000/](http://127.0.0.1:5000/). Acesse os seguintes endpoints para interagir com a API:

- **Listar Ativos (GET):** `/ativos`
- **Criar Ativo (POST):** `/ativos`
- **Listar Controles (GET):** `/controles`

---

## 👥 Contribuidores

- **Juliana Medella** - [LinkedIn](https://www.linkedin.com/in/juliana-medella/)
```