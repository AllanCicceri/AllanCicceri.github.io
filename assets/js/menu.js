const btnMinus = document.querySelector('[btn-minus]')
const btnPlus = document.querySelector('[btn-plus]')
const txtNumOfPlayers = document.querySelector('[txt-numOfPlayers]')
const btnCreateGame = document.querySelector('[btn-newgame]')

btnMinus.onclick = e => {
    let numOfPlayers = txtNumOfPlayers.value
    if (numOfPlayers > 2)
        numOfPlayers--

    txtNumOfPlayers.value = numOfPlayers
}

btnPlus.onclick = e => {
    let numOfPlayers = txtNumOfPlayers.value
    if (numOfPlayers < 8)
        numOfPlayers++

    txtNumOfPlayers.value = numOfPlayers
}

btnCreateGame.onclick = e => {
    const button = e.target

    if (button.getAttribute('btn-newgame') == 'create') {
        e.target.setAttribute('btn-newgame', 'start')

        const listOfPlayers = document.getElementById('listOfPlayers')
        listOfPlayers.innerHTML = ''

        const timeLabel = document.createElement('label')
        timeLabel.innerHTML = 'Time (in seconds)'
        const timeDiv = document.createElement('div')
        timeDiv.style.display = "flex"
        timeDiv.style.justifyContent = "center"
        const txtTime = document.createElement('input')
        txtTime.classList.add('time-config')
        txtTime.setAttribute('time-config', 0)
        txtTime.style.height = "20px"
        txtTime.style.width = "200px"
        timeDiv.appendChild(txtTime)
        listOfPlayers.appendChild(timeLabel)
        listOfPlayers.appendChild(timeDiv)


        for (let i = 1; i <= txtNumOfPlayers.value; i++) {
            const label = document.createElement('label')
            label.innerHTML = 'Player Name'
            const nameDiv = document.createElement('div')
            nameDiv.style.display = "flex"
            nameDiv.style.justifyContent = "center"
            const txtName = document.createElement('input')
            txtName.classList.add('player')
            txtName.setAttribute('player-id', i)
            txtName.style.height = "20px"
            txtName.style.width = "200px"
            nameDiv.appendChild(txtName)

            listOfPlayers.appendChild(label)
            listOfPlayers.appendChild(nameDiv)
        }

        e.target.innerHTML = 'Start Game!'
        e.target.style.color = 'cyan'

    }else{
        const names = document.getElementsByClassName('player')
        const players = []
        
        for (let i = 0; i < txtNumOfPlayers.value; i++) {
            // console.log(names[i].getAttribute('player-id'), names[i].value)
            const player = new createPlayer(names[i].getAttribute('player-id'), names[i].value)
            console.log(player)
            players[i] = player
        }


        const options = {
            method: 'post',
            body: new URLSearchParams(data),
            players
        }
        //CONTINUAR DAQUI - tem que mandar pra url gameConfig tratar
        fetch('gameConfig', options)
            .then(resp => resp.json())
            .then(json => {
                console.log(json.name)
            })
    } 
}