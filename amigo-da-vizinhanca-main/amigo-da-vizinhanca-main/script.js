document.addEventListener("DOMContentLoaded", function () {

  const campoBusca = document.getElementById("busca");
  const botaoPesquisar = document.getElementById("botaoPesquisar");
  const botoesCategoria = document.querySelectorAll(".categoria");
  const mensagemCarrinho = document.getElementById("mensagemCarrinho");
  const produtos = document.querySelectorAll(".produto");
  const itensCarrinho = document.getElementById("itensCarrinho");
  const totalCarrinho = document.getElementById("totalCarrinho");

  let carrinho = [];

  try {
    carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  } catch (erro) {
    carrinho = [];
  }

  function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }

  function formatarPreco(valor) {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  /* PESQUISA E FILTROS */

  let categoriaSelecionada = "todas";

  function filtrarProdutos() {
    const textoBusca = campoBusca
      ? campoBusca.value.toLowerCase().trim()
      : "";

    produtos.forEach(function (produto) {
      const titulo = produto.querySelector("h3");
      const nome = titulo ? titulo.textContent.toLowerCase() : "";
      const categoria = produto.dataset.categoria;

      const correspondeNome = nome.includes(textoBusca);
      const correspondeCategoria =
        categoriaSelecionada === "todas" ||
        categoria === categoriaSelecionada;

      produto.style.display =
        correspondeNome && correspondeCategoria ? "" : "none";
    });
  }

  if (botaoPesquisar) {
    botaoPesquisar.addEventListener("click", filtrarProdutos);
  }

  if (campoBusca) {
    campoBusca.addEventListener("input", filtrarProdutos);
  }

  botoesCategoria.forEach(function (botao) {
    botao.addEventListener("click", function () {
      categoriaSelecionada = botao.dataset.categoria || "todas";
      filtrarProdutos();

      const secaoProdutos = document.getElementById("produtos");

      if (secaoProdutos) {
        secaoProdutos.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* ADICIONAR PRODUTO AO CARRINHO */

  function adicionarAoCarrinho(produto, quantidadeAdicionar) {
    const existente = carrinho.find(function (item) {
      return item.nome === produto.nome;
    });

    if (existente) {
      existente.quantidade += quantidadeAdicionar;
      existente.imagem = produto.imagem;
      existente.preco = produto.preco;
    } else {
      carrinho.push({
        nome: produto.nome,
        preco: produto.preco,
        quantidade: quantidadeAdicionar,
        imagem: produto.imagem
      });
    }

    salvarCarrinho();
  }

  /* ABRIR DETALHES AO CLICAR NA FOTO OU NO NOME */

  produtos.forEach(function (produto) {
    const titulo = produto.querySelector("h3");
    const imagem = produto.querySelector("img");

    if (!titulo) return;

    function abrirDetalhes() {
      const nome = titulo.textContent.trim();

      window.location.href =
        "detalhes.html?produto=" + encodeURIComponent(nome);
    }

    titulo.style.cursor = "pointer";
    titulo.title = "Ver detalhes do produto";
    titulo.addEventListener("click", abrirDetalhes);

    if (imagem) {
      imagem.style.cursor = "pointer";
      imagem.title = "Ver detalhes do produto";
      imagem.addEventListener("click", abrirDetalhes);
    }
  });

  /* BOTÕES DE ADICIONAR NA PÁGINA INICIAL */

  produtos.forEach(function (produto) {
    const botao = produto.querySelector("button");
    const titulo = produto.querySelector("h3");
    const elementoPreco = produto.querySelector(".preco");
    const imagem = produto.querySelector("img");

    if (!botao || !titulo || !elementoPreco) return;

    botao.addEventListener("click", function () {
      const textoPreco = elementoPreco.textContent
        .replace(/[^\d,.-]/g, "")
        .replace(/\./g, "")
        .replace(",", ".");

      const preco = Number(textoPreco);

      if (!Number.isFinite(preco)) {
        if (mensagemCarrinho) {
          mensagemCarrinho.textContent =
            "Não foi possível identificar o preço.";
        }
        return;
      }

      adicionarAoCarrinho({
        nome: titulo.textContent.trim(),
        preco: preco,
        imagem: imagem ? imagem.getAttribute("src") : ""
      }, 1);

      if (mensagemCarrinho) {
        mensagemCarrinho.textContent =
          titulo.textContent.trim() + " adicionado ao carrinho!";
      }
    });
  });

  /* TELA DE DETALHES */

  const detalheImagem = document.getElementById("detalheImagem");
  const detalheNome = document.getElementById("detalheNome");
  const detalheCategoria = document.getElementById("detalheCategoria");
  const detalheDescricao = document.getElementById("detalheDescricao");
  const detalhePreco = document.getElementById("detalhePreco");
  const quantidadeDetalhe = document.getElementById("quantidadeDetalhe");
  const diminuirQuantidade = document.getElementById("diminuirQuantidade");
  const aumentarQuantidade = document.getElementById("aumentarQuantidade");
  const adicionarDetalhe = document.getElementById("adicionarDetalhe");
  const mensagemDetalhe = document.getElementById("mensagemDetalhe");

  if (detalheImagem && detalheNome && adicionarDetalhe) {

    const catalogo = [
      {
        nome: "Arroz 5kg",
        preco: 28.90,
        categoria: "Mercearia",
        imagem: "imagens/arroz.jpg",
        descricao: "Arroz para acompanhar suas refeições e deixar o dia a dia mais prático."
      },
      {
        nome: "Feijão 1kg",
        preco: 8.50,
        categoria: "Mercearia",
        imagem: "imagens/feijao.jpg",
        descricao: "Feijão para preparar refeições saborosas para toda a família."
      },
      {
        nome: "Refrigerante 2L",
        preco: 9.99,
        categoria: "Bebidas",
        imagem: "imagens/refrigerante.jpg",
        descricao: "Refrigerante de 2 litros, ideal para compartilhar nas refeições e momentos especiais."
      },
      {
        nome: "Sabonete",
        preco: 3.50,
        categoria: "Higiene",
        imagem: "imagens/sabonete.jpg",
        descricao: "Sabonete para fazer parte da sua rotina diária de higiene."
      },
      {
        nome: "Detergente",
        preco: 2.99,
        categoria: "Limpeza",
        imagem: "imagens/detergente.jpg",
        descricao: "Detergente para ajudar na limpeza de pratos, copos e utensílios de cozinha."
      }
    ];

    const parametros = new URLSearchParams(window.location.search);
    const nomeSelecionado = parametros.get("produto");

    const produtoSelecionado = catalogo.find(function (produto) {
      return produto.nome === nomeSelecionado;
    });

    let quantidadeAtual = 1;

    if (produtoSelecionado) {
      detalheImagem.src = produtoSelecionado.imagem;
      detalheImagem.alt = produtoSelecionado.nome;
      detalheNome.textContent = produtoSelecionado.nome;
      detalheCategoria.textContent = produtoSelecionado.categoria;
      detalheDescricao.textContent = produtoSelecionado.descricao;
      detalhePreco.textContent = formatarPreco(produtoSelecionado.preco);
      document.title =
        produtoSelecionado.nome + " - Amigo da Vizinhança";
    } else {
      detalheNome.textContent = "Produto não encontrado";
      detalheDescricao.textContent =
        "Volte para a loja e escolha um produto disponível.";
      detalheImagem.style.display = "none";
      detalhePreco.textContent = "";
      detalheCategoria.textContent = "";
      adicionarDetalhe.disabled = true;
    }

    if (diminuirQuantidade) {
      diminuirQuantidade.addEventListener("click", function () {
        if (quantidadeAtual > 1) {
          quantidadeAtual--;
          quantidadeDetalhe.textContent = String(quantidadeAtual);
        }
      });
    }

    if (aumentarQuantidade) {
      aumentarQuantidade.addEventListener("click", function () {
        quantidadeAtual++;
        quantidadeDetalhe.textContent = String(quantidadeAtual);
      });
    }

    adicionarDetalhe.addEventListener("click", function () {
      if (!produtoSelecionado) return;

      adicionarAoCarrinho(produtoSelecionado, quantidadeAtual);

      if (mensagemDetalhe) {
        mensagemDetalhe.textContent =
          quantidadeAtual + " unidade(s) de " +
          produtoSelecionado.nome +
          " adicionada(s) ao carrinho!";
      }
    });
  }

  /* MOSTRAR E ATUALIZAR O CARRINHO */

  function atualizarCarrinho() {
    if (!itensCarrinho || !totalCarrinho) return;

    itensCarrinho.innerHTML = "";

    let total = 0;
    let quantidadeTotal = 0;

    if (carrinho.length === 0) {
      itensCarrinho.textContent = "Seu carrinho está vazio.";
    }

    carrinho.forEach(function (item) {
      const subtotal = item.preco * item.quantidade;

      total += subtotal;
      quantidadeTotal += item.quantidade;

      const linha = document.createElement("div");
      linha.className = "item-carrinho";

      const imagem = document.createElement("img");
      imagem.className = "imagem-item-carrinho";
      imagem.alt = item.nome;
      imagem.src = item.imagem || "";

      imagem.addEventListener("error", function () {
        imagem.style.display = "none";
      });

      const descricao = document.createElement("p");
      descricao.className = "descricao-item-carrinho";
      descricao.textContent =
        item.nome + " — " + formatarPreco(item.preco) + " cada";

      const controles = document.createElement("div");
      controles.className = "controles-quantidade";

      const diminuir = document.createElement("button");
      diminuir.type = "button";
      diminuir.textContent = "−";

      const quantidade = document.createElement("span");
      quantidade.className = "quantidade-item";
      quantidade.textContent = item.quantidade;

      const aumentar = document.createElement("button");
      aumentar.type = "button";
      aumentar.textContent = "+";

      diminuir.addEventListener("click", function () {
        item.quantidade--;

        if (item.quantidade <= 0) {
          carrinho = carrinho.filter(function (outroItem) {
            return outroItem !== item;
          });
        }

        salvarCarrinho();
        atualizarCarrinho();
      });

      aumentar.addEventListener("click", function () {
        item.quantidade++;
        salvarCarrinho();
        atualizarCarrinho();
      });

      controles.appendChild(diminuir);
      controles.appendChild(quantidade);
      controles.appendChild(aumentar);

      const valorSubtotal = document.createElement("p");
      valorSubtotal.className = "subtotal-item";
      valorSubtotal.textContent = formatarPreco(subtotal);

      const remover = document.createElement("button");
      remover.type = "button";
      remover.className = "botao-remover";
      remover.textContent = "Remover";

      remover.addEventListener("click", function () {
        carrinho = carrinho.filter(function (outroItem) {
          return outroItem !== item;
        });

        salvarCarrinho();
        atualizarCarrinho();
      });

      linha.appendChild(imagem);
      linha.appendChild(descricao);
      linha.appendChild(controles);
      linha.appendChild(valorSubtotal);
      linha.appendChild(remover);

      itensCarrinho.appendChild(linha);
    });

    totalCarrinho.textContent =
      "Total (" + quantidadeTotal + " itens): " +
      formatarPreco(total);
  }

  atualizarCarrinho();

});
