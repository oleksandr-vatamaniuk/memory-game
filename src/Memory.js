import Interface from './interface.js'
import Core from './core.js'

export default class Memory {
	constructor({
								root = null,
								width = 500,
								height = 500,
								rows = 4,
								columns = 4,
								timeLimit = 60,
								winCb = (time) => {},
								gameOverCb = () => {},
							}) {

		Object.assign(this, {root, width, height, rows, columns, timeLimit, winCb, gameOverCb})
		this.interface = new Interface({ width, height})
		this.core = new Core({rows, columns})

		this._listeners = {}
		this._board = null;

		this.gameState = {
			countDown: this.timeLimit,
			gamePaused: false,
			gameStarted: false,
			flips: 0,
			flippedCards: [],
			interval: null
		}
	}

	startGame(cb = () => {}){
		const gameArray = this.core.createGameElements()
		this._board = this.interface.createBoard(gameArray, this.width, this.height)
		const timer = this.interface.createTimer(this.timeLimit)

		// Answers
		console.log(gameArray);

		this.attachListeners(this._board)

		this.root.appendChild(timer);
		this.root.appendChild(this._board)

		this.gameState.gameStarted = true;
		this.startTimer(timer, this.timeLimit)
		cb()
	}

	restartGame(cb = () => {}){
		clearInterval(this.gameState.interval)
		this.gameState = {...this.gameState,
			countDown: this.timeLimit,
			gamePaused: false,
			gameStarted: false,
			flips: 0,
			flippedCards: [],
			interval: null
		}

		this.removeListeners(this._board)

		this.root.innerHTML = '';

		this.startGame()
		cb()
	}

	gameOver(){
		clearInterval(this.gameState.interval)
		this.removeListeners(this._board)
		console.log('Game Over')
		this.gameOverCb()
	}

	winGame(){
		clearInterval(this.gameState.interval)
		this.gameState.interval = null
		this.winCb(this.timeLimit - this.gameState.countDown)
	}

	startTimer(timer){
		this.gameState.interval = setInterval(() => {
			if(!this.gameState.gamePaused){
				if(this.gameState.countDown < 0){
					this.gameOver();
				} else{
					this.interface.updateTimer(timer, this.gameState.countDown--)
				}
			}
		}, 1000)
	}

	checkWin(){
		const win = this.core.checkWin()
		if(win){
			this.winGame()
		}
	}

	boardListeners(){
		return {
			'click': (event) => {
				const eventTarget = event.target.parentNode
				if (eventTarget.className.includes('card') && !eventTarget.className.includes('flipped')  && !eventTarget.className.includes('matched')) {
					this.flipCard(eventTarget)
				}
			},
			'mouseleave': () => {
				this.gameState.gamePaused = true
			},
			'mouseenter': () => {
				this.gameState.gamePaused = false
			}
		}
	}

	removeListeners(board){
		for (const [event, handler] of Object.entries(this._listeners)){
			board.removeEventListener(event, handler)
		}
		this._listeners = {};
	}

	attachListeners(board){
		this._listeners = this.boardListeners();

		for (const [event, handler] of Object.entries(this._listeners)){
			board.addEventListener(event, handler)
		}
	}

	flipCard(card){
		this.gameState.flips++

		if(this.gameState.flips <= 2){
			this.gameState.flippedCards.push(card)
			this.interface.showElement(card)
		}


		if(this.gameState.flips === 2){
			const firstCardIndex = this.gameState.flippedCards[0].dataset.index;
			const secondCardIndex = this.gameState.flippedCards[1].dataset.index;
			const matched = this.core.checkMatch(firstCardIndex, secondCardIndex)

			if(matched){
				this.interface.setMatch(this.gameState.flippedCards)
				this.checkWin()
			}

		 setTimeout(() => {
				this.gameState.flippedCards.forEach(card => this.interface.hideElement(card))
				this.gameState.flippedCards = []
				this.gameState.flips = 0
			}, 1000)
		}
	}
}
