//let titulo = document.querySelector('h1'); //serve para apontar pra h1 dentro do html
//titulo.innerHTML = 'Jogo do número secreto'; //serve para escrever em h1 dentro do html

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Função que exibe coisas na tela
function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Famele', { rate: 1.2 });
}

function exibirMensagemInicial() {
  exibirTextoNaTela('h1', 'Jogo do número secreto');
  exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();
// Função sem parametro e sem retorno
function verificarChute() {
  console.log('O botão foi clicado!');
  console.log(numeroSecreto);
  let chute = document.querySelector('input').value; //.value é porque não é um texto definido é um valor que o usuário vai inserir
  console.log(chute == numeroSecreto);

  if (chute <= 0 || chute >= 11) {
    exibirTextoNaTela('h1', 'Tente Novamente !!!');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
  } else {
    if (chute == numeroSecreto) {
      exibirTextoNaTela('h1', 'Acertou !!!');
      let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
      let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
      exibirTextoNaTela('p', mensagemTentativas);
      document.getElementById('reiniciar').removeAttribute('disabled'); //O botão que queromos acessar está com atributo disable no HTML,quando acertamos o numero secreto devemos ativar o botão para reiniciar o jogo, como temos dois botões precisamos pegar o ID do segundo botão para ter acesso a mudar o atributo dele para acessar o botão pelo ID usa: document.getElementById('reiniciar') e para mudar o ID usa: ..removeAttribute('disabled');
    } else {
      exibirTextoNaTela('h1', 'Tente Novamente !!!');
      if (chute > numeroSecreto) {
        exibirTextoNaTela('p', `O número secreto é menor que ${chute}!`);
      } else {
        exibirTextoNaTela('p', `O número secreto é maior que ${chute}!`);
      }
      tentativas++;
      limparCampo();
    }
  }
}

// Função com retorno
function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; //tamanho da lista
  if (quantidadeDeElementosNaLista == 10) {
    listaDeNumerosSorteados = [];
  }
  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    //includes verifica se o item ja está na lista
    return gerarNumeroAleatorio(); //recursão, vai pedir pra gerar um novo numero aleatorio caso o numero ja esteja na lista
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido); //push serve para adicionar item na lista em sequência
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector('input');
  chute.value = '';
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
}
