let posicaoJogador = 0
let removedPlayers = ""
let intervalIdentifier = 0

document.querySelector('#timer').onclick = e => start(e)

function start(e) {
    const botao = e.target
    botao.style = "background-color: transparent; border: none"
    
    const elements = document.querySelectorAll(`[player]>img`)
    elements.forEach(e => {
        console.log(e)
        e.src = "imgs/player.png"
    })
    greyScaleAll
    
    posicaoJogador = 1
    removeGrayScale()
    
    timerController(botao, 5)
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

function greyScaleAll() {
    const players = document.querySelectorAll('[player] > img')
    players.forEach(e => e.style = "filter: grayscale(90%)")
}

function removeGrayScale() {
    const playerAtual = document.querySelector(`[player="${posicaoJogador}"] > img`)
    playerAtual.style = "filter: none"
}

//----- Botões (opções de jogada)-----------------
const btnPassar = document.querySelector('[btn-passar]')
const btnDesistir = document.querySelector('[btn-desistir]')
btnPassar.onclick = function (e) {
    passarVez(posicaoJogador)
}
btnDesistir.onclick = function (e) {
    removePlayer(posicaoJogador)
    passarVez(posicaoJogador)
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

function removePlayer(player) {
    if (removedPlayers.length < 7) {
        const element = document.querySelector(`[player="${player}"]>img`)
        element.src = "imgs/player-quit.png"
        removedPlayers += player
    } else {
        console.log('limpou', intervalIdentifier)
        clearInterval(intervalIdentifier)
        const restart = document.querySelector('#timer')
        restart.style = "border: solid 5px black; background-color: #EFEFEF"
        restart.innerHTML = "Restart"
        greyScaleAll()
        removeGrayScale()
        removedPlayers = ""
    }
}
//-----------------------------------------------