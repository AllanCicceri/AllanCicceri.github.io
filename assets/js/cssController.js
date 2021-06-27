
function greyScaleAll() {
    const players = document.querySelectorAll('[player] > img')
    players.forEach(e => e.style = "filter: grayscale(90%)")
}

function removeGrayScale() {
    const playerAtual = document.querySelector(`[player="${posicaoJogador}"] > img`)
    playerAtual.style = "filter: none"
}
