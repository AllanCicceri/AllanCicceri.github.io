let posicaoJogador = 0
let removedPlayers = ""
let intervalIdentifier = 0
let numOfPlayers = 0
let timeInSeconds =0
const btnTimer = document.querySelector('#timer')

const playersArray = []

btnTimer.onclick = e => start(e)

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


        const vetAllPlayers = createAllPlayers(numOfPlayers)
        
        for (let i = 0; i < numOfPlayers; i++) {
            if (i < 4) {
                mesaCima.appendChild(vetAllPlayers[i].domElement)
            } else {
                mesaBaixo.appendChild(vetAllPlayers[i].domElement)
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
