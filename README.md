# Anotta - API de Gerenciamento de Tarefas

Anotta é uma API RESTful construída com Express.js que fornece funcionalidades de gerenciamento de tarefas com autenticação segura e integração com banco de dados PostgreSQL.

## Funcionalidades

- Criar, ler, atualizar e deletar tarefas
- Acompanhamento do status das tarefas (PENDING, IN_PROGRESS, COMPLETED)
- Estatísticas das tarefas
- Autenticação por chave de API
- CORS habilitado
- Integração com banco de dados PostgreSQL

## Pré-requisitos

- Node.js
- Banco de dados PostgreSQL
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/williamosilva/anotta-express
cd anotta
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` baseado no `.env.example` e preencha sua configuração:
```
PORT=<sua-porta>
DATABASE_URL=<sua-string-de-conexao-postgresql>
API_SECRET=<sua-chave-secreta-da-api>
```

4. Inicie o servidor:
```bash
npm start
```

## Estrutura do Projeto

```
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   └── taskRoutes.js
│   └── services/
│       └── taskService.js
└── api/
    └── index.js
```

## Endpoints da API

Todos os endpoints requerem o cabeçalho `x-api-key` para autenticação.

### Tarefas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/tasks` | Criar uma nova tarefa |
| GET | `/tasks` | Buscar todas as tarefas |
| PUT | `/tasks/:id` | Atualizar uma tarefa |
| DELETE | `/tasks/:id` | Deletar uma tarefa |
| GET | `/tasks/stats` | Buscar estatísticas das tarefas |



## Esquema do Banco de Dados

A aplicação usa um banco de dados PostgreSQL com o seguinte esquema:

```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK(status IN ('PENDING', 'IN_PROGRESS', 'COMPLETED')) DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## Segurança

- Autenticação por chave de API é necessária para todos os endpoints
- CORS está habilitado com opções configuráveis
- SSL está habilitado para conexões com o banco de dados

## Tratamento de Erros

A API retorna códigos de status HTTP apropriados:

- 200: Sucesso
- 201: Recurso criado
- 400: Requisição inválida
- 401: Não autorizado
- 404: Recurso não encontrado
- 500: Erro do servidor


## Licença

[Licença MIT](LICENSE)
