// Primeiramente vamos definir uma variável e puxar do documento do HTML o h1 que geralmetne é usado para o título
//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

// Agora a ideia é fazer igual com o parágrafo
//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10:';

// Para criarmos uma lista com os números que já foram sorteados 
let numerosSorteados = [];

// Variável criada para definir o valor máximo do sorteio
let numeroMaximo = 100;

// Variável criada para a função 'gerarNumeroAleatorio'
let numeroSecreto = gerarNumeroAleatorio();

// Variável criada para contagem de tentativas de chutes
let tentativas = 1;

// Se esse código precisar de muitos seletores, teriamos que repetir os códigos acima muitas vezes
// Para evitar uma quantidade muito grande de repetição desse código, podemos criar uma função para isso
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

// Criando uma função para exibir a mensagem inicial
function mensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e '+ numeroMaximo);
}

mensagemInicial();

// Sempre que criamos uma função no html e queremos utilizar no JS temos que usar o mesmo nome
// Criaremos uma função(um trecho que um código que tem uma funcionalidade)
function verificarChute() {
    // Criamos um novo vampo para pegar o valor do chute e comparar com o valor do numero secreto
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas.' : 'tentativa.';
        exibirTextoNaTela('p', 'Você descobriu o número secreto com ' + tentativas + ' ' + palavraTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else { 
        if (chute > numeroSecreto) { 
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

// Agora vamos criar uma função para gerar um número aleatório
// O 'return' serve para dizer para o programa armazenar o retorno dessa função no parametro criado 'numeroSecreto'
// Metodo 'includes'' verifica se o valor já está na lista
function gerarNumeroAleatorio() {
     let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
     // Abaiaxo vamos criar uma variável para definir a quantidade de elementos dentro da lista
     let quantidadeDeElementosNaLista = numerosSorteados.length;
     
     // Sabendo a quantidade de elementos que essa lista tem, podemos fazer uma verificação para saber se o número máximo já foi atingido
    if (quantidadeDeElementosNaLista == numeroMaximo) {
        numerosSorteados = [];
    }

     if (numerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
     } else {
        // O método push, adiciona o parametro escolhido sempre ao final da lista que está selecionada
        numerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
     }
}

// Criamos uma função para limpar o campo de texto após um chute
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

// Criando a função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}