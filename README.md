# Better Pets Backend

## Ideia Geral do Projeto

O Better Pets Backend é uma API desenvolvida em Node.js com TypeScript para gerenciar informações de animais em um sistema de adoção, clínicas veterinárias ou petshops. O projeto visa fornecer endpoints RESTful para cadastro, consulta, atualização e remoção de animais, além de recursos de saúde, validação e documentação.

## Dependências Principais

- Node.js
- TypeScript
- ts-node
- Express
- Zod (validação)
- Prettier (formatação)
- Husky (hooks de git)
- Jest (testes automatizados)

## Estrutura das Pastas

```
source/
  app.ts                # Ponto de entrada da aplicação
  __tests__/            # Testes automatizados
  config/               # Configurações (database, swagger, zod)
  controllers/          # Controllers das rotas
  core/                 # Classes e serviços base
  docs/                 # Documentação da API
  errors/               # Classes de erro
  messages/             # Mensagens de validação e sistema
  middlewares/          # Middlewares globais
  models/               # Modelos de dados
  repositories/         # Repositórios de acesso a dados
  routers/              # Definição das rotas
  schemas/              # Schemas de validação
  services/             # Serviços de negócio
  shared/               # Utilitários e tipos compartilhados
  utils/                # Funções utilitárias
  validation/           # Regras e helpers de validação
uploads/                # Uploads de arquivos
docs/                   # Documentação adicional
postman/                # Coleções e ambientes para testes no Postman
```

## Testes Automatizados

Os testes estão localizados em `source/__tests__/`. Utilize o Jest para rodar os testes automatizados:

```bash
npm test
```

## Como Instalar e Iniciar o Projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/MathGueff/better-pets-backend.git
   cd better-pets-backend
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente** (se necessário).

4. **Inicie o servidor em modo desenvolvimento:**

   ```bash
   npm run dev
   ```

5. **Acesse a documentação da API** (caso disponível) via Swagger ou Postman.

---

Para dúvidas, consulte a pasta `docs/` ou abra uma issue.
