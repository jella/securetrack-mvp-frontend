# SecureTrack - Front-End

Este é o repositório do **front-end** da aplicação SecureTrack. Ele consiste em uma **Single Page Application (SPA)** desenvolvida com **HTML, CSS, JavaScript** e **Bootstrap**, projetada para consumir a API do backend.

---

## 🚀 Funcionalidades

- Cadastro de ativos e controles de segurança.
- Listagem de ativos e controles.
- Relatórios de conformidade.
- Navegação fluida entre as telas, sem recarregamento completo.

---

## 🛠️ Configuração do Ambiente

Siga os passos abaixo para configurar o ambiente e iniciar o projeto.

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

### 2. 🚀 Como executar via Docker

### 1. Clone o projeto

```bash
git clone https://github.com/seu-usuario/securetrack.git
cd securetrack
```

### 3.  Build da imagem Docker
```bash
docker build -t securetrack-app .
```

4. Suba o container
```bash
docker run -d -p 8000:8000 --name securetrack securetrack-app
O frontend estará disponível em http://localhost:8000


## 🔗 Integração com o Backend

O front-end consome a API do backend para gerenciar os dados. Certifique-se de que o servidor do backend está ativo. Consulte o [repositório do backend](https://github.com/jella/securetrack-mvp-api.git) para mais detalhes.

### Configuração da API

Certifique-se de que o backend está rodando em [http://localhost:8000/](http://localhost:8000/). Acesse os seguintes endpoints para interagir com a API:

- **Listar Ativos (GET):** `/ativos`
- **Criar Ativo (POST):** `/ativos/`
- **Listar Controles (GET):** `/controles`
- **Listar Responsaveis (GET):** `/responsaveis`

---

## 👥 Contribuidores

- **Juliana Medella** - [LinkedIn](https://www.linkedin.com/in/juliana-medella/)
```