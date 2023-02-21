export default class Interface {
	constructor({width = 600, height = 600,}) {
		Object.assign(this, {width, height})

		this.MARGIN = 10;
	}

	createTimer(initValue = 0){
		return Object.assign(document.createElement('div'),
			{ id: 'timer', innerText: 'TIMER: ' + initValue},
		)
	}

	updateTimer(timer, value){
		timer.innerText = 'TIMER: ' + value;
	}

	createBoard(array, width = this.width, height = this.height){
		const board = Object.assign(document.createElement('div'),
			{ id: 'board'},
		)
		board.setAttribute('style', `width:${this.width}px; height: ${this.height}px;`)

		let cardIndex = 0

		board.innerHTML = array.map((row) => {
			const cardWidth = (width / row.length) - this.MARGIN * 2;
			const cardHeight = (height / array.length) - this.MARGIN * 2;

			return `<div class="row">${
				row.map((col) => {
					return `<div class="card" style="width: ${cardWidth}px; height: ${cardHeight}px;" data-index="i_${cardIndex++}">
      			<div class="card-front"></div>
            <div class="card-back" style="line-height: ${cardHeight}px;">${col}</div>
					</div>`
				}).join('')
			}</div>`
		}).join('');

		return board;
	}

	showElement(card){
		card.classList.add('flipped')
	}

	hideElement(card){
		card.classList.remove('flipped')
	}

	setMatch(cards){
		cards.forEach(card => card.classList.add('matched'))
	}
}
