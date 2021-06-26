function createPlayer(id, name) {
    const player = {}
    
    player.id = id,
    player.name = name,
    player.ativo = false,
    player.jogadorDaVez = false,

    player.desistir = function desistir() {
            ativo = false
        },

    player.passar = function passar() {
            jogadorDaVez = false
        }

    return player
}