import '../style.css'
import Memory from './Memory'

const resetBtn = document.getElementById('reset');
const newGameBtn = document.getElementById('newGame');
const state = document.getElementById('state')

const memory = new Memory({
	root: document.getElementById('root'),
	width: 500, // px
	height:500, // px
	rows: 4, // max value is 4, supported sizes 4x4, 2x2, 4x2 , 2x3
	columns: 4,
	timeLimit: 60, // seconds,
	// assets: ['😀', '🌞', '🐶', '🌸', '🍕', '🎉', '🚀', '🎨', '🍩', '🐬'],
	assets:	['👋', '🌸', '🎂', '🎉', '🌈', '🍕', '🐶', '🎵', '📚', '🚀'],
	// assets: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
	winCb: (time) => {
		state.innerText = `You win!!! Your time is ${time} sec`
	},
	gameOverCb: () => {
		state.innerText = `Game over!`
	}
})

resetBtn.setAttribute('disabled', true);

resetBtn.addEventListener('click', () => {
	memory.restartGame(() => {
		state.innerText = ''
	})
})

newGameBtn.addEventListener('click', () => {
	memory.startGame(
		() => {
			state.innerText = ''
		}
	)
	resetBtn.removeAttribute('disabled');
	newGameBtn.setAttribute('disabled', true);
})


