
//Função: validarProduto(idNomeProduto. idCodProduto. idQtidadeProduto)
//Verifica se foram informados o nome e o código do produto
//Parâmetro:
// - idNomeProduto: id do campo que contém o nome do produto
// - idCodProduto: id do campo que contém o código do produto
// - idQtidadeProduto: id do campo que contém a quantidade do produto
// OBS: Se faltar alguma informação (nome ou código do produto) aparecerá uma mensagem de erro. Em caso de 
//sucesso (todas as informações preenchidas), chama a função cadastrarProduto(...)
//Retorno: nenhum

const { AlertDescription } = require("@chakra-ui/react");

function validarProduto(idNomeProduto, idCodProduto, idQtidadeProduto){ 
    let nome = document.getElementById(idNomeProduto).value;
    let codigo = document.getElementById(idCodProduto).value;
    let qtidade = document.getElementById(idQtidadeProduto).value;

    if (nome == "")
        alert("Nome do produto não pode estar em branco. Favor preenchê-lo");

    else if(codigo == "")
        alert("Código do produto não pode estar em branco. Favor preenchê-lo");

    else cadastrarProduto(nome, codigo, parseInt(qtidade));

}

//Função: cadastrarProduto(produto, codig, qtidade)
//Cadastra um novo produto (nome, código e quantidade) no estoque
//Parâmetros:
// - produto: nome do produto a a ser cadastrado no estoque (Ex: Calçado)
// - codig: código do produto a ser cadastrado no estoque (Ex: C01)
// - qtidade: quantidade do produto a ser cadastrada no estoque (Ex: 2)
//OBS: Após cadastrar o novo produto no estoque, atualiza a quantidade de itens na sacola, ou seja, chama a função atualizarTotalEstoque()
//Retorno: nenhum

function cadastrarProduto(produto, codig, qtidade){
    let novoProduto = {nome:produto, codigo:codig, quantidade:qtidade};

    if(typeof(Storage) !== "undefined"){
        let produtos = localStorage.getItem('produtos');
        if (produtos == null) produtos = []; //Nenhum produto foi cadastrado
        else produtos - JSON.parse(produtos);
        produtos.push(novoProduto); //Adiciona um novo produto
        localStorage.setItem("produtos", JSON.stringify(produtos))
        alert("Foram cadastradas com sucesso"+qtidade+"unidades do produto".produto+"!");
        atualizarTotalEstoque("totalEstoque");
        location.reload();
    }

    else alert("A versão do seu navegador é muito antiga. Por isso, não será possivel executar a aplicação")
}


//Função: atualizarTotalEstoque(idCampo)
//Incrementa a quantidadde de itens cadastrado no estoque (sacola localizada no canto superior da tela)
//Parâmetros:
// - idCampo: identificador do campo que contem a quantidade de itens no estoque
//Retorno: nenhum

function atualizarTotalEstoque(idCampo){
    localStorage.setItem("totalestoque",++document.getElementById(idCampo).innerHTML)
}

//Função: carregarTotalEstoque(idCampo)
//Incrementa a quantidade de itens cadastrado no estoque (sacola localizada no canto superior da tela)
//Parâmetros:
// - idCampo: identificador do campo que contem a quantidade de itens no estoque
//Retorno: nenhum

function carregarTotalEstoque(idCampo){
     
    if (typeof(Storage) !== "undefined"){
        let totalEstoque = localStorage.getItem("totalEstoque");
        if(totalEstoque == null) totalEstoque = 0;
        document.getElementById(idCampo).innerHTML = totalEstoque;
    }
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação")
}

//Exibe todos os itens do estoque (nome, código e quantidade)
//Retorno: nenhum

function listarEstoque(){
    if (typeof(Storage) !== 'undefined'){
        let produtos = localStorage.getItem("produtos");
        document.write("<h1>Estoque</h1>")
        if (produtos == null)
            document.write("<h3>Ainda não há nenhum item no estoque</h3>");
        else {
            produtos = JSON.parse(produtos);
            produtos.forEach(produto => {
                document.write("<ul");
                document.write("<li>Nome do produto:"+produto.nome+"</li>");
                document.write("<li>Código do produto:"+produto.codigo+"</li>");
                document.write("<li>Quantidade no estoque:"+produto.quantidade+"</li>");
                document.write("</ul>");
            });
        }
    }
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível visualizar o estoque!")
}