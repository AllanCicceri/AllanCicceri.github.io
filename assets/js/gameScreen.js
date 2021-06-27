let posicaoJogador = 0
let removedPlayers = ""
let intervalIdentifier = 0
let numOfPlayers = 0
let timeInSeconds =0
const btnTimer = document.querySelector('#timer')

btnTimer.onclick = e => start(e)

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
const btnReady = document.getElementById('ready')

btnReady.onclick = function (e) {
    numOfPlayers = document.getElementById('numberOfPlayers').value
    timeInSeconds = document.getElementById('timeInSeconds').value
    const mesaCima = document.getElementById('mesa-cima')
    const mesaBaixo = document.getElementById('mesa-baixo')
    const mesa = document.getElementById('mesa')
    const mesaConfig = document.querySelectorAll('#mesaConfig input')
    let stop = false

    if (e.target.innerHTML == "Stop Game") {
        mesaConfig.forEach(e => {
            e.style = "pointer-events:auto; filter:none"
        })
        e.target.innerHTML = "We're Ready"

        mesa.style = "pointer-events:none; filter:grayscale(100%)"

        mesaCima.innerHTML = ""
        mesaBaixo.innerHTML = ""

        clearInterval(intervalIdentifier)
        const restart = document.querySelector('#timer')
        restart.style = "border: solid 5px black; background-color: #EFEFEF"
        restart.innerHTML = "Restart"
        greyScaleAll()
        removeGrayScale()
        removedPlayers = ""
    } else {

        if ((!numOfPlayers || !timeInSeconds) || (numOfPlayers < 2 || numOfPlayers > 8) || (timeInSeconds < 0 || timeInSeconds > 999)) {
            alert("Valor inválido em algum dos campos!")
            return
        }

        mesa.style = "pointer-events:auto; filter:none"
        e.target.innerHTML = "Stop Game"

        mesaConfig.forEach(e => {
            e.style = "pointer-events:none; filter:grayscale(100%)"
        })

        for (let i = 0; i < numOfPlayers; i++) {
            const divPlayer = document.createElement('div')
            divPlayer.id = 'player'
            divPlayer.classList.add('jogador')
            divPlayer.setAttribute('player', i + 1)
            const img = document.createElement('img')
            img.classList.add('player-img')
            img.style = "width: 50px; height: 50px"
            img.src = "imgs/player.png"
            divPlayer.appendChild(img)

            if (i < 4) {
                mesaCima.appendChild(divPlayer)
            } else {
                mesaBaixo.appendChild(divPlayer)
            }

        }

    }
}

btnPassar.onclick = function (e) {
    passarVez(posicaoJogador)
}
btnDesistir.onclick = function (e) {
    if(removedPlayers.length == numOfPlayers -1){
        console.log(`Ganhador: ${posicaoJogador}`)
        clearInterval(intervalIdentifier)
    }else{
        removePlayer(posicaoJogador)
        passarVez(posicaoJogador)
        restartTimer()
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
//-----------------------------------------------
