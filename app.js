// Sempre na primeira linha, vamos colocar a lista de números que ja foram sorteados, para não
// ser colocado novamente no jogo!
listaDeNumerosSorteados = [];

let numeroLimite = 10;

numSecreto = gerandoNumAleatorio();

// Colocando tentativas e mostrando na tela do usuário
let tentativas = 1;

// Exibindo as duas mensagens, utilizamos essa função para as duas exibições de forma mais simples
function exibirMensagemNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // Responsável pela voz no jogo
    responsiveVoice.speak(texto,'Brazilian Portuguese Female', {rate:1.2})
}
//Foi criada esta função para poder repetir estas mensagens quando iniciar um novo jogo
function exibirMensagemNaTelaInicial(){
    exibirMensagemNaTela('h1','Bem vindo ao jogo do número secreto!');
    exibirMensagemNaTela('p', 'Escolha um número de 1 - 10');
}
// precisamos chamar a nova função fora de qualquer outra função para ser iniciada na primeira vez que o app.js for lido.
exibirMensagemNaTelaInicial();

//Gerando um número aleatório a cada recarga de página
// tem que por o return para devolver o valor gerado
function gerandoNumAleatorio(){
    // retiramos o return e colocamos a var da lista
    let numeroEscolhido = parseInt((Math.random() * numeroLimite)+1);
    // Zerando a lista caso ela bata a quantidade que a gente pedir para zerar
    let quantidadeDeNumSecretos = listaDeNumerosSorteados.length;
    
    if (quantidadeDeNumSecretos == numeroLimite){
        listaDeNumerosSorteados = [];
    }


    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerandoNumAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}
//Verificando o número secreto, para ver se deu certo!

console.log(`O número secreto é ${numSecreto}`);


// Fazendo o input funcionar
// .value é para colher apenas o valor contido do input
function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute == numSecreto){
        exibirMensagemNaTela('h1', 'Você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';

        //nem sempre colocando template strings o html vai entender
        //sendo necessario por o 'texto' em uma unica variavel e por o texto, pra depois por a variavel no
        //exibirMensagemNaTela
        let mensagemNova = `O número secreto é ${numSecreto}! e você acertou com ${tentativas} ${palavraTentativa}`
        exibirMensagemNaTela('p',mensagemNova);
        
        //Libera o botão 'Novo jogo' quando você ganha o Jogo
        document.getElementById('reiniciar').removeAttribute('disabled')
        // pode ser utilizado como: 
        //document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute > numSecreto){
            exibirMensagemNaTela('h1','Você errou!');
            exibirMensagemNaTela('p','O número secreto é menor');
        } else {
            exibirMensagemNaTela('h1','Você errou!');
            exibirMensagemNaTela('p','O número secreto é maior');
        } //Acima utilizamos If e else para alterar as mensagens do HTML
        tentativas++
        console.log(`Usuário ja tentou ${tentativas}x`);
        //limpar onde o usuario coloca o número
        limparCampo()
    } 
}
// Limpar o campo depois de jogar 1x
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}
// Reiniciar o jogo e colocando tudo novo
function reiniciarJogo() {
    numSecreto = gerandoNumAleatorio();
    tentativas = 1;
    limparCampo();
    exibirMensagemNaTelaInicial();
    // Faz o botão reiniciar ser desativado no inicio do jogo novamente
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
