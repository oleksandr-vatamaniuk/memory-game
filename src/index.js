import '../style.css'
import Memory from './Memory'

const memory = new Memory({
	root: document.getElementById('root')
})


document.getElementById('reset').addEventListener('click', () => {
	memory.restartGame()
})

document.getElementById('newGame').addEventListener('click', () => {
	memory.startGame()
})


