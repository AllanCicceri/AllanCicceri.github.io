
function removePlayer(player) {
    if (removedPlayers.length < 7) {
        const element = document.querySelector(`[player="${player}"]>img`)
        element.src = "imgs/player-quit.png"
        removedPlayers += player
    } else {
        clearInterval(intervalIdentifier)
        const restart = document.querySelector('#timer')
        restart.style = "border: solid 5px black; background-color: #EFEFEF"
        restart.innerHTML = "Restart"
        greyScaleAll()
        removeGrayScale()
        removedPlayers = ""
    }
}


function passarVez(jogadorAtual) {
    let novoJogador = jogadorAtual + 1 //document.querySelector(`[player-pos="${jogadorAtual + 1}"]`) .getAttribute('player-pos')

    if (novoJogador > 8) novoJogador = 1

    while (removedPlayers.includes(novoJogador)) {
        novoJogador++

        if (novoJogador > 8) novoJogador = 1
    }

    //if(novoJogador > 8) novoJogador = 1

    posicaoJogador = novoJogador

    greyScaleAll()
    removeGrayScale()
}


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
