
function restartTimer(){
    clearInterval(intervalIdentifier)
    timerController(btnTimer, timeInSeconds) 
}


function timerController(element, seconds) {
    const time = seconds

    intervalIdentifier = setInterval(() => {
        seconds--
        if (seconds > 0) {
            element.innerHTML = seconds
        } else {
            removePlayer(posicaoJogador)
            passarVez(posicaoJogador)
            seconds = time
        }
    }, 1000);
}


function start(e) {
    const botao = e.target
    botao.style = "background-color: transparent; border: none"

    const elements = document.querySelectorAll(`[player]>img`)
    elements.forEach(e => {
        e.src = "imgs/player.png"
    })
    greyScaleAll

    posicaoJogador = 1
    removeGrayScale()

    timerController(botao, timeInSeconds)
}


//---- novas funções
function proximoJogador(jogadorAtual){
    jogadorAtual ++

    if(jogadorAtual > playersArray.length)
        jogadorAtual = 1
    
    while (playersArray[jogadorAtual -1].inactive) {
        jogadorAtual++
        
        if(jogadorAtual > playersArray.length)
        jogadorAtual = 1
    
    }
    
    return jogadorAtual
}

function passarJogada(){
    posicaoJogador = proximoJogador(posicaoJogador)
    greyScaleAll()
    removeGrayScale()
    restartTimer()
}


function removePlayer(playersArray){

    playersArray[posicaoJogador -1].inactive = true
    playersArray[posicaoJogador -1].domElement.querySelector('img').src = "imgs/player-quit.png" 
    passarJogada()
    restartTimer()
}
