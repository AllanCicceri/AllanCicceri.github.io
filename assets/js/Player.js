function player(position, dom) {
    this.position = position,
        this.inactive = false,
        this.domElement = dom,

        this.desistir = () => {
            this.inactive = true
        },

        this.passar = () => {
            return this.position + 1
        }
}


function createAllPlayers(numbOfPlayers) {
    const playersVet = []

    for (let i = 0; i < numbOfPlayers; i++) {
        
        const divPlayer = document.createElement('div')
        divPlayer.id = 'player'
        divPlayer.classList.add('jogador')
        divPlayer.setAttribute('player', i + 1) //remover depois se não for mais necessário, pois agora tem o atributo position
        
        const img = document.createElement('img')
        img.classList.add('player-img')
        img.style = "width: 50px; height: 50px"
        img.src = "imgs/player.png"
        
        divPlayer.appendChild(img)

        const newPlayer = new player(i + 1, divPlayer)
        playersVet[i] = newPlayer
    }

    return playersVet
}