# Gerenciador de Despesas

O **Gerenciador de Despesas** é um sistema simples que permite aos usuários registrar suas despesas e acompanhar seu saldo. O aplicativo oferece funcionalidades de registro e login, cadastro de despesas com título, tipo, valor, data e uma imagem do boleto da despesa. Além disso, o usuário pode gerenciar suas despesas, marcando-as como pagas, editando ou deletando registros, e visualizando quanto já foi pago e quanto ainda está devendo.

## Funcionalidades

- **Registro de usuário**: Os usuários podem se registrar no sistema com um e-mail e senha.
- **Login de usuário**: Após o registro, os usuários podem fazer login para acessar o sistema.
- **Cadastro de despesas**: Os usuários podem adicionar despesas com informações como:
  - Tipo da despesa (ex: Alimentação, Moradia, Transporte, etc.)
  - Título da despesa (ex: Conta de luz, Aluguel, etc.)
  - Valor da despesa
  - Data da despesa
  - Imagem do boleto (upload de arquivos)
- **Visualização das despesas**: O sistema apresenta todas as despesas cadastradas pelo usuário em uma interface de fácil visualização.
- **Gestão de despesas**:
  - **Editar despesas**: O usuário pode editar as informações de uma despesa cadastrada.
  - **Deletar despesas**: O usuário pode excluir uma despesa.
  - **Marcar como pago**: O usuário pode marcar uma despesa como paga.
  - **Saldo**: O sistema calcula automaticamente quanto o usuário já pagou e quanto ainda está devendo.
  
## Tecnologias

- **Frontend**: React, React Router, CSS
- **Backend**: Node.js, Express
- **Banco de Dados**: MongoDB

## Como utilizar
- Utilize tanto na pasta backend quanto na pasta frontend o comando npm install para instalar as dependências do projeto
- Crie um banco no mongo db atlas, e no arquivo connect utilize os dados disponíveis por ele


