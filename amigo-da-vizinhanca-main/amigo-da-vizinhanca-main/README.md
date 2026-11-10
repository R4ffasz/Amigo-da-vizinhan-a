# Frontend — Amigo da Vizinhança

---

## 1. Sobre o Frontend

O Frontend do projeto Amigo da Vizinhança foi desenvolvido para criar a interface visual de uma aplicação de gerenciamento de uma loja de conveniência de bairro.

A interface permite que os usuários visualizem os produtos disponíveis, pesquisem itens, filtrem por categorias, consultem detalhes dos produtos e realizem uma simulação de compra por meio do carrinho.

---

## 2. Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- LocalStorage do navegador

---

## 3. Estrutura das páginas

O Frontend é composto pelas seguintes páginas:

| Página | Descrição |
|---|---|
| `index.html` | Página inicial, com cabeçalho, pesquisa, banner, categorias e listagem de produtos. |
| `detalhes.html` | Apresenta as informações individuais de cada produto, incluindo imagem, nome, categoria, descrição, preço e quantidade. |
| `carrinho.html` | Exibe os produtos adicionados ao carrinho, permitindo alterar quantidades, remover itens e visualizar o valor total. |

---

## 4. Organização dos arquivos

- **index.html:** estrutura da página inicial e apresentação dos produtos.
- **detalhes.html:** estrutura da página de detalhes dos produtos.
- **carrinho.html:** estrutura da página do carrinho de compras.
- **style.css:** responsável pela aparência visual, cores, espaçamentos, organização dos elementos e adaptação para diferentes tamanhos de tela.
- **script.js:** responsável pelas funcionalidades e interações do sistema.
- **imagens/:** pasta destinada às imagens utilizadas na apresentação dos produtos.

---

## 5. Funcionalidades desenvolvidas

O Frontend possui as seguintes funcionalidades:

- **Pesquisa de produtos:** permite localizar produtos pelo nome utilizando o campo de busca.
- **Filtro por categorias:** organiza os produtos nas categorias Mercearia, Bebidas, Higiene e Limpeza.
- **Visualização de detalhes:** permite acessar a página individual de cada produto ao clicar em sua imagem ou nome.
- **Seleção de quantidade:** permite aumentar ou diminuir a quantidade desejada antes de adicionar o produto ao carrinho.
- **Adicionar ao carrinho:** permite incluir produtos selecionados na lista de compras.
- **Alteração de quantidades:** permite aumentar ou diminuir a quantidade dos produtos diretamente no carrinho.
- **Remoção de produtos:** permite excluir itens adicionados ao carrinho.
- **Cálculo do total:** calcula automaticamente os valores dos itens e o total da compra.

---

## 6. Funcionamento do JavaScript

O arquivo `script.js` controla as interações entre as páginas e os elementos da interface.

Entre suas responsabilidades estão:

- Identificar os produtos selecionados.
- Realizar a pesquisa e os filtros por categoria.
- Carregar as informações correspondentes na página de detalhes.
- Controlar as quantidades dos produtos.
- Adicionar, atualizar e remover itens do carrinho.
- Calcular os subtotais e o valor total da compra.
- Atualizar as informações exibidas na tela.

---

## 7. Armazenamento dos dados

Foi utilizado o LocalStorage do navegador para armazenar as informações do carrinho de compras.

Dessa forma, os produtos adicionados permanecem salvos durante a navegação entre as páginas e continuam disponíveis mesmo após atualizar o navegador.

As informações do carrinho são recuperadas e atualizadas por meio do JavaScript.

---

## 8. Identidade visual

A interface utiliza uma paleta de cores definida para o projeto:

- **Vermelho:** `#DE0606`
- **Azul:** `#007FD7`
- **Cinza escuro:** `#3F3F3F`
- **Vermelho escuro:** `#AC0202`
- **Cinza claro:** `#E2E2E2`
- **Branco:** `#FFFFFF`

O CSS foi utilizado para padronizar os elementos visuais, organizar os produtos em cartões, estilizar botões, campos de pesquisa, categorias e demais componentes das páginas.

Também foram aplicados ajustes de responsividade para melhorar a visualização em diferentes tamanhos de tela.

---

## 9. Observações

O Frontend foi desenvolvido com HTML, CSS e JavaScript, sendo responsável pela interface e pelas interações apresentadas ao usuário.

O carrinho de compras utiliza o armazenamento local do navegador (LocalStorage) para manter os itens durante a navegação.

Esta documentação descreve a camada de interface do projeto Amigo da Vizinhança.
