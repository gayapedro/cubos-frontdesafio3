![](https://i.imgur.com/xG74tOh.png)

# Desafio Front-end - Módulo 3

[VOLTAR PARA SUMÁRIO](https://github.com/cubos-academy/desafio-modulo-03)

A empresa que você está trabalhando recebeu uma demanda de um cliente muito importante, trata-se de um projeto de dashboard para um Market Place, onde o usuário deve se cadastrar e logar na dashboard, após o login ele poderá adicionar, remover, excluir e alterar produtos da sua loja, bem como fazer a edição do seu perfil. Cada usuário irá representar uma loja no Market Place. Lembre-se, esse é um cliente muito importante e você é o responsável por entregar da melhor maneira a solução para o problema dele.

[Visualização do Desafio](https://desafio-03.netlify.app)

## Front-end

Telas que precisam ser desenvolvidas:

## Áreas não protegidas

### Cadastro de usuário: `/cadastro`
- Funcionalidades obrigatórias:
    - Validar a igualdade das senhas
    - Validar os campos obrigatórios (consultar nos requisitos do back-end)
    - Enviar os dados do formulário para a rota `POST /usuarios`
    - Redirecionar para a rota de login (`/`);
    - Inputs:
        - nome
        - nome_loja
        - email
        - senha
        - senhaConfirmacao
- Funcionalidades extras: 
    - Controle de estado de requisições (erro e carregamento)
        
<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>react-hook-form</code></li>
    <li><code>react-router-dom</code></li>
    <li><code>fetch</code></li>
    <li>
        componentes <code>TextField</code>,             <code>Backdrop</code>, <code>CircularProgress</code>, <code>Alert</code> e <code>Button</code> do Material UI
    </li>
    </ul>
</details>



### Login: `/`
- Funcionalidades obrigatórias:
    - Validar os campos obrigatórios (consultar nos requisitos do back-end)
    - Enviar os dados do formulário para a rota `POST /login`
    - Salvar o `token` em um *contexto*
    - Redirecionar para a rota de produtos (`/produtos`);
    - Inputs:
        - email
        - senha
- Funcionalidades extras: 
    - Controle de estado de requisições (erro e carregamento)

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>react-hook-form</code></li>
    <li><code>react-router-dom</code></li>
    <li><code>fetch</code></li>
    <li><code>context</code></li>
    <li>
        componentes <code>TextField</code>,             <code>Backdrop</code>, <code>CircularProgress</code>, <code>Alert</code> e <code>Button</code> do Material UI
    </li>
    </ul>
</details>

## Áreas protegidas

### Produtos: `/produtos`

- Funcionalidades obrigatórias:
    - Carregamento dos produtos da loja (`GET /produtos`)
    - Ao clicar no card do produto, redirecionar para a rota de (`/produto/:id/editar`)
    - Ao clicar no icone de lixo no card do produto, abrir um modal e se o cliente confirmar, deletar o produto (`DELETE /produtos/:id`)
    - Ao clicar no botão de "ADICIONAR PRODUTO", redirecionar para a rota de (`/produtos/novo`) 
- Funcionalidades extras: 
    - Controle de estado de requisições (erro e carregamento)

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>fetch</code></li>
    <li><code>context</code></li>
    <li><code>react-router-dom</code></li>
    <li>
    componentes <code>TextField</code>,             <code>Backdrop</code>, <code>CircularProgress</code>, <code>Snackbar</code>code>, <code>Alert</code>, <code>Grid</code> e <code>Button</code> do Material UI
    </li>
    </ul>
</details>

### Editar Produtos: `/produtos/:id/editar`

- Funcionalidades obrigatórias:
    - Como a atualização dos dados do produto pode ser parcial (somente um campo por ex), não é obrigatório carregar os dados do produto nesta tela e nem verificar os dados obrigatórios.
    - Enviar os dados do formulário para a rota `PUT /produtos/:id`
    - Redirecionar para a rota de produtos (`/produtos`);
    - Inputs:
        - nome 
        - preco
        - estoque
        - descricao
        - imagem (link para uma imagem)
- Funcionalidades extras: 
    - Controle de estado de requisições (erro e carregamento)

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>fetch</code></li>
    <li><code>react-hook-form</code></li>
    <li><code>context</code></li>
    <li><code>react-router-dom</code></li>
    <li>
    componentes <code>TextField</code>,             <code>Backdrop</code>, <code>CircularProgress</code>, <code>Snackbar</code>, <code>Alert</code> e <code>Button</code> do Material UI
    </li>
    <li><img src="https://i.imgur.com/OAxmxYB.png"></li>
    </ul>
</details>

### Adicionar Produtos: `/produtos/novo`

- Funcionalidades obrigatórias:
    - Enviar os dados do formulário para a rota `POST /produtos`
    - Redirecionar para a rota de produtos (`/produtos`);
    - Inputs:
        - nome 
        - preco
        - estoque
        - descricao
        - imagem (link para uma imagem)
- Funcionalidades extras: 
    - Controle de estado de requisições (erro e carregamento)

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>fetch</code></li>
    <li><code>react-hook-form</code></li>
    <li><code>context</code></li>
    <li><code>react-router-dom</code></li>
    <li>
    componentes <code>TextField</code>,             <code>Backdrop</code>, <code>CircularProgress</code>, <code>Snackbar</code>, <code>Alert</code> e <code>Button</code> do Material UI
    </li>
    </ul>
</details>

### Perfil de usuário: `/perfil`

- Funcionalidades obrigatórias:
    - Visualização dos dados do perfil.
    - Redirecionar para a rota de perfil (`/perfil/editar`);
    - Inputs (não precisamos controlá-los):
        - nome 
        - nome_loja
        - email
- Funcionalidades extras: 
    - Controle de estado de requisições (erro e carregamento)

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>fetch</code></li>
    <li><code>context</code></li>
    <li><code>react-router-dom</code></li>
    <li>
    componentes <code>TextField</code>,             <code>Backdrop</code>, <code>CircularProgress</code>, <code>Snackbar</code>code>, <code>Alert</code> e <code>Button</code> do Material UI
    </li>
    </ul>
</details>

### Edição de usuário: `/perfil/editar`

- Funcionalidades obrigatórias:
    - Como a atualização dos dados do perfil pode ser parcial (somente um campo por ex), não é obrigatório carregar os dados do usuário nesta tela e nem verificar os dados obrigatórios.
    - Se a senha for informada, validar a igualdade das senhas
    - Enviar os dados do formulário para a rota `PUT /perfil`
    - Redirecionar para a rota de perfil (`/perfil`);
    - Inputs:
        - nome 
        - nome_loja
        - email
        - senha
        - senhaConfirmacao
- Funcionalidades extras: 
    - Controle de estado de requisições (erro e carregamento)

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>fetch</code></li>
    <li><code>react-hook-form</code></li>
    <li><code>context</code></li>
    <li><code>react-router-dom</code></li>
    <li>
    componentes <code>TextField</code>,             <code>Backdrop</code>, <code>CircularProgress</code>, <code>Snackbar</code>code>, <code>Alert</code> e <code>Button</code> do Material UI
    </li>
    <li><img src="https://i.imgur.com/OAxmxYB.png"></li>
    </ul>
</details>

## Componentes

### Navbar

- Funcionalidades obrigatórias:
    - Redirecionar o usuário para as rotas `/produtos` e `/perfil`
    - Deslogar (remover o token do *contexto*)

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>material-icons</code></li>
    <li><code>react-router-dom</code></li>
    <li>Usar o componente <code>NavLink</code> do react-router-dom para conseguir renderizar os icones ativos</li>
    </ul>
</details>


## Requisitos obrigatórios
- Sua aplicação deve ser desenvolvida com `React`;
- Trabalhar com `Hooks` (`useState`, `useEffect`, `useRef`...)
- Trabalhar com `componentização`;
- Utilizar `context API` (Context);
- Utilizar roteamento (`react-router-dom`);
- Utilizar Material UI para criação das telas;
- As requisições devem ser feitas utilizando `fetch`;
- Integração ao back-end (sua API ou [https://desafio-m03.herokuapp.com](https://desafio-m03.herokuapp.com));
- Seguir a estrutura de layout do wireframe que está no arquivo `.fig` que se encontra na pasta raiz do desafio;


## Links Úteis
- Documentação do ReactJS: https://reactjs.org/
    - Context API: https://reactjs.org/docs/context.html
    - Hooks (useState, useEffect, useRef): https://reactjs.org/docs/hooks-intro.html
- Documentação react-router-dom: https://reactrouter.com/web/guides/quick-start
- Documentação react-hook-form: https://react-hook-form.com/
- Documentação Material UI: https://material-ui.com/
- Documentação Fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch


## Aulas Úteis
- [Context](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/24/05/2021/aula/40d22af1-7ae3-48ee-84e0-dc4858a46729/c882bfa1-fa0b-4b1a-86d6-f1ea094e2377)
- [Gerenciando o estado de aplicações](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/26/05/2021/aula/812c9c5f-2657-4228-a3a9-e430036a421b/e0680e8a-8baf-4118-8b91-7f34930099a7)
- [Opções com o Fetch](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/26/05/2021/aula/812c9c5f-2657-4228-a3a9-e430036a421b/986936fb-e2d6-4f8c-803c-2f2aceb4200c)
- [Estilizando links ativos](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/31/05/2021/aula/092b294b-776e-485d-bd9f-14131cc48062/0f47afe2-a658-4b69-b2d2-f010eae5fa9a)
- [Rotas protegidas](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/31/05/2021/aula/092b294b-776e-485d-bd9f-14131cc48062/380ba9df-4876-4ac5-b975-8290ade35a0e)
- [Redirecionamento de rotas](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/31/05/2021/aula/092b294b-776e-485d-bd9f-14131cc48062/ed0feaa8-dbb3-4404-a6f1-30a42fe6e701)
- [Parametros de rota](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/31/05/2021/aula/092b294b-776e-485d-bd9f-14131cc48062/009aca52-7f2e-4674-9716-dff03899d91f)
- [Apresentando o react-hook-form](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/02/06/2021/aula/0c0ad3ca-7ca0-4d09-8852-7f8d421948c9/4cc61e3f-9eed-48ba-9b6b-0c61636a8bf1)
- [Validações com o react-hook-form](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/02/06/2021/aula/0c0ad3ca-7ca0-4d09-8852-7f8d421948c9/c5ac1755-4b9c-46f4-850f-8bd053174047)
- [useLocalStorage](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/07/06/2021/aula/7efd6594-b8d9-4c0c-a41e-5eb168e84dba/72bb0203-1b58-4e9d-9bed-1a0f854e7263)
- [Primeiros componentes do Material UI](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/07/06/2021/aula/7efd6594-b8d9-4c0c-a41e-5eb168e84dba/acda31cc-43cf-4dc8-be51-738b38aa0d66)
- [Resumão React](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/09/06/2021/aula/8b162b03-22e3-4c49-bf9f-d5388ae852c2/e12396ad-5ca2-4ad8-9303-c1c6b36e12e7)
- [Continuação Resumão](https://plataforma.cubos.academy/curso/56bc9b33-842d-48ae-94ad-32d5e7a52b8d/data/11/06/2021/aula/8f161266-3cc9-491e-8ac2-6a5611fc719d/3abac795-c391-48ca-8c22-ec34ce62b381)

**LEMBRE-SE**: Feito é melhor que perfeito!!!


###### tags: `front-end` `módulo 3` `React` `HTML` `CSS` `desafio`
